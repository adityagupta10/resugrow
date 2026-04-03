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
                        Welcome to ResuGrow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you access our website, use our AI-powered career development platform, and interact with our services.
                    </p>
                    <p>
                        By using ResuGrow, you agree to the collection and use of information in accordance with this policy.
                    </p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <p>We collect information that you voluntarily provide to us, as well as data collected automatically when you navigate our platform.</p>

                    <h3>A. Information You Provide to Us</h3>
                    <ul>
                        <li><strong>Account &amp; Profile Data:</strong> First and last name, email address, password, and contact details.</li>
                        <li><strong>Career Information:</strong> Your target role, experience level, industry, location, employment history, education, skills, and the content of the resumes and cover letters you create.</li>
                        <li><strong>Payment Information:</strong> If you purchase premium services, your payment data is collected and processed securely by our third-party payment processor (e.g., Stripe). We do not collect or store full credit card numbers on our servers.</li>
                        <li><strong>Communications:</strong> Information provided when you contact customer support or complete feedback questionnaires.</li>
                    </ul>

                    <h3>B. Information Collected Automatically</h3>
                    <ul>
                        <li><strong>Device &amp; Browser Data:</strong> IP address, browser type, operating system, time zone, and device identifiers (such as Apple IDFA or Google AAID for mobile).</li>
                        <li><strong>Usage Data:</strong> Information about how you interact with our platform, including time spent on pages, features accessed, and clickstream data.</li>
                        <li><strong>Cookies &amp; Tracking Technologies:</strong> We use cookies, clear GIFs (web beacons), and similar technologies to remember your preferences and analyze site traffic.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <p>We process your personal data for the following purposes:</p>
                    <ul>
                        <li><strong>Service Delivery:</strong> To operate our platform, generate AI-powered resume feedback, and create tailored cover letters.</li>
                        <li><strong>Personalization:</strong> To customize your experience and provide relevant career guidance and recommendations.</li>
                        <li><strong>Platform Improvement:</strong> To conduct technical analysis, troubleshoot issues, and improve our algorithms. In line with this goal, we may train our systems using strictly anonymized user data.</li>
                        <li><strong>Communication:</strong> To send transactional emails, security updates, and marketing communications (which you can opt out of at any time).</li>
                        <li><strong>Security &amp; Compliance:</strong> To monitor for fraudulent activity, enforce our Terms of Use, and comply with legal obligations.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Artificial Intelligence &amp; Privacy Protection</h2>
                    <p>Protecting your data during AI processing is our priority.</p>
                    <ul>
                        <li><strong>PII Removal:</strong> When utilizing our AI features for resume analysis and content generation, we automatically remove personally identifiable information (PII) before sending data to our AI partners.</li>
                        <li><strong>Third-Party AI Models:</strong> Your text is processed by our secure AI partners (e.g., OpenAI) solely to deliver the service. Our partners are bound by strict agreements: they only retain this data for a maximum of 30 days for abuse monitoring and are strictly prohibited from using your personal data to train their base models.</li>
                    </ul>
                </section>

                <section>
                    <h2>5. How We Share Your Information</h2>
                    <p>We do not sell, trade, or otherwise transfer your personal information to third parties for their own marketing purposes. We may share your data in the following circumstances:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> We share data with trusted processors who assist us in operating our platform. This includes cloud hosting providers (e.g., Amazon Web Services), payment processors (e.g., Stripe/PayPal), analytics providers (e.g., Google Analytics), and AI infrastructure partners.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law, court order, or valid requests by public authorities.</li>
                        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your personal data may be transferred to the new controlling entity. We will notify you via email beforehand.</li>
                        <li><strong>Public Sharing:</strong> If you choose to publish your resume on a public URL or share it on social media, that information becomes publicly accessible. We cannot guarantee the privacy of data once you share it outside of our platform.</li>
                    </ul>
                </section>

                <section>
                    <h2>6. Data Security and Retention</h2>
                    <p>
                        We implement industry-standard security measures, including secure socket layer technology (SSL) encryption, regular security audits, and SOC 2 compliant infrastructure partners. However, no method of transmission over the Internet is 100% secure.
                    </p>
                    <p>
                        We retain your personal data only as long as your account is active or as needed to provide you services. If you close your account, your data is permanently deleted after a 30-day grace period, except where retention is required to comply with our legal or accounting obligations.
                    </p>
                </section>

                <section>
                    <h2>7. International Data Transfers</h2>
                    <p>
                        We operate globally. Your information may be transferred to and processed in countries outside of the European Economic Area (EEA), such as the United States. When transferring data internationally, we rely on established legal mechanisms, including the European Commission&apos;s Standard Contractual Clauses (SCCs) and the EU-U.S. Data Privacy Framework, to ensure an adequate level of protection.
                    </p>
                </section>

                <section>
                    <h2>8. Your Privacy Rights</h2>
                    <p>Depending on your location, you have specific rights regarding your personal data:</p>

                    <h3>For European Economic Area (EEA) and UK Residents (GDPR / UK GDPR):</h3>
                    <ul>
                        <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
                        <li><strong>Right to Rectification:</strong> Update or correct inaccurate information.</li>
                        <li><strong>Right to Erasure:</strong> Request the deletion of your personal data.</li>
                        <li><strong>Right to Restrict Processing:</strong> Ask us to temporarily halt processing your data.</li>
                        <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format.</li>
                        <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or for direct marketing.</li>
                    </ul>

                    <h3>For United States Residents (CCPA/CPRA &amp; State Laws):</h3>
                    <ul>
                        <li><strong>Right to Know:</strong> Request details about the categories and specific pieces of personal information we have collected.</li>
                        <li><strong>Right to Delete:</strong> Request the deletion of your personal information.</li>
                        <li><strong>Right to Correct:</strong> Request correction of inaccurate data.</li>
                        <li><strong>Right to Opt-Out:</strong> You have the right to opt-out of the &quot;sale&quot; or &quot;sharing&quot; of your personal information. We respect Global Privacy Control (GPC) signals sent by your browser.</li>
                    </ul>
                    <p>
                        To exercise any of these rights, please contact us at <strong>info@resugrow.com</strong>.
                    </p>
                </section>

                <section>
                    <h2>9. Cookies and Tracking Technologies</h2>
                    <p>We use cookies to enhance navigation, analyze site usage, and assist in our marketing efforts. These include:</p>
                    <ul>
                        <li><strong>Essential Cookies:</strong> Required for core platform functionality.</li>
                        <li><strong>Performance Cookies:</strong> Help us understand user behavior and improve our services.</li>
                        <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements on third-party platforms.</li>
                    </ul>
                    <p>
                        You can manage your cookie preferences at any time through your browser settings or our website&apos;s cookie consent manager.
                    </p>
                </section>

                <section>
                    <h2>10. Children&apos;s Privacy</h2>
                    <p>
                        Our services are not intended for individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information immediately.
                    </p>
                </section>

                <section>
                    <h2>11. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page and updating the &quot;Last Updated&quot; date.
                    </p>
                </section>

                <section>
                    <h2>12. Contact Us</h2>
                    <p>
                        If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at:
                        <br />
                        <strong>Email:</strong> info@resugrow.com
                    </p>
                </section>
            </div>
        </div>
    );
}
