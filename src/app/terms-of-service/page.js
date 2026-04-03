import styles from '../legal.module.css';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Terms of Service | RESUGROW',
    description: 'Read the terms and conditions for using RESUGROW services and tools.',
    path: '/terms-of-service',
    keywords: ['terms of service', 'terms and conditions', 'RESUGROW terms']
});

export default function TermsOfService() {
    return (
        <div className={styles.legalContainer}>
            <div className={styles.legalHeader}>
                <h1 className={styles.legalTitle}>Terms of Service</h1>
                <p className={styles.legalSubtitle}>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            <div className={styles.legalContent}>
                <section>
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and ResuGrow (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), governing your access to and use of the ResuGrow website, platform, mobile applications, application programming interfaces (APIs), and all related services (collectively, the &quot;Service&quot;).
                    </p>
                    <p>
                        By creating an account, accessing, or using any part of the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are accessing the Service on behalf of a business, organization, or other entity, you represent and warrant that you have the authority to bind that entity to these Terms, and &quot;you&quot; and &quot;your&quot; will refer to that entity. If you do not agree with any provision of these Terms, you must immediately discontinue use of the Service.
                    </p>
                    <p>
                        We reserve the right to modify these Terms at any time. Material changes will be communicated by posting the revised Terms on our website and updating the &quot;Last Updated&quot; date above. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms. We encourage you to review this page periodically to stay informed.
                    </p>
                </section>

                <section>
                    <h2>2. Eligibility</h2>
                    <p>
                        To use the Service, you must be at least 16 years of age. By agreeing to these Terms, you represent and warrant that you are at least 16 years old and have the legal capacity to enter into a binding agreement. If you are under 18 years of age, you may only use the Service with the involvement and consent of a parent or legal guardian, and that parent or guardian must agree to these Terms on your behalf.
                    </p>
                    <p>
                        The Service is not available to users who have been previously suspended or removed from the platform. By using the Service, you also represent that you are not located in a country subject to a U.S. government embargo or that has been designated by the U.S. government as a &quot;terrorist-supporting&quot; country, and you are not listed on any U.S. government list of prohibited or restricted parties.
                    </p>
                </section>

                <section>
                    <h2>3. Account Registration and Security</h2>
                    <p>
                        To access certain features of the Service, you must register for an account. When you register, you agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. Providing false, inaccurate, or misleading information constitutes a breach of these Terms and may result in immediate termination of your account.
                    </p>
                    <p>
                        You are solely responsible for safeguarding the confidentiality of your account credentials, including your password, and for any and all activity that occurs under your account. You agree to notify us immediately at info@resugrow.com of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to protect your account credentials.
                    </p>
                    <p>
                        You may not share your account credentials with any third party, create more than one account per individual, or create an account for anyone other than yourself without that person&apos;s explicit permission. We reserve the right to suspend or terminate accounts that we reasonably believe are being shared or operated in violation of these Terms.
                    </p>
                </section>

                <section>
                    <h2>4. Description of the Service</h2>
                    <p>
                        ResuGrow provides an AI-powered career development platform that includes, but is not limited to, the following features and tools:
                    </p>
                    <ul>
                        <li><strong>AI Resume Builder:</strong> A tool that assists users in creating professional, ATS-optimized resumes using artificial intelligence. Users can select from a library of professionally designed templates, input their career history and skills, and receive AI-generated content suggestions.</li>
                        <li><strong>ATS Resume Checker:</strong> An automated scanning tool that analyzes uploaded resume PDFs against real-world Applicant Tracking System (ATS) algorithms, providing a compatibility score, keyword gap analysis, and actionable optimization recommendations.</li>
                        <li><strong>LinkedIn Profile Review:</strong> A tool that analyzes a user&apos;s official LinkedIn PDF export, scoring the profile across multiple dimensions including headline quality, summary effectiveness, experience depth, and keyword optimization.</li>
                        <li><strong>AI SAR Bullet Rewriter:</strong> An advanced tool that rewrites accomplishment statements using the Situation-Action-Result (SAR) methodology, enhanced by AI to produce high-impact, quantified bullet points.</li>
                        <li><strong>Interview Question Generator:</strong> An AI-powered simulator that generates role-specific behavioral and technical interview questions based on a user&apos;s target position and industry.</li>
                        <li><strong>LinkedIn Content Studio:</strong> A tool that assists users in generating professional LinkedIn posts, articles, and content optimized for engagement and recruiter visibility.</li>
                        <li><strong>Salary Negotiation Coach:</strong> An analytical tool that provides data-driven salary insights, negotiation strategies, and personalized coaching based on role, experience, and market data.</li>
                        <li><strong>Cover Letter Builder:</strong> A tool for generating tailored cover letters matched to specific job descriptions.</li>
                        <li><strong>Shareable Resume Links:</strong> The ability to generate a unique, publicly accessible URL for your resume, enabling you to share your professional profile with recruiters and employers.</li>
                    </ul>
                    <p>
                        We reserve the right to modify, suspend, or discontinue any feature of the Service at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
                    </p>
                </section>

                <section>
                    <h2>5. Use License and Restrictions</h2>
                    <p>
                        Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Service for your personal, non-commercial career development purposes. This is the grant of a license, not a transfer of title.
                    </p>
                    <p>Under this license, you expressly agree that you will not:</p>
                    <ul>
                        <li>Reproduce, modify, distribute, sell, lease, or create derivative works based on our templates, designs, algorithms, or proprietary content for any commercial purpose or public display.</li>
                        <li>Attempt to decompile, disassemble, reverse engineer, or otherwise attempt to derive the source code or underlying algorithms of any software, technology, or AI models used in the Service.</li>
                        <li>Remove, alter, or obscure any copyright, trademark, or other proprietary notices from any portion of the Service.</li>
                        <li>Use the Service to create competing products, services, or benchmarks, or for any purpose that is unlawful, harmful, or otherwise objectionable.</li>
                        <li>Use automated means, including bots, scrapers, crawlers, or other automated tools, to access, collect data from, or interact with the Service without our prior written consent.</li>
                        <li>Interfere with or disrupt the integrity or performance of the Service, its servers, or its connected networks.</li>
                        <li>Attempt to gain unauthorized access to any part of the Service, other user accounts, or computer systems or networks connected to the Service.</li>
                        <li>Upload, transmit, or distribute any viruses, malware, or other malicious code through the Service.</li>
                        <li>Use the Service to generate, store, or transmit content that is defamatory, threatening, harassing, obscene, or otherwise unlawful.</li>
                        <li>Impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity.</li>
                    </ul>
                    <p>
                        Any violation of these restrictions may result in the immediate revocation of your license, termination of your account, and may expose you to civil and/or criminal liability.
                    </p>
                </section>

                <section>
                    <h2>6. User Content and Intellectual Property</h2>
                    <h3>A. Your Content</h3>
                    <p>
                        You retain full ownership of all personal career information, text, and data that you input into the Service (&quot;User Content&quot;). By submitting User Content, you grant ResuGrow a worldwide, non-exclusive, royalty-free, sublicensable license to use, process, store, reproduce, and display your User Content solely for the following purposes: (a) providing and improving the Service; (b) generating AI-powered suggestions and content for your use; and (c) creating anonymized, aggregated datasets for the purpose of improving our algorithms and services. This license terminates when you delete your User Content or account, except for anonymized data that can no longer be associated with you.
                    </p>
                    <h3>B. Our Content</h3>
                    <p>
                        The Service, including its entire visual design, user interface, original content, features, functionality, branding, logos, graphics, resume templates, cover letter templates, AI algorithms, scoring methodologies, and software code, is and shall remain the exclusive property of ResuGrow and its licensors. The Service is protected by copyright, trademark, trade dress, patent, trade secret, and other intellectual property laws of the United States and international jurisdictions.
                    </p>
                    <h3>C. Feedback</h3>
                    <p>
                        If you provide us with any feedback, suggestions, ideas, or recommendations regarding the Service (&quot;Feedback&quot;), you hereby assign to us all rights, title, and interest in such Feedback and agree that we are free to use and implement the Feedback for any purpose without compensation or attribution to you.
                    </p>
                </section>

                <section>
                    <h2>7. AI-Generated Content</h2>
                    <p>
                        Certain features of the Service utilize artificial intelligence and machine learning models, including third-party AI providers (e.g., OpenAI), to generate, suggest, optimize, and analyze content including but not limited to resume bullet points, cover letter text, interview questions, LinkedIn posts, and salary recommendations (&quot;AI-Generated Content&quot;).
                    </p>
                    <p>
                        You understand, acknowledge, and expressly agree to the following:
                    </p>
                    <ul>
                        <li><strong>No Guarantee of Accuracy:</strong> AI-Generated Content is produced by machine learning models and may contain errors, inaccuracies, biases, or information that is incomplete, outdated, or inappropriate for your specific professional context. We do not warrant the accuracy, completeness, reliability, or suitability of any AI-Generated Content.</li>
                        <li><strong>Your Responsibility:</strong> You are solely and exclusively responsible for reviewing, editing, fact-checking, and verifying all AI-Generated Content before incorporating it into your final resume, cover letter, LinkedIn profile, or any other professional document. You assume all risk associated with using AI-Generated Content.</li>
                        <li><strong>No Professional Advice:</strong> AI-Generated Content does not constitute professional career counseling, legal advice, financial advice, or employment advice. Salary data and negotiation recommendations are for informational purposes only and should not be relied upon as a sole basis for career or financial decisions.</li>
                        <li><strong>Non-Uniqueness:</strong> AI-Generated Content may not be unique. Similar or identical content may be generated for other users who provide similar inputs. You should customize and personalize all AI-Generated Content to reflect your authentic professional experience.</li>
                        <li><strong>No Employment Guarantee:</strong> The use of AI-Generated Content or any feature of the Service does not guarantee employment, job interviews, callbacks, salary increases, or any specific career outcome.</li>
                    </ul>
                </section>

                <section>
                    <h2>8. Publicly Shared Resumes</h2>
                    <p>
                        The Service may allow you to generate a shareable, publicly accessible URL for your resume. By choosing to create and publish a shareable resume link, you understand and agree that:
                    </p>
                    <ul>
                        <li>The information contained in your shared resume will be publicly accessible to anyone with the link, including search engines, recruiters, and third parties.</li>
                        <li>We have no control over how third parties who access your shared resume may use, copy, distribute, or store your information.</li>
                        <li>You are solely responsible for the content you choose to include in your shared resume and for deciding whether to share it publicly.</li>
                        <li>You may deactivate your shareable link at any time through your dashboard. However, we cannot guarantee the removal of content that has already been accessed, cached, or copied by third parties.</li>
                    </ul>
                </section>

                <section>
                    <h2>9. Payment Terms</h2>
                    <h3>A. Pricing</h3>
                    <p>
                        Certain features of the Service may be offered on a paid basis (&quot;Premium Services&quot;). All prices are displayed on our website and are subject to change. We will provide reasonable notice of any price changes before they take effect for existing subscribers.
                    </p>
                    <h3>B. Payment Processing</h3>
                    <p>
                        All payments are processed securely through our third-party payment processors (e.g., Stripe, PayPal). We do not store, collect, or have access to your full credit card numbers. By providing payment information, you represent and warrant that you are authorized to use the designated payment method. You agree to pay all charges at the prices listed for the features you select.
                    </p>
                    <h3>C. Billing and Renewals</h3>
                    <p>
                        Subscription-based Premium Services are billed on a recurring basis (monthly or annually, as selected). Your subscription will automatically renew at the end of each billing cycle unless you cancel before the renewal date. You may cancel your subscription at any time through your account settings.
                    </p>
                    <h3>D. Refund Policy</h3>
                    <p>
                        Refund eligibility is determined on a case-by-case basis. If you believe you are entitled to a refund, please contact us at info@resugrow.com within 14 days of your purchase. We reserve the right to refuse refunds where the Service has been meaningfully accessed or used.
                    </p>
                </section>

                <section>
                    <h2>10. Prohibited Conduct</h2>
                    <p>
                        In addition to the restrictions outlined in Section 5, you agree not to engage in any of the following prohibited activities:
                    </p>
                    <ul>
                        <li>Using the Service for any fraudulent purpose, including but not limited to fabricating work experience, educational credentials, or professional qualifications on your resume or other documents.</li>
                        <li>Spamming, phishing, or sending unsolicited communications through or in connection with the Service.</li>
                        <li>Harvesting or collecting email addresses or other personal information of other users from the Service.</li>
                        <li>Using the Service to violate the intellectual property rights of any third party.</li>
                        <li>Circumventing, disabling, or otherwise interfering with any security-related features of the Service or features that prevent or restrict use or copying of any content.</li>
                        <li>Creating multiple free accounts to circumvent usage limits or obtain additional free services.</li>
                        <li>Reselling, sublicensing, or offering access to the Service to third parties without our explicit written authorization.</li>
                    </ul>
                </section>

                <section>
                    <h2>11. Termination</h2>
                    <p>
                        We may suspend or terminate your account and access to the Service at any time, with or without cause, and with or without notice, including but not limited to situations where we reasonably believe you have violated these Terms. Upon termination, your right to use the Service will immediately cease.
                    </p>
                    <p>
                        You may terminate your account at any time by contacting us at info@resugrow.com or through the account settings page. Upon termination, your data will be handled in accordance with our Privacy Policy, which generally provides for a 30-day grace period before permanent deletion.
                    </p>
                    <p>
                        The following sections shall survive termination of these Terms: Sections 6 (User Content and IP), 7 (AI-Generated Content), 12 (Disclaimer of Warranties), 13 (Limitation of Liability), 14 (Indemnification), and 16 (Governing Law and Dispute Resolution).
                    </p>
                </section>

                <section>
                    <h2>12. Disclaimer of Warranties</h2>
                    <p>
                        THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, RESUGROW EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
                    </p>
                    <p>
                        WITHOUT LIMITING THE FOREGOING, WE MAKE NO WARRANTY OR REPRESENTATION THAT: (A) THE SERVICE WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS; (B) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (C) THE RESULTS OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE, RELIABLE, OR SATISFACTORY; (D) ANY ERRORS IN THE SERVICE WILL BE CORRECTED; OR (E) THE USE OF AI-GENERATED CONTENT WILL RESULT IN EMPLOYMENT, INTERVIEWS, OR ANY SPECIFIC CAREER OUTCOME.
                    </p>
                    <p>
                        YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM RESUGROW OR THROUGH THE SERVICE SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS.
                    </p>
                </section>

                <section>
                    <h2>13. Limitation of Liability</h2>
                    <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL RESUGROW, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, AFFILIATES, SUCCESSORS, OR ASSIGNS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, REVENUE, GOODWILL, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE SERVICE, REGARDLESS OF THE THEORY OF LIABILITY (WHETHER IN CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE), EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                    </p>
                    <p>
                        IN NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE OF THE SERVICE EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT YOU HAVE PAID TO US IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR (B) ONE HUNDRED U.S. DOLLARS ($100.00).
                    </p>
                    <p>
                        SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN WARRANTIES OR LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES. IN SUCH JURISDICTIONS, OUR LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
                    </p>
                </section>

                <section>
                    <h2>14. Indemnification</h2>
                    <p>
                        You agree to defend, indemnify, and hold harmless ResuGrow, its officers, directors, employees, contractors, agents, licensors, and suppliers from and against any and all claims, damages, obligations, losses, liabilities, costs, debts, and expenses (including but not limited to attorney&apos;s fees) arising from: (a) your use of the Service; (b) your violation of any provision of these Terms; (c) your violation of any third-party right, including any intellectual property right or privacy right; (d) any claim that your User Content caused damage to a third party; or (e) any misrepresentation of your credentials or professional qualifications in content created using the Service.
                    </p>
                    <p>
                        This defense and indemnification obligation will survive the termination of these Terms and your use of the Service.
                    </p>
                </section>

                <section>
                    <h2>15. Third-Party Services and Links</h2>
                    <p>
                        The Service may contain links to third-party websites, services, or resources that are not owned or controlled by ResuGrow, including but not limited to payment processors (Stripe, PayPal), cloud hosting providers (Amazon Web Services, Vercel), AI model providers (OpenAI), analytics providers (Google Analytics), and social media platforms (LinkedIn, Facebook, Twitter/X).
                    </p>
                    <p>
                        We do not endorse and are not responsible for the content, privacy policies, practices, availability, or accuracy of any third-party websites or services. Your interactions with any third-party service are governed solely by that third party&apos;s terms and policies. We strongly encourage you to read the terms and privacy policies of any third-party services you access.
                    </p>
                </section>

                <section>
                    <h2>16. Governing Law and Dispute Resolution</h2>
                    <h3>A. Governing Law</h3>
                    <p>
                        These Terms and any dispute arising out of or related to these Terms or the Service shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
                    </p>
                    <h3>B. Informal Resolution</h3>
                    <p>
                        Before initiating any formal dispute resolution proceeding, you agree to first contact us at info@resugrow.com and attempt to resolve the dispute informally. We agree to make good-faith efforts to resolve any disagreement within 30 days of receipt of your written notice.
                    </p>
                    <h3>C. Binding Arbitration</h3>
                    <p>
                        If the dispute cannot be resolved informally, you and ResuGrow agree that any dispute, claim, or controversy arising out of or relating to these Terms or the Service shall be settled by binding arbitration, rather than in court. Arbitration shall be administered under the rules of the American Arbitration Association (AAA). The arbitration shall be conducted in the English language, and the arbitrator&apos;s decision shall be final and binding.
                    </p>
                    <h3>D. Class Action Waiver</h3>
                    <p>
                        YOU AND RESUGROW AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, REPRESENTATIVE, OR CONSOLIDATED ACTION. THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON&apos;S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A CLASS OR REPRESENTATIVE PROCEEDING.
                    </p>
                </section>

                <section>
                    <h2>17. Trademark &amp; Performance Disclaimers</h2>
                    <p>
                        This site is not part of, or endorsed by, Facebook™, Google™, LinkedIn™, or any social media or technology platform in any way. All product names, logos, and brands are property of their respective owners. All company, product, and service names used on this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
                    </p>
                    <p>
                        FACEBOOK™ is a trademark of Meta Platforms, Inc.<br/>
                        YOUTUBE™ and GOOGLE™ are trademarks of Google LLC.<br/>
                        LINKEDIN™ is a trademark of Microsoft Corporation.<br/>
                        TWITTER™/X™ is a trademark of X Corp.
                    </p>
                    <p>
                        ATS scores, resume compatibility ratings, LinkedIn profile scores, salary estimates, and all other analytical results generated by the Service are based on algorithmic analysis and may vary with each attempt, based on input quality, and across updates to our models. ResuGrow does not guarantee job placements, interview invitations, salary increases, or any specific career outcome. Our services are designed to optimize your professional documents and profiles for better visibility and recruiter engagement, but hiring decisions remain solely with employers.
                    </p>
                </section>

                <section>
                    <h2>18. Severability</h2>
                    <p>
                        If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, shall be severed from these Terms. The remaining provisions shall continue in full force and effect.
                    </p>
                </section>

                <section>
                    <h2>19. Entire Agreement</h2>
                    <p>
                        These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and ResuGrow regarding the use of the Service and supersede all prior agreements, communications, and understandings, whether written or oral, relating to the subject matter hereof.
                    </p>
                </section>

                <section>
                    <h2>20. Waiver</h2>
                    <p>
                        No waiver by ResuGrow of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition. Any failure by ResuGrow to assert a right or to enforce a provision under these Terms shall not constitute a waiver of such right or provision.
                    </p>
                </section>

                <section>
                    <h2>21. Assignment</h2>
                    <p>
                        You may not assign or transfer these Terms, or any rights or obligations hereunder, without the prior written consent of ResuGrow. ResuGrow may freely assign these Terms without restriction. Any attempted assignment in violation of this section shall be null and void.
                    </p>
                </section>

                <section>
                    <h2>22. Contact Us</h2>
                    <p>
                        If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us at:
                        <br />
                        <strong>Email:</strong> info@resugrow.com
                    </p>
                </section>
            </div>
        </div>
    );
}
