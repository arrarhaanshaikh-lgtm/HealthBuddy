import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import SOSAlert from './SOSAlert';
import MedicationTracker from './MedicationTracker';
import FallPreventionGuide from './FallPreventionGuide';

export default function ElderlyMode() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-white pb-12">
      {/* Hero banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-1 flex items-center gap-3">
              <User className="w-8 h-8" /> Good Day, Rajesh! 👴
            </h2>
            <p className="text-teal-50 text-lg">
              Your health and safety dashboard for today
            </p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* SOS button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <SOSAlert />
        </motion.div>

        {/* Medication & Hydration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MedicationTracker />
        </motion.div>

        {/* Fall Prevention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FallPreventionGuide />
        </motion.div>
      </div>
    </div>
  );
}
