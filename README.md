# 📄 ResumeAI – AI-Powered Resume Analyzer

**ResumeAI** is an intelligent, Gemini-powered resume analysis platform that helps job seekers align their resumes with job descriptions using AI. Upload your resume, provide the job description, and get tailored suggestions for **improvement**, **strengths**, and **skills to develop** — all in a beautifully designed UI.

---

## ✨ Features

✅ AI-Powered Resume Analysis using Google’s Gemini AI  
✅ Upload Resume (PDF/DOCX Support)  
✅ Input/Paste Job Description Text  
✅ Personalized Suggestions for Improvement  
✅ Highlighted Strengths and Achievements  
✅ Skill Gap Detection and Development Suggestions  
✅ Responsive Modern UI (Dark & Light Mode)  
✅ Export Suggestions as PDF or Copy to Clipboard

---

## 🌐 Live Demo

🔗 Try ResumeAI Live : https://ai-powered-resume-analyzer-one.vercel.app/

---

## 📁 Project Structure

```
ResumeAI/
├── src/         # Node.js backend with Gemini AI integration 
│   └── index.js
├── client/        # React frontend for UI
│   ├── components/
│   └── pages.tsx
├── .env             # Create a Environment file for API keys and set Gemini api key
└── README.md        # You're here!
```

---

## ⚙️ Installation (Development Mode)

### 🔧 Prerequisites

- Node.js 
- npm

---

### 🛠️ Steps to Run Locally

#### 1. Clone the Repository

```bash
git clone https://github.com/scriptbyayush/AI-Powered-Resume-Analyzer.git
cd AI-Powered-Resume-Analyzer
```

#### 2. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
GOOGLE_GEMINI_KEY=your_gemini_api_key_here
```

> ⚠️ **Note**: Never share your `.env` file publicly.

---

#### 3. Start the Backend Server

```bash
npm install
npm start
```

The backend will start on:

```
http://localhost:3001
```

---

#### 4. Start the Frontend

```bash
cd ../client
npm install
npm run dev
```

The frontend will start on:

```
http://localhost:3000
```

---

## 🧪 Sample Usage

1. Visit the application (live or local).
2. Upload your resume file (`.pdf` or `.docx`).
3. Paste a job description in the provided text box.
4. Click **"Analyze Resume"**.
5. View:

   * ✅ Key Strengths  
   * ⚠️ Areas for Improvement  
   * 🧠 Skills to Develop  

---

## 📦 Tech Stack

| Layer        | Technology                                  |
| ------------ | ------------------------------------------- |
| Frontend     | React.js, Tailwind CSS, Material UI         |
| Backend      | Node.js, Express                            |
| AI           | Google Gemini API                           |
| File Parsing | PDF-Parse, Docx Parser, Multer              |
| Hosting      | Vercel (Frontend), Render (Backend) |
| Others       | .env for configuration                      |

---

## 🖼️ Screenshots

![ResumeAi UI](./codify.png)

* Resume Upload UI  
* Job Description Input  
* AI Suggestions Output  
* Skill Gap View  

---

## 🛡️ License

MIT License

> Feel free to use and modify the project. Please give credit if you fork or build upon it.

---

## 🙌 Acknowledgements

* [Google Gemini AI](https://ai.google.dev)  
* [React.js](https://reactjs.org)  
* [Tailwind CSS](https://tailwindcss.com)  
* [Material UI](https://mui.com)  
* [Vercel Hosting](https://vercel.com)  

---

## 📬 Contact

**Developer**: Ayush Vaidya  
**GitHub**: [@scriptbyayush](https://github.com/scriptbyayush)  
**Email**: [ayush.pict@gmail.com](mailto:ayush.pict@gmail.com)

---
