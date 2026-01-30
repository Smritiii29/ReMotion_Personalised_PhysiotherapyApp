<div align="center">

  <h1>PhysioAI – AI-Powered Home Physiotherapy & Rehabilitation</h1>

  <p>
    <strong>Real-time AI-guided exercise sessions for physiotherapy patients</strong><br>
    Accurate rep counting • Form correction • Progress tracking • Physiotherapist oversight
  </p>

  <p>
    <a href="https://github.com/Smritiii29/ReMotion_Personalised_PhysiotherapyApp">
      <img src="https://img.shields.io/github/stars/yourusername/physio-ai?style=social" alt="GitHub stars">
    </a>
    <a href="https://github.com/Smritiii29/ReMotion_Personalised_PhysiotherapyApp">
      <img src="https://img.shields.io/github/license/yourusername/physio-ai" alt="License">
    </a>
    <a href="https://github.com/Smritiii29/ReMotion_Personalised_PhysiotherapyApp">
      <img src="https://img.shields.io/github/issues/yourusername/physio-ai" alt="Issues">
    </a>
  </p>

</div>

## 🌟 Overview

ReMotion is an intelligent home rehabilitation platform that empowers patients to perform prescribed physiotherapy exercises correctly and safely. Using **real-time AI pose estimation**, it provides instant feedback on form, counts repetitions accurately, detects common errors, and logs detailed session data for physiotherapists to review.

Patients get an engaging, gamified experience with 3D avatars, while therapists gain objective adherence metrics and progress insights — all powered by modern web technologies.

## ✨ Key Features

- 🏋️‍♀️ **Real-time rep counting & phase detection** (MediaPipe + custom state machine)
- ⚠️ **Live form correction** — elbow drift, shoulder hiking, torso lean, ROM, tempo, symmetry
- 🗣️ **Audio-visual feedback** — spoken corrections, success sounds, animated overlays
- 🧑‍🎨 **3D avatar mirroring** with form issue highlighting
- 📊 **Detailed session logging** — per-set / per-rep accuracy, ROM, status
- 📝 **Post-session subjective feedback** questionnaire (pain, difficulty, fatigue, confidence)
- 📈 **Adherence & streak tracking** for patients
- ⏱️ **Rest timers**, pause, skip rep, end session controls
- 🔍 **Debug overlay** — angles, phase, correction count

## 🛠️ Tech Stack

<div align="center">

| Category              | Technology                          | Icon / Badge                                                                 |
|-----------------------|-------------------------------------|-----------------------------------------------------------------------------|
| Frontend Framework    | React + TypeScript                  | <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" alt="React"> |
| Styling               | Tailwind CSS + shadcn/ui            | <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind"> |
| Icons                 | Lucide React                        | <img src="https://img.shields.io/badge/Lucide-000000?logo=lucide&logoColor=white" alt="Lucide"> |
| Real-time             | Socket.IO                           | <img src="https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white" alt="Socket.IO"> |
| Pose Estimation       | MediaPipe Tasks Vision (Lite)       | <img src="https://img.shields.io/badge/MediaPipe-4285F4?logo=google&logoColor=white" alt="MediaPipe"> |
| 3D Avatars            | React Three Fiber / Three.js        | <img src="https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white" alt="Three.js"> |
| Backend               | Flask + Flask-SocketIO              | <img src="https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white" alt="Flask"> |
| Data Processing       | NumPy • SciPy • fastdtw             | <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white" alt="Python"> |
| Database              | Firebase Firestore + Auth           | <img src="https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black" alt="Firebase"> |

</div>

## 🔄 Data Flow (High-Level)

1. Physiotherapist assigns exercise program → stored in Firestore
2. Patient logs in → frontend fetches assigned exercises (`/exercises/assigned`)
3. Starts session → loads exercise config (sets, reps, ROM targets)
4. Webcam → MediaPipe detects landmarks → sent to Flask backend via Socket.IO
5. Flask computes angles & form → emits rep completion & feedback events
6. Frontend updates counters, shows corrections, plays audio cues
7. Session ends → saves detailed session + questionnaire to Firestore
8. Physiotherapist views progress, adherence score, streak

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- Firebase project (Auth + Firestore enabled)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

Feel free to use, modify, distribute, or even sell parts of this code (with attribution). No warranties provided – use at your own risk! 🚀


❤️ Built with love in Chennai
Shivani & team – January 2026
