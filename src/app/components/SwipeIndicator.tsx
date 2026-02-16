import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SwipeIndicator() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <motion.div
        animate={{ x: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex items-center gap-1 text-gray-400"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm">Swipe</span>
        <ChevronRight className="w-5 h-5" />
      </motion.div>
    </div>
  );
}
