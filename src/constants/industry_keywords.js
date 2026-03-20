/**
 * Exhaustive Dictionary mapping Industries and Roles to their specific keywords.
 * If a user selects "Product Management", the ATS scanner will specifically hunt
 * for these Product Management keywords to calculate the Hard Skills relevance score.
 */
export const INDUSTRY_MAPPINGS = {
  "Software Engineering (General)": ["Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Golang", "Rust", "Swift", "Kotlin", "PHP", "Ruby", "SQL", "React", "Next.js", "Node.js", "Vue", "Angular", "Express", "Django", "Flask", "Spring Boot", "Laravel", "Flutter"],
  "Frontend Development": ["UI", "User Interface", "Client-side", "React", "Vue", "Angular", "HTML5", "CSS3", "Next.js", "Svelte", "Tailwind CSS", "Redux", "Webpack", "Vite"],
  "Backend Development": ["Server-side", "Infrastructure", "Node.js", "Python", "Java", "Ruby", "Golang", "Microservices", "REST API", "GraphQL", "PostgreSQL", "MongoDB", "Redis"],
  "Mobile Development": ["iOS", "Android", "React Native", "Flutter", "Swift", "Kotlin", "Mobile-first", "Mobile UI", "App Store", "Google Play"],
  "Data Science": ["Predictive Modeling", "Statistical Analysis", "R", "Pandas", "NumPy", "Scikit-Learn", "Machine Learning", "Data Visualization", "Jupyter", "TensorFlow", "PyTorch"],
  "Data Engineering": ["ETL", "ELT", "Data Pipelines", "Data Warehouse", "Data Lake", "Snowflake", "Airflow", "dbt", "Spark", "Kafka", "Hadoop", "BigQuery", "Redshift"],
  "Machine Learning / AI": ["ML", "AI", "Deep Learning", "NLP", "Computer Vision", "Predictive Modeling", "TensorFlow", "PyTorch", "LLMS", "RAG", "Prompt Engineering"],
  "Cloud & DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Serverless", "CI/CD", "Jenkins", "GitHub Actions", "Nginx", "Linux", "IaC"],
  "Cybersecurity": ["InfoSec", "OAuth", "JWT", "Penetration Testing", "Encryption", "SOC2", "IAM", "Firewalls", "OpenSSL", "Vulnerability Management", "SIEM"],
  "UI/UX Design": ["User Interface", "User Experience", "Wireframing", "Prototyping", "Figma", "Sketch", "Adobe XD", "User Research", "Usability Testing", "Journey Mapping"],
  "Product Management": ["PM", "Roadmap", "Backlog Grooming", "Feature Prioritization", "Go-to-Market", "GTM", "Agile", "Scrum", "User Stories", "Stakeholder Management"],
  "Project Management / Agile": ["Scrum", "Kanban", "Sprints", "Jira", "Trello", "Stand-ups", "PMP", "Agile Methodology", "Risk Mitigation", "Resource Allocation"],
  "QA & Testing": ["Selenium", "Cypress", "Playwright", "Appium", "TestNG", "Automated Testing", "SDET", "QA", "Quality Assurance", "TDD", "Jest"],
  "System Architecture": ["Microservices", "Monolith", "Distributed Systems", "SOA", "Serverless", "Event-Driven", "Kafka", "RabbitMQ", "System Design"],
  "Database Administration": ["SQL", "NoSQL", "Postgres", "MongoDB", "MySQL", "RDBMS", "Data Persistence", "Database Tuning", "Oracle", "Cassandra", "Redis"],
  "Game Development": ["Unity", "Unreal Engine", "C#", "C++", "3D Modeling", "Shaders", "Gameplay Programming", "Godot"],
  "Embedded Systems": ["C", "C++", "RTOS", "Firmware", "Microcontrollers", "IoT", "Arduino", "Raspberry Pi", "PCB"],
  "Networking & IT": ["TCP/IP", "DNS", "DHCP", "VPN", "Firewalls", "Load Balancing", "BGP", "OSPF", "Cisco", "Routers"],
  "Healthcare IT": ["EHR", "EMR", "Epic", "Cerner", "HIPAA", "HL7", "FHIR", "Telehealth", "Informatics"],
  "Clinical Research": ["Clinical Trials", "FDA", "GCP", "Regulatory Affairs", "CRO", "Protocol Development", "EDC", "IRB"],
  "Nursing & Patient Care": ["Patient Care", "BLS", "ACLS", "Triage", "Charting", "Vital Signs", "Medication Administration", "EMR", "Registered Nurse", "RN", "BSN"],
  "Human Resources (HR)": ["HRIS", "Employee Relations", "Benefits Administration", "Payroll", "Compliance", "SHRM", "Onboarding", "Performance Management"],
  "Talent Acquisition / Recruiting": ["Recruiting", "Sourcing", "ATS", "Interviewing", "Onboarding", "Greenhouse", "Lever", "Workday", "Candidate Experience", "Pipeline Generation"],
  "Supply Chain & Logistics": ["Logistics", "Procurement", "Inventory Management", "Vendor Management", "Supply Planning", "ERP", "SAP", "Forecasting", "Fulfillment"],
  "Accounting & Audit": ["Bookkeeping", "GAAP", "IFRS", "Accounts Payable", "AP", "Accounts Receivable", "AR", "Reconciliation", "Tax Preparation", "Internal Audit", "Compliance", "SOX", "CPA"],
  "Finance (FP&A)": ["Financial Planning", "Forecasting", "Variance Analysis", "Financial Modeling", "Budgeting", "P&L", "ROI", "EBITDA", "Valuation"],
  "FinTech": ["Payment Gateways", "Stripe", "Plaid", "Blockchain", "Cryptocurrency", "DeFi", "Smart Contracts", "Ledger", "API Integrations"],
  "B2B Sales": ["Enterprise Sales", "SaaS Sales", "Outbound", "Cold Calling", "Lead Generation", "Prospecting", "SDR", "AE", "Quota Attainment", "Pipeline Generation", "Closing"],
  "Customer Success & CRM": ["CS", "Onboarding", "Retention", "Churn Reduction", "Account Management", "NPS", "CSAT", "Salesforce", "HubSpot", "Zendesk", "QBRs"],
  "Sales Operations": ["Sales Ops", "Forecasting", "Pipeline Management", "Sales Enablement", "Quota Attainment", "CRM Administration", "Sales Analytics"],
  "Marketing (General)": ["Campaigns", "Branding", "Go-to-Market", "GTM", "Market Research", "Product Marketing", "Positioning", "Messaging"],
  "SEO & Content Marketing": ["Search Engine Optimization", "On-page", "Off-page", "Link Building", "Keyword Research", "Ahrefs", "SEMrush", "Copywriting", "Blogging", "Content Strategy", "CMS", "WordPress"],
  "Paid Media & Growth": ["Google Ads", "PPC", "Facebook Ads", "Meta Ads", "Media Buying", "ROAS", "CPC", "CPA", "A/B Testing", "Conversion Rate Optimization", "CRO", "Funnel Optimization", "User Acquisition"],
  "Analytics & Business Intelligence": ["Google Analytics", "GA4", "Mixpanel", "Amplitude", "Tag Manager", "GTM", "Tracking", "BI", "Tableau", "Power BI", "Looker", "Dashboards", "Data Visualization", "SQL"],
  "Executive & Leadership": ["P&L Responsibility", "Strategic Planning", "Board of Directors", "M&A", "Mergers and Acquisitions", "Cross-functional Leadership", "Stakeholder Management", "Resource Allocation", "Risk Mitigation", "Organizational Design"]
};
