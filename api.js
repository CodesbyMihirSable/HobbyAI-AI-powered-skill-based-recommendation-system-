/**
 * AI Recommendation System - API Module
 * Handles external data fetching (Weather, Time of Day, Location)
 */

const ContextAPI = {
    state: {
        timeOfDay: 'anytime',
        weather: 'clear',
        temperature: null,
        isRaining: false,
        location: null
    },

    /**
     * Get current time of day context
     */
    getTimeContext: function() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 21) return 'evening';
        return 'night';
    },

    /**
     * Get User Geolocation and Weather
     */
    fetchRealtimeContext: async function() {
        this.state.timeOfDay = this.getTimeContext();

        return new Promise((resolve) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        this.state.location = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        };
                        await this.fetchWeather(this.state.location.lat, this.state.location.lon);
                        resolve(this.state);
                    },
                    (error) => {
                        console.warn("Geolocation denied or failed. Defaulting to standard context.", error);
                        // Default fallback
                        resolve(this.state);
                    },
                    { timeout: 5000 }
                );
            } else {
                resolve(this.state);
            }
        });
    },

    /**
     * Fetch weather from Open-Meteo (No API key needed)
     */
    fetchWeather: async function(lat, lon) {
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const data = await res.json();
            
            if (data && data.current_weather) {
                const weatherCode = data.current_weather.weathercode;
                this.state.temperature = data.current_weather.temperature;
                
                // WMO Weather interpretation codes
                // 50-69: Drizzle/Rain, 70-79: Snow, 80-99: Showers/Thunderstorm
                if (weatherCode >= 50 && weatherCode <= 99) {
                    this.state.isRaining = true;
                    this.state.weather = 'rainy';
                } else if (weatherCode >= 1 && weatherCode <= 3) {
                    this.state.weather = 'cloudy';
                } else {
                    this.state.weather = 'clear';
                }
            }
        } catch (e) {
            console.error("Weather fetch failed:", e);
        }
    },

    /**
     * Map current context to tags that hobbies might have
     */
    getActiveContextTags: function() {
        const tags = [this.state.timeOfDay, 'anytime'];
        if (this.state.isRaining) tags.push('rainy', 'indoor');
        if (!this.state.isRaining && this.state.timeOfDay !== 'night') tags.push('outdoor', 'clear_sky');
        if (this.state.timeOfDay === 'night') tags.push('night');
        return tags;
    }
};

window.ContextAPI = ContextAPI;
