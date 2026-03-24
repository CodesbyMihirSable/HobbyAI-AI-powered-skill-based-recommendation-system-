/**
 * HobbyAI - Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Application State ---
    const state = {
        currentView: 'landing-view',
        quizStep: 0,
        userAnswers: [],
        userVector: [0, 0, 0, 0, 0, 0], // [time, budget, physical, social, creativity, technical]
        recommendations: [],
        personalityType: '',
        isDarkMode: false
    };

    // --- Quiz Questions ---
    const questions = [
        {
            text: "How much free time can you realistically dedicate to a new hobby each week?",
            dimension: 0, // time
            options: [
                { text: "Just a few hours (Flexible)", value: 0.3 },
                { text: "About 5-10 hours (Moderate)", value: 0.6 },
                { text: "I'm looking for a deep dive (Intensive)", value: 0.9 }
            ]
        },
        {
            text: "What's your comfortable monthly budget for this hobby?",
            dimension: 1, // budget
            options: [
                { text: "Next to nothing ($)", value: 0.1 },
                { text: "Maybe $50 - $100 ($$)", value: 0.5 },
                { text: "I'm willing to invest in quality gear ($$$)", value: 0.9 }
            ]
        },
        {
            text: "How physically active do you want your hobby to be?",
            dimension: 2, // physical
            options: [
                { text: "I prefer staying seated/relaxed", value: 0.2 },
                { text: "Light movement is fine", value: 0.5 },
                { text: "I want to break a sweat!", value: 0.9 }
            ]
        },
        {
            text: "What's your preferred social setting for a hobby?",
            dimension: 3, // social
            options: [
                { text: "Total solitude / Me-time", value: 0.1 },
                { text: "Small groups or online communities", value: 0.5 },
                { text: "Large social gatherings / Team-based", value: 1.0 }
            ]
        },
        {
            text: "How important is creating something tangible or expressive?",
            dimension: 4, // creativity
            options: [
                { text: "Not a priority (I prefer consuming/doing)", value: 0.2 },
                { text: "I like following guides/recipes", value: 0.6 },
                { text: "I want to express my own vision", value: 1.0 }
            ]
        },
        {
            text: "Are you comfortable working with complex tools, tech, or systems?",
            dimension: 5, // technical
            options: [
                { text: "Keep it simple and manual", value: 0.2 },
                { text: "I can handle some tools/logic", value: 0.6 },
                { text: "I love deep technical challenges", value: 1.0 }
            ]
        },
        {
            text: "Where do you prefer to spend your time?",
            dimension: null, // special adaptive
            options: [
                { text: "Indoors (Cozy/Controlled)", value: 'indoor' },
                { text: "Outdoors (Nature/Open air)", value: 'outdoor' }
            ]
        },
        {
            text: "What describes your learning style best?",
            dimension: null,
            options: [
                { text: "Quick wins and immediate results", value: 'fast' },
                { text: "Patient mastery and deep study", value: 'slow' }
            ]
        },
        {
            text: "What's your primary goal?",
            dimension: null,
            options: [
                { text: "Stress relief and relaxation", value: 'relax' },
                { text: "Skill acquisition and growth", value: 'growth' },
                { text: "Social connection and community", value: 'social' }
            ]
        },
        {
            text: "When facing a new challenge, do you usually...",
            dimension: null,
            options: [
                { text: "Experiment and see what happens", value: 'explorer' },
                { text: "Think through the logic first", value: 'thinker' },
                { text: "Search for a community/mentor", value: 'social' }
            ]
        }
    ];

    // --- DOM Elements ---
    const views = {
        landing: document.getElementById('landing-view'),
        quiz: document.getElementById('quiz-view'),
        results: document.getElementById('results-view'),
        detail: document.getElementById('detail-view')
    };

    const elements = {
        appContainer: document.getElementById('app-container'),
        questionText: document.getElementById('question-text'),
        optionsGrid: document.getElementById('options-grid'),
        quizProgress: document.getElementById('quiz-progress'),
        quizStepText: document.getElementById('quiz-step-text'),
        resultsGrid: document.getElementById('results-grid'),
        personalityBadge: document.querySelectorAll('.badge-type'),
        hobbyDetail: document.getElementById('hobby-detail-content'),
        themeToggle: document.getElementById('theme-toggle'),
        themeIcon: document.getElementById('theme-icon'),
        startBtn: document.getElementById('start-quiz-btn'),
        prevBtn: document.getElementById('prev-btn'),
        homeBtn: document.getElementById('go-home'),
        resetBtn: document.getElementById('reset-app'),
        sampleGrid: document.getElementById('sample-hobbies-grid'),
        showSamplesBtn: document.getElementById('show-samples-btn')
    };

    // --- Initialization ---
    function init() {
        renderLanding();
        setupEventListeners();
        checkSavedState();
    }

    function setupEventListeners() {
        elements.startBtn.addEventListener('click', () => switchView('quiz-view'));
        elements.showSamplesBtn.addEventListener('click', () => {
            elements.sampleGrid.scrollIntoView({ behavior: 'smooth' });
        });
        elements.prevBtn.addEventListener('click', handleBack);
        elements.homeBtn.addEventListener('click', () => {
            state.quizStep = 0;
            switchView('landing-view');
        });
        elements.resetBtn.addEventListener('click', resetApp);
        elements.themeToggle.addEventListener('click', toggleTheme);
    }

    function checkSavedState() {
        const saved = localStorage.getItem('hobbyAI_state');
        if (saved) {
            const parsed = JSON.parse(saved);
            state.recommendations = parsed.recommendations;
            state.personalityType = parsed.personalityType;
            state.userVector = parsed.userVector;
            // Optionally auto-show results if they exist? 
            // For now, just keep in state.
        }
        
        const dark = localStorage.getItem('hobbyAI_dark') === 'true';
        if (dark) toggleTheme();
    }

    // --- Navigation & Routing ---
    function switchView(viewId) {
        Object.values(views).forEach(v => v.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
        state.currentView = viewId;
        window.scrollTo(0, 0);

        if (viewId === 'quiz-view') renderQuiz();
        if (viewId === 'results-view') renderResults();
    }

    // --- UI Rendering ---
    function renderLanding() {
        const samples = hobbies.slice(0, 4);
        elements.sampleGrid.innerHTML = samples.map(hobby => `
            <div class="hobby-card animate-up" onclick="app.showDetail('${hobby.id}')">
                <span class="card-tag">${hobby.category}</span>
                <h3>${hobby.name}</h3>
                <p>${hobby.description}</p>
                <div class="btn btn-sm btn-outline">Learn More</div>
            </div>
        `).join('');
    }

    function renderQuiz() {
        const q = questions[state.quizStep];
        elements.questionText.innerText = q.text;
        
        // Update progress
        const progress = ((state.quizStep + 1) / questions.length) * 100;
        elements.quizProgress.style.width = `${progress}%`;
        elements.quizStepText.innerText = `Question ${state.quizStep + 1} of ${questions.length}`;
        
        // Render options
        elements.optionsGrid.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn animate-up';
            btn.style.animationDelay = `${idx * 0.1}s`;
            btn.innerText = opt.text;
            btn.onclick = () => handleAnswer(opt.value);
            elements.optionsGrid.appendChild(btn);
        });

        elements.prevBtn.disabled = state.quizStep === 0;
    }

    function handleAnswer(value) {
        const q = questions[state.quizStep];
        
        // Update vector
        if (q.dimension !== null) {
            state.userVector[q.dimension] = value;
        } else {
            // Adaptive logic handles non-vector questions
            applyAdaptiveBonus(value);
        }

        state.userAnswers[state.quizStep] = value;

        if (state.quizStep < questions.length - 1) {
            state.quizStep++;
            renderQuiz();
        } else {
            completeQuiz();
        }
    }

    function applyAdaptiveBonus(value) {
        // [time, budget, physical, social, creativity, technical]
        switch(value) {
            case 'indoor': state.userVector[2] *= 0.8; break; // reduce physical slightly
            case 'outdoor': state.userVector[2] = Math.min(1, state.userVector[2] * 1.2); break;
            case 'fast': state.userVector[0] *= 0.7; break; // less time
            case 'slow': state.userVector[0] = Math.min(1, state.userVector[0] * 1.3); break;
            case 'relax': state.userVector[2] *= 0.5; state.userVector[5] *= 0.5; break;
            case 'growth': state.userVector[5] = Math.min(1, state.userVector[5] * 1.2); break;
        }
    }

    function handleBack() {
        if (state.quizStep > 0) {
            state.quizStep--;
            renderQuiz();
        }
    }

    function completeQuiz() {
        state.recommendations = Engine.recommend(state.userVector);
        state.personalityType = Engine.getPersonalityType(state.userVector);
        
        // Save to localStorage
        localStorage.setItem('hobbyAI_state', JSON.stringify({
            recommendations: state.recommendations,
            personalityType: state.personalityType,
            userVector: state.userVector
        }));

        switchView('results-view');
    }

    function renderResults() {
        // Personality Badge
        document.getElementById('user-personality-badge').querySelector('.badge-type').innerText = state.personalityType;
        
        // Cards
        elements.resultsGrid.innerHTML = state.recommendations.map((hobby, idx) => `
            <div class="result-card animate-up ${idx === 0 ? 'match-gold' : ''}" style="animation-delay: ${idx * 0.15}s">
                <div class="match-score">${hobby.matchPercentage}%</div>
                <div class="confidence-indicator ${hobby.confidence.toLowerCase()}">
                    ● ${hobby.confidence} Confidence
                </div>
                <h3>${hobby.name}</h3>
                <p>${hobby.description}</p>
                <div class="card-tags">
                   <span class="card-tag">${hobby.category}</span>
                   <span class="card-tag">${hobby.costLevel}</span>
                </div>
                <div class="explanation">
                    "${hobby.explanation}"
                </div>
                <button class="btn btn-primary btn-sm" style="margin-top: 1.5rem; width: 100%" onclick="app.showDetail('${hobby.id}')">View Roadmap</button>
            </div>
        `).join('');

        renderAnalytics();
        renderAchievements();
    }

    function renderAchievements() {
        const achievementsGrid = document.createElement('div');
        achievementsGrid.className = 'achievements-section animate-up delay-2';
        achievementsGrid.innerHTML = '<h3>Achievements Unlocked</h3><div class="achievements-list"></div>';
        
        const list = achievementsGrid.querySelector('.achievements-list');
        const badges = [];

        if (state.userVector[4] > 0.8) badges.push({ icon: '🎨', title: 'Creative Mind', desc: 'High emphasis on creation' });
        if (state.userVector[2] > 0.8) badges.push({ icon: '🏔️', title: 'Explorer', desc: 'High physical energy' });
        if (state.userVector[1] < 0.3) badges.push({ icon: '💰', title: 'Frugal Master', desc: 'Budget-conscious choice' });
        if (state.userVector[5] > 0.8) badges.push({ icon: '💻', title: 'Tech Wizard', desc: 'Deep technical interest' });
        if (state.userVector[3] > 0.8) badges.push({ icon: '🤝', title: 'Social Butterfly', desc: 'People-first approach' });

        if (badges.length === 0) badges.push({ icon: '🌟', title: 'Curious Soul', desc: 'Ready for a new adventure' });

        list.innerHTML = badges.map(b => `
            <div class="achievement-item">
                <span class="achievement-icon">${b.icon}</span>
                <div class="achievement-info">
                    <strong>${b.title}</strong>
                    <p>${b.desc}</p>
                </div>
            </div>
        `).join('');

        // Append after the results grid or within the dashboard
        const dashboard = document.querySelector('.analytics-preview');
        dashboard.appendChild(achievementsGrid);
    }

    function renderAnalytics() {
        const container = document.getElementById('analytics-charts');
        // Simple distribution chart of categories in top 5
        const categories = {};
        state.recommendations.forEach(h => {
            categories[h.category] = (categories[h.category] || 0) + 1;
        });

        container.innerHTML = `
            <div class="bar-chart">
                <p>Category Distribution</p>
                ${Object.entries(categories).map(([name, count]) => `
                    <div class="bar-item">
                        <small>${name}</small>
                        <div class="bar">
                            <div class="bar-fill" style="width: ${(count/5)*100}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="bar-chart">
                <p>Preference Match</p>
                <small>Average Similarity: ${Math.round(state.recommendations.reduce((acc, h) => acc + h.similarity, 0) / 5 * 100)}%</small>
                <div class="bar"><div class="bar-fill" style="width: ${state.recommendations[0].similarity * 100}%"></div></div>
            </div>
        `;
    }

    function showDetail(id) {
        const hobby = state.recommendations.find(h => h.id === id) || hobbies.find(h => h.id === id);
        if (!hobby) return;

        switchView('detail-view');
        elements.hobbyDetail.innerHTML = `
            <div class="detail-header animate-up">
                <button class="btn btn-secondary btn-sm" onclick="app.backToResults()">← Back to Results</button>
                <h1 style="margin-top: 1.5rem">${hobby.name}</h1>
                <p class="hero-p">${hobby.description}</p>
            </div>

            <div class="roadmap animate-up delay-1">
                <div class="roadmap-step">
                    <h4><span>🚀</span> Days 1-30</h4>
                    <p>${hobby.roadmap.day30}</p>
                </div>
                <div class="roadmap-step">
                    <h4><span>⚙️</span> Days 31-60</h4>
                    <p>${hobby.roadmap.day60}</p>
                </div>
                <div class="roadmap-step">
                    <h4><span>🏆</span> Days 61-90</h4>
                    <p>${hobby.roadmap.day90}</p>
                </div>
            </div>

            <div class="starter-section glass-card animate-up delay-2" style="padding: 2rem; border-radius: 20px">
                <h3>Starter Kit</h3>
                <ul style="margin: 1.5rem 0; padding-left: 1.5rem">
                    ${hobby.starterKit.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <p><strong>Estimated Cost:</strong> ${hobby.estimatedCost}</p>
                <div style="margin-top: 2rem">
                    <h4>Resources</h4>
                    <div style="display: flex; gap: 1rem; margin-top: 1rem">
                        ${hobby.resources.map(res => `<span class="card-tag">${res}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    function toggleTheme() {
        state.isDarkMode = !state.isDarkMode;
        document.body.classList.toggle('dark-theme', state.isDarkMode);
        document.body.classList.toggle('light-theme', !state.isDarkMode);
        elements.themeIcon.innerText = state.isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('hobbyAI_dark', state.isDarkMode);
    }

    function resetApp() {
        state.quizStep = 0;
        state.userAnswers = [];
        state.userVector = [0, 0, 0, 0, 0, 0];
        localStorage.removeItem('hobbyAI_state');
        switchView('landing-view');
    }

    // Expose functions for inline onclick handlers
    window.app = {
        showDetail,
        backToResults: () => switchView('results-view'),
        reset: resetApp
    };

    init();
});
