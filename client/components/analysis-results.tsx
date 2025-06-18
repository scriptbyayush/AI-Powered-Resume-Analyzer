"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RatingDisplay } from "./rating-display";
import { PointsList } from "./points-list";
import { ArrowLeft, ThumbsUp, AlertTriangle, BookOpen, Users, Download, Share2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ResponsiveRadar } from "@/components/ui/charts";
import Confetti from "react-confetti";
import html2canvas from "html2canvas";

type AnalysisData = {
  rating: string;
  goodPoints: string[];
  missingPoints: string[];
  additionalSkills: string[];
  interviewProcess: string[];
  userName?: string;
  userAvatar?: string;
};

interface AnalysisResultsProps {
  data: AnalysisData;
  onReset: () => void;
}

export function AnalysisResults({ data, onReset }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Confetti for high scores
  useEffect(() => {
    if (Number(data.rating) >= 90) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [data.rating]);

  // Download analysis as image
  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = "resume-analysis.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  // Share analysis (Web Share API)
  const handleShare = async () => {
    if (navigator.share && cardRef.current) {
      const text = `My Resume Analysis: Strengths: ${data.goodPoints.join(", ")} | Gaps: ${data.missingPoints.join(", ")}`;
      await navigator.share({
        title: "Resume Analysis Results",
        text,
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported on this device/browser.");
    }
  };

  // Radar chart data
  const radarData = [
    {
      subject: "Strengths",
      A: data.goodPoints.length,
      fullMark: 10,
    },
    {
      subject: "Gaps",
      A: data.missingPoints.length,
      fullMark: 10,
    },
    {
      subject: "Skills",
      A: data.additionalSkills.length,
      fullMark: 10,
    },
    {
      subject: "Interview",
      A: data.interviewProcess.length,
      fullMark: 10,
    },
  ];

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        <Card
          ref={cardRef}
          className="shadow-2xl border-sky-200/60 dark:border-sky-700/60 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 rounded-3xl ring-1 ring-sky-100/50 dark:ring-sky-900/40 transition-all"
        >
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              {data.userAvatar && (
                <img
                  src={data.userAvatar}
                  alt={data.userName || "User"}
                  className="w-12 h-12 rounded-full border-2 border-sky-400 shadow"
                />
              )}
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <span className="bg-gradient-to-r from-sky-600 to-pink-600 bg-clip-text text-transparent drop-shadow">
                    Resume Analysis Results
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info
                        className="ml-2 h-5 w-5 text-sky-400 cursor-pointer"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>
                        This analysis is based on your uploaded resume and the provided job description.
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
                {data.userName && (
                  <span className="block text-sky-600 dark:text-sky-300 font-semibold mt-1">
                    {data.userName}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <RatingDisplay rating={Number.parseInt(data.rating)} />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Number(data.rating), 100)}%` }}
                transition={{ duration: 1 }}
                className="h-2 rounded bg-gradient-to-r from-sky-400 to-sky-600 shadow-inner mt-2"
                style={{ width: `${Math.min(Number(data.rating), 100)}%`, minWidth: 40, maxWidth: 120 }}
                aria-label="Rating progress"
              />
              {Number(data.rating) >= 90 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-sky-600 dark:text-sky-300 font-bold text-sm mt-1"
                >
                  🎉 Excellent fit!
                </motion.span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {/* Radar Chart */}
            <div className="w-full flex justify-center mb-8">
              <ResponsiveRadar
                data={radarData}
                keys={["A"]}
                indexBy="subject"
                colors={["#38bdf8", "#0ea5e9"]}
                maxValue={10}
                curve="linearClosed"
                borderColor="#0ea5e9"
                fillOpacity={0.3}
                enableDots={true}
                dotColor="#0ea5e9"
                legends={[
                  {
                    anchor: "top-left",
                    direction: "column",
                    translateX: -40,
                    translateY: -20,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: "#0ea5e9",
                  },
                ]}
              />
            </div>
            {/* Tabs with animated indicator */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="relative">
                <TabsList className="grid grid-cols-4 mb-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-lg shadow-inner border border-sky-100 dark:border-sky-900/40 overflow-hidden">
                  {[
                    {
                      value: "overview",
                      icon: <ThumbsUp className="h-4 w-4" />,
                      label: "Strengths",
                      tooltip: "Matched skills and experience",
                    },
                    {
                      value: "missing",
                      icon: <AlertTriangle className="h-4 w-4" />,
                      label: "Gaps",
                      tooltip: "Missing or weak points",
                    },
                    {
                      value: "skills",
                      icon: <BookOpen className="h-4 w-4" />,
                      label: "Improve",
                      tooltip: "Skills to develop",
                    },
                    {
                      value: "interview",
                      icon: <Users className="h-4 w-4" />,
                      label: "Interview",
                      tooltip: "Interview process tips",
                    },
                  ].map((tab, idx) => (
                    <Tooltip key={tab.value}>
                      <TooltipTrigger asChild>
                        <TabsTrigger
                          value={tab.value}
                          className={`flex items-center gap-1 justify-center font-semibold transition-all
                            data-[state=active]:bg-gradient-to-r
                            data-[state=active]:from-sky-500
                            data-[state=active]:to-pink-500
                            data-[state=active]:text-white
                            data-[state=active]:shadow-lg
                            py-2 px-3 rounded-lg`}
                          aria-label={tab.label}
                        >
                          {tab.icon}
                          <span className="hidden sm:inline">{tab.label}</span>
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent>{tab.tooltip}</TooltipContent>
                    </Tooltip>
                  ))}
                  {/* Animated underline indicator */}
                  <motion.div
                    layout
                    className="absolute bottom-0 left-0 h-1 rounded bg-sky-400"
                    style={{
                      width: "25%",
                      transform: `translateX(${["overview", "missing", "skills", "interview"].indexOf(activeTab) * 100}%)`,
                      transition: "transform 0.3s",
                    }}
                  />
                </TabsList>
              </div>

              {/* Tab Contents */}
              <TabsContent value="overview" className="mt-0">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
                    Your Strengths
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Here are the qualifications and skills that match the job description:
                  </p>
                  <PointsList
                    points={data.goodPoints}
                    icon={ThumbsUp}
                    iconColor="text-sky-500"
                    bgColor="bg-sky-50/70 dark:bg-sky-900/20"
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="missing" className="mt-0">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                    Areas for Improvement
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    These are the qualifications and skills that don't match the job description:
                  </p>
                  <PointsList
                    points={data.missingPoints}
                    icon={AlertTriangle}
                    iconColor="text-amber-500"
                    bgColor="bg-amber-50/70 dark:bg-amber-900/20"
                    resourceLinks={true}
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
                    Skills to Develop
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Consider learning these additional skills to improve your qualifications:
                  </p>
                  <PointsList
                    points={data.additionalSkills}
                    icon={BookOpen}
                    iconColor="text-sky-500"
                    bgColor="bg-sky-50/70 dark:bg-sky-900/20"
                    resourceLinks={true}
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="interview" className="mt-0">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">
                    Interview Process
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Here's what to expect in the interview process for this role:
                  </p>
                  <PointsList
                    points={data.interviewProcess}
                    icon={Users}
                    iconColor="text-sky-500"
                    bgColor="bg-sky-50/70 dark:bg-sky-900/20"
                  />
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button
                onClick={onReset}
                variant="outline"
                className="backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 border-sky-200/50 dark:border-sky-700/50 hover:bg-sky-50/80 dark:hover:bg-sky-900/40 transition-all"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Analyze Another Resume
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    className="border-sky-200/50 dark:border-sky-700/50 hover:bg-sky-50/80 dark:hover:bg-sky-900/40 transition-all"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download your analysis as an image</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="border-sky-200/50 dark:border-sky-700/50 hover:bg-sky-50/80 dark:hover:bg-sky-900/40 transition-all"
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share your analysis</TooltipContent>
              </Tooltip>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 md:mt-0">
              Powered by AI Resume Analyzer
            </span>
          </CardFooter>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}
