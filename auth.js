/**
 * AI Recommendation System - Auth & Gamification Module
 * Uses localStorage as a simple DB for user persistence.
 */

const AuthManager = {
    currentUser: null,
    
    // XP requirements per level
    levelThresholds: [0, 100, 250, 500, 1000, 2000],
    levelNames: ["Newcomer", "Novice", "Explorer", "Enthusiast", "Expert", "Master"],

    init: function() {
        const stored = localStorage.getItem('hobbyai_user');
        if (stored) {
            this.currentUser = JSON.parse(stored);
        }
    },

    login: function(username) {
        if (!username || username.trim() === '') return false;
        
        let users = JSON.parse(localStorage.getItem('hobbyai_accounts') || '{}');
        
        if (!users[username]) {
            // New user registration
            users[username] = {
                username: username,
                xp: 0,
                level: 1,
                badges: ['Curious Mind'],
                history: [],
                rlWeights: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0], // time, budget, physical, social, creativity, technical
                joinDate: new Date().toISOString()
            };
            localStorage.setItem('hobbyai_accounts', JSON.stringify(users));
        }

        this.currentUser = users[username];
        this.saveSession();
        return true;
    },

    logout: function() {
        this.currentUser = null;
        localStorage.removeItem('hobbyai_user');
    },

    saveSession: function() {
        if (!this.currentUser) return;
        localStorage.setItem('hobbyai_user', JSON.stringify(this.currentUser));
        
        let users = JSON.parse(localStorage.getItem('hobbyai_accounts') || '{}');
        users[this.currentUser.username] = this.currentUser;
        localStorage.setItem('hobbyai_accounts', JSON.stringify(users));
    },

    addXP: function(amount) {
        if (!this.currentUser) return { levelUp: false };
        
        this.currentUser.xp += amount;
        
        let levelUp = false;
        let newLevel = this.currentUser.level;
        
        // Check level up
        for (let i = this.currentUser.level; i < this.levelThresholds.length; i++) {
            if (this.currentUser.xp >= this.levelThresholds[i]) {
                newLevel = i + 1;
            }
        }
        
        if (newLevel > this.currentUser.level) {
            this.currentUser.level = newLevel;
            levelUp = true;
            this.checkBadges();
        }
        
        this.saveSession();
        return { 
            levelUp, 
            newLevel: this.currentUser.level, 
            title: this.levelNames[this.currentUser.level - 1] 
        };
    },

    checkBadges: function() {
        if (!this.currentUser) return;
        
        const badges = this.currentUser.badges;
        const addBadge = (b) => { if (!badges.includes(b)) badges.push(b); };
        
        if (this.currentUser.level >= 2) addBadge('Novice Explorer');
        if (this.currentUser.level >= 4) addBadge('Hobby Guru');
        if (this.currentUser.history.length >= 5) addBadge('Active Learner');
    },

    logHistory: function(action, details) {
        if (!this.currentUser) return;
        this.currentUser.history.push({
            date: new Date().toISOString(),
            action,
            details
        });
        
        // Keep history trim
        if (this.currentUser.history.length > 50) {
            this.currentUser.history.shift();
        }
        this.saveSession();
    },

    /**
     * Reinforcement Learning: Update user preference weights based on feedback
     */
    updateRLWeights: function(hobbyVector, liked) {
        if (!this.currentUser) return;
        
        const lr = 0.05; // learning rate
        const direction = liked ? 1 : -0.5; // heavy penalty for ignore, small reward for like
        
        for (let i = 0; i < 6; i++) {
            // Move weight towards the vector of the liked hobby (or away if disliked)
            // Weight bounds: [0.1 to 2.0]
            this.currentUser.rlWeights[i] += (hobbyVector[i] * lr * direction);
            
            // Normalize clamp
            if (this.currentUser.rlWeights[i] < 0.1) this.currentUser.rlWeights[i] = 0.1;
            if (this.currentUser.rlWeights[i] > 2.0) this.currentUser.rlWeights[i] = 2.0;
        }
        
        this.saveSession();
    },

    getRLWeights: function() {
        return this.currentUser ? this.currentUser.rlWeights : [1,1,1,1,1,1];
    }
};

AuthManager.init();
window.AuthManager = AuthManager;
