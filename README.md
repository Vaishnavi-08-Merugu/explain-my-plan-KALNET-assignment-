**Explain My Plan — AI Clarity & Structuring Tool**

Turn your vague idea into a structured, actionable plan in seconds.

Live Demo: https://explain-my-plan-kalnet-assignment-d.vercel.app

GitHub: https://github.com/Vaishnavi-08-Merugu/explain-my-plan-KALNET-assignment-.git

## Project Overview
People often have ideas but struggle to put them into a clear plan. This tool takes any raw idea typed in plain English and instantly structures it into something meaningful and executable.
You type something like: "I want to start a YouTube channel and earn money quickly"
And the app gives you back:
A clearly defined Goal
A Method and Approach
Step-by-step execution plan
Timeline (or flags it if missing)
Missing Elements in your plan
A simplified one-line version of your idea
Practical Actionable Next Steps
A Clarity Score out of 100 with a full breakdown

You can also iterate — refine your input and re-run the analysis
to see your score improve in real time with a before vs after comparison.

## Project Structure

EXPLAIN-MY-PLAN/

├── backend/

│   ├── .env

│   ├── package.json

│   └── server.js

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── assets/

│   │   ├── App.css

│   │   ├── App.jsx

│   │   ├── index.css

│   │   └── main.jsx

│   ├── index.html

│   ├── package.json

│   └── vite.config.js

└── README.md

## Setup Instructions

Prerequisites:

Node.js installed on your machine
A Gemini API key from https://aistudio.google.com

Step 1 — Clone the repository
git clone https://github.com/Vaishnavi-08-Merugu/explain-my-plan-KALNET-assignment-.git
cd explain-my-plan-KALNET-assignment-

Step 2 — Setup the backend
bashcd backend
npm install
Create a .env file inside the backend folder:
GEMINI_API_KEY=your_gemini_api_key_here
Start the backend server:
bashnode server.js
Server runs on: http://localhost:5000

Step 3 — Setup the frontend
Open a new terminal:
bashcd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173

Step 4 — Open in browser
Visit http://localhost:5173 and start analyzing your plans.

## Explanation of Prompt Design

The prompt sent to the AI is carefully structured to always return a consistent and complete JSON response. Here is the approach:
1. Role Definition
The AI is told exactly what it is:
"You are an AI plan analyzer. Your job is to structure raw ideas, identify gaps, and provide actionable guidance."
2. Strict Output Format
The prompt explicitly demands a valid JSON object with defined keys:
goal, method, steps, timeline, missing_elements, simplified_version, action_steps, clarity_score, score_breakdown, and score_explanation. This eliminates unpredictable or unformatted responses.
3. Scoring Rules in the Prompt
The scoring logic is written directly inside the prompt so the AI follows the same rules every time:
goal (0–25): based on how specific the goal is
steps (0–25): based on how many clear steps are present
timeline (0–25): based on whether a timeline exists
completeness (0–25): based on overall plan completeness
clarity_score must always equal the sum of all four
4. Context Awareness
The prompt passes the user's raw input directly so the AI tailor severy response to that specific idea rather than giving generic output.
5. Fallback Logic
When the API is unavailable, a keyword-based detection system identifies the topic from the input and returns a structured response from predefined topic templates covering 10 categories:
YouTube, Business, Freelance, Food, App, Fitness, Study, E-commerce, Blog, and Social Media.

Explanation of Clarity Score Logic
The Clarity Score is a number from 0 to 100 based on 4 components:
ComponentMax ScoreWhat It MeasuresGoal Clarity25How specific and measurable the goal isSteps Defined25Whether clear action steps are presentTimeline25Whether a timeline or deadline is givenCompleteness25Overall completeness of the plan
Final Score = Goal + Steps + Timeline + Completeness

Scoring Rules:

Goal (0–25): 25 if specific and measurable, 15 if somewhat clear, 5 if vague
Steps (0–25): 25 if 3 or more clear steps, 15 if 1–2 steps, 5 if none
Timeline (0–25): 25 if specific timeline given, 10 if vague, 0 if missing
Completeness (0–25): 25 if resources and audience mentioned, 15 if partial, 5 if bare minimum

Score Labels:

80 to 100 → Excellent Plan
65 to 79  → Good Plan
45 to 64  → Needs Refinement
0 to 44   → Very Vague

The breakdown is shown visually on screen as individual progress bars
so the user knows exactly where their plan is weak and what to improve.
