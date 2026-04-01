import { getUnifiedSession } from "@/lib/session";
import { redirect } from "next/navigation";
import styles from "./settings.module.css";

export default async function SettingsPage() {
  const user = await getUnifiedSession();

  if (!user) {
    redirect("/login?callbackUrl=/settings");
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Account Settings</h1>
        <p>Manage your account preferences and personal information.</p>
      </header>

      <div className={styles.sections}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Profile Information</h2>
            <p>This is how you will appear to employers.</p>
          </div>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" value={user.name || ""} readOnly className={styles.input} />
            <span className={styles.hint}>Managed via {user.provider === 'supabase' ? 'Supabase' : 'Google'} account</span>
          </div>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input type="email" value={user.email || ""} readOnly className={styles.input} />
            <span className={styles.hint}>Managed via {user.provider === 'supabase' ? 'Supabase' : 'Google'} account</span>
          </div>
        </section>

        <section className={`${styles.section} ${styles.dangerZone}`}>
          <div className={styles.sectionHeader}>
            <h2>Danger Zone</h2>
            <p>Irreversible actions for your account.</p>
          </div>
          <div className={styles.actionRow}>
            <div className={styles.actionInfo}>
              <h3>Delete Account</h3>
              <p>Permanently delete your account and all saved resumes. This cannot be undone.</p>
            </div>
            <button className={styles.deleteBtn}>Delete Account</button>
          </div>
        </section>
      </div>
    </div>
  );
}
