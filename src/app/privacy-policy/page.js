import styles from '../legal.module.css';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Privacy Policy | RESUGROW',
    description: 'Read how RESUGROW collects, uses, and protects data across resume and LinkedIn tools.',
    path: '/privacy-policy',
    keywords: ['privacy policy', 'data protection', 'RESUGROW privacy']
});

export default function PrivacyPolicy() {
    return (
        <div className={styles.legalContainer}>
            <div className={styles.legalHeader}>
                <h1 className={styles.legalTitle}>Privacy Policy</h1>
                <p className={styles.legalSubtitle}>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            <div className={styles.legalContent}>
                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        At RESUGROW, we take your privacy seriously. This Privacy Policy explains how we collect,
                        use, disclose, and safeguard your information when you visit our website or use our
                        resume building services. Please read this privacy policy carefully. If you do not agree
                        with the terms of this privacy policy, please do not access the site.
                    </p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <p>We collect information that you provide directly to us when using our services:</p>
                    <ul>
                        <li><strong>Account Information:</strong> Name, email address, password, and contact details.</li>
                        <li><strong>Resume Data:</strong> Employment history, education, skills, achievements, and other professional information you enter to build your resume.</li>
                        <li><strong>Usage Data:</strong> Information about how you navigate and interact with our platform, including browser type, IP address, and pages visited.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <p>The information we collect is used to:</p>
                    <ul>
                        <li>Provide, operate, and maintain our resume building services</li>
                        <li>Generate AI-powered content recommendations for your resume</li>
                        <li>Improve, personalize, and expand our services</li>
                        <li>Understand and analyze how you use our platform</li>
                        <li>Communicate with you for customer service, updates, and marketing</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Data Security</h2>
                    <p>
                        We implement reasonable technical and organizational security measures designed to protect
                        the security of any personal information we process. However, despite our safeguards and
                        efforts to secure your information, no electronic transmission over the Internet or
                        information storage technology can be guaranteed to be 100% secure.
                    </p>
                </section>

                <section>
                    <h2>5. Sharing Your Information</h2>
                    <p>
                        We do not sell your personal information. We may share your information with third-party
                        vendors, service providers, contractors, or agents who perform services for us or on our
                        behalf, such as payment processing, data analysis, email delivery, hosting services, and
                        customer service.
                    </p>
                </section>

                <section>
                    <h2>6. Contact Us</h2>
                    <p>
                        If you have questions or comments about this Privacy Policy, please contact us at:
                        <br />
                        <strong>Email:</strong> info@resugrow.com
                    </p>
                </section>
            </div>
        </div>
    );
}
