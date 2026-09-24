import { motion } from 'framer-motion';
import { Home, Sparkles } from 'lucide-react';
import KitchenSafetyTracker from './KitchenSafetyTracker';
import ErgonomicBreaks from './ErgonomicBreaks';
import FamilyWellnessVault from './FamilyWellnessVault';

export default function HomemakerMode() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-teal-50 to-white pb-12">
      {/* Hero banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-white/10 rounded-full translate-y-1/2" />
          <div className="relative z-10">
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-1 flex items-center gap-2">
              <Home className="w-7 h-7" /> Welcome Home, Priya! 🏠
            </h2>
            <p className="text-cyan-50 text-sm sm:text-base">
              Your household safety and wellness dashboard for today
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
            <KitchenSafetyTracker />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ErgonomicBreaks />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FamilyWellnessVault />
        </motion.div>
      </div>
    </div>
  );
}
