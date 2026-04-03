import styles from '../legal.module.css';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Cookie Policy | RESUGROW',
    description: 'Read how RESUGROW uses cookies and analytics technologies on the website.',
    path: '/cookies',
    keywords: ['cookie policy', 'website cookies', 'RESUGROW cookies']
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
                    <h2>1. Introduction</h2>
                    <p>
                        This Cookie Policy explains how ResuGrow (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies, web beacons, pixels, local storage, and similar tracking technologies (collectively, &quot;Cookies&quot;) when you visit, access, or interact with our website located at resugrow.com, our AI-powered career development platform, and any related services (collectively, the &quot;Service&quot;).
                    </p>
                    <p>
                        This Cookie Policy should be read in conjunction with our <a href="/privacy-policy" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Privacy Policy</a> and <a href="/terms-of-service" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Terms of Service</a>. By continuing to use the Service, you consent to our use of Cookies as described in this policy. If you do not agree to our use of Cookies, you should adjust your browser settings accordingly or refrain from using the Service.
                    </p>
                </section>

                <section>
                    <h2>2. What Are Cookies?</h2>
                    <p>
                        Cookies are small text files that are stored on your computer, smartphone, tablet, or other internet-connected device when you visit a website. They are widely used across the internet to make websites function properly, work more efficiently, provide a better user experience, and supply reporting and analytics information to website operators.
                    </p>
                    <p>
                        Cookies can be classified in several ways:
                    </p>
                    <ul>
                        <li><strong>First-Party Cookies:</strong> These are set directly by our website (resugrow.com) and can only be read by our website. They are used for core functionality such as session management, authentication, and remembering your preferences.</li>
                        <li><strong>Third-Party Cookies:</strong> These are set by external services and domains other than resugrow.com. They are typically used for analytics, advertising, and social media integration. Third-party cookies allow those external services to track your browsing activity across multiple websites.</li>
                        <li><strong>Session Cookies:</strong> These are temporary cookies that are stored in your browser&apos;s memory only during your browsing session. They are automatically deleted when you close your browser. Session cookies are essential for maintaining your login state and ensuring that features like the resume builder work correctly during a single visit.</li>
                        <li><strong>Persistent Cookies:</strong> These cookies remain on your device for a predetermined period (or until you manually delete them). They are used to remember your preferences, such as your chosen resume template, language settings, or login credentials, across multiple visits to the Service.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Other Tracking Technologies</h2>
                    <p>
                        In addition to traditional browser cookies, we may also use the following related technologies:
                    </p>
                    <ul>
                        <li><strong>Web Beacons (Tracking Pixels):</strong> Small, transparent image files embedded in web pages or emails that allow us to track whether a page has been viewed or an email has been opened. We use web beacons in conjunction with cookies to monitor the effectiveness of our marketing campaigns and to understand user engagement patterns.</li>
                        <li><strong>Local Storage (HTML5):</strong> A browser-based storage mechanism that allows websites to store larger amounts of data locally on your device compared to traditional cookies. We use local storage to save your resume builder progress, ATS scan results, and LinkedIn review data so you can return to your work without losing progress. Local storage data does not expire automatically and persists until you clear your browser data.</li>
                        <li><strong>Session Storage:</strong> Similar to local storage, but data stored in session storage is cleared when the browser tab is closed. We use session storage for temporary data needed during a single browsing session, such as form inputs and navigation state.</li>
                        <li><strong>JavaScript Tags:</strong> Small pieces of JavaScript code embedded in our pages that enable analytics and marketing platforms (e.g., Google Analytics, Vercel Analytics) to collect data about your interactions with the Service.</li>
                        <li><strong>Fingerprinting Technologies:</strong> We do not use browser or device fingerprinting techniques to identify users. Our tracking is limited to the cookie and storage technologies described in this policy.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. How We Use Cookies</h2>
                    <p>
                        We use Cookies for the following specific purposes:
                    </p>

                    <h3>A. Strictly Necessary Cookies</h3>
                    <p>
                        These Cookies are essential for the operation of the Service and cannot be switched off in our systems. They are usually set only in response to actions made by you, such as setting your privacy preferences, logging in, filling in forms, or using the resume builder. Without these Cookies, certain features of the Service that you have requested cannot be provided.
                    </p>
                    <p>Strictly Necessary Cookies include:</p>
                    <ul>
                        <li><strong>Authentication Cookies:</strong> These cookies identify you when you log into the Service and allow us to maintain your authenticated session across page loads. They include session tokens set by our authentication providers (NextAuth.js, Supabase Auth).</li>
                        <li><strong>Security Cookies:</strong> Used to prevent cross-site request forgery (CSRF) attacks, detect bots, and protect the integrity of your account.</li>
                        <li><strong>Load Balancing Cookies:</strong> Used by our infrastructure to distribute traffic efficiently across our servers, ensuring consistent performance and availability.</li>
                        <li><strong>Cookie Consent Cookies:</strong> Used to store your cookie consent preferences so we can respect your choices on subsequent visits.</li>
                    </ul>

                    <h3>B. Performance and Analytics Cookies</h3>
                    <p>
                        These Cookies allow us to count visits and traffic sources so we can measure and improve the performance of the Service. They help us understand which pages are the most popular, which features are used most frequently, how users navigate through the platform, and where users encounter errors or drop off. All information collected by these cookies is aggregated and therefore anonymous.
                    </p>
                    <p>Performance and Analytics Cookies include:</p>
                    <ul>
                        <li><strong>Google Analytics (GA4):</strong> We use Google Analytics 4 (Property ID: G-PNP4M5Y49H) to collect anonymized data about website traffic, user behavior, and engagement metrics. Google Analytics uses cookies to distinguish unique users and to throttle the request rate. Data collected includes pages viewed, session duration, bounce rate, geographic location (country/city level), device type, browser type, and referral sources. Google&apos;s use of this data is governed by Google&apos;s Privacy Policy. You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Google Analytics Opt-out Browser Add-on</a>.</li>
                        <li><strong>Vercel Analytics:</strong> We use Vercel&apos;s built-in analytics to monitor website performance, including page load times, Core Web Vitals (Largest Contentful Paint, First Input Delay, Cumulative Layout Shift), and server response times. Vercel Analytics is privacy-focused and does not use cookies for tracking individual users across sessions.</li>
                        <li><strong>Custom Event Tracking:</strong> We track specific user interactions, such as clicks on call-to-action buttons (e.g., &quot;Build My Resume,&quot; &quot;Scan My Resume,&quot; &quot;Analyze My Profile&quot;), to understand which features are most popular and to optimize the user experience. These events are sent to Google Analytics as custom events and do not contain personally identifiable information.</li>
                    </ul>

                    <h3>C. Functionality Cookies</h3>
                    <p>
                        These Cookies enable the Service to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you disable these Cookies, some or all of these services may not function properly.
                    </p>
                    <p>Functionality Cookies include:</p>
                    <ul>
                        <li><strong>Preference Cookies:</strong> Used to remember your settings and preferences, such as your selected resume template, color theme, language, font size, and layout choices.</li>
                        <li><strong>Resume Session Cookies:</strong> Used to maintain the state of your resume building session, including form data, section ordering, and unsaved changes, so you can navigate away and return without losing progress.</li>
                        <li><strong>Recently Viewed Cookies:</strong> Used to remember which templates, tools, or features you have recently viewed, enabling us to provide quick access links and personalized suggestions on your dashboard.</li>
                    </ul>

                    <h3>D. Marketing and Advertising Cookies</h3>
                    <p>
                        These Cookies may be set through our Service by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other websites and platforms. They work by uniquely identifying your browser and device. If you do not allow these Cookies, you will experience less targeted advertising.
                    </p>
                    <p>Marketing Cookies may include:</p>
                    <ul>
                        <li><strong>Google Ads Cookies:</strong> If we use Google Ads, these cookies track ad impressions, clicks, and conversions to measure the effectiveness of our advertising campaigns and to serve relevant ads.</li>
                        <li><strong>Facebook/Meta Pixel:</strong> If implemented, the Meta Pixel tracks website visitors for the purpose of building custom audiences and measuring the effectiveness of advertising campaigns on Facebook and Instagram. The Meta Pixel may collect data about pages visited, actions taken, and device information.</li>
                        <li><strong>LinkedIn Insight Tag:</strong> If implemented, the LinkedIn Insight Tag enables campaign reporting, retargeting, and demographic insights for LinkedIn advertising campaigns.</li>
                    </ul>
                    <p>
                        <strong>Important Note:</strong> Not all marketing cookies listed above may be active on the Service at any given time. We will update this section as our marketing integrations change.
                    </p>
                </section>

                <section>
                    <h2>5. Specific Cookies We Use</h2>
                    <p>
                        The following table provides details about the specific cookies that may be set when you use the Service. Please note that the exact cookies may change over time as we update and improve the Service.
                    </p>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                                <th style={{ padding: '12px 16px', fontWeight: '700' }}>Cookie Name</th>
                                <th style={{ padding: '12px 16px', fontWeight: '700' }}>Provider</th>
                                <th style={{ padding: '12px 16px', fontWeight: '700' }}>Purpose</th>
                                <th style={{ padding: '12px 16px', fontWeight: '700' }}>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '10px 16px' }}>next-auth.session-token</td>
                                <td style={{ padding: '10px 16px' }}>ResuGrow</td>
                                <td style={{ padding: '10px 16px' }}>Authentication session management</td>
                                <td style={{ padding: '10px 16px' }}>Session</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '10px 16px' }}>next-auth.csrf-token</td>
                                <td style={{ padding: '10px 16px' }}>ResuGrow</td>
                                <td style={{ padding: '10px 16px' }}>Cross-site request forgery protection</td>
                                <td style={{ padding: '10px 16px' }}>Session</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '10px 16px' }}>sb-access-token</td>
                                <td style={{ padding: '10px 16px' }}>Supabase</td>
                                <td style={{ padding: '10px 16px' }}>Supabase authentication access token</td>
                                <td style={{ padding: '10px 16px' }}>1 hour</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '10px 16px' }}>sb-refresh-token</td>
                                <td style={{ padding: '10px 16px' }}>Supabase</td>
                                <td style={{ padding: '10px 16px' }}>Supabase authentication refresh token</td>
                                <td style={{ padding: '10px 16px' }}>7 days</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '10px 16px' }}>_ga</td>
                                <td style={{ padding: '10px 16px' }}>Google</td>
                                <td style={{ padding: '10px 16px' }}>Distinguishes unique users for analytics</td>
                                <td style={{ padding: '10px 16px' }}>2 years</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '10px 16px' }}>_ga_*</td>
                                <td style={{ padding: '10px 16px' }}>Google</td>
                                <td style={{ padding: '10px 16px' }}>GA4 session state persistence</td>
                                <td style={{ padding: '10px 16px' }}>2 years</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '10px 16px' }}>_gid</td>
                                <td style={{ padding: '10px 16px' }}>Google</td>
                                <td style={{ padding: '10px 16px' }}>Distinguishes users for 24-hour periods</td>
                                <td style={{ padding: '10px 16px' }}>24 hours</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px 16px' }}>cookie_consent</td>
                                <td style={{ padding: '10px 16px' }}>ResuGrow</td>
                                <td style={{ padding: '10px 16px' }}>Stores cookie consent preferences</td>
                                <td style={{ padding: '10px 16px' }}>1 year</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section>
                    <h2>6. Local Storage Usage</h2>
                    <p>
                        In addition to cookies, we use browser local storage to store certain data that enhances your experience with the Service. Local storage data is stored only on your device and is not transmitted to our servers unless explicitly sent by a user action (e.g., saving a resume). The following data may be stored in local storage:
                    </p>
                    <ul>
                        <li><strong>resumePreview:</strong> A temporary Base64-encoded copy of your uploaded resume PDF, used to display a preview on the ATS results page. This data is overwritten each time you perform a new scan.</li>
                        <li><strong>atsResults:</strong> The JSON results from your most recent ATS scan, including scores, keyword analysis, and recommendations. This allows you to revisit your results without re-uploading your resume.</li>
                        <li><strong>linkedinResults:</strong> The JSON results from your most recent LinkedIn Profile Review, including section scores and improvement suggestions.</li>
                        <li><strong>resumeBuilderDraft:</strong> An auto-saved draft of your resume-in-progress in the AI Resume Builder, enabling you to return and continue editing without losing work.</li>
                    </ul>
                    <p>
                        You can clear local storage data at any time through your browser&apos;s developer tools or settings. Clearing local storage will remove any saved drafts, scan results, and preferences stored locally on your device.
                    </p>
                </section>

                <section>
                    <h2>7. Your Choices and How to Manage Cookies</h2>
                    <p>
                        You have several options for managing your cookie preferences:
                    </p>

                    <h3>A. Browser Settings</h3>
                    <p>
                        Most web browsers allow you to control cookies through their settings. You can typically configure your browser to: (a) accept all cookies; (b) notify you when a cookie is set so you can choose to accept or reject it; (c) block all cookies; or (d) delete cookies that have already been set. The method for managing cookies varies by browser. Below are links to cookie management instructions for common browsers:
                    </p>
                    <ul>
                        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Google Chrome</a></li>
                        <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Mozilla Firefox</a></li>
                        <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Apple Safari</a></li>
                        <li><a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Microsoft Edge</a></li>
                    </ul>

                    <h3>B. Google Analytics Opt-Out</h3>
                    <p>
                        You can prevent Google Analytics from collecting your data by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Google Analytics Opt-out Browser Add-on</a>. This add-on instructs the Google Analytics JavaScript running on websites to not send information to Google Analytics.
                    </p>

                    <h3>C. Global Privacy Control (GPC)</h3>
                    <p>
                        We respect the Global Privacy Control (GPC) signal. If your browser sends a GPC signal, we will treat it as a valid opt-out request for the sale or sharing of your personal information as required by applicable privacy laws (e.g., CCPA/CPRA). You can enable GPC in supported browsers and browser extensions.
                    </p>

                    <h3>D. Do Not Track (DNT)</h3>
                    <p>
                        Some browsers offer a &quot;Do Not Track&quot; (DNT) feature that sends a signal to websites requesting that your browsing activity not be tracked. Because there is currently no universally accepted standard for how to respond to DNT signals, we do not currently respond to DNT browser signals. However, we encourage you to use the GPC signal described above, which we do honor.
                    </p>

                    <h3>E. Mobile Device Settings</h3>
                    <p>
                        On mobile devices, you can manage your advertising and tracking preferences through your device settings. On iOS, go to Settings &gt; Privacy &amp; Security &gt; Tracking. On Android, go to Settings &gt; Google &gt; Ads. These settings allow you to limit ad tracking and reset your advertising identifier.
                    </p>
                </section>

                <section>
                    <h2>8. Impact of Disabling Cookies</h2>
                    <p>
                        Please be aware that if you choose to disable or delete certain Cookies, some features and functionality of the Service may not work as intended. Specifically:
                    </p>
                    <ul>
                        <li><strong>Authentication:</strong> If you block essential cookies, you will not be able to log into your account or access features that require authentication, such as your dashboard, saved resumes, and account settings.</li>
                        <li><strong>Resume Builder:</strong> Disabling cookies and local storage may prevent the resume builder from auto-saving your progress. You may lose unsaved work if you navigate away from the page or close your browser.</li>
                        <li><strong>ATS Results:</strong> Without local storage, your ATS scan and LinkedIn review results will not persist after you leave the results page. You would need to re-upload and re-scan your documents each time.</li>
                        <li><strong>Personalization:</strong> Functionality cookies enable us to remember your template preferences, recently used features, and display settings. Without them, you will receive a generic, default experience on each visit.</li>
                        <li><strong>Performance:</strong> Blocking analytics cookies does not affect the Service&apos;s functionality for you, but it does prevent us from understanding how users interact with our platform, which may affect our ability to identify and fix usability issues.</li>
                    </ul>
                </section>

                <section>
                    <h2>9. Cookies and International Data Transfers</h2>
                    <p>
                        Some Cookies, particularly those set by third-party analytics and advertising providers (e.g., Google Analytics), may result in the transfer of your data to servers located outside of your country of residence, including to the United States. When data is transferred internationally through Cookies, we and our third-party partners rely on established legal mechanisms such as the European Commission&apos;s Standard Contractual Clauses (SCCs) and the EU-U.S. Data Privacy Framework to ensure an adequate level of data protection.
                    </p>
                    <p>
                        For more information on international data transfers, please refer to our <a href="/privacy-policy" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Privacy Policy</a>.
                    </p>
                </section>

                <section>
                    <h2>10. Cookie Policy for Children</h2>
                    <p>
                        Our Service is not intended for individuals under the age of 16. We do not knowingly set cookies on the devices of children under 16 or knowingly collect personal data from children through cookies. If you are a parent or guardian and believe that your child has accessed our Service and had cookies placed on their device, please contact us at info@resugrow.com and we will take steps to delete the relevant data.
                    </p>
                </section>

                <section>
                    <h2>11. Changes to This Cookie Policy</h2>
                    <p>
                        We may update this Cookie Policy from time to time to reflect changes in the Cookies we use, changes in technology, changes in applicable law, or other factors. When we make material changes to this Cookie Policy, we will update the &quot;Last Updated&quot; date at the top of this page and, where appropriate, notify you via email or through a prominent notice on the Service.
                    </p>
                    <p>
                        We encourage you to review this Cookie Policy periodically to stay informed about how we use Cookies and related technologies. Your continued use of the Service after the posting of changes constitutes your acceptance of the revised Cookie Policy.
                    </p>
                </section>

                <section>
                    <h2>12. Contact Us</h2>
                    <p>
                        If you have any questions, concerns, or requests regarding this Cookie Policy, our use of Cookies, or your cookie preferences, please contact us at:
                    </p>
                    <p>
                        <strong>Email:</strong> info@resugrow.com
                    </p>
                    <p>
                        We will respond to your inquiry within a reasonable time frame. For privacy-specific requests (e.g., data access, deletion, or correction), please refer to our <a href="/privacy-policy" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Privacy Policy</a> for detailed instructions on exercising your rights.
                    </p>
                </section>
            </div>
        </div>
    );
}
