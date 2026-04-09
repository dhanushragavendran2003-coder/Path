
// --- Configuration ---
const CONFIG = {
    API_URLS: [
        'http://127.0.0.1:5000',
        'http://localhost:5000'
    ],
    TIMEOUT: 10000 // 10 seconds
};

// --- State Management ---
const state = {
    technical: {},
    personality: {},
    currentQuestionIdx: 0,
    answers: {},
    aiEnabled: false,
    currentPrediction: null,
    aiExplanation: null
};

// Feature Mapping (Must match Backend/Training columns EXACTLY)
const FEATURE_MAPPING = {
    'arch': 'Computer Architecture',
    'prog': 'Programming Skills',
    'pm': 'Project Management',
    'comm': 'Communication skills',  // lowercase 's' to match CSV
    'open': 'Openness',
    'cons': 'Conscientousness',
    'extra': 'Extraversion',
    'agree': 'Agreeableness',
    'emo': 'Emotional_Range',
    'conv': 'Conversation',
    'change': 'Openness to Change',
    'hedo': 'Hedonism',
    'selfEnh': 'Self-enhancement',
    'selfTrans': 'Self-transcendence'
};

const QUESTIONS = [
    {
        key: 'arch',
        category: 'Technical Skills',
        text: "Computer Architecture",
        scenario: "Can you design, debug, or optimize software by leveraging a deep understanding of internal system workings? Rate your technical confidence."
    },
    {
        key: 'prog',
        category: 'Technical Skills',
        text: "Programming Skills",
        scenario: "How effectively can you write clean, maintainable code to solve complex real-world problems in a professional environment?"
    },
    {
        key: 'pm',
        category: 'Technical Skills',
        text: "Project Management",
        scenario: "When working in a team, how successfully do you plan tasks, meet deadlines, and coordinate project workflows?"
    },
    {
        key: 'comm',
        category: 'Technical Skills',
        text: "Communication skills",
        scenario: "How clearly and professionally can you explain complex technical ideas or requirements to teammates and clients?"
    },
    {
        key: 'open',
        category: 'Personal Traits',
        text: "Openness",
        scenario: "To what extent are you willing to step out of your comfort zone to learn new tools and adapt to evolving industry technologies?"
    },
    {
        key: 'cons',
        category: 'Personal Traits',
        text: "Conscientiousness",
        scenario: "How much pride do you take in being reliable, disciplined, and fully accountable for every task assigned to you?"
    },
    {
        key: 'extra',
        category: 'Personal Traits',
        text: "Extraversion",
        scenario: "How naturally do you find yourself collaborating with others and actively engaging in team discussions?"
    },
    {
        key: 'agree',
        category: 'Personal Traits',
        text: "Agreeableness",
        scenario: "How easily can you cooperate with others, respect diverse viewpoints, and maintain positive relationships under pressure?"
    },
    {
        key: 'emo',
        category: 'Personal Traits',
        text: "Emotional_Range",
        scenario: "How resilient are you when facing tight deadlines, professional criticism, or high-pressure work situations?"
    },
    {
        key: 'conv',
        category: 'Work Style',
        text: "Conversation",
        scenario: "How confident are you in taking the lead during discussions and effectively contributing your ideas to the team?"
    },
    {
        key: 'change',
        category: 'Work Style',
        text: "Openness to Change",
        scenario: "How quickly and enthusiastically do you embrace changes in projects, tools, or organizational strategies?"
    },
    {
        key: 'hedo',
        category: 'Work Style',
        text: "Hedonism",
        scenario: "How much do you value maintaining a healthy work-life balance and deriving personal satisfaction from your daily tasks?"
    },
    {
        key: 'selfEnh',
        category: 'Motivation',
        text: "Self-enhancement",
        scenario: "How driven are you to improve your skills, take initiative, and grow professionally within an organization?"
    },
    {
        key: 'selfTrans',
        category: 'Motivation',
        text: "Self-transcendence",
        scenario: "How much do you prioritize the welfare of your team and contributing beyond personal gain to create a meaningful impact?"
    }
];

// --- Navigation Logic ---
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(el => {
        el.classList.add('hidden');
    });
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startAssessment() {
    state.currentQuestionIdx = 0;
    state.answers = {};
    state.aiEnabled = false;
    const toggle = document.getElementById('ai-toggle');
    if (toggle) toggle.classList.remove('active');
    showSection('step-assessment');
    renderQuestion();
}

const ENGAGEMENT_MESSAGES = [
    "Let's start with your technical foundation!",
    "Doing great! Building your skill profile...",
    "Nice! This helps us understand your strengths.",
    "Almost through the tech section!",
    "Moving to personality traits now...",
    "Interesting! This reveals your work style.",
    "Halfway there! Keep going.",
    "Your profile is taking shape...",
    "Great consistency!",
    "Almost finished with the traits section...",
    "Finally, let's look at your work values.",
    "Just a few more metrics to go...",
    "Final stretch! Excellent effort.",
    "Last one! Ready for your career path?"
];

function renderQuestion() {
    const q = QUESTIONS[state.currentQuestionIdx];
    const progress = Math.round(((state.currentQuestionIdx + 1) / QUESTIONS.length) * 100);

    const categoryBadge = document.getElementById('q-category-badge');
    const qCard = document.getElementById('q-card');

    categoryBadge.innerText = q.category.toUpperCase();

    // Set dynamic style based on category
    qCard.className = 'question-card';
    if (q.category === 'Technical Skills') {
        qCard.classList.add('tech');
        categoryBadge.style.color = 'var(--tech-main)';
        categoryBadge.style.borderColor = 'var(--tech-main)';
    } else if (q.category === 'Personal Traits') {
        qCard.classList.add('pers');
        categoryBadge.style.color = 'var(--pers-main)';
        categoryBadge.style.borderColor = 'var(--pers-main)';
    } else {
        qCard.classList.add('work');
        categoryBadge.style.color = 'var(--work-main)';
        categoryBadge.style.borderColor = 'var(--work-main)';
    }

    document.getElementById('q-number').innerText = `Question ${state.currentQuestionIdx + 1} of ${QUESTIONS.length}`;
    document.getElementById('q-progress').innerText = `${progress}% Complete`;
    document.getElementById('q-progress-bar').style.width = `${progress}%`;
    document.getElementById('q-text').innerText = q.text;
    document.getElementById('q-scenario').innerText = q.scenario;
    document.getElementById('q-encouragement').innerText = ENGAGEMENT_MESSAGES[state.currentQuestionIdx] || "Keep it up!";

    const input = document.getElementById('q-input');
    input.value = state.answers[q.key] !== undefined ? state.answers[q.key] : "";
    input.focus();

    document.getElementById('btn-back').innerText = '< Back';
    document.getElementById('btn-next').innerText = state.currentQuestionIdx === QUESTIONS.length - 1 ? 'Get Career Path >' : 'Next Question >';
}

function validateInput(el) {
    let val = el.value.replace(/[^0-9]/g, '');
    if (val !== "") {
        let n = parseInt(val);
        if (n > 10) val = "10";
    }
    el.value = val;

    const errorEl = document.getElementById('q-error');
    if (val !== "" && parseInt(val) > 10) {
        errorEl.style.visibility = "visible";
    } else {
        errorEl.style.visibility = "hidden";
    }
}

function nextQuestion() {
    const q = QUESTIONS[state.currentQuestionIdx];
    const val = document.getElementById('q-input').value;

    if (val === "" || parseInt(val) < 0 || parseInt(val) > 10) {
        document.getElementById('q-error').style.visibility = "visible";
        return;
    }

    state.answers[q.key] = parseInt(val);

    if (state.currentQuestionIdx < QUESTIONS.length - 1) {
        state.currentQuestionIdx++;
        renderQuestion();
    } else {
        processData();
    }
}

function prevQuestion() {
    if (state.currentQuestionIdx > 0) {
        const q = QUESTIONS[state.currentQuestionIdx];
        const val = document.getElementById('q-input').value;
        if (val !== "") state.answers[q.key] = parseInt(val);

        state.currentQuestionIdx--;
        renderQuestion();
    } else {
        showSection('step-home');
    }
}

async function processData() {
    // 1. UNIFORM ZERO INPUT PRE-VALIDATION
    const values = Object.values(state.answers);
    const isAllZero = values.length > 0 && values.every(v => v === 0);

    if (isAllZero) {
        console.warn("🚫 [Pre-Validation] Uniform zero input detected. Blocking API call.");

        const qCard = document.getElementById('q-card');
        const notice = document.getElementById('validation-notice');

        // Visual Feedback
        notice.style.display = 'block';
        qCard.classList.add('shake', 'border-error');

        // Reset effects after animation
        setTimeout(() => {
            qCard.classList.remove('shake');
        }, 500);

        // Scroll notice into view
        notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Clear any previous validation notice
    document.getElementById('validation-notice').style.display = 'none';
    document.getElementById('q-card').classList.remove('border-error');

    showSection('step-processing');
    const features = {};
    for (const q of QUESTIONS) {
        features[FEATURE_MAPPING[q.key]] = state.answers[q.key];
    }

    let success = false;
    for (const baseUrl of CONFIG.API_URLS) {
        try {
            const response = await fetch(`${baseUrl}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ features })
            });

            if (!response.ok) throw new Error("Server Error");
            const prediction = await response.json();

            // 1. Mark success immediately on data receipt
            success = true;
            state.currentPrediction = prediction;

            // 2. Safely attempt UI Rendering
            try {
                displayResult(prediction);
            } catch (uiError) {
                console.error("Dashboard UI Error:", uiError);
                // Fallback: simple display if dashboard engine crashes
                showSection('step-result');
                document.getElementById('result-role').innerText = prediction.career;
            }
            break;
        } catch (error) {
            console.warn(`Connection to ${baseUrl} failed`);
        }
    }

    if (!success) {
        alert("Connection failed. Check if Backend is running.");
        showSection('step-assessment');
    }
}

function displayResult(prediction) {
    showSection('step-result');
    document.getElementById('result-role').innerText = prediction.career;

    // Initialize Research Dashboard
    if (window.DashboardEngine) {
        window.DashboardEngine.initDashboard(prediction, state.answers);
    }

    // Clear AI container
    document.getElementById('ai-explanation-container').innerHTML = '';
    document.getElementById('ai-explanation-container').classList.add('hidden');
    state.aiEnabled = false;
    document.getElementById('ai-toggle').classList.remove('active');
}

async function toggleAIExplanation() {
    const container = document.getElementById('ai-explanation-container');
    state.aiEnabled = !state.aiEnabled;
    const toggle = document.getElementById('ai-toggle');
    const slider = toggle.querySelector('.toggle-slider');

    if (state.aiEnabled) {
        toggle.style.background = 'var(--primary)';
        slider.style.left = '27px';
        container.classList.remove('hidden');

        container.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <div class="loader" style="width: 40px; height: 40px;"></div>
                <p id="ai-thinking" style="color: var(--primary); font-family: 'Inter', sans-serif; margin-top: 1rem;"></p>
            </div>
        `;

        try {
            const thinkingMsg = window.AIEngine.getAIThinkingMessage();
            document.getElementById('ai-thinking').innerText = thinkingMsg;

            await window.AIEngine.simulateAIProcessing();
            const explanation = window.AIEngine.generateAIExplanation(
                state.currentPrediction.career,
                state.currentPrediction.confidence,
                state.answers
            );

            await renderAIExplanation(explanation);
        } catch (err) {
            console.error("AI Engine Error:", err);
            container.innerHTML = `<p style="color:red; text-align:center;">Error generating analysis. Please try again.</p>`;
        }
    } else {
        toggle.style.background = '#cbd5e1';
        slider.style.left = '3px';
        container.classList.add('hidden');
        container.innerHTML = '';
    }
}

async function renderAIExplanation(explanation) {
    const container = document.getElementById('ai-explanation-container');
    const confidenceClass = explanation.confidenceLevel === 'high' ? 'align-high' : explanation.confidenceLevel === 'medium' ? 'align-med' : 'align-low';
    const displayConfidence = explanation.readiness.level;

    container.innerHTML = `
        <div class="ai-explanation-panel" style="text-align: left; margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 2rem;">
            <div style="margin-bottom: 2rem;">
                <span class="ai-badge">🤖 AI ENHANCED MENTOR LAYER</span>
                <span style="margin-left: 1rem; color: var(--${confidenceClass}); font-weight: 800; font-size: 0.8rem;">${displayConfidence}</span>
            </div>
            
            <div class="doc-section">
                <h4 style="color: var(--primary); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 1rem;">Profile Overview</h4>
                <p id="ai-overview" style="font-size: 1.1rem; line-height: 1.6; color: var(--foreground); font-weight: 500;"></p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div class="doc-section" style="margin-bottom: 0;">
                    <h4 style="color: #10b981; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem;">Core Strengths</h4>
                    <pre id="ai-strengths" style="white-space: pre-wrap; font-family: inherit; color: var(--muted-foreground); font-size: 0.95rem;"></pre>
                </div>
                <div class="doc-section" style="margin-bottom: 0;">
                    <h4 style="color: #f59e0b; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem;">Growth Areas</h4>
                    <pre id="ai-gaps" style="white-space: pre-wrap; font-family: inherit; color: var(--muted-foreground); font-size: 0.95rem;"></pre>
                </div>
            </div>

            <div class="doc-section">
                <h4 style="color: var(--primary); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem;">Personalized Growth Roadmap</h4>
                <div id="ai-roadmap"></div>
            </div>

            <div class="doc-section">
                <h4 style="color: var(--primary); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem;">Expert Advisory</h4>
                <p id="ai-advice" style="font-style: italic; color: var(--foreground);"></p>
            </div>

            <div class="doc-section">
                <h4 style="color: var(--primary); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem;">Curated Indian Resources</h4>
                <div id="resource-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;"></div>
            </div>
        </div>
    `;

    // Trigger typewriter effects
    if (window.AIEngine.typewriterEffect) {
        await window.AIEngine.typewriterEffect(explanation.profileOverview, document.getElementById('ai-overview'));
        await window.AIEngine.typewriterEffect(explanation.strengthText, document.getElementById('ai-strengths'));
        await window.AIEngine.typewriterEffect(explanation.gapText, document.getElementById('ai-gaps'));
        await window.AIEngine.typewriterEffect(explanation.advice, document.getElementById('ai-advice'));
    }

    // Render Roadmap
    const roadmapContainer = document.getElementById('ai-roadmap');
    explanation.roadmap.forEach((step, idx) => {
        const div = document.createElement('div');
        div.style.marginBottom = '1.5rem';
        div.innerHTML = `
            <div style="display: flex; gap: 1rem;">
                <span style="color: var(--primary); font-weight: 800;">${step.phase}</span>
                <div>
                    <strong style="display: block; color: var(--foreground);">${step.title}</strong>
                    <p style="font-size: 0.9rem; color: var(--muted-foreground); margin-top: 0.25rem;">${step.action}</p>
                </div>
            </div>
        `;
        roadmapContainer.appendChild(div);
    });

    // Render Resources
    const resGrid = document.getElementById('resource-grid');
    const allResources = [
        ...(explanation.resources.freeCourses || []),
        ...(explanation.resources.certifications || [])
    ];

    allResources.forEach(res => {
        const div = document.createElement('div');
        div.style.padding = '1rem';
        div.style.background = 'var(--input-background)';
        div.style.border = '1px solid var(--border)';
        div.style.borderRadius = 'var(--radius)';
        div.innerHTML = `<span style="font-size: 0.85rem; color: var(--muted-foreground);">${res}</span>`;
        resGrid.appendChild(div);
    });
}

window.onload = () => {
    showSection('step-home');

    // Handle 'Enter' key for questions
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const assessmentSection = document.getElementById('step-assessment');
            if (assessmentSection && !assessmentSection.classList.contains('hidden')) {
                nextQuestion();
            }
        }
    });
};
