/**
 * Recommendation Engine Logic
 * Handles vector math, personality detection, and scoring.
 */

const Engine = {
    // dimensions: [time, budget, physical, social, creativity, technical]
    
    /**
     * Calculate Cosine Similarity between two vectors
     */
    cosineSimilarity: function(vecA, vecB) {
        let dotProduct = 0;
        let mA = 0;
        let mB = 0;
        
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            mA += vecA[i] * vecA[i];
            mB += vecB[i] * vecB[i];
        }
        
        mA = Math.sqrt(mA);
        mB = Math.sqrt(mB);
        
        if (mA === 0 || mB === 0) return 0; // Prevent division by zero
        
        return dotProduct / (mA * mB);
    },

    /**
     * Hybrid Scoring: 70% matching, 30% popularity
     */
    calculateHybridScore: function(similarity, popularityScore) {
        return (0.7 * similarity) + (0.3 * popularityScore);
    },

    /**
     * Classify personality based on the user vector
     */
    getPersonalityType: function(vector) {
        const [time, budget, physical, social, creativity, technical] = vector;
        
        // Find the dominant traits
        const traits = [
            { name: 'Explorer', score: physical * 0.6 + social * 0.4 },
            { name: 'Creator', score: creativity * 0.7 + technical * 0.3 },
            { name: 'Thinker', score: technical * 0.6 + time * 0.4 },
            { name: 'Socializer', score: social * 0.7 + physical * 0.3 }
        ];
        
        traits.sort((a, b) => b.score - a.score);
        return traits[0].name;
    },

    /**
     * Get confidence Level
     */
    getConfidenceLevel: function(score) {
        if (score > 0.8) return 'High';
        if (score > 0.5) return 'Medium';
        return 'Low';
    },

    /**
     * Generate Explanation
     */
    generateExplanation: function(userVec, hobby) {
        const labels = ['time availability', 'budget', 'physical activity', 'social interaction', 'creativity', 'technical depth'];
        const matches = [];
        
        // Find dimensions where both are > 0.5 or hobby matches a high user preference
        for (let i = 0; i < userVec.length; i++) {
            if (userVec[i] > 0.6 && hobby.vector[i] > 0.6) {
                matches.push(labels[i]);
            }
        }
        
        if (matches.length === 0) {
            // Fallback: find the single best match
            let bestIdx = 0;
            let diff = 1;
            for(let i=0; i<userVec.length; i++) {
                let d = Math.abs(userVec[i] - hobby.vector[i]);
                if(d < diff) {
                    diff = d;
                    bestIdx = i;
                }
            }
            matches.push(labels[bestIdx]);
        }

        const matchStr = matches.slice(0, 3).join(', ');
        return `Recommended because it aligns with your preference for ${matchStr}.`;
    },

    /**
     * Recommend Top 5 Hobbies
     */
    recommend: function(userVector) {
        const scoredHobbies = hobbies.map(hobby => {
            const similarity = this.cosineSimilarity(userVector, hobby.vector);
            const hybridScore = this.calculateHybridScore(similarity, hobby.popularityScore);
            
            return {
                ...hobby,
                similarity: similarity,
                matchPercentage: Math.round(hybridScore * 100),
                confidence: this.getConfidenceLevel(hybridScore),
                explanation: this.generateExplanation(userVector, hobby),
                personalityType: this.getPersonalityType(userVector)
            };
        });

        // Sort by hybrid score descending
        scoredHobbies.sort((a, b) => b.matchPercentage - a.matchPercentage);
        
        return scoredHobbies.slice(0, 5);
    }
};

window.Engine = Engine;
