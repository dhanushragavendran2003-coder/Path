/**
 * ============================================================================
 * AI ENHANCED EXPLANATORY LAYER - Dependent Interpretation System
 * ============================================================================
 * Rules Enforced:
 * 1. Dependent on ML-predicted career and user input values.
 * 2. NEVER modifies career labels, confidence, or outcomes.
 * 3. Analyzes strengths and gaps from user profile.
 * 4. Advisory, not decisive tone.
 * 5. Strictly aligns with ML results (no contradictions).
 * 6. Generic guidance if no career is predicted.
 * ============================================================================
 */

const ATTR_LABELS = {
    arch: "Computer Hardware & Systems",
    prog: "Programming Proficiency",
    pm: "Project Planning & Management",
    comm: "Technical Communication",
    open: "Creative Thinking & Openness",
    cons: "Discipline & Consistency",
    extra: "Social Energy & Collaboration",
    agree: "Team Harmony & Cooperation",
    emo: "Emotional Stability under Pressure",
    conv: "Knowledge Sharing & Discussion",
    change: "Adaptability to New Tech",
    hedo: "Passion for Design & UI",
    selfEnh: "Professional Achievement Drive",
    selfTrans: "Ethical & Social Impact focus"
};

/**
 * Generates a comprehensive AI guidance report based strictly on ML results and inputs
 * @param {string|null} role - Predicted career role (null if fallback)
 * @param {number} confidence - Confidence percentage
 * @param {object} userScores - User's input scores (0-10)
 * @returns {object} - Structured AI explanation and roadmap
 */
function generateAIExplanation(role, confidence, userScores) {
    // 1. Dependency Check - If no career, provide generic guidance (Rule 6)
    if (!role || role === "—") {
        return generateGenericGuidance(userScores);
    }

    const scores = Object.entries(userScores).map(([key, val]) => ({
        key,
        label: ATTR_LABELS[key] || key,
        score: val
    }));

    // 2. Profile Overview (Rule 3a)
    const profileOverview = generateProfileOverview(scores);

    // 3. Strengths and Gaps (Rule 3b, 3c)
    // Considering all inputs: High (7-10), Med (4-6), Low (3-5), Very Low (0-2)
    const strengths = [...scores].sort((a, b) => b.score - a.score).slice(0, 5);
    const gaps = [...scores].sort((a, b) => a.score - b.score).slice(0, 5);

    const strengthText = generateStrengthAnalysis(role, strengths);
    const gapText = generateGapAnalysis(role, gaps);

    // 4. Career Readiness Interpretation (Rule 3d)
    const readiness = generateReadinessInterpretation(role, confidence, scores);

    // 5. Skill Growth Roadmap (Rule 3e)
    const roadmap = generateRoadmap(role, scores);

    // 6. Precision Analysis (Alignment Logic - Randomized)
    const roundedConf = Math.round(confidence);
    const precTemplates = EXPLANATION_VARIATIONS.precision;
    const precIdx = Math.floor(Math.random() * precTemplates.length);
    const precisionNote = precTemplates[precIdx](roundedConf, role) +
        ` You can fully achieve this role by gaining more specialized industrial knowledge and strengthening your expertise in this domain.`;

    return {
        role,
        opening: `Expert Analysis for ${role} alignment:`,
        profileOverview,
        strengthText,
        gapText,
        readiness,
        roadmap,
        precisionNote,
        advice: getAdvisoryContent(role).text,
        resources: INDIAN_RESOURCES[role] || DEFAULT_RESOURCES,
        confidenceLevel: confidence >= 70 ? 'high' : confidence >= 40 ? 'medium' : 'low',
        generatedAt: new Date().toISOString()
    };
}

// --- Variation System (Rule: 5 variations per explanation) ---
const EXPLANATION_VARIATIONS = {
    overview: [
        (avg, top, nature) => `${avg > 7 ? "Your profile demonstrates a high level of professional maturity" : avg > 4 ? "You possess a balanced profile with clear foundational competencies" : "Your profile is in an early developmental stage"}, showing a primary strength in ${top.label}. Combined with your other scores, this suggests a profile that is ${nature}.`,
        (avg, top, nature) => `The data indicates that ${top.label} is your most dominant professional marker. Overall, ${avg > 7 ? "you are exceptionally prepared for high-level technical challenges" : avg > 4 ? "you have a solid baseline across most core domains" : "you are currently in a high-growth learning phase"}.`,
        (avg, top, nature) => `Based on your input, you show a specialized aptitude for ${top.label}. ${avg > 7 ? "This puts you in a strong position for senior engineering tracks" : avg > 4 ? "This provides a steady foundation for mid-level roles" : "Focusing on this core strength will help you scale into more complex roles"}.`,
        (avg, top, nature) => `Your professional profile is ${nature}. With a standout performance in ${top.label}, ${avg > 7 ? "you align closely with industry elite standards" : avg > 4 ? "you meet most entry-to-mid level requirements" : "there is significant room for guided career growth"}.`,
        (avg, top, nature) => `An analysis of your 14-point vector reveals that ${top.label} is your anchor attribute. This suggests you are ${avg > 7 ? "performing at an expert level" : avg > 4 ? "developing a strong competitive edge" : "starting a promising professional journey"} in your training.`
    ],
    readiness: [
        (level, role) => `This ${level} shows how your current self-assessment aligns with the typical profile for a ${role}. As an advisory suggestion, this highlights areas where you can continue to expand and develop your expertise.`,
        (level, role) => `Our data suggests a ${level} for the ${role} domain. Think of this as a starting point for your career journey, offering a clear view of your current alignment with industry standards.`,
        (level, role) => `Comparing your profile to ${role} benchmarks results in this ${level}. This advisory interpretation is designed to help you prioritize your next learning steps effectively.`,
        (level, role) => `You are currently at a ${level} for ${role} roles. This analysis helps identify the specific domain knowledge you can gain to move further toward specialized professional goals.`,
        (level, role) => `Relative to standard industry benchmarks, you exhibit a ${level} for ${role}. This profile overview serves as a strategic guide for your ongoing skill development and career planning.`
    ],
    precision: [
        (conf, role) => `This ${conf}% match score is based on our data collection from working professionals in the ${role} field. It indicates that your profile reflects ${conf}% of the characteristic markers found in industry experts.`,
        (conf, role) => `Think of this ${conf}% score as your current "Professional Alignment Factor" for the ${role} domain. It shows that you already have a strong ${conf}% relationship with industry-standard benchmarks.`,
        (conf, role) => `Based on your inputs, you have a ${conf}% alignment with the core markers of successful ${role} professionals. This serves as a personalized map for your professional standing.`,
        (conf, role) => `This analysis reveals a ${conf}% match between your current attributes and those found in high-performing ${role} experts. This indicates a positive baseline for your continued growth.`,
        (conf, role) => `Your current attribute mapping shows a ${conf}% convergence with ${role} professional standards. This percentage reflects how closely your current data points mirror those of active industry specialists.`
    ]
};

function generateProfileOverview(scores) {
    const avgScore = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
    const topTrait = [...scores].sort((a, b) => b.score - a.score)[0];
    const templates = EXPLANATION_VARIATIONS.overview;
    const randomIdx = Math.floor(Math.random() * templates.length);

    // Pass global 'scores' to the template if needed via a wrapper or direct call
    const nature = getProfileNature(scores);
    return templates[randomIdx](avgScore, topTrait, nature);
}

function getTraitContext(key) {
    const contexts = {
        arch: "system-level thinking", prog: "logical problem solving", pm: "organizational efficiency",
        comm: "information synthesis", open: "creative adaptability", cons: "reliable execution",
        extra: "collaborative energy", agree: "interpersonal harmony", emo: "resilience",
        conv: "active engagement", change: "future-readiness", hedo: "aesthetic appreciation",
        selfEnh: "personal excellence", selfTrans: "purpose-driven work"
    };
    return contexts[key] || "professional performance";
}

function getProfileNature(scores) {
    const techAvg = (scores.find(s => s.key === 'arch')?.score + scores.find(s => s.key === 'prog')?.score) / 2 || 0;
    const softAvg = (scores.find(s => s.key === 'comm')?.score + scores.find(s => s.key === 'extra')?.score) / 2 || 0;

    if (techAvg > softAvg + 2) return "heavily tech-focused with strong analytical foundations";
    if (softAvg > techAvg + 2) return "distinctly interpersonal and communication-driven";
    return "versatile and well-rounded across both technical and behavioral domains";
}

/**
 * Explains how high-scoring traits support the predicted career (Rule 3b)
 */
function generateStrengthAnalysis(role, strengths) {
    if (strengths.length === 0) return "• Currently building core competencies\n• Solid foundation for growth";

    const points = [];
    const variations = [
        [`Suggested Skill Alignment: Your performance in ${strengths[0]?.label} indicates a positive baseline for ${role} related tasks.`,
        `Supportive Core Trait: The alignment in ${strengths[1]?.label} provides valuable behavioral support for project-related work.`,
        `Growth Potential: Your markers in ${strengths[2]?.label} show promise for tackling industry-level challenges in this domain.`],
        [`Technical Synergy: Higher levels in ${strengths[0]?.label} match well with basic ${role} requirements.`,
        `Collaboration Factor: Your strength in ${strengths[1]?.label} is a key asset for team-based outcomes.`,
        `Expertise Mapping: Markers for ${strengths[2]?.label} suggest a natural aptitude for this career path.`],
        [`Foundational Competency: Your results in ${strengths[0]?.label} show a strong relationship with ${role} work styles.`,
        `Behavioral Alignment: ${strengths[1]?.label} acts as a force-multiplier for your technical skills.`,
        `Aptitude Marker: Your current profile in ${strengths[2]?.label} aligns with successful professional standards.`],
        [`Career Ready Baseline: ${strengths[0]?.label} provides a distinct advantage in this specific domain.`,
        `Interpersonal Readiness: High performance in ${strengths[1]?.label} supports long-term career stability.`,
        `Specialized Potential: You demonstrate clear potential in ${strengths[2]?.label}, a core pillar for ${role}.`],
        [`Professional Spark: Your data for ${strengths[0]?.label} is a major indicator of success in ${role} roles.`,
        `Team-Driven Marker: The level of ${strengths[1]?.label} you possess is highly valued in technical squads.`,
        `Skill Projection: Current markers in ${strengths[2]?.label} reflect the attributes of high-performing specialists.`]
    ];

    const vIdx = Math.floor(Math.random() * variations.length);
    return variations[vIdx].map(p => `• ${p}`).join("\n\n");
}

/**
 * Identifies gaps and explains why they matter for the predicted career (Rule 3c)
 */
function generateGapAnalysis(role, gaps) {
    if (gaps.length === 0) return "• No significant gaps detected\n• Continue maintaining current standards";

    const variations = [
        [`Primary Development Path: Enhancing ${gaps[0]?.label} is a helpful step for immediate growth in ${role} tracks.`,
        `Structural Refinement: Focusing on ${gaps[1]?.label} will assist in scaling your professional efficiency.`],
        [`Skills to Expand: Developing your ${gaps[0]?.label} can help you gain a more well-rounded technical profile.`,
        `Professional Grooming: Further effort in ${gaps[1]?.label} will support more complex career milestones.`],
        [`Growth Opportunity: Strengthening ${gaps[0]?.label} provides a clear route to higher industry alignment.`,
        `Efficiency Bridge: Better markers in ${gaps[1]?.label} will help reduce friction in technical tasks.`],
        [`Advancement Note: Focusing on ${gaps[0]?.label} builds the baseline needed for specialized growth.`,
        `Expertise Target: Investing time in ${gaps[1]?.label} is recommended for long-term career readiness.`],
        [`Strategic Focus: Prioritizing ${gaps[0]?.label} will unlock new capabilities in ${role} environments.`,
        `Domain Insight: Increasing your scores in ${gaps[1]?.label} aligns you closer to senior technical experts.`]
    ];

    const vIdx = Math.floor(Math.random() * variations.length);
    return variations[vIdx].map(p => `• ${p}`).join("\n\n");
}

/**
 * Explains readiness conceptually (Rule 3d)
 */
function generateReadinessInterpretation(role, confidence, scores) {
    const level = confidence > 80 ? "High Alignment Potential" : confidence > 50 ? "Moderate Alignment" : "Developing Alignment";
    const templates = EXPLANATION_VARIATIONS.readiness;
    const randomIdx = Math.floor(Math.random() * templates.length);

    return {
        level,
        description: templates[randomIdx](level, role)
    };
}

const ROLE_ROADMAP_TEMPLATES = {
    'Software Developer': [
        {
            phase: "Short-term (0-6 months)",
            title: "Technical Foundation & Version Control",
            focus: "Mastering language syntax (Python/Java/JavaScript) and Git workflows.",
            action: "Build 3 modular CRUD applications. Focus on clean code principles and hosting projects on GitHub with professional documentation."
        },
        {
            phase: "Mid-term (6-18 months)",
            title: "Architectural Proficiency & Frameworks",
            focus: "Deep dive into web frameworks (React/Node.js/Spring Boot) and Data Structures.",
            action: "Contribute to an open-source project or build a full-stack application with automated unit testing and a CI/CD pipeline."
        },
        {
            phase: "Long-term (1.5 years+)",
            title: "Scalability, Cloud & System Design",
            focus: "Understanding Microservices, Docker/Kubernetes, and Cloud Infrastructure (AWS/Azure).",
            action: "Optimize application performance using caching layers (Redis) and deploy a scalable microservice architecture."
        }
    ],
    'Database Administrator': [
        {
            phase: "Short-term (0-6 months)",
            title: "SQL Mastery & Relational Design",
            focus: "Advanced SQL queries, Normalization, and Schema Design fundamentals.",
            action: "Design and implement a complex relational database for a multi-user system with proper indexing."
        },
        {
            phase: "Mid-term (6-18 months)",
            title: "Optimization & High Availability",
            focus: "Query performance tuning, Database replication, and Backup/Recovery strategies.",
            action: "Set up a high-availability database cluster and perform load testing to identify bottlenecks."
        },
        {
            phase: "Long-term (1.5 years+)",
            title: "NoSQL & Big Data Architecture",
            focus: "Transitioning to distributed databases (MongoDB/Cassandra) and Data Governance.",
            action: "Implement a hybrid data strategy combining structured SQL and unstructured Big Data pipelines."
        }
    ],
    'Project Manager': [
        {
            phase: "Short-term (0-6 months)",
            title: "Agile Foundations & Documentation",
            focus: "Learning Scrum/Kanban methodologies and professional project documentation.",
            action: "Coordinate a small team project using Jira or Trello. Master the creation of BRDs and user stories."
        },
        {
            phase: "Mid-term (6-18 months)",
            title: "Stakeholder & Resource Management",
            focus: "Strategic planning, budget optimization, and conflict resolution patterns.",
            action: "Lead a cross-functional squad through a full software development life cycle (SDLC)."
        },
        {
            phase: "Long-term (1.5 years+)",
            title: "Strategic Leadership & Operations",
            focus: "Portfolio management, risk mitigation at scale, and business alignment.",
            action: "Obtain PMP or PRINCE2 certification and move toward Program Management or Product Leadership."
        }
    ],
    'AI ML Specialist': [
        {
            phase: "Short-term (0-6 months)",
            title: "Mathematical Foundations & Analytics",
            focus: "Statistics, Linear Algebra, and Data Manipulation (Pandas/NumPy).",
            action: "Complete 5 end-to-end Exploratory Data Analysis (EDA) projects on Kaggle datasets."
        },
        {
            phase: "Mid-term (6-18 months)",
            title: "Model Specialization & Frameworks",
            focus: "Supervised/Unsupervised Learning and Neural Networks (PyTorch/TensorFlow).",
            action: "Implement and tune 3 different ML models for real-world prediction tasks; participate in global ML hackathons."
        },
        {
            phase: "Long-term (1.5 years+)",
            title: "Production ML & MLOps",
            focus: "Automated ML pipelines, Model Monitoring, and Large Language Models (LLMs).",
            action: "Deploy a model as a production-grade API with versioning and automated drift detection."
        }
    ],
    'Cyber Security Specialist': [
        {
            phase: "Short-term (0-6 months)",
            title: "Networking & Security Basics",
            focus: "TCP/IP protocols, Linux administration, and fundamental encryption standards.",
            action: "Set up a secure home lab; practice basic penetration testing on controlled environments like TryHackMe."
        },
        {
            phase: "Mid-term (6-18 months)",
            title: "Defensive Operations & Compliance",
            focus: "SOC operations, Incident Response, and Vulnerability Assessment.",
            action: "Conduct a full security audit of a web application and document remediation steps according to OWASP standards."
        },
        {
            phase: "Long-term (1.5 years+)",
            title: "Advanced Threat Hunting & Architecture",
            focus: "Malware analysis, Cloud security architecture, and zero-trust models.",
            action: "Move toward CISSP or CEH (Master) certifications and lead organizational security strategies."
        }
    ]
};

/**
 * Detailed Roadmap (Rule 3e)
 */
function generateRoadmap(role, scores) {
    const lowest = [...scores].sort((a, b) => a.score - b.score).slice(0, 3);
    const template = ROLE_ROADMAP_TEMPLATES[role];

    // If we have a specific template, use it with personalization
    if (template) {
        return template.map((step, index) => {
            let personalizedAction = step.action;

            // Inject personalized bridge based on user's core weakness (lowest scores)
            if (index === 0) {
                personalizedAction += ` Specifically focus on improving your ${lowest[0].label} during these initial projects.`;
            } else if (index === 1) {
                personalizedAction += ` Apply your developing skills in ${lowest[1].label} to improve team collaboration.`;
            }

            return {
                ...step,
                action: personalizedAction
            };
        });
    }

    // Fallback for roles without specific templates (more detailed than before)
    return [
        {
            phase: "Short-term (0-6 months)",
            title: "Core Competency Building",
            focus: `Prioritize strengthening your ${lowest[0].label} and ${lowest[1].label} indicators.`,
            action: `Engage in targeted projects or certifications that address ${lowest[0].label} to support the removal of entry-level barriers in ${role} roles. Master the fundamental tools used by ${role} professionals.`
        },
        {
            phase: "Mid-term (6-18 months)",
            title: "Professional Integration",
            focus: `Bridging the gap in ${lowest[2].label} while maintaining technical consistency.`,
            action: `Apply these skills in collaborative environments. For a ${role}, this involves moving toward an understanding of team-wide impact and industry-standard workflows.`
        },
        {
            phase: "Long-term (1.5 years+)",
            title: "Strategic Specialization",
            focus: "Profile Optimization and Leadership readiness.",
            action: `Leverage your dominant strengths while maintaining a baseline across all assessed attributes. Continue seeking specialized paths and mentorship within the ${role} domain.`
        }
    ];
}

function getRoleChallenge(role) {
    const challenges = {
        'Software Developer': "complex algorithmic logic and system scalability",
        'Database Administrator': "data integrity and high-availability architecture",
        'Project Manager': "stakeholder synchronization and resource optimization",
        'AI ML Specialist': "mathematical modeling and iterative training cycles",
        'Cyber Security Specialist': "proactive threat modeling and defensive posture",
        'Technical Writer': "knowledge abstraction and documentation clarity",
        'Customer Service Executive': "cross-functional resolution and client satisfaction"
    };
    return challenges[role] || "industry-standard project requirements";
}

function getRoleFriction(role) {
    const frictions = {
        'Software Developer': "collaboration bottlenecks and technical debt",
        'Database Administrator': "security vulnerabilities and performance lag",
        'Project Manager': "timeline slippage and communication gaps",
        'AI ML Specialist': "bias in datasets and computational inefficiency",
        'Cyber Security Specialist': "unforeseen breach vectors and compliance failures",
        'Technical Writer': "misalignment between dev and user expectations",
        'Customer Service Executive': "escalation fatigue and service-level violations"
    };
    return frictions[role] || "professional execution delays";
}

/**
 * Rule 6: Generic guidance if no career is displayed
 */
function generateGenericGuidance(userScores) {
    const scores = Object.entries(userScores).map(([key, val]) => ({
        key,
        label: ATTR_LABELS[key] || key,
        score: val
    }));

    return {
        role: "General IT Professional",
        opening: "Profile Assessment Summary:",
        profileOverview: generateProfileOverview(scores),
        strengthText: "Your current profile shows foundational capability. Focus on identifying which technical domain resonates most with your natural tendencies.",
        gapText: "Regardless of your final path, improving technical communication and consistent practice remains vital for professional growth.",
        readiness: {
            level: "General Exploration",
            description: "You are currently in the exploration phase. Use this time to build a broad base of skills across all 14 assessed attributes before specializing."
        },
        roadmap: [
            { phase: "Immediate", title: "Skill Discovery", focus: "Broad Learning", action: "Explore at least 3 different sub-fields of IT to find where your strengths align best." },
            { phase: "Upcoming", title: "Targeted Growth", focus: "Base Competence", action: "Identify one technical and one soft skill to improve by at least 2 points over the next 3 months." }
        ],
        advice: "Consistency in daily practice is the most reliable predictor of long-term success. Focus on the journey of improvement.",
        resources: DEFAULT_RESOURCES,
        confidenceLevel: 'low',
        generatedAt: new Date().toISOString()
    };
}

/**
 * Advisory industry-specific content (Rule 4)
 */
function getAdvisoryContent(role) {
    const content = {
        'Software Developer': {
            text: "Advisory: The software landscape values continuous integration and clean code. Focus on building a portfolio that demonstrates not just what you build, but how clearly you structure your solutions."
        },
        'Database Administrator': {
            text: "Advisory: Precision and data integrity are the hallmarks of this role. Develop a habit of meticulous documentation and disaster recovery thinking."
        },
        'Project Manager': {
            text: "Advisory: Your role is to bridge the gap between technical constraints and business goals. Prioritize learning Agile methodologies and stakeholder management."
        },
        'AI ML Specialist': {
            text: "Advisory: As an ML specialist, stay grounded in mathematical foundations while keeping pace with rapidly evolving framework architectures."
        },
        'Cyber Security Specialist': {
            text: "Advisory: Security is a mindset of vigilance. Beyond technical tools, focus on understanding the psychology of threat actors and system vulnerabilities."
        },
        'Technical Writer': {
            text: "Advisory: Clarity is your primary currency. Aim to simplify complex concepts without losing technical accuracy."
        },
        'Customer Service Executive': {
            text: "Advisory: In client-facing roles, EQ is as important as technical IQ. Focus on conflict resolution patterns and proactive empathy."
        }
    };

    return content[role] || { text: "Advisory: Focus on aligning your daily learning with the specific technical demands of the industry while seeking mentorship in your chosen path." };
}

const DEFAULT_RESOURCES = {
    freeCourses: ["NPTEL (Swayam) - Domain Foundations", "freeCodeCamp - Professional Certifications", "Coursera - Introduction to IT Careers"],
    communities: ["LinkedIn Professional Groups", "Reddit r/cscareerquestionsIN", "Local Tech Meetups"],
    certifications: ["Identify industry-standard certs for your specific interest"],
    jobBoards: ["Naukri.com", "LinkedIn Jobs", "Indeed India"]
};

// Re-use the existing INDIAN_RESOURCES if they fit, or keep them for variety
const INDIAN_RESOURCES = {
    'Software Developer': {
        freeCourses: [
            "NPTEL: Programming, Data Structures & Algorithms using Python (IIT Madras)",
            "Swayam: Full Stack Development (AICTE Approved)",
            "freeCodeCamp: Responsive Web Design & JS Algorithms"
        ],
        communities: [
            "GDG India (Google Developers Group) - Join local chapters",
            "HasGeek - India's premier tech discussion forum",
            "Stack Overflow - Public Q&A for code challenges"
        ],
        certifications: [
            "AWS Certified Developer - Associate",
            "Oracle Certified Professional: Java SE Programmer"
        ],
        jobBoards: [
            "Instahyre (Curated Tech Jobs)",
            "LinkedIn Jobs (Filter by 'Easy Apply')",
            "Naukri.com (IT-Software Categories)"
        ]
    },
    'Database Administrator': {
        freeCourses: [
            "NPTEL: Database Management System (IIT Kharagpur)",
            "Swayam: SQL for Data Science (IBM)",
            "MongoDB University: M001 Basics (Free)"
        ],
        communities: [
            "DataPlatformGeeks (India SQL Community)",
            "Oracle User Group India (AIOUG)"
        ],
        certifications: [
            "Oracle Database Administration Certified Professional",
            "Microsoft Certified: Azure Database Administrator Associate"
        ],
        jobBoards: [
            "Naukri.com (Search: DBA, SQL Developer)",
            "IIMJobs (Data Infrastructure Roles)"
        ]
    },
    'Project Manager': {
        freeCourses: [
            "NPTEL: Software Project Management (IIT Kharagpur)",
            "Google Project Management: Professional Certificate (Coursera Audit)",
            "Swayam: Project Management for Managers"
        ],
        communities: [
            "PMI India (Project Management Institute)",
            "ProductGeeks - The Product Folks"
        ],
        certifications: [
            "CAPM / PMP (Project Management Professional)",
            "Certified ScrumMaster (CSM)"
        ],
        jobBoards: [
            "LinkedIn (Filter: Technical Program Manager)",
            "Naukri.com (IT-Project Management)"
        ]
    },
    'Technical Writer': {
        freeCourses: [
            "Google: Technical Writing One & Two (Free Course)",
            "NPTEL: Technical English for Engineers (IIT Madras)",
            "Swayam: Soft Skills and Technical Communication"
        ],
        communities: [
            "Technical Writers of India (TWIN)",
            "Write the Docs (Local Meetups)"
        ],
        certifications: [
            "Society for Technical Communication (STC) Certification",
            "Certified Professional Technical Communicator (CPTC)"
        ],
        jobBoards: [
            "Naukri.com (Content & Technical Writing)",
            "Remote.co (Writing Category)"
        ]
    },
    'AI ML Specialist': {
        freeCourses: [
            "NPTEL: Introduction to Machine Learning (IIT Madras)",
            "Swayam: Deep Learning (IIT Ropar)",
            "Kaggle Learn: Micro-courses for ML & Pandas"
        ],
        communities: [
            "Kaggle Competitions (Global & India)",
            "Analytics Vidhya (Community & Hackathons)"
        ],
        certifications: [
            "TensorFlow Developer Certificate",
            "Microsoft Certified: Azure AI Engineer Associate"
        ],
        jobBoards: [
            "Analytics Vidhya Job Board",
            "LinkedIn (AI Researcher / ML Engineer)"
        ]
    },
    'Customer Service Executive': {
        freeCourses: [
            "Swayam: Communication Skills & Personality Development",
            "Salesforce Trailhead: Service Cloud Basics (Free)",
            "HubSpot Academy: Service Hub Software Certification"
        ],
        communities: [
            "Support Driven (Customer Support Community)",
            "LinkedIn Customer Success Groups"
        ],
        certifications: [
            "Zendesk Customer Service Professional",
            "ITIL Foundation (Service Management)"
        ],
        jobBoards: [
            "Freshworks Careers",
            "Amazon Customer Service (Virtual VCS - India)"
        ]
    },
    'Cyber Security Specialist': {
        freeCourses: [
            "NPTEL: Cryptography and Network Security (IIT Kharagpur)",
            "Swayam: Information Security & Cyber Forensics",
            "Cisco Networking Academy: Introduction to Cyber Security (Free)"
        ],
        communities: [
            "Null: The Open Security Community (India Chapters)",
            "OWASP India Chapters (App Security)"
        ],
        certifications: [
            "CompTIA Security+ (Entry Level)",
            "CEH (Certified Ethical Hacker) - EC-Council"
        ],
        jobBoards: [
            "Naukri.com (InfoSec / SOC Analyst)",
            "LinkedIn (Cyber Security Analyst)"
        ]
    },
    'Business Analyst': {
        freeCourses: [
            "NPTEL: Business Analytics & Data Mining (IIT Roorkee)",
            "Swayam: Data Analysis for Decision Making",
            "Excel for Business (Coursera Audit)"
        ],
        communities: [
            "IIBA India Chapter",
            "Modern Analyst Community"
        ],
        certifications: [
            "ECBA (Entry Certificate in Business Analysis)",
            "Certified Business Analysis Professional (CBAP)"
        ],
        jobBoards: [
            "IIMJobs (Business Analyst)",
            "Naukri.com (Big Data / Analytics)"
        ]
    },
    'Software Tester': {
        freeCourses: [
            "NPTEL: Software Testing (IIT Kharagpur)",
            "Swayam: Software Engineering (Testing Module)",
            "Guru99: Selenium & Manual Testing Tutorials"
        ],
        communities: [
            "The Test Tribe (India's Largest Testing Community)",
            "Ministry of Testing (Meetups)"
        ],
        certifications: [
            "ISTQB Foundation Level (CTFL)",
            "Selenium Certification"
        ],
        jobBoards: [
            "Naukri.com (QA / Testing)",
            "LinkedIn (SDET Roles)"
        ]
    },
    'Helpdesk Engineer': {
        freeCourses: [
            "Google IT Support Professional Certificate (Coursera Audit)",
            "Swayam: Computer Networks & Troubleshooting",
            "Microsoft Learn: Windows Client Fundamentals"
        ],
        communities: [
            "Spiceworks Community (IT Pros)",
            "Reddit r/sysadmin"
        ],
        certifications: [
            "CompTIA A+ (Hardware & Support)",
            "Microsoft 365 Certified: Fundamentals"
        ],
        jobBoards: [
            "Naukri.com (Technical Support)",
            "Foundit (Monster India)"
        ]
    },
    'Information Security Specialist': {
        freeCourses: [
            "NPTEL: Ethical Hacking (IIT Kharagpur)",
            "Swayam: Network Security",
            "Cybrary: Introduction to IT Security"
        ],
        communities: [
            "Nullcon (Security Conference)",
            "Infosec Girls (India)"
        ],
        certifications: [
            "CISSP (Advanced)",
            "CISM (Certified Information Security Manager)"
        ],
        jobBoards: [
            "Naukri.com (Information Security)",
            "LinkedIn (CISO / InfoSec)"
        ]
    },
    'Hardware Engineer': {
        freeCourses: [
            "NPTEL: Basic Electronics & Circuit Design (IIT Madras)",
            "Swayam: Digital System Design",
            "Arduino & Raspberry Pi Tutorials (Instructables)"
        ],
        communities: [
            "Electronics For You (EFY) Forum",
            "DIY Electronics India"
        ],
        certifications: [
            "VLSI Certification",
            "Certified Interconnect Designer (CID)"
        ],
        jobBoards: [
            "Naukri.com (Embedded Systems)",
            "LinkedIn (Hardware Design)"
        ]
    },
    'Networking Engineer': {
        freeCourses: [
            "NPTEL: Computer Networks (IIT Kharagpur)",
            "Cisco Packet Tracer Tutorials (Free)",
            "Swayam: Introduction to Internet of Things"
        ],
        communities: [
            "Cisco Learning Network",
            "Network Engineering Stack Exchange"
        ],
        certifications: [
            "CCNA (Cisco Certified Network Associate)",
            "CompTIA Network+"
        ],
        jobBoards: [
            "Naukri.com (Network Administrator)",
            "LinkedIn (Network Engineering)"
        ]
    },
    'API Integration Specialist': {
        freeCourses: [
            "Postman Student Expert (Free Certification)",
            "Udacity: Designing RESTful APIs (Free Course)",
            "Swayam: Web Services"
        ],
        communities: [
            "Postman Galaxy Community",
            "API Evangelist Forum"
        ],
        certifications: [
            "MuleSoft Certified Developer",
            "Google Cloud Apigee Certified"
        ],
        jobBoards: [
            "Instahyre (Backend / API Dev)",
            "LinkedIn (Integration Engineer)"
        ]
    },
    'Application Support Engineer': {
        freeCourses: [
            "Atlassian University: Jira Fundamentals (Free)",
            "Swayam: Linux for System Administrators",
            "Google Cloud: App Deployment & Debugging"
        ],
        communities: [
            "Stack Exchange (DevOps)",
            "Reddit r/devops"
        ],
        certifications: [
            "Red Hat Certified System Administrator (RHCSA)",
            "AWS Certified SysOps Administrator"
        ],
        jobBoards: [
            "Naukri.com (L2/L3 Support)",
            "LinkedIn (Production Support)"
        ]
    },
    'Data Scientist': {
        freeCourses: [
            "NPTEL: Data Science for Engineers (IIT Madras)",
            "Swayam: Python for Data Science",
            "Kaggle: Data Visualization & Pandas"
        ],
        communities: [
            "Analytics Vidhya",
            "DataHack (India)"
        ],
        certifications: [
            "Sasuk Certified Data Scientist",
            "Microsoft Certified: Azure Data Scientist"
        ],
        jobBoards: [
            "LinkedIn (Data Scientist)",
            "Naukri.com (Analytics)"
        ]
    },
    'Graphics Designer': {
        freeCourses: [
            "NPTEL: Engineering Graphics & Design",
            "Canva Design School (Free)",
            "Adobe Education Exchange (Tutorials)"
        ],
        communities: [
            "Behance India",
            "Dribbble (Design Community)"
        ],
        certifications: [
            "Adobe Certified Professional (Photoshop/Illustrator)",
            "UX Design Institute Certification"
        ],
        jobBoards: [
            "LinkedIn (Creative Designer)",
            "Naukri.com (Graphic Design)"
        ]
    }
};

/**
 * Simulate AI processing delay
 */
function simulateAIProcessing() {
    return new Promise(resolve => {
        const delay = 800 + Math.random() * 500;
        setTimeout(resolve, delay);
    });
}

function getAIThinkingMessage() {
    const messages = [
        "Analyzing predicted career alignment...",
        "Evaluating strength vectors against industry benchmarks...",
        "Identifying potential profile gaps...",
        "Synthesizing advisory guidance...",
        "Contextualizing results based on input values..."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

async function typewriterEffect(text, element, speed = 2) {
    if (!element) return;
    element.textContent = '';
    let index = 0;
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.slice(index, index + speed);
                index += speed;
            } else {
                clearInterval(interval);
                element.textContent = text;
                resolve();
            }
        }, 15);
    });
}

// Global Export
if (typeof window !== 'undefined') {
    window.AIEngine = {
        generateAIExplanation,
        simulateAIProcessing,
        getAIThinkingMessage,
        typewriterEffect
    };
}
