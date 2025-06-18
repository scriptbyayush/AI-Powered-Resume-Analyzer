"use client"

import { motion } from "framer-motion"

interface RatingDisplayProps {
  rating: number
}

export function RatingDisplay({ rating }: RatingDisplayProps) {
  // Ensure rating is between 1 and 10
  
  const safeRating = isNaN(rating) ? 7 : rating
const normalizedRating = Math.max(1, Math.min(10, safeRating))


  // Calculate color based on rating
  const getColor = () => {
    if (normalizedRating >= 8) return "from-green-500 to-green-600"
    if (normalizedRating >= 6) return "from-blue-500 to-blue-600"
    if (normalizedRating >= 4) return "from-amber-500 to-amber-600"
    return "from-red-500 to-red-600"
  }

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.3,
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${getColor()} text-white font-bold text-xl shadow-lg backdrop-blur-sm`}
      >
        {normalizedRating}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute -bottom-5 whitespace-nowrap text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
      >
        {normalizedRating}/10
      </motion.div>
    </div>
  )
}
