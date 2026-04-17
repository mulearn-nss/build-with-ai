
## Problem Statement
Developing an intelligent assistant that analyzes real-time environmental data and automates complex plant cultivation workflows to improve home gardening productivity.

## Project Description
The AI-Powered Sustainable Plant Companion is an autonomous, location-aware agricultural
intelligence system designed to eliminate the guesswork from plant cultivation and promote
environmental sustainability. By anchoring a plant’s profile to its specific geographic coordinates
at the time of setup, the platform continuously synchronizes with real-time meteorological
data—including temperature and humidity—to dynamically adjust its care algorithms. Unlike
passive tracking applications, this system acts as a proactive botanical twin. It independently
monitors the plant’s lifecycle stages and historical data, functioning as an intelligent statemachine that automatically dispatches timely emails and push notifications. These targeted
alerts guide the user through their next critical action, whether it involves mitigating soil pH
imbalances, applying specific organic composts, or executing a precise watering schedule based
on current weather conditions. By transforming raw environmental telemetry and multimodal
visual data into actionable insights, the system ensures optimal plant growth, significantly
reduces resource waste, and empowers growers to build climate-resilient, data-driven agricultural
practices.

---

## Google AI Usage
### Tools / Models Used
Gemini 1.5 Flash: Used as the primary multimodal engine for high-speed plant diagnostics and real-time chat assistance.Vertex AI SDK: Integrated into Firebase Cloud Functions to securely manage generative AI workflows and system instructions.Gemini 3 Flash Vision: Leveraged for visual analysis of plant health, pest identification, and reading soil pH test strips.


### How Google AI Was Used
AI is the "proactive brain" of this application, transforming it from a simple tracker into an autonomous botanical twin. It is integrated across three critical layers:Multimodal Diagnostics: When a user uploads a photograph to the Growth Timeline, the AI analyzes visual data to identify specific pests or nutrient deficiencies. It then generates a localized, organic remediation plan tailored to the Kerala region.Intelligent Lifecycle State-Machine: The AI processes historical data and environmental telemetry (like local temperature and humidity) to calculate the plant's current health score. It proactively determines the next required care milestone, such as when to transition from seedling to growth stages.Localized Intelligence Curation: Vertex AI acts as a smart filter for the Global Intelligence Hub. It scans agricultural news and government policy updates to surface only the subsidies, grants, and market prices relevant to the specific species in the user's collection.



## Proof of Google AI Usage

![AI Proof](./client/src/assets/img3.png)

---

## Screenshots 
Add project screenshots:

![Screenshot1](./client/src/assets/img1.png)  
![Screenshot2](./client/src/assets/img2.png)

---

## Demo Video
Upload your demo video to Google Drive and paste the shareable link here(max 3 minutes).
[Watch Demo](https://drive.google.com/file/d/1hDoyCn3UQx8Fk2tX3WsrLLJO8f1nbDbZ/view?usp=sharing)

---

## Installation Steps

```bash
# Clone the repository
git clone <https://github.com/NidhinGireesh/build-with-ai.git>

# Go to project folder
cd client

# Install dependencies
npm install

# Run the project
npm run dev
