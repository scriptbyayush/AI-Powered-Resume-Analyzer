"use client"

import { useState } from "react"
import { UploadForm } from "./upload-form"
import { AnalysisResults } from "./analysis-results"
import { AnalyzingAnimation } from "./analyzing-animation"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type AnalysisData = {
  rating: string
  goodPoints: string[]
  missingPoints: string[]
  additionalSkills: string[]
  interviewProcess: string[]
}

export function ResumeAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsAnalyzing(true)
    setError(null)
    setAnalysisData(null)

    try {
      // Use the actual API endpoint
      const response = await fetch("https://ai-resume-analyzer-ypvl.onrender.com/analyze", {
        method: "POST",
        body: formData,
      })
      // const response = await fetch("http://localhost:3005/analyze", {
      //   method: "POST",
      //   body: formData,
      // })

      const data = await response.json()
      console.log("Response data:", data) 
      if (!data.success) {
        throw new Error("Analysis failed. Please try again.")
      }

      // Parse the response text into structured data
      const parsedData = parseAnalysisResponse(data.analysis)
      setAnalysisData(parsedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const parseAnalysisResponse = (responseText: string): AnalysisData => {
    // This is a simplified parser for the sample format
    const sections = responseText.split(/\d+\.\s+/).filter(Boolean)

    const rating = sections[0]?.trim() || "0"

    // Parse bullet points for each section
    const parsePoints = (section: string) => {
      return section
        .split("*")
        .map((point) => point.trim())
        .filter(Boolean)
    }

    return {
      rating,
      goodPoints: sections[1] ? parsePoints(sections[1]) : [],
      missingPoints: sections[2] ? parsePoints(sections[2]) : [],
      additionalSkills: sections[3] ? parsePoints(sections[3]) : [],
      interviewProcess: sections[4] ? parsePoints(sections[4]) : [],
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top-5 duration-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isAnalyzing && !analysisData && <UploadForm onSubmit={handleSubmit} />}

      {isAnalyzing && <AnalyzingAnimation />}

      {analysisData && !isAnalyzing && <AnalysisResults data={analysisData} onReset={() => setAnalysisData(null)} />}
    </div>
  )
}
