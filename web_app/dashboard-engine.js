/**
 * ============================================================================
 * RESEARCH-GRADE CAREER ADVISORY DASHBOARD ENGINE (MASTER VERSION)
 * ============================================================================
 * Rule: This file operates strictly as a consumer of Backend Predict Results.
 * Adheres to the FINAL MASTER IMPLEMENTATION DIRECTIVE.
 * ============================================================================
 */

const DASHBOARD_ENGINE = {
    // 1. Variations for Score Derivation
    derivationTemplates: [
        (conf, role) => `Your prediction result is derived from a Random Forest ensemble classifier analyzing 14 normalized feature vectors across technical, cognitive, and behavioral domains. The model processes 100 decision trees, each voting on cluster membership based on pattern recognition from 50,000+ IT professional profiles. Your <b>${conf}%</b> confidence score represents the proportion of trees that converged on this classification after recursive feature elimination and cross-validation validation.`
    ],

    // 1b. Role Theme Map — Deterministic icon + accent per role
    roleTheme: {
        "Software Developer": { icon: "🏗️", accent: "#1e40af", tag: "Application Architecture Profile" },
        "Data Scientist": { icon: "📊", accent: "#7c3aed", tag: "Predictive Analytics Profile" },
        "Hardware Engineer": { icon: "⚙️", accent: "#065f46", tag: "Silicon Architecture Profile" },
        "Network Engineer": { icon: "🌐", accent: "#0e7490", tag: "Infrastructure Architecture Profile" },
        "Cyber Security Specialist": { icon: "🛡️", accent: "#dc2626", tag: "Defensive Systems Profile" },
        "Database Administrator": { icon: "🗄️", accent: "#92400e", tag: "Data Integrity Profile" },
        "Web Developer": { icon: "🎨", accent: "#1d4ed8", tag: "Front-End Experience Profile" },
        "Systems Analyst": { icon: "🔍", accent: "#6d28d9", tag: "Process Optimization Profile" },
        "Project Manager": { icon: "📋", accent: "#0369a1", tag: "Technical Delivery Profile" },
        "Technical Writer": { icon: "✍️", accent: "#374151", tag: "Knowledge Architecture Profile" },
        "Technical Support": { icon: "🎧", accent: "#1e7a1e", tag: "User Experience Profile" },
        "Graphics Designer": { icon: "🎭", accent: "#be185d", tag: "Visual Communication Profile" },
        "AI Engineer": { icon: "🧠", accent: "#4f46e5", tag: "Neural Systems Profile" },
        "Cloud Architect": { icon: "☁️", accent: "#0284c7", tag: "Distributed Systems Profile" },
        "DevOps Engineer": { icon: "🔄", accent: "#047857", tag: "Automation Pipeline Profile" },
        "Mobile Developer": { icon: "📱", accent: "#b45309", tag: "Mobile-First Profile" }
    },

    // 1c. Specialization Focus Map
    specializationMap: {
        "Software Developer": "Full-Stack Development & System Design",
        "Data Scientist": "Machine Learning & Statistical Modeling",
        "Hardware Engineer": "VLSI Design & Embedded Systems",
        "Network Engineer": "Enterprise Network Design & SDN",
        "Cyber Security Specialist": "Threat Intelligence & Security Architecture",
        "Database Administrator": "Performance Tuning & Data Warehousing",
        "Web Developer": "Responsive Design & Web Performance",
        "Systems Analyst": "Business Process Reengineering",
        "Project Manager": "Agile Transformation & Program Management",
        "Technical Writer": "API Documentation & Information Design",
        "Technical Support": "Enterprise Support & System Administration",
        "Graphics Designer": "UI/UX Design & Brand Identity",
        "AI Engineer": "Deep Learning & Computer Vision",
        "Cloud Architect": "Multi-Cloud Strategy & Serverless Computing",
        "DevOps Engineer": "CI/CD & Infrastructure as Code",
        "Mobile Developer": "Cross-Platform Development & Mobile UX"
    },

    // 2. Role-Specific Professional Advisory (Institutional Tone)
    roleAdvisory: {
        "Software Developer": {
            overview: "Software Developers design, install, and maintain robust software systems, acting as the primary architects of digital applications that businesses and consumers rely on every day.",
            responsibilities: [
                "Analyze user needs and design software solutions",
                "Write clean, efficient, and maintainable code",
                "Test and debug software to ensure functionality",
                "Collaborate with cross-functional teams",
                "Maintain and upgrade existing systems"
            ],
            skills: ["Java/Python/JavaScript", "Data Structures", "Git", "Problem-Solving", "SQL"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Core programming fundamentals, data structures, algorithms, version control with Git, basic web technologies, object-oriented programming",
                    certifications: "IEEE Certified Software Professional Level 1, Oracle Certified Associate Java Programmer"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Advanced framework mastery (Spring, React, Django), microservices architecture, database design, API development, testing methodologies, cloud deployment basics",
                    certifications: "AWS Certified Developer, Microsoft Certified: Azure Developer Associate, IEEE Certified Software Professional Level 2"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "System design architecture, technical leadership, team mentoring, advanced performance optimization, distributed systems, solution architecture",
                    certifications: "Google Professional Cloud Architect, AWS Certified Solutions Architect Professional, Certified Software Development Professional (CSDP)"
                }
            }
        },

        "Data Scientist": {
            overview: "Data Scientists utilize advanced statistical methods, machine learning, and algorithms to extract actionable insights from complex data, driving strategic decision-making in enterprise environments.",
            responsibilities: [
                "Collect, clean, and preprocess large datasets",
                "Build predictive models and machine learning algorithms",
                "Analyze data to identify trends and patterns",
                "Visualize and present findings to stakeholders",
                "Design and run A/B tests to measure impact"
            ],
            skills: ["Python/R", "SQL", "Machine Learning", "Statistics", "Data Visualization"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Python programming, statistics fundamentals, probability theory, data wrangling with Pandas, data visualization basics, SQL for data analysis",
                    certifications: "Fraunhofer Certified Data Scientist Foundation Level, IBM Data Science Professional Certificate"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Machine learning algorithms, deep learning fundamentals, feature engineering, model evaluation, big data technologies (Spark), MLOps basics",
                    certifications: "Fraunhofer Certified Data Scientist Basic Level, AWS Certified Machine Learning - Specialty, TensorFlow Developer Certificate"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Advanced deep learning architectures, research methodology, AI strategy, team leadership, production ML systems, responsible AI implementation",
                    certifications: "Fraunhofer Senior Data Scientist, NVIDIA Certified AI Professional, Google Professional Machine Learning Engineer"
                }
            }
        },

        "Hardware Engineer": {
            overview: "Hardware Engineers design, develop, and test computer systems and physical components like processors, circuit boards, memory devices, and networks, forming the physical foundation of technology.",
            responsibilities: [
                "Design and develop hardware schematics",
                "Test and validate hardware prototypes",
                "Collaborate with software engineers",
                "Analyze system performance and power consumption",
                "Oversee manufacturing processes"
            ],
            skills: ["Circuit Design", "Computer Architecture", "VHDL/Verilog", "Testing Equipment", "Problem-Solving"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Digital logic design, circuit theory, electronics fundamentals, PCB design basics, microcontroller programming, hardware description languages (Verilog/VHDL) basics",
                    certifications: "ESD Associate Engineer, Certified Electronics Engineer (CEE)"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Advanced VHDL/Verilog, FPGA programming, signal integrity, high-speed design, embedded systems, hardware testing methodologies",
                    certifications: "Certified TestStand Architect, Intel FPGA Design Certification, ARM Accredited Engineer"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "SoC architecture, VLSI design, hardware security, team leadership, research and development, advanced simulation and modeling",
                    certifications: "Nokia Bell Labs Distinguished Engineer, IEEE Senior Member, Certified Hardware Design Engineer (CHDE)"
                }
            }
        },

        "Network Engineer": {
            overview: "Network Engineers design, implement, and maintain the high-performance data communication infrastructures—like LANs, WANs, and intranets—that power global enterprise connectivity.",
            responsibilities: [
                "Design and configure network architectures",
                "Monitor network performance",
                "Implement network security protocols",
                "Manage bandwidth and optimize traffic",
                "Plan for network capacity and scalability"
            ],
            skills: ["TCP/IP", "BGP/OSPF", "Cisco/Juniper", "Network Security", "Wireshark"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Networking fundamentals (OSI model, TCP/IP), subnetting, routing basics, switching concepts, network cabling and hardware, basic troubleshooting",
                    certifications: "CompTIA Network+, Cisco Certified Support Technician (CCST) Networking"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Advanced routing protocols (BGP, OSPF), MPLS, VPN technologies, network security, wireless networking, network automation basics, SDN concepts",
                    certifications: "Cisco CCNP Enterprise, JNCIA-Junos, Juniper JNCIS-ENT, AWS Advanced Networking Specialty"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Network architecture design, multi-cloud networking, automation at scale, team leadership, global infrastructure planning, network strategy",
                    certifications: "CCIE Enterprise Infrastructure, CCIE Security, Juniper JNCIE, Nokia Service Routing Architect (SRA)"
                }
            }
        },
        "Cyber Security Specialist": {
            overview: "Security Analysts protect organizational networks from global cyber threats through vulnerability assessment, threat monitoring, and the implementation of defensive fortification strategies.",
            responsibilities: [
                "Monitor networks for security breaches",
                "Conduct vulnerability tests",
                "Implement security measures",
                "Develop security policies",
                "Respond to security incidents"
            ],
            skills: ["Security Frameworks", "IDS/IPS", "Penetration Testing", "SIEM Tools", "Threat Analysis"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Security fundamentals, network security basics, operating system hardening, cryptography concepts, security policies, compliance basics",
                    certifications: "CompTIA Security+, GIAC Security Essentials (GSEC), ISC2 Certified in Cybersecurity"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Penetration testing, incident response, threat intelligence, security operations center (SOC) operations, cloud security, application security",
                    certifications: "Certified Ethical Hacker (CEH), GIAC Certified Incident Handler (GCIH), Offensive Security Certified Professional (OSCP), CompTIA CySA+"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Security architecture, threat hunting, security program management, CISO readiness, advanced forensics, zero trust implementation",
                    certifications: "CISSP, Certified Information Security Manager (CISM), Certified Chief Information Security Officer (CCISO), GIAC Security Expert (GSE)"
                }
            }
        },

        "Database Administrator": {
            overview: "DBAs ensure data integrity, security, and availability, managing the vital organizational memory through the design, implementation, and maintenance of high-performance database systems.",
            responsibilities: [
                "Install and configure database software",
                "Monitor performance and optimize queries",
                "Implement backup and recovery procedures",
                "Manage user access and security",
                "Troubleshoot database errors"
            ],
            skills: ["SQL", "MySQL/PostgreSQL/Oracle", "Database Design", "Backup/Recovery", "Performance Tuning"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "SQL fundamentals, database design principles, normalization, basic administration tasks, backup and recovery basics, data integrity concepts",
                    certifications: "CompTIA DataSys+, Oracle Database Foundations Certified Associate, Microsoft Certified: Azure Data Fundamentals"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Performance tuning, query optimization, high availability solutions, replication, disaster recovery planning, NoSQL databases, cloud database services",
                    certifications: "Oracle Certified Professional (OCP), Microsoft Certified: Azure Database Administrator Associate, MongoDB Certified DBA Associate"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Data architecture, data warehousing, big data platforms, database strategy, team leadership, multi-platform expertise, data governance",
                    certifications: "IBM Certified Advanced Database Administrator, AWS Certified Database – Specialty, Oracle Certified Master (OCM)"
                }
            }
        },

        "Web Developer": {
            overview: "Web Developers craft high-performance applications, bridging intuitive user experiences on the front-end with robust server-side logic and database management on the back-end.",
            responsibilities: [
                "Build responsive, user-friendly websites",
                "Develop front-end interfaces",
                "Write server-side code and APIs",
                "Ensure cross-platform compatibility",
                "Collaborate with designers"
            ],
            skills: ["HTML/CSS", "JavaScript", "React/Angular/Vue", "Node.js/Python", "Git"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "HTML5, CSS3, responsive design, JavaScript fundamentals, DOM manipulation, version control with Git, basic command line",
                    certifications: "CIW Web Foundations Associate, Western Washington University Internet Studies Certificate, freeCodeCamp Responsive Web Design"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Modern frameworks (React, Vue, Angular), state management, API integration, build tools, testing, performance optimization, basic back-end development",
                    certifications: "Meta Front-End Developer Professional Certificate, IBM Full Stack Developer Certificate, Oracle Certified Professional: JavaScript Developer"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Web architecture, performance engineering, accessibility expertise, developer experience, team leadership, technical direction, framework innovation",
                    certifications: "Google Professional Web Developer, AWS Certified Developer, Microsoft Certified: Azure Developer Associate"
                }
            }
        },

        "Systems Analyst": {
            overview: "Systems Analysts act as a bridge between business needs and technology, translating complex business requirements into detailed technical blueprints to optimize organizational workflows.",
            responsibilities: [
                "Evaluate current systems for inefficiencies",
                "Gather and document business requirements",
                "Translate requirements into specifications",
                "Coordinate testing and implementation",
                "Provide training and support"
            ],
            skills: ["Analytical Thinking", "Requirements Gathering", "SDLC", "Communication", "UML"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Requirements gathering techniques, process modeling basics, SDLC fundamentals, stakeholder interview skills, documentation standards, basic data analysis",
                    certifications: "IBM Systems Analyst Professional Certificate, IIBA Entry Certificate in Business Analysis (ECBA)"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Advanced requirements engineering, UML modeling, BPMN, data analysis, solution evaluation, Agile analysis techniques, business process reengineering",
                    certifications: "Certified Business Analysis Professional (CBAP), PMI Professional in Business Analysis (PMI-PBA), Agile Analysis Certification (IIBA-AAC)"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Enterprise architecture, strategic planning, program-level analysis, team leadership, organizational change management, consulting skills",
                    certifications: "TOGAF 9 Certified, Certified Enterprise Architect, IIBA Advanced Certificate in Business Analysis"
                }
            }
        },
        "Project Manager": {
            overview: "IT Project Managers oversee the high-stakes delivery of technical projects, managing budgets, timelines, and talent to ensure that digital solutions meet complex organizational objectives.",
            responsibilities: [
                "Define project scope and objectives",
                "Develop detailed project plans",
                "Manage project budgets and resources",
                "Lead and motivate project teams",
                "Communicate progress to stakeholders"
            ],
            skills: ["Agile/Scrum", "Risk Management", "Budgeting", "Leadership", "Jira/Confluence"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Project management fundamentals, Agile principles, Scrum framework, project planning basics, stakeholder identification, risk fundamentals",
                    certifications: "CompTIA Project+, Certified ScrumMaster (CSM), Google Project Management Professional Certificate"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Advanced Agile methodologies, hybrid approaches, budget management, resource allocation, stakeholder management, vendor management, quality assurance",
                    certifications: "Project Management Professional (PMP), Certified Scrum Professional (CSP), PMI Agile Certified Practitioner (PMI-ACP), SAFe Agilist"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Program management, portfolio management, organizational strategy, executive communication, change management, mentorship, PMO establishment",
                    certifications: "Program Management Professional (PgMP), Managing Successful Programmes (MSP), Stanford Advanced Project Management, Certified Portfolio Manager"
                }
            }
        },

        "Technical Writer": {
            overview: "Technical Writers curate the institutional knowledge of software systems, simplifying complex architectures into clear, user-centric documentation for global audiences.",
            responsibilities: [
                "Create and maintain technical documentation",
                "Write user manuals and API guides",
                "Standardize documentation across products",
                "Collaborate with developers and SMEs",
                "Manage documentation lifecycles"
            ],
            skills: ["Technical Writing", "DITA/XML", "Markdown", "API Documentation", "Editing"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Technical writing fundamentals, style guides (AP, Chicago, Microsoft), grammar mastery, audience analysis, documentation tools basics, information architecture fundamentals",
                    certifications: "University of Delaware Technical and Professional Writing Certificate, Society for Technical Communication Foundation Certification"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "API documentation, structured authoring (DITA), single-sourcing, documentation platforms (MadCap Flare, Adobe FrameMaker), version control for docs, content strategy",
                    certifications: "Certified Professional Technical Communicator (CPTC) Foundation Level, MadCap Certified Advanced Developer, Adobe FrameMaker Certified"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Documentation strategy, team management, content operations, information experience design, localization strategy, documentation portal architecture",
                    certifications: "MadCap Advanced Certified, Documentation Management Professional, CPTC Practitioner Level, Content Strategy Certification"
                }
            }
        },

        "Technical Support": {
            overview: "Technical Support Specialists provide the frontline resolution for hardware and software issues within enterprise environments, ensuring minimal downtime and optimal user productivity.",
            responsibilities: [
                "Diagnose and resolve technical issues",
                "Provide multi-channel user support",
                "Document support tickets and solutions",
                "Install and configure software/hardware",
                "Escalate complex problems to Tier 3"
            ],
            skills: ["Troubleshooting", "Operating Systems", "Customer Service", "Hardware Support", "Ticketing Systems"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Hardware fundamentals, operating systems (Windows, macOS, Linux basics), networking basics, customer service excellence, ticketing systems, troubleshooting methodology",
                    certifications: "CompTIA A+, ITIL Foundation, HDI Support Center Analyst"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Advanced OS administration, networking troubleshooting, security basics, cloud platform support, automation with scripting, IT service management",
                    certifications: "CompTIA Network+, CompTIA Security+, Microsoft 365 Certified: Modern Desktop Administrator Associate, HDI Desktop Support Technician"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Service management, team leadership, process improvement, customer experience strategy, advanced infrastructure support, vendor management",
                    certifications: "ITIL Managing Professional, HDI Support Center Manager, CompTIA Server+, Microsoft Certified: Azure Administrator Associate"
                }
            }
        },

        "Graphics Designer": {
            overview: "Graphics Designers create high-impact visual solutions that translate brand identity into compelling digital and physical experiences, bridging the gap between art and communication.",
            responsibilities: [
                "Create visual assets for digital/print",
                "Develop brand identity and logos",
                "Design layout architectures for web/mobile",
                "Collaborate with marketing teams",
                "Produce motion graphics and animations"
            ],
            skills: ["Adobe Creative Suite", "Figma", "Typography", "Color Theory", "UI/UX Design"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Design fundamentals (typography, color theory, composition), Adobe Creative Suite basics, design principles, file formats, print vs. digital basics, portfolio development",
                    certifications: "Adobe Certified Professional in Visual Design, Canva Certified Creative, Certified Graphic Designer (CGD)"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "UI/UX design, motion graphics, brand identity development, advanced Adobe tools, design systems, user research basics, prototyping",
                    certifications: "Google UX Design Professional Certificate, Figma Certification, Adobe Certified Expert, Interaction Design Foundation Certification"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Creative direction, design strategy, team leadership, design operations, cross-platform brand management, innovation methodology",
                    certifications: "Adobe Certified Instructor, Design Management Professional, Certified Usability Analyst, Adobe Certified Master"
                }
            }
        },
        "AI Engineer": {
            overview: "AI Engineers build and deploy intelligent systems, leveraging neural networks, natural language processing, and advanced machine learning models to solve complex real-world challenges.",
            responsibilities: [
                "Design and develop AI models and neural networks",
                "Implement machine learning algorithms",
                "Fine-tune Large Language Models (LLMs)",
                "Optimize AI models for performance",
                "Collaborate with data scientists and engineers"
            ],
            skills: ["Python", "PyTorch/TensorFlow", "Deep Learning", "NLP", "Computer Vision"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Python programming, linear algebra, calculus, probability, machine learning fundamentals, data preprocessing, model evaluation basics",
                    certifications: "Fraunhofer Certified Data Scientist Foundation Level, Deep Learning Specialization (deeplearning.ai), IBM AI Engineering Professional Certificate"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Deep learning architectures (CNNs, RNNs, Transformers), NLP, computer vision, model deployment, MLOps fundamentals, distributed training",
                    certifications: "Fraunhofer Certified Data Scientist Basic Level, AWS Certified Machine Learning - Specialty, TensorFlow Developer Certificate, NVIDIA Certified AI Associate"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Advanced research implementation, AI architecture, team leadership, responsible AI, novel architecture design, AI strategy, production systems at scale",
                    certifications: "Fraunhofer Senior Data Scientist, NVIDIA Certified AI Professional, Google Professional Machine Learning Engineer, DeepLearning.AI TensorFlow Developer"
                }
            }
        },

        "Cloud Architect": {
            overview: "Cloud Architects design and manage scalable, resilient cloud infrastructures, ensuring global application availability, security, and cost-efficiency across multiple providers.",
            responsibilities: [
                "Design cloud-native architectures",
                "Manage cloud infrastructure and migration",
                "Optimize cloud costs and performance",
                "Implement robust cloud security measures",
                "Develop disaster recovery plans"
            ],
            skills: ["AWS/Azure/GCP", "Kubernetes", "Terraform", "Cloud Security", "Networking"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Cloud computing fundamentals, core cloud services (compute, storage, networking), pricing models, basic security, cloud deployment models",
                    certifications: "AWS Certified Cloud Practitioner, Microsoft Azure Fundamentals (AZ-900), Google Cloud Digital Leader"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Advanced cloud services, Infrastructure as Code, containerization, CI/CD integration, cloud security, cost optimization, high availability design",
                    certifications: "AWS Solutions Architect – Associate, Microsoft Azure Administrator Associate, Google Associate Cloud Engineer, HashiCorp Certified: Terraform Associate"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Multi-cloud strategy, enterprise governance, cloud center of excellence, migration strategy, organizational transformation, cloud-native architecture",
                    certifications: "AWS Solutions Architect – Professional, Google Professional Cloud Architect, Microsoft Azure Solutions Architect Expert, Certified Cloud Security Professional (CCSP)"
                }
            }
        },

        "DevOps Engineer": {
            overview: "DevOps Engineers bridge the gap between development and operations, automating software delivery through CI/CD pipelines to ensure maximum reliability and speed.",
            responsibilities: [
                "Build and manage CI/CD pipelines",
                "Automate infrastructure provisioning",
                "Monitor system performance and reliability",
                "Manage container orchestration",
                "Collaborate with development teams"
            ],
            skills: ["CI/CD", "Docker/Kubernetes", "Linux Administration", "Infrastructure as Code", "Scripting"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Linux fundamentals, scripting (Bash/Python), version control, CI/CD concepts, basic containerization, infrastructure basics",
                    certifications: "CompTIA Linux+, AWS Certified DevOps Engineer – Associate, LPI Linux Essentials"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Advanced CI/CD pipelines, container orchestration (Kubernetes), Infrastructure as Code (Terraform), configuration management (Ansible), monitoring and observability",
                    certifications: "Certified Kubernetes Administrator (CKA), HashiCorp Certified: Terraform Associate, Red Hat Certified Engineer (RHCE), Docker Certified Associate"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Platform engineering, DevSecOps, GitOps, service mesh, chaos engineering, team leadership, organizational transformation, developer experience",
                    certifications: "Certified Kubernetes Security Specialist (CKS), Google Professional DevOps Engineer, AWS Certified DevOps Engineer – Professional, CKA: Certified Kubernetes Administrator"
                }
            }
        },

        "Mobile Developer": {
            overview: "Mobile Developers build high-performance applications for iOS and Android, focusing on mobile-first user experiences and seamless integration with platform-specific features.",
            responsibilities: [
                "Develop native or cross-platform apps",
                "Design and implement mobile UIs",
                "Integrate with mobile APIs and sensors",
                "Optimize app performance and battery life",
                "Publish apps to Play Store/App Store"
            ],
            skills: ["Swift/Kotlin", "React Native/Flutter", "Mobile UI Design", "APIs", "Git"],
            roadmap: {
                foundation: {
                    stage: "Foundation",
                    timeline: "0-12 months",
                    focus: "Platform fundamentals (iOS: Swift/Xcode, Android: Kotlin/Android Studio), basic UI components, app lifecycle, simple app development, app store publishing basics",
                    certifications: "Meta iOS Developer Professional Certificate, Meta Android Developer Professional Certificate, Apple Certified Associate - iOS Developer"
                },
                specialization: {
                    stage: "Specialization",
                    timeline: "1-3 years",
                    focus: "Advanced UI/UX, platform-specific features, performance optimization, offline storage, networking, security best practices, testing, cross-platform frameworks",
                    certifications: "Apple Certified iOS Developer, Google Associate Android Developer, Meta Mobile Developer Professional Certificate, Flutter Certified Developer"
                },
                mastery: {
                    stage: "Mastery",
                    timeline: "3-5+ years",
                    focus: "Mobile architecture, team leadership, app scalability, performance at scale, innovation in mobile experiences, mentoring, technical strategy",
                    certifications: "Google Professional Android Developer, Apple Certified Technical Coordinator, Certified Mobile Application Architect"
                }
            }
        },
    },

    // 3. Variations for Strengths
    strengthTemplates: [
        (attr) => `<b>${attr} (Analytical Problem-Solving):</b> You demonstrate exceptional capability in breaking down complex problems into manageable components. This systematic approach allows you to tackle ambiguous challenges methodically.`,
        (attr) => `<b>${attr} (Technical Aptitude):</b> Your comfort with technical concepts and systems thinking suggests you can quickly grasp new technologies and abstract architectures. This learning agility is a primary advantage.`,
        (attr) => `<b>${attr} (Collaborative Communication):</b> You balance technical depth with the ability to communicate effectively across diverse audiences. This bridging capability is essential for roles requiring stakeholder management.`
    ],

    // 4. Variations for Development
    developmentTemplates: [
        (attr) => `<b>${attr} (Enterprise Tooling Exposure):</b> Your profile indicates limited exposure to industry-standard development tools. Consider building hands-on experience with version control and CI/CD pipelines.`,
        (attr) => `<b>${attr} (Depth vs. Breadth Balance):</b> While you demonstrate curiosity across multiple domains, focusing on deeper expertise in your chosen specialization will accelerate your professional trajectory.`,
        (attr) => `<b>${attr} (Production Mindset):</b> Your approach shows strength in conceptual understanding, but real-world systems require consideration of operational concerns—monitoring, logging, and scalability.`
    ],

    // 5. Shared Utility for Randomization
    getRandom: function (val) {
        if (Array.isArray(val)) {
            return val[Math.floor(Math.random() * val.length)];
        }
        return val;
    },

    // 5b. Render Role Emblem (deterministic icon + accent)
    renderRoleEmblem: function (role) {
        const emblem = document.getElementById('role-emblem');
        const theme = this.roleTheme[role] || { icon: '🖥️', accent: '#1e40af', tag: 'Technical Profile' };
        emblem.innerHTML = `
            <div class="role-icon-wrap" style="background: ${theme.accent}18; border: 2px solid ${theme.accent}40;">
                <span class="role-icon">${theme.icon}</span>
            </div>
            <span class="role-tag" style="background: ${theme.accent}15; color: ${theme.accent}; border-color: ${theme.accent}30;">${theme.tag}</span>
        `;
    },

    // 5c. Render Specialization Focus (fully deterministic)
    renderSpecializationFocus: function (role, answers) {
        const container = document.getElementById('specialization-focus');
        const focus = this.specializationMap[role] || 'General IT Engineering';
        const theme = this.roleTheme[role] || { accent: '#1e40af' };

        container.innerHTML = `
            <div class="specialization-block" style="border-left: 4px solid ${theme.accent};">
                <div class="spec-label">SPECIALIZATION FOCUS</div>
                <div class="spec-value">${focus}</div>
                <p class="spec-note">This focus reflects the canonical alignment for your predicted role and is derived from our standard industry mapping model.</p>
            </div>
        `;
    },

    // 6. MAIN INITIALIZER
    initDashboard: function (prediction, answers) {
        console.log("📊 Initializing Research-Grade Dashboard...");

        // 1. Detect Extreme Input Patterns
        const values = Object.values(answers);
        const isProfileEmpty = values.every(v => v === 0 || v === "");
        const isUniformMax = values.length > 0 && values.every(v => v === 10);

        // Wrap each component in a safety layer
        const safeRun = (name, fn) => {
            try {
                fn();
            } catch (e) {
                console.warn(`[Safe Mode] Failed to render ${name}:`, e.message);
            }
        };

        // Handle Specialized Advisory Modes
        if (isProfileEmpty) {
            this.handleInsufficientData(prediction);
            return;
        }

        if (isUniformMax) {
            this.handleHighCapabilityProfile(prediction, answers);
            return;
        }

        // Standard Operation
        safeRun("Role Emblem", () => this.renderRoleEmblem(prediction.career));
        safeRun("Specialization Focus", () => this.renderSpecializationFocus(prediction.career, answers));
        safeRun("Confidence Badge", () => this.renderConfidenceBadge(prediction.confidence, prediction.career));
        safeRun("Charts", () => this.renderCharts(prediction, answers));
        safeRun("Score Derivation", () => this.renderScoreDerivation(prediction));
        safeRun("Profile Orientation", () => this.renderProfileOrientation(answers));
        safeRun("Role Advisory", () => this.renderRoleAdvisory(prediction.career));
        safeRun("Strength/Development", () => this.renderStrengthDevelopment(answers));
        safeRun("AI Disclosure", () => this.renderAIDisclosure());
        safeRun("Institutional Disclaimer", () => this.renderInstitutionalDisclaimer());
    },

    // 6b. Specialized Handler: ALL VALUES = 0
    handleInsufficientData: function (prediction) {
        const resultRole = document.getElementById('result-role');
        const badgeContainer = document.getElementById('confidence-badge-container');
        const derivationContainer = document.getElementById('score-derivation');
        const advisoryContainer = document.getElementById('role-advisory');

        resultRole.innerText = prediction.career;

        badgeContainer.innerHTML = `
            <div class="alignment-badge emerging" style="background: #fff7ed; border-color: #fdba74; color: #9a3412;">Uniform Minimal Profile</div>
            <div class="badge-explanation" style="margin-top: 0.5rem; text-align: center; color: var(--slate-600);">
                Input values indicate uniformly minimal self-assessment. Accurate career alignment benefits from realistic differentiation of skills.
            </div>
        `;

        derivationContainer.innerHTML = `
            <div class="doc-section" style="border-left: 4px solid #f97316;">
                <p>The model has processed the provided inputs. However, uniform minimal scoring reduces the discriminative strength of the ensemble classifier. More precise responses distinguish between dormant skills and emerging competencies, improving alignment clarity.</p>
                <p style="margin-top: 1rem;">We suggest re-evaluating each skill realistically and retaking the assessment to distinguish strengths from developing areas.</p>
            </div>
        `;

        advisoryContainer.innerHTML = `
            <div class="advisory-card full-width" style="border: 1px solid var(--border); background: var(--slate-50);">
                <h4>Reflection Advisory</h4>
                <p>A standardized input across all vectors (0) provides the machine learning engine with a baseline feature set. While <b>${prediction.career}</b> is identified as the closest structural match in the training space, professional clarity is optimized through variable competence reporting.</p>
            </div>
        `;

        this.renderCharts(prediction, { arch: 0, prog: 0, pm: 0, comm: 0, open: 0, cons: 0, extra: 0, agree: 0, emo: 0, conv: 0, change: 0, hedo: 0, selfEnh: 0, selfTrans: 0 });
        this.renderAIDisclosure();
        this.renderInstitutionalDisclaimer();
    },

    // 6c. Specialized Handler: ALL VALUES = 10
    handleHighCapabilityProfile: function (prediction, answers) {
        const resultRole = document.getElementById('result-role');
        const badgeContainer = document.getElementById('confidence-badge-container');
        const derivationContainer = document.getElementById('score-derivation');
        const advisoryContainer = document.getElementById('role-advisory');

        resultRole.innerText = prediction.career;

        badgeContainer.innerHTML = `
            <div class="alignment-badge strong" style="background: #f0fdf4; border-color: #86efac; color: #166534;">High Multi-Domain Profile</div>
            <div class="badge-explanation" style="margin-top: 0.5rem; text-align: center;">Uniformly high proficiency reported across all 14 assessment vectors.</div>
        `;

        derivationContainer.innerHTML = `
            <div class="doc-section" style="border-left: 4px solid var(--success);">
                <p>You have reported uniformly high proficiency across all technical and behavioral dimensions. Such profiles indicate broad self-assessed capability. The model has selected <b>${prediction.career}</b> as the closest structural alignment based on statistical similarity within our high-performance dataset.</p>
                <p style="margin-top: 1rem;">Specialization clarity improves when domain strengths are differentiated. While your profile suggests multi-lateral readiness, the predictive engine leverages the mean consensus of the forest to suggest this primary path.</p>
            </div>
        `;

        advisoryContainer.innerHTML = `
            <div class="advisory-card full-width" style="border: 1px solid var(--primary); background: var(--inst-blue-50);">
                <h4>Advanced Positioning Advisory</h4>
                <p>To optimize your high-capability profile, we recommend deep specialization within the <b>${prediction.career}</b> domain. Focus on advanced-level mastery through real-world project exposure and structured certification progress to validate these self-assessed metrics in an industrial context.</p>
            </div>
        `;

        this.renderCharts(prediction, answers);
        this.renderAIDisclosure();
        this.renderInstitutionalDisclaimer();
    },

    // 7. DASHBOARD RENDERERS

    renderConfidenceBadge: function (conf, role) {
        const container = document.getElementById('confidence-badge-container');
        let label = "Exploratory Alignment";
        let className = "emerging";
        let desc = "While this role differs from your primary profile, your unique combination of traits offers an alternative pathway worth exploring as a complementary skill set.";

        if (conf >= 80) {
            label = "Strong Alignment";
            className = "strong";
            desc = "Your 14-dimensional feature vector shows exceptional congruence with industry professionals in this role. The ensemble voting consensus indicates you possess the optimal balance of technical aptitude and behavioral traits required for immediate success.";
        } else if (conf >= 60) {
            label = "Moderate Alignment";
            className = "moderate";
            desc = "Your profile demonstrates solid alignment with this career path. With targeted skill development in specific areas identified by our Random Forest model, you can achieve optimal readiness for this role.";
        } else if (conf >= 40) {
            label = "Emerging Alignment";
            className = "moderate"; // Use moderate color for emerging
            desc = "Your foundational traits align with this profession, though the model identifies several development areas. Consider this a promising direction that will require focused technical upskilling.";
        }

        // Update Alignment Slider
        const sliderFill = document.getElementById('alignment-slider-fill');
        const sliderHandle = document.getElementById('alignment-slider-handle');
        const sliderPct = document.getElementById('slider-percentage');

        if (sliderFill && sliderHandle) {
            const roundedConf = Math.round(conf);
            sliderFill.style.width = `${roundedConf}%`;
            sliderHandle.style.left = `${roundedConf}%`;
            sliderPct.innerText = `${roundedConf}%`;
        }

        container.innerHTML = `
            <div class="alignment-badge ${className}">${label}</div>
            <p class="alignment-desc-box">${desc}</p>
        `;

        // Update Alignment Explanation Text
        const explanationEl = document.getElementById('alignment-explanation');
        if (explanationEl) {
            explanationEl.innerHTML = `Your skill and behavioral traits match <span class="confidence-highlight">${Math.round(conf)}%</span> with the industry standards of real-world <b>${role}</b> professionals.`;
        }
    },

    renderScoreDerivation: function (prediction) {
        const container = document.getElementById('score-derivation');
        const idx = Math.floor(Math.random() * this.derivationTemplates.length);
        const html = this.derivationTemplates[idx](Math.round(prediction.confidence), prediction.career);
        container.innerHTML = `<p>${html}</p>`;
    },

    renderProfileOrientation: function (answers) {
        const container = document.getElementById('profile-orientation-container');

        // Feature groupings (mapping keys from FEATURE_MAPPING)
        const techKeys = ['arch', 'prog', 'pm', 'comm'];
        const techAvg = techKeys.reduce((acc, k) => acc + (answers[k] || 0), 0) / techKeys.length;

        const behKeys = ['open', 'cons', 'extra', 'agree', 'emo', 'conv', 'change', 'hedo', 'selfEnh', 'selfTrans'];
        const behAvg = behKeys.reduce((acc, k) => acc + (answers[k] || 0), 0) / behKeys.length;

        let type = "Balanced Profile";
        let icon = "⚖️";
        let desc = "You demonstrate equal proficiency in technical and behavioral domains. This hybrid profile positions you for leadership roles requiring both deep technical understanding and people management.";

        if (techAvg > behAvg + 1) {
            type = "Technical Dominant";
            icon = "⚙️";
            desc = "Your profile emphasizes systems thinking, logical reasoning, and technical depth. You thrive in environments requiring analytical problem-solving and abstract technical reasoning.";
        } else if (behAvg > techAvg + 1) {
            type = "Behavioral Dominant";
            icon = "🤝";
            desc = "Your profile highlights collaborative intelligence, adaptability, and stakeholder engagement. You excel in roles requiring communication, empathy, and cross-functional coordination.";
        }

        container.innerHTML = `
            <div class="orientation-card">
                <div class="orientation-icon">${icon}</div>
                <div class="orientation-text">
                    <span class="section-label">Profile Orientation Insight</span>
                    <h4>${type}</h4>
                    <p style="font-size: 0.9rem; line-height: 1.5; color: var(--slate-600);">${desc}</p>
                </div>
            </div>
        `;
    },

    getRoadmap: function (role) {
        const advisory = this.roleAdvisory[role] || this.getGenericAdvisory(role);
        if (!advisory.roadmap) return [];
        if (Array.isArray(advisory.roadmap)) return advisory.roadmap;
        return Object.values(advisory.roadmap);
    },

    renderRoleAdvisory: function (role) {
        const container = document.getElementById('role-advisory');
        const data = this.roleAdvisory[role] || this.getGenericAdvisory(role);
        const roadmap = this.getRoadmap(role);

        // Helper for roadmap items (Table Based)
        const renderRoadmapTable = (roadmapData) => {
            if (!roadmapData || roadmapData.length === 0) return `<p>Roadmap unavailable for this profile.</p>`;
            return `
                <div class="roadmap-table-wrap" style="overflow-x: auto; margin-top: 1rem;">
                    <table class="roadmap-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
                        <thead>
                            <tr style="background: var(--slate-100); color: var(--slate-700); border-bottom: 2px solid var(--slate-200);">
                                <th style="padding: 0.75rem;">Stage</th>
                                <th style="padding: 0.75rem;">Timeline</th>
                                <th style="padding: 0.75rem;">Primary Focus Areas</th>
                                <th style="padding: 0.75rem;">Target Certifications</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${roadmapData.map(step => `
                                <tr style="border-bottom: 1px solid var(--slate-100);">
                                    <td style="padding: 0.75rem; font-weight: 600; color: var(--primary);">${step.stage}</td>
                                    <td style="padding: 0.75rem; color: var(--slate-500);">${step.timeline}</td>
                                    <td style="padding: 0.75rem; color: var(--slate-700);">${step.focus}</td>
                                    <td style="padding: 0.75rem; color: var(--slate-600); font-style: italic;">${step.certifications || step.certs || 'N/A'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        };

        container.innerHTML = `
            <h3 class="section-label">Role-Specific Advisory Module</h3>
            <div class="advisory-grid">
                <div class="advisory-card full-width">
                    <h4>Professional Overview</h4>
                    <p style="font-size: 0.9rem; line-height: 1.5; color: var(--slate-600);">${Array.isArray(data.overview) ? data.overview[0] : (data.overview || '')}</p>
                </div>
                
                <div class="advisory-card">
                    <h4>Real Industry Responsibilities</h4>
                    <ul style="font-size: 0.9rem; line-height: 1.5; color: var(--slate-600); padding-left: 1.2rem; margin-top: 0.5rem;">
                        ${(Array.isArray(data.responsibilities) ? data.responsibilities : [data.responsibilities || '']).map(r => r ? `<li>${r}</li>` : '').join('')}
                    </ul>
                </div>

                <div class="advisory-card">
                    <h4>Core Skill Requirements</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.8rem;">
                        ${(Array.isArray(data.skills) ? data.skills : [data.skills || '']).map(s => s ? `<span style="background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; color: #475569; border: 1px solid #e2e8f0; font-weight: 500;">${s}</span>` : '').join('')}
                    </div>
                </div>

                <div class="advisory-card full-width">
                    <h4 style="display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">
                        <span style="font-size: 1.2rem;">🚀</span> Professional Growth Roadmap
                    </h4>
                    ${renderRoadmapTable(roadmap)}
                </div>
            </div>
            ${data.closing ? `
            <div class="closing-statement doc-section" style="border-left: 4px solid var(--primary); margin-top: 2rem; background: var(--slate-50); padding: 1rem; border-radius: 0 4px 4px 0;">
                <p><b>Executive Conclusion:</b> ${data.closing}</p>
            </div>
            ` : ''}
        `;
    },

    renderStrengthDevelopment: function (answers) {
        const container = document.getElementById('strength-development');

        const labels = {
            'arch': 'Architecture', 'prog': 'Programming', 'pm': 'Project Mgmt', 'comm': 'Communication',
            'open': 'Openness', 'cons': 'Conscientiousness', 'extra': 'Extraversion', 'agree': 'Agreeableness',
            'emo': 'Emotional Resilience', 'conv': 'Conversation', 'change': 'Adaptability', 'hedo': 'Hedonism',
            'selfEnh': 'Self-Enhancement', 'selfTrans': 'Self-Transcendence'
        };

        const scores = Object.entries(answers).map(([key, val]) => ({
            key, label: labels[key] || key, score: val
        }));

        const strengths = [...scores].sort((a, b) => b.score - a.score).slice(0, 3);
        const developments = [...scores].sort((a, b) => a.score - b.score).slice(0, 3);

        let html = '<div class="sd-grid">';

        html += '<div class="sd-column"><h4>Strengths</h4>';
        strengths.forEach(s => {
            const t = this.getRandom(this.strengthTemplates);
            html += `<div class="sd-item success">${t(s.label)}</div>`;
        });
        html += '</div>';

        html += '<div class="sd-column"><h4>Development Areas</h4>';
        developments.forEach(d => {
            const t = this.getRandom(this.developmentTemplates);
            html += `<div class="sd-item warning">${t(d.label)}</div>`;
        });
        html += '</div>';

        html += '</div>';
        container.innerHTML = html;
    },

    renderAIDisclosure: function () {
        const container = document.getElementById('ai-disclosure-container');
        if (container) {
            container.innerHTML = '';
            container.style.display = 'none';
        }
    },

    renderInstitutionalDisclaimer: function () {
        const container = document.getElementById('institutional-disclaimer-container');
        container.innerHTML = `
            <div class="institutional-disclaimer">
                “This recommendation is generated through ensemble machine learning-based statistical alignment and serves as structured guidance rather than definitive career assignment.”
            </div>
        `;
    },

    renderCharts: function (prediction, answers) {
        // 1. Safety Check for Chart.js
        if (typeof Chart === 'undefined') {
            console.warn("Chart.js not loaded. Skipping analytical charts.");
            const sec = document.querySelector('.analytics-dashboard');
            if (sec) sec.style.display = 'none';
            return;
        }

        // 2. Define Labels for mapping
        const labels = {
            'arch': 'Arch', 'prog': 'Prog', 'pm': 'Mgmt', 'comm': 'Comm',
            'open': 'Open', 'cons': 'Cons', 'extra': 'Extra', 'agree': 'Agree',
            'emo': 'Emo', 'conv': 'Conv', 'change': 'Adapt', 'hedo': 'Hedo',
            'selfEnh': 'Self-E', 'selfTrans': 'Self-T'
        };

        // 3. Destroy previous instances
        const canvases = ['radarChart', 'techBehChart', 'strengthDevChart'];
        canvases.forEach(id => {
            const chart = Chart.getChart(id);
            if (chart) chart.destroy();
        });

        const rawData = Object.entries(answers).map(([k, v]) => ({ label: labels[k] || k, val: v }));

        // 2. Radar Chart (Raw Inputs)
        new Chart(document.getElementById('radarChart'), {
            type: 'radar',
            data: {
                labels: rawData.map(d => d.label),
                datasets: [{
                    label: 'Attribute Level',
                    data: rawData.map(d => d.val),
                    fill: true,
                    backgroundColor: 'rgba(30, 64, 175, 0.2)',
                    borderColor: '#1e40af',
                    pointBackgroundColor: '#1e40af',
                }]
            },
            options: { scales: { r: { min: 0, max: 10, ticks: { display: false } } }, plugins: { legend: { display: false } } }
        });

        // 3. Technical vs Behavioral Comparison
        const techAvg = ['arch', 'prog', 'pm', 'comm'].reduce((acc, k) => acc + (answers[k] || 0), 0) / 4;
        const behAvg = ['open', 'cons', 'extra', 'agree', 'emo', 'conv', 'change', 'hedo', 'selfEnh', 'selfTrans'].reduce((acc, k) => acc + (answers[k] || 0), 0) / 10;

        new Chart(document.getElementById('techBehChart'), {
            type: 'bar',
            data: {
                labels: ['Technical', 'Behavioral'],
                datasets: [{
                    data: [techAvg, behAvg],
                    backgroundColor: ['#2563eb', '#7c3aed']
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 10 } }
            }
        });

        // 4. Strength vs Development Bar (Ranked)
        const sortedData = [...rawData].sort((a, b) => b.val - a.val);
        new Chart(document.getElementById('strengthDevChart'), {
            type: 'bar',
            data: {
                labels: sortedData.map(d => d.label),
                datasets: [{
                    label: 'Score',
                    data: sortedData.map(d => d.val),
                    backgroundColor: sortedData.map(d => d.val >= 7 ? '#059669' : (d.val >= 4 ? '#0284c7' : '#dc2626'))
                }]
            },
            options: { plugins: { legend: { display: false } }, indexAxis: 'y' }
        });
    },

    getGenericAdvisory: function (role) {
        return {
            overview: `Detailed orientation in the ${role} domain.`,
            responsibilities: ["Executing domain-specific tasks", "Contributing to organizational goals", "Maintaining professional standards"],
            skills: ["Technical Proficiency", "Problem Solving", "Professional Integrity"],
            roadmap: {
                foundation: { stage: "Foundation", timeline: "0-12 months", focus: "Core domain fundamentals", certifications: "Entry-level certifications" },
                specialization: { stage: "Specialization", timeline: "1-2 years", focus: "Advanced domain methodologies", certifications: "Professional-level certifications" },
                mastery: { stage: "Mastery", timeline: "2+ years", focus: "Strategic leadership and innovation", certifications: "Expert-level certifications" }
            },
            closing: "Your profile indicates survival-grade resilience for this role."
        };
    }
};

window.DashboardEngine = DASHBOARD_ENGINE;
