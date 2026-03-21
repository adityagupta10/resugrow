import styles from '../legal.module.css';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Cookie Policy | ResuGrow',
    description: 'Read how ResuGrow uses cookies and analytics technologies on the website.',
    path: '/cookies',
    keywords: ['cookie policy', 'website cookies', 'resugrow cookies']
});

export default function Cookies() {
    return (
        <div className={styles.legalContainer}>
            <div className={styles.legalHeader}>
                <h1 className={styles.legalTitle}>Cookie Policy</h1>
                <p className={styles.legalSubtitle}>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            <div className={styles.legalContent}>
                <section>
                    <h2>1. What Are Cookies?</h2>
                    <p>
                        Cookies are small text files that are placed on your computer or mobile device when you
                        visit a website. They are widely used to make websites work, or work more efficiently, as
                        well as to provide reporting information and personalized experiences.
                    </p>
                </section>

                <section>
                    <h2>2. How We Use Cookies</h2>
                    <p>We use cookies and similar tracking technologies for the following purposes:</p>
                    <ul>
                        <li><strong>Essential Cookies:</strong> These are strictly necessary to provide you with services available through our website, such as secure login areas and remembering your resume session data while you build.</li>
                        <li><strong>Performance and Analytics Cookies:</strong> These cookies collect information that is used to help us understand how our website is being used, so we can improve the platform&apos;s performance and design.</li>
                        <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences (e.g., your choice of language or template preferences).</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Third-Party Cookies</h2>
                    <p>
                        In addition to our own cookies, we may also use various third-party cookies to report
                        usage statistics of the service, deliver advertisements on and through the service, and
                        so on. We do not control the use of these third-party cookies, and you should check the
                        privacy policies of these providers for more information on how they use cookies.
                    </p>
                </section>

                <section>
                    <h2>4. Your Choices Regarding Cookies</h2>
                    <p>
                        If you prefer to avoid the use of cookies on the website, first you must disable the
                        use of cookies in your browser and then delete the cookies saved in your browser
                        associated with this website. You may use this option for preventing the use of cookies
                        at any time.
                    </p>
                    <p>
                        Please note that if you delete cookies or refuse to accept them, you might not be able
                        to use all of the features we offer, you may not be able to store your preferences, and
                        some of our pages might not display properly (for instance, the resume builder may not
                        save your real-time progress).
                    </p>
                </section>
            </div>
        </div>
    );
}
