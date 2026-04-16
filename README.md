# Project Name:CareerPilot AI

## Problem Statement
Standard career roadmaps are static and fail to account for a user's specific academic background. Students often face a "Logic Gap"—they know the syntax of a language but don't know how to apply it to industry-level system design or pass high-level technical interviews.

## Project Description
CareerPilot AI is a generative career mentor. It analyzes a user's degree and target role to architect a bespoke 30-day mastery roadmap. Unlike static lists, it provides an interactive technical interview coach that evaluates the logical depth of answers. It uses local persistence to track progress, ensuring the AI-generated guidance remains available throughout the user's journey.

---

## Google AI Usage:
Tools / Models Used:
Model: Gemini 3 Flash (Preview)
Interface: Gemini CLI (for logic prototyping and persona fine-tuning)
Google Gemini

### How Google AI Was Used
Generative Roadmapping: We integrated Gemini to calculate the "Technical Delta" between a user's current education and their career goal, generating a non-linear syllabus.

Contextual Interviewing: The interview engine uses Gemini’s reasoning to act as a Senior Principal Engineer, providing feedback on architectural logic rather than just keyword matching.

Resume Optimization: Gemini scans user input to identify missing high-leverage keywords required for modern ATS filters.

---

## Proof of Google AI Usage
Attach screenshots in a `/proof` folder:
https://github.com/fn-12-fn/CareerPilotAi

---

## Screenshots 
Add project screenshots:

https://github.com/fn-12-fn/CareerPilotAi
---

## Demo Video
Upload your demo video to Google Drive and paste the shareable link here(max 3 minutes).
https://drive.google.com/file/d/1WdqJ9GGbIzheYVHWtauzFOBuQye24Q87/view?usp=sharing

---

## Installation Steps

# Clone the repository
git clone https://github.com/Fn-12-Fn/CareerPilotAi

# Go to project folder
cd CareerPilotAi

# Usage:
# This is a client-side application. No backend installation is required.
# Simply open 'index.html' in any modern web browser to start.
