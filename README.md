# HobbyAI | Advanced AI-Powered Recommendation System ✨

HobbyAI is a production-level **Skill-Based Recommendation System** designed to help users find their next hobby through a data-driven approach. By analyzing user-specific constraints—such as time, budget, and social preferences—HobbyAI provides personalized matches and actionable roadmaps to get started.

This **Advanced Edition** introduces Machine Learning vector modeling, Real-Time environment contextualization, Reinforcement Learning, and a functional NLP Chatbot.

## 🚀 Key Features

- **Adaptive 6D Vector Assessment**: Assesses your profile across 6 key dimensions (Time, Budget, Physical, Social, Creativity, Technical).
- **Gamified Dashboard**: Persistent user accounts (via LocalStorage) with Leveling, Experience Points (XP), unlockable badges, and history logs.
- **Context-Aware Intelligence**: Dynamically fetches your local weather (via Open-Meteo) and time-of-day to bias the AI's recommendations.
- **NLP Chatbot & Voice Agent**: Ask for hobby suggestions using conversational text or **Web Speech API** voice recognition. Chatbot natively renders rich HTML interactive cards.
- **Modern & Premium UI**: Features a glassmorphic design, smooth animations, dynamic CSS variables, and full Dark/Light Mode support.

---

## 🧠 How the AI & Algorithms Work

Here is a breakdown of exactly how the **Artificial Intelligence (AI)**, **Machine Learning (ML)**, **Reinforcement Learning (RL)**, and the **Chatbot** algorithms operate beneath the surface:

### 1. Machine Learning (Vector Mathematics & Cosine Similarity)
Instead of using basic "if/then" statements to guess what hobby you want, the application uses **Dimensional Vector Mapping**, which is a foundational concept in real Machine Learning models (like Neural Networks).
* **The Vectors:** Every single hobby is assigned a "6D Vector" — an array of 6 numbers scaled from `0.0` to `1.0`. For example, `[Time, Budget, Physical, Social, Creativity, Technical]`.
* **The User Profile:** When you take the Quiz, your answers generate a matching 6D User Vector.
* **The Math:** The engine uses a mathematical formula called **Cosine Similarity** to measure the exact distance/angle between your Vector and every Hobby's Vector in 6-dimensional space.
* **Hybrid Scoring:** It takes that Cosine score, adds a **Popularity Bias** (so highly rated hobbies float up slightly), and applies a **Context Boost** (e.g., if it's currently raining outside, it mathematically boosts hobbies tagged with `indoor` by +15%!).

### 2. Reinforcement Learning (The Feedback Loop)
Real AI systems learn from user behavior over time. The application implements a true RL feedback loop in the backend simulator.
* **The Baseline:** When a user registers, they are given an array of 6 weights all set to `1.0` (Neutral).
* **The Reward:** Every time a user clicks "View Details" or "Accept Challenge" on a specific hobby, the system receives a "Reward Signal".
* **The Adjustment:** The system looks at the 6D Vector of the hobby the user clicked on, and mathematically shifts the user's hidden weights closer to that hobby's vector using a Learning Rate (`lr = 0.05`).
* **The Result:** The next time that user takes the assessment, their original quiz answers are multiplied by their newly evolved weights. The system dynamically learns their *implicit* tastes (what they click on) rather than just their *explicit* tastes (what they answered in the quiz).

### 3. The NLP Chatbot (Entity Extraction & Semantic Parsing)
The Chatbot doesn't use a heavy external LLM (like ChatGPT) so it can run entirely offline/locally for free. Instead, it simulates **Natural Language Processing (NLP)** algorithms directly in the browser.
* **Intent Recognition:** If you type conversational triggers like *"What is my level?"*, it intercepts the intent and queries the database, responding dynamically with your gamification stats.
* **Word Embeddings Proxy:** It uses a dictionary of over 40 root words (e.g., *"sweat", "code", "paint", "friends"*) to semantically guess which of the 6 core categories your sentence is leaning towards.
* **Constraint Filtering:** It applies hard numeric limits to the neural vectors based on adjectives. If you type *"cheap"* or *"free"*, the bot physically loops through the dataset and deletes any hobby where the `Budget` vector is > `0.35` before making its final choice.
* **Voice-to-Text Integration:** When you click the Microphone icon, the `Web Speech API` transcribes your raw audio into text and silently feeds it directly into this identical Chatbot NLP pipeline!

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, Semantic Structure.
- **Styling**: Vanilla CSS3, Glassmorphism, Keyframe Animations.
- **Logic / AI**: Vanilla JavaScript (ES6+), LocalStorage for DB simulation, Web Speech API.
- **APIs**: Context-awareness powered by Geolocation API and Open-Meteo.

## 📁 Project Structure

```text
recommendation_mini_project/
├── index.html          # Main SPA Entry Point (UI Layout & Chatbot Modal)
├── style.css           # Premium Styling System (Dark Mode + Glassmorphism)
├── app.js              # Core Engine (Cosine Similarity, RL Loop, NLP Chatbot Parser)
├── api.js              # Real-Time Context API (Weather & Time fetching)
├── auth.js             # LocalStorage Backend (Gamification, User State, XP)
├── hobbies.js          # Expanded 6D Vector Hobby Database
├── system_architecture.pdf
├── workflow.pdf
└── README.md
```

## 🚥 Getting Started

1. Clone or download this repository.
2. Open `index.html` in a modern web browser (Google Chrome heavily recommended for Voice API support).
3. If prompted, **Allow Location Access** for the live context engine to work correctly.
4. Create an account via the "Login / Profile" button to track your Level and Reinforcement Learning weights.

## 🎓 Author

- **Mihir Sable** - *Initial Work & Implementation*
