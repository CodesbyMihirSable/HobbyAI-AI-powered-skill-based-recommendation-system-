/**
 * AI Recommendation System - Main Logic Module
 * Features: View Routing, Quiz, Machine Learning scoring, Real-time APIs, Chatbot
 */

document.addEventListener('DOMContentLoaded', async () => {
    // DOM Elements
    const views = {
        landing: document.getElementById('landing-view'),
        quiz: document.getElementById('quiz-view'),
        results: document.getElementById('results-view'),
        detail: document.getElementById('detail-view'),
        dashboard: document.getElementById('dashboard-view')
    };

    // Quiz Questions (aiming to generate a 6D vector: time, budget, physical, social, creativity, technical)
    const questions = [
        { text: "How much free time do you realistically have per week?", dim: 0, opts: [{text:"1-2 hours", val:0.1}, {text:"3-5 hours", val:0.4}, {text:"6-10 hours", val:0.7}, {text:"10+ hours", val:1.0}] },
        { text: "What is your budget for a new hobby?", dim: 1, opts: [{text:"Virtually zero", val:0.1}, {text:"Under $50/mo", val:0.3}, {text:"$100 - $200", val:0.6}, {text:"Money is no object", val:1.0}] },
        { text: "Do you prefer sitting down or breaking a sweat?", dim: 2, opts: [{text:"Couch potato", val:0.1}, {text:"Light movement", val:0.4}, {text:"Active", val:0.7}, {text:"Intense workout", val:1.0}] },
        { text: "Do you want to do this alone or with others?", dim: 3, opts: [{text:"Alone time", val:0.1}, {text:"Small groups", val:0.5}, {text:"Highly social", val:0.9}] },
        { text: "How much creative expression do you desire?", dim: 4, opts: [{text:"None, give me rules", val:0.1}, {text:"Some room to explore", val:0.5}, {text:"Total creative freedom", val:1.0}] },
        { text: "Are you interested in technical, logical, or digital systems?", dim: 5, opts: [{text:"Not at all", val:0.1}, {text:"A little bit", val:0.4}, {text:"Love technology/logic", val:0.9}] }
    ];

    let currentQuestionIdx = 0;
    let userVector = [0, 0, 0, 0, 0, 0];
    
    // Auth & Navigation State
    let contextData = null;

    // --- Init App ---
    async function initApp() {
        // Fetch context API
        contextData = await window.ContextAPI.fetchRealtimeContext();
        
        // Update Context Bar UI
        const ctxBar = document.getElementById('context-bar');
        const ctxWeather = document.getElementById('ctx-weather');
        const ctxTime = document.getElementById('ctx-time');
        
        if (contextData) {
            ctxBar.classList.remove('hidden');
            ctxWeather.textContent = `${contextData.weather} ${contextData.temperature ? '('+contextData.temperature+'°C)' : ''}`;
            ctxTime.textContent = contextData.timeOfDay.charAt(0).toUpperCase() + contextData.timeOfDay.slice(1);
        }

        updateAuthUI();
        setupEventListeners();
    }

    // --- UI Routing ---
    function switchView(viewId) {
        Object.values(views).forEach(v => v.classList.remove('active'));
        views[viewId].classList.add('active');
        window.scrollTo(0,0);
    }

    // --- Interaction Binding ---
    function setupEventListeners() {
        // Nav actions
        document.getElementById('go-home').addEventListener('click', () => switchView('landing'));
        document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
        document.getElementById('auth-trigger-btn').addEventListener('click', openAuthModal);
        
        // Auth Modal
        document.getElementById('close-auth').addEventListener('click', () => document.getElementById('auth-modal').classList.add('hidden'));
        document.getElementById('auth-form').addEventListener('submit', handleLogin);
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
        document.getElementById('view-dash-btn').addEventListener('click', () => {
            document.getElementById('auth-modal').classList.add('hidden');
            loadDashboard();
        });

        // Dashboard
        document.getElementById('back-to-results').addEventListener('click', () => switchView('results'));
        
        // Chatbot
        const chatToggle = document.getElementById('chatbot-toggle');
        chatToggle.addEventListener('click', () => {
            document.getElementById('chatbot-widget').classList.toggle('collapsed');
        });
        document.getElementById('chat-send').addEventListener('click', handleChatSubmit);
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSubmit();
        });

        // Voice API
        document.getElementById('voice-search-btn').addEventListener('click', startVoiceRecognition);
        document.getElementById('stop-voice').addEventListener('click', stopVoiceRecognition);

        // Theme
        const themeBtn = document.getElementById('theme-toggle');
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.body.classList.toggle('dark-theme');
            themeBtn.querySelector('span').textContent = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
        });
    }

    // --- Quiz Logic ---
    function startQuiz() {
        currentQuestionIdx = 0;
        userVector = [0, 0, 0, 0, 0, 0];
        renderQuestion();
        switchView('quiz');
    }

    function renderQuestion() {
        const q = questions[currentQuestionIdx];
        document.getElementById('question-text').textContent = q.text;
        document.getElementById('quiz-step-text').textContent = `Question ${currentQuestionIdx + 1} of ${questions.length}`;
        document.getElementById('quiz-progress').style.width = `${((currentQuestionIdx+1)/questions.length)*100}%`;

        const optsGrid = document.getElementById('options-grid');
        optsGrid.innerHTML = '';
        
        q.opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt.text;
            btn.onclick = () => answerQuestion(q.dim, opt.val);
            optsGrid.appendChild(btn);
        });
    }

    function answerQuestion(dimIndex, value) {
        userVector[dimIndex] = value;
        if (currentQuestionIdx < questions.length - 1) {
            currentQuestionIdx++;
            renderQuestion();
        } else {
            generateRecommendations();
        }
    }

    // --- Machine Learning Core Engine ---
    function cosineSimilarity(a, b) {
        let dot = 0, magA = 0, magB = 0;
        for (let i=0; i<6; i++) {
            dot += a[i] * b[i];
            magA += a[i]*a[i];
            magB += b[i]*b[i];
        }
        if (magA===0 || magB===0) return 0;
        return dot / (Math.sqrt(magA) * Math.sqrt(magB));
    }

    function generateRecommendations() {
        // Fetch Auth RL Weights + Context
        const rlWeights = window.AuthManager.getRLWeights(); 
        const ctxTags = window.ContextAPI.getActiveContextTags(); // e.g. ['evening', 'rainy', 'indoor']
        
        // Calculate hybrid scores for all hobbies
        const scored = window.hobbies.map(hobby => {
            // Context Bonus (Machine Learning Proxy)
            let contextBonus = 0;
            hobby.contextTags.forEach(tag => {
                if (ctxTags.includes(tag)) contextBonus += 0.15;
            });
            contextBonus = Math.min(contextBonus, 0.4); // Max 0.4 context bonus
            
            // Weighted Vector matching
            const weightedUser = userVector.map((v, i) => v * rlWeights[i]);
            const similarity = cosineSimilarity(weightedUser, hobby.vector);
            
            // Hybrid logic (50% cosine, 20% popularity, 30% Context/ML)
            const finalScore = (0.5 * similarity) + (0.2 * hobby.popularityScore) + (0.3 * (0.6 + contextBonus));
            
            return {
                ...hobby,
                score: finalScore,
                matchPct: Math.round(finalScore * 100)
            };
        });

        // Rank
        scored.sort((a,b) => b.score - a.score);
        const top5 = scored.slice(0, 5);

        renderResults(top5);
        
        // Log to gamification system
        window.AuthManager.logHistory('Completed Quiz', `Top Match: ${top5[0].name}`);
        window.AuthManager.addXP(20);
        
        switchView('results');
    }

    // --- Results & Detail Rendering ---
    function renderResults(matches) {
        const grid = document.getElementById('results-grid');
        grid.innerHTML = '';
        
        matches.forEach(m => {
            const card = document.createElement('div');
            card.className = 'hobby-card glass-card';
            card.innerHTML = `
                <span class="hobby-category">${m.category}</span>
                <h3>${m.name}</h3>
                <div class="hobby-stats">
                    <span>⏱ ${m.timeCommitment}</span>
                    <span>💰 ${m.costEstimate.split(' ')[0]}</span>
                </div>
                <div class="match-score">
                    <span>AI Match Confidence</span>
                    <div class="score-circle">${m.matchPct}%</div>
                </div>
                <button class="btn btn-primary btn-sm w-full mt-4">Explore Path →</button>
            `;
            
            card.querySelector('.btn').onclick = () => showDetail(m);
            grid.appendChild(card);
        });
    }

    function showDetail(hobby) {
        // RL loop trigger (Reward)
        window.AuthManager.updateRLWeights(hobby.vector, true);
        window.AuthManager.logHistory('Viewed Detail', hobby.name);

        const content = document.getElementById('hobby-detail-content');
        
        let roadmapHTML = '<ul class="roadmap-list">';
        hobby.roadmap.forEach(r => roadmapHTML += `<li>✅ ${r}</li>`);
        roadmapHTML += '</ul>';

        content.innerHTML = `
            <h2>${hobby.name}</h2>
            <span class="badge-pill mb-4">${hobby.category}</span>
            <p><strong>Cost Forecast:</strong> ${hobby.costEstimate}</p>
            <p><strong>Time Needed:</strong> ${hobby.timeCommitment}</p>
            <p><strong>Perfect for:</strong> ${hobby.contextTags.join(', ')}</p>
            <hr style="margin:20px 0; border:none; border-top:1px solid var(--surface-border)">
            <h3>Your Learning Roadmap</h3>
            ${roadmapHTML}
            <button id="accept-hobby" class="btn btn-success mt-4 bg-green-600 text-white p-2 rounded">Accept Challenge (+50 XP)</button>
        `;
        
        switchView('detail');

        document.getElementById('accept-hobby').onclick = (e) => {
            const res = window.AuthManager.addXP(50);
            window.AuthManager.logHistory('Started Hobby', hobby.name);
            e.target.innerHTML = "Subscribed to Hobby!";
            e.target.disabled = true;
            if(res.levelUp) alert(`Level Up! You are now Level ${res.newLevel} (${res.title})`);
        };
    }

    // --- Dashboard & Auth Logic ---
    function updateAuthUI() {
        const btn = document.getElementById('auth-trigger-btn');
        if (window.AuthManager.currentUser) {
            btn.textContent = window.AuthManager.currentUser.username;
        } else {
            btn.textContent = "Login / Profile";
        }
    }

    function openAuthModal() {
        const modal = document.getElementById('auth-modal');
        const form = document.getElementById('auth-form');
        const profile = document.getElementById('auth-profile');
        
        modal.classList.remove('hidden');
        if (window.AuthManager.currentUser) {
            form.classList.add('hidden');
            profile.classList.remove('hidden');
            document.getElementById('logged-username').textContent = window.AuthManager.currentUser.username;
        } else {
            form.classList.remove('hidden');
            profile.classList.add('hidden');
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('auth-username').value;
        if(window.AuthManager.login(username)) {
            updateAuthUI();
            openAuthModal();
        }
    }

    function handleLogout() {
        window.AuthManager.logout();
        updateAuthUI();
        document.getElementById('auth-modal').classList.add('hidden');
        switchView('landing');
    }

    function loadDashboard() {
        if (!window.AuthManager.currentUser) return switchView('landing');
        
        const user = window.AuthManager.currentUser;
        document.getElementById('dash-username').textContent = user.username;
        document.getElementById('dash-level').textContent = user.level;
        document.getElementById('dash-title').textContent = window.AuthManager.levelNames[user.level - 1] || "Master";
        
        const currThresh = window.AuthManager.levelThresholds[user.level - 1] || 0;
        const nextThresh = window.AuthManager.levelThresholds[user.level] || user.xp;
        
        document.getElementById('dash-xp').textContent = user.xp;
        document.getElementById('dash-xp-next').textContent = nextThresh;
        
        const prog = ((user.xp - currThresh) / (nextThresh - currThresh)) * 100;
        document.getElementById('dash-xp-fill').style.width = `${prog}%`;

        // Badges
        const bgContainer = document.getElementById('dash-badges');
        bgContainer.innerHTML = '';
        user.badges.forEach(b => {
            const sp = document.createElement('span');
            sp.className = 'badge';
            sp.textContent = b;
            bgContainer.appendChild(sp);
        });

        // History
        const histContainer = document.getElementById('dash-history');
        histContainer.innerHTML = '';
        [...user.history].reverse().slice(0, 10).forEach(h => {
            const li = document.createElement('li');
            const d = new Date(h.date).toLocaleDateString();
            li.innerHTML = `<strong>${h.action}</strong>: ${h.details} <span class="history-date">${d}</span>`;
            histContainer.appendChild(li);
        });

        switchView('dashboard');
    }

    // --- Chatbot Logic ---
    function handleChatSubmit() {
        const input = document.getElementById('chat-input');
        const txt = input.value.trim();
        if (!txt) return;

        appendChatMessage(txt, 'user');
        input.value = '';

        setTimeout(() => {
            processChatbotNLP(txt);
        }, 600);
    }

    function appendChatMessage(text, sender) {
        const box = document.getElementById('chat-messages');
        const d = document.createElement('div');
        d.className = `msg ${sender}`;
        d.textContent = text;
        box.appendChild(d);
        box.scrollTop = box.scrollHeight;
    }

    function processChatbotNLP(query) {
        const q = query.toLowerCase();
        let targetCats = [];
        
        // Simple NLP Keyword matching
        if (q.includes('creative') || q.includes('art')) targetCats.push('Creative Arts');
        if (q.includes('tech') || q.includes('code') || q.includes('computer')) targetCats.push('Technology');
        if (q.includes('active') || q.includes('fitness') || q.includes('sport')) targetCats.push('Fitness & Outdoors');
        
        let filtered = window.hobbies;
        if (targetCats.length > 0) {
            filtered = filtered.filter(h => targetCats.includes(h.category) || targetCats.includes(h.category.split(' ')[0]));
        }

        if (q.includes('cheap') || q.includes('low budget') || q.includes('free')) {
            filtered = filtered.filter(h => h.vector[1] < 0.4); 
        }

        if (filtered.length === 0) filtered = window.hobbies; // Fallback
        
        const selection = filtered[Math.floor(Math.random() * filtered.length)];
        
        appendChatMessage(`Based on your input, check out: ${selection.name}! It's a great match. Explore it in the AI quiz results!`, 'system');
    }

    // --- Voice Recognition Setup ---
    let recognition = null;
    function startVoiceRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech Recognition API not supported in this browser.');
            return;
        }
        
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        document.getElementById('voice-overlay').classList.remove('hidden');
        document.getElementById('voice-transcript').textContent = 'Listening...';

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('voice-transcript').textContent = `Heard: "${transcript}"`;
            
            setTimeout(() => {
                stopVoiceRecognition();
                // If chatbot is open, send there. Otherwise open chatbot and send.
                document.getElementById('chatbot-widget').classList.remove('collapsed');
                appendChatMessage(transcript, 'user');
                processChatbotNLP(transcript);
            }, 1000);
        };

        recognition.onerror = function(event) {
            document.getElementById('voice-transcript').textContent = 'Error: ' + event.error;
            setTimeout(stopVoiceRecognition, 2000);
        };

        recognition.start();
    }

    function stopVoiceRecognition() {
        if(recognition) recognition.stop();
        document.getElementById('voice-overlay').classList.add('hidden');
    }

    // --- Boot ---
    initApp();

});
