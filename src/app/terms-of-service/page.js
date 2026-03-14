import styles from '../legal.module.css';

export const metadata = {
    title: 'Terms of Service | ResuGrow',
    description: 'Terms and conditions governing your use of ResuGrow\'s resume building platform.',
};

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
                        By accessing or using ResuGrow, you agree to be bound by these Terms of Service and all
                        applicable laws and regulations. If you do not agree with any of these terms, you are
                        prohibited from using or accessing this site.
                    </p>
                </section>

                <section>
                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily use the materials and software provided on
                        ResuGrow's website for personal, non-commercial use only (creating specific resumes
                        for your job search). This is the grant of a license, not a transfer of title.
                    </p>
                    <p>Under this license you may not:</p>
                    <ul>
                        <li>modify or copy our templates for resale;</li>
                        <li>use the materials for any commercial purpose, or for any public display;</li>
                        <li>attempt to decompile or reverse engineer any software contained on the site;</li>
                        <li>remove any copyright or other proprietary notations from the materials;</li>
                    </ul>
                </section>

                <section>
                    <h2>3. User Accounts</h2>
                    <p>
                        When you create an account with us, you must provide accurate, complete, and current
                        information. Failure to do so constitutes a breach of the Terms, which may result in
                        immediate termination of your account on our service. You are responsible for
                        safeguarding the password that you use to access the service.
                    </p>
                </section>

                <section>
                    <h2>4. AI-Generated Content</h2>
                    <p>
                        Our service utilizes artificial intelligence to suggest content for your resumes. While
                        we strive for accuracy, you acknowledge that AI-generated content may be inaccurate,
                        incomplete, or inappropriate for your specific situation. You are solely responsible for
                        reviewing, editing, and verifying any content added to your final resume before
                        submitting it to employers.
                    </p>
                </section>

                <section>
                    <h2>5. Disclaimer</h2>
                    <p>
                        The materials on ResuGrow's website are provided on an 'as is' basis. ResuGrow makes
                        no warranties, expressed or implied, and hereby disclaims and negates all other
                        warranties including, without limitation, implied warranties or conditions of
                        merchantability, fitness for a particular purpose, or non-infringement of intellectual
                        property or other violation of rights. We do not guarantee employment or interview
                        callbacks resulting from the use of our service.
                    </p>
                </section>

                <section>
                    <h2>6. Governing Law</h2>
                    <p>
                        These terms and conditions are governed by and construed in accordance with standard
                        commercial laws and you irrevocably submit to the exclusive jurisdiction of the courts
                        in that location.
                    </p>
                </section>

                <section>
                    <h2>7. Trademark & Performance Disclaimers</h2>
                    <p>
                        This site is not part of, or endorsed by, Facebook™ or Google™ or any social media platform in any way.
                        All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
                    </p>
                    <p>
                        FACEBOOK™ is a trademark of FACEBOOK™, Inc.<br/>
                        YOUTUBE™ and GOOGLE™ are trademarks of GOOGLE™ LLC.<br/>
                        LINKEDIN™ is a trademark of MICROSOFT™ Corporation.
                    </p>
                    <p>
                        Profile scores and review results may vary with each attempt or based on individual profiles. Resugrow does not guarantee job placements or interview opportunities. Our services are designed to optimize your profile for better visibility and recruiter engagement.
                    </p>
                </section>
            </div>
        </div>
    );
}
