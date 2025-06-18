"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileUp, X, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  maxSize: number
  acceptedTypes: string[]
}

export function FileUploader({ onFileSelect, selectedFile, maxSize, acceptedTypes }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize) {
      setError(`File size exceeds the maximum limit of ${maxSize / (1024 * 1024)}MB`)
      return false
    }

    // Check file type
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`Only ${acceptedTypes.join(", ")} files are accepted`)
      return false
    }

    setError(null)
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        onFileSelect(file)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        onFileSelect(file)
      }
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const removeFile = () => {
    onFileSelect(null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="w-full">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive" className="mb-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors backdrop-blur-sm ${
            dragActive
              ? "border-purple-500 bg-purple-50/70 dark:bg-purple-900/30"
              : "border-slate-300/70 dark:border-slate-700/70 bg-white/30 dark:bg-slate-800/30"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept={acceptedTypes.join(",")}
            onChange={handleChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-3 bg-purple-100/70 dark:bg-purple-900/30 rounded-full"
            >
              <FileUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <div>
              <p className="text-sm font-medium">
                Drag and drop your resume here, or{" "}
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="text-purple-600 dark:text-purple-400 hover:underline focus:outline-none"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PDF only, max 10MB</p>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/50"
        >
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.1 }} className="p-2 bg-purple-100/70 dark:bg-purple-900/30 rounded-full">
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <div className="truncate">
              <p className="text-sm font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
