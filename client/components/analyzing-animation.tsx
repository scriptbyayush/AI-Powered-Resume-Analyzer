"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Cpu, FileSearch, CheckCircle, Brain } from "lucide-react"

export function AnalyzingAnimation() {
  const steps = [
    { icon: FileSearch, text: "Reading your resume..." },
    { icon: Brain, text: "Analyzing job requirements..." },
    { icon: Cpu, text: "Matching skills and qualifications..." },
    { icon: CheckCircle, text: "Generating personalized feedback..." },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <Card className="shadow-xl border-slate-200/50 dark:border-slate-700/50 backdrop-blur-lg bg-white/70 dark:bg-slate-900/70">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI is analyzing your resume
          </h3>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-pink-300 to-purple-200 dark:from-purple-900/30 dark:via-pink-700/30 dark:to-purple-900/30 -translate-x-1/2 z-0"></div>

            <div className="relative z-10 space-y-8 py-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.5, duration: 0.5 }}
                  className="flex items-center"
                >
                  <div className="flex-1 text-right pr-4 opacity-80">
                    <p className="font-medium">{step.text}</p>
                  </div>

                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                      delay: index * 0.5,
                    }}
                    className="relative z-10 rounded-full p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-purple-500 dark:border-purple-600 shadow-lg"
                  >
                    <step.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </motion.div>

                  <div className="flex-1 pl-4">
                    <div className="w-full h-2 bg-slate-100/70 dark:bg-slate-700/70 rounded-full overflow-hidden backdrop-blur-sm">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 3,
                          delay: index * 0.5,
                          ease: "easeInOut",
                        }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 mb-2">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              This may take a moment. We're thoroughly analyzing your resume against the job description.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
