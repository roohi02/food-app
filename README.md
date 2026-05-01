Food App – AI-Powered Mobile Experience

A modern cross-platform mobile application built with React Native that combines AI-driven recipe generation with location-based restaurant discovery.

This project demonstrates end-to-end mobile development, including UI/UX design, API integration, AI features, and scalable architecture.

🚀 Features
🤖 AI Meal Assistant
Generate recipes from user-provided ingredients
Cuisine-aware suggestions (Indian, Italian, Chinese\, etc.)
Structured recipe output (ingredients, steps, calories)
Powered by LLM integration (Groq API)

🍽️ Order Food (Nearby Restaurants)
Fetch nearby restaurants using OpenStreetMap (Overpass API)
Cuisine-based filtering (Indian, Italian, Chinese, Fast Food)
Dynamic restaurant listing with ratings (simulated)
Image enrichment using external APIs

🔍 Recipe Discovery
Browse recipes by category
Search recipes dynamically
Clean card-based UI for better user experience

🧠 AI Integration
Integrated LLM-based recipe generation using Groq API
Prompt-engineered structured outputs for consistent UI rendering
Built reusable parsing logic to convert AI text → structured data
Designed fallback handling for incomplete AI responses

🗺️ Location & Data
Used OpenStreetMap (Overpass API) for nearby restaurant data
Implemented fallback strategy due to API limitations (no images/ratings)
Handled real-world API inconsistencies (timeouts, non-JSON responses)
🧱 Tech Stack
📱 Mobile
React Native (Expo)
TypeScript
React Navigation
🎨 UI/UX
Custom reusable components
Responsive layouts for different screen sizes
FlatList optimization for performance
🔗 APIs & Data
Groq API (AI recipes)
OpenStreetMap Overpass API (location data)
TheMealDB (image fallback for recipes)
🧰 State & Logic
React Hooks (useState, useEffect)
Async data handling
Debounced search
⚙️ DevOps & Tools
Git & GitHub
Environment variables for secure API handling
Expo development workflow
