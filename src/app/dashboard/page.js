import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  const stats = [
    { label: "Resumes Built", value: "0", icon: "📄" },
    { label: "ATS Scans Done", value: "0", icon: "🔍" },
    { label: "LinkedIn Score", value: "0", icon: "💎" },
    { label: "Job Applications", value: "0", icon: "🚀" },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <h1>Welcome, {session.user.name?.split(" ")[0]}!</h1>
          <p>Here's what's happening with your career journey.</p>
        </div>
        <div className={styles.userCard}>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={48}
              height={48}
              className={styles.avatar}
            />
          )}
          <div className={styles.userInfo}>
            <span className={styles.name}>{session.user.name}</span>
            <span className={styles.email}>{session.user.email}</span>
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
            <p className={styles.emptyText}>You haven't saved any resumes yet.</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <h2>Quick Actions</h2>
            </div>
          </div>
          <div className={styles.actionsList}>
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
      </section>
    </div>
  );
}
