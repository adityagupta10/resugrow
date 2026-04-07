import { getUnifiedSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  calculateApplicationAnalytics,
  formatStatusLabel,
} from "@/lib/applicationTracker";
import { fetchApplicationsForUserIds } from "@/lib/applicationTrackerDb";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const user = await getUnifiedSession();

  if (!user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  // Build a list of all user IDs that share the same email.
  // This handles the case where multiple Prisma User records exist
  // (one from NextAuth PrismaAdapter, one from the Supabase share API).
  let userIds = [user.id];
  if (user.email) {
    const allUsers = await prisma.user.findMany({
      where: { email: user.email },
      select: { id: true },
    });
    userIds = [...new Set([user.id, ...allUsers.map((u) => u.id)])];
  }

  // Fetch recent resumes across all matching user IDs
  const recentResumes = await prisma.resume.findMany({
    where: { userId: { in: userIds } },
    orderBy: { updatedAt: "desc" },
    take: 10,
  });

  const allApplications = await fetchApplicationsForUserIds(userIds);
  const applications = allApplications.slice(0, 6);
  const totalApplications = allApplications.length;
  const applicationAnalytics = calculateApplicationAnalytics(allApplications);
  const activeApplications = allApplications.filter(
    (application) => !["REJECTED", "OFFER"].includes(application.status),
  ).length;

  const stats = [
    { label: "Resumes Built", value: recentResumes.length.toString(), icon: "📄" },
    { label: "ATS Scans Done", value: "0", icon: "🔍" },
    { label: "LinkedIn Score", value: "0", icon: "💎" },
    { label: "Job Applications", value: totalApplications.toString(), icon: "🚀" },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <h1>Welcome, {user.name?.split(" ")[0]}!</h1>
          <p>Here's what's happening with your career journey.</p>
        </div>
        <div className={styles.userCard}>
          {user.image && (
            <Image
              src={user.image}
              alt={user.name}
              width={48}
              height={48}
              className={styles.avatar}
            />
          )}
          <div className={styles.userInfo}>
            <span className={styles.name}>{user.name}</span>
            <span className={styles.email}>{user.email}</span>
          </div>
        </div>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <span className={styles.statIcon}>{stat.icon}</span>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <section className={styles.mainGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <h2>Recent Resumes</h2>
              <Link href="/resume/builder" className={styles.viewAll}>Create New</Link>
            </div>
          </div>
          <div className={styles.cardContent}>
            {recentResumes.length > 0 ? (
              <div className={styles.resumeList}>
                {recentResumes.map((resume) => (
                  <div key={resume.id} className={styles.resumeItem}>
                    <div className={styles.resumeInfo}>
                      <h3 className={styles.resumeName}>{resume.title || "Untitled Resume"}</h3>
                      <p className={styles.resumeDate}>
                        Edited {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={styles.resumeActions}>
                      <Link href={`/resume/builder?id=${resume.shareId}`} className={styles.editBtn}>
                        Edit
                      </Link>
                      <Link href={`/r/${resume.shareId}`} target="_blank" className={styles.viewBtn}>
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>You haven't saved any resumes yet.</p>
            )}
          </div>
        </div>

        <div className={styles.sideColumn}>
          <div className={`${styles.card} ${styles.pipelineCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <h2>Application Pipeline</h2>
                <Link href="/dashboard/applications" className={styles.viewAll}>
                  Open Board
                </Link>
              </div>
              <p className={styles.cardSubtitle}>
                Treat your job search like a funnel, not a scattered spreadsheet.
              </p>
            </div>
            <div className={styles.pipelineMetrics}>
              <div className={styles.pipelineMetric}>
                <strong>{activeApplications}</strong>
                <span>Active roles</span>
              </div>
              <div className={styles.pipelineMetric}>
                <strong>{applicationAnalytics.responseRate}%</strong>
                <span>Response rate</span>
              </div>
              <div className={styles.pipelineMetric}>
                <strong>{applicationAnalytics.interviewRate}%</strong>
                <span>Interview rate</span>
              </div>
            </div>

            {applications.length > 0 ? (
              <div className={styles.applicationList}>
                {applications.map((application) => (
                  <div key={application.id} className={styles.applicationItem}>
                    <div className={styles.applicationInfo}>
                      <h3>{application.company}</h3>
                      <p>{application.role}</p>
                    </div>
                    <span className={styles.applicationStatus}>
                      {formatStatusLabel(application.status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>
                You have not logged any applications yet. Start with your first role and build your funnel.
              </p>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <h2>Quick Actions</h2>
              </div>
            </div>
            <div className={styles.actionsList}>
              <Link href="/dashboard/applications" className={styles.actionItem}>
                <span>Track Job Applications</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 15L12 10L7 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/tools/career-path" className={styles.actionItem}>
                <span>Simulate Career Path</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 15L12 10L7 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/resume/ats-checker" className={styles.actionItem}>
                <span>Scan My Resume</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 15L12 10L7 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/linkedin-review" className={styles.actionItem}>
                <span>Review LinkedIn Profile</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 15L12 10L7 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/tools/sar-rewriter" className={styles.actionItem}>
                <span>Rewrite SAR Bullets</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 15L12 10L7 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
