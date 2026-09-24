import { motion } from 'framer-motion';
import HandwashTimer from './HandwashTimer';
import QuestChecklist from './QuestChecklist';
import GermCards from './GermCards';

export default function KidsMode() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-white pb-12">
      {/* Hero banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="font-rounded font-bold text-2xl sm:text-3xl text-white mb-1">
              Hey there, Germ Buster! 🧒✨
            </h2>
            <p className="text-teal-50 text-sm sm:text-base">
              Let's complete today's hygiene quests and earn awesome badges!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <HandwashTimer />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <QuestChecklist />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GermCards />
        </motion.div>
      </div>
    </div>
  );
}
