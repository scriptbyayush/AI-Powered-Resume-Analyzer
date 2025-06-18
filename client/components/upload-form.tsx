"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./file-uploader"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface UploadFormProps {
  onSubmit: (formData: FormData) => Promise<void>
}

export function UploadForm({ onSubmit }: UploadFormProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!resumeFile || !jobDescription.trim()) {
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("resume", resumeFile)

    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="shadow-xl border-slate-200/50 dark:border-slate-700/50 backdrop-blur-lg bg-white/70 dark:bg-slate-900/70">
        <CardHeader>
          <CardTitle className="text-2xl">Analyze Your Resume</CardTitle>
          <CardDescription>
            Upload your resume and enter the job description to get personalized feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="jobDescription" className="text-sm font-medium">
                Job Description
              </label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[150px] resize-y backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-700/70"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Resume (PDF, 10MB max)</label>
              <FileUploader
                onFileSelect={setResumeFile}
                selectedFile={resumeFile}
                maxSize={10 * 1024 * 1024} // 10MB
                acceptedTypes={[".pdf"]}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={!resumeFile || !jobDescription.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-sky-600 to-pink-600 hover:from-sky-700 hover:to-pink-700 transition-all duration-300"
            size="lg"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                Analyze Resume <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
