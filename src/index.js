import express, { json, urlencoded } from "express";
import multer from "multer";
import { config } from "dotenv";
import { promises as fsPromises, unlink } from "fs";
import pdf from "pdf-parse";
import { GoogleGenAI } from "@google/genai";
import morgan from "morgan";
import cors from "cors";


config();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed."));
    }
    cb(null, true);
  },
});

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"))

app.post("/analyze", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const { jobDescription } = req.body;
  if (!jobDescription) {
    return res.status(400).send("No job description provided.");
  }

  const filePath = req.file.path;

  try {
    const resumeBuffer = await fsPromises.readFile(filePath);
    const { text: resumeText } = await pdf(resumeBuffer);

    const prompt = `
      I have provided you with a job description and a resume. Please analyze the resume and provide a summary of the candidate's qualifications and skills, and how they match the job description.

      Provide me with the following:
      1. A single number rating the candidate's qualifications and skills on a scale of 1 to 10.
      2. Good points about the candidate's qualifications and skills that match the job description.
      3. Missing points about the candidate's qualifications and skills that do not match the job description.
      4. Possible additional skills that the candidate could learn to improve their qualifications and skills.
      5. A summary of the interview process that the candidate should go through to be hired for that job role.
      Be concise and to the point. Do not provide any additional information or context.

      Job Description:
      ${jobDescription}

      Resume:
      ${resumeText}
    `;

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents,
      temperature: 0.5,
      topP: 0.8,
      topK: 40,
    });

    const response = result.candidates[0].content.parts[0].text;
    return res.json({ analysis: response, success: true });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({error:"Error processing file.", success: false});
  } finally {
    try {
      await fsPromises.unlink(filePath);
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the AI Resume Analyzer backend!");
});
