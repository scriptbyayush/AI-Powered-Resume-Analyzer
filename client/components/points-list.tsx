"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface PointsListProps {
  points: string[]
  icon: LucideIcon
  iconColor: string
  bgColor: string
}

export function PointsList({ points, icon: Icon, iconColor, bgColor }: PointsListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.ul variants={container} initial="hidden" animate="show" className="space-y-3">
      {points.length > 0 ? (
        points.map((point, index) => (
          <motion.li
            key={index}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-3 p-3 rounded-lg backdrop-blur-sm bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/50 shadow-sm transition-all duration-200"
          >
            <div className={`p-1.5 rounded-full ${bgColor} mt-0.5 flex-shrink-0`}>
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
            <span>{point}</span>
          </motion.li>
        ))
      ) : (
        <motion.li variants={item} className="text-slate-500 dark:text-slate-400 italic">
          No information available
        </motion.li>
      )}
    </motion.ul>
  )
}
