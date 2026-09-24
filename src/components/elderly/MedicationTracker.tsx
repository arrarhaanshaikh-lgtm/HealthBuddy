import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Droplet, Plus, Minus, Check, Sun, Moon, Sunset } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function MedicationTracker() {
  const { medications, toggleMedication, waterIntake, addWater, removeWater } = useApp();
  const waterGoal = 8;
  const waterPercent = Math.min((waterIntake / waterGoal) * 100, 100);

  const timeIcons: Record<string, typeof Sun> = {
    'm1': Sun,
    'm2': Sunset,
    'm3': Moon,
  };

  return (
    <div className="space-y-6">
      {/* Medication Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-100 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
            <Pill className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-teal-800">Medication Tracker</h3>
            <p className="text-lg text-teal-600">Tap to mark pills as taken</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {medications.map((med, i) => {
            const Icon = timeIcons[med.id] || Pill;
            return (
              <motion.button
                key={med.id}
                onClick={() => toggleMedication(med.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-6 rounded-3xl border-4 transition-all duration-300 ${
                  med.taken
                    ? 'bg-teal-500 border-teal-600 text-white shadow-xl'
                    : 'bg-teal-50 border-teal-200 text-teal-800 hover:border-teal-400'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${med.taken ? 'bg-white/20' : 'bg-white'}`}>
                    <Icon className={`w-8 h-8 ${med.taken ? 'text-white' : 'text-teal-500'}`} />
                  </div>
                  <p className="font-bold text-xl">{med.label}</p>
                  <p className={`text-base ${med.taken ? 'text-teal-50' : 'text-teal-500'}`}>{med.time}</p>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-base font-bold ${
                    med.taken ? 'bg-white/20 text-white' : 'bg-white border-2 border-teal-200 text-teal-600'
                  }`}>
                    {med.taken ? (
                      <>
                        <Check className="w-5 h-5" strokeWidth={3} /> Taken
                      </>
                    ) : (
                      'Mark as Taken'
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {med.taken && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center shadow-lg"
                    >
                      <Check className="w-6 h-6 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Hydration Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-cyan-100 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-md">
            <Droplet className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-teal-800">Water Intake</h3>
            <p className="text-lg text-teal-600">Stay hydrated throughout the day</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Water glass visualization */}
          <div className="relative w-32 h-48">
            <div className="absolute inset-0 rounded-b-3xl rounded-t-xl border-4 border-cyan-200 bg-cyan-50 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-400 to-cyan-300"
                animate={{ height: `${waterPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-white/40 rounded-full" />
              </motion.div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 z-10">
              <span className="text-4xl font-bold text-teal-700">{waterIntake}</span>
              <span className="text-sm text-teal-500">of {waterGoal} glasses</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={addWater}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <Plus className="w-12 h-12 text-white" strokeWidth={3} />
            </button>
            <p className="text-lg font-bold text-teal-700">Add a Glass</p>
            <button
              onClick={removeWater}
              disabled={waterIntake === 0}
              className="w-16 h-16 rounded-2xl bg-white border-2 border-teal-200 flex items-center justify-center text-teal-600 hover:bg-teal-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-8 h-8" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Water glasses row */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: waterGoal }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: i < waterIntake ? 1 : 0.8 }}
              className={`w-8 h-10 rounded-md border-2 transition-colors ${
                i < waterIntake ? 'bg-cyan-400 border-cyan-500' : 'bg-gray-50 border-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
