import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Trophy } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function QuestChecklist() {
  const { questTasks, toggleQuestTask, totalXP, badges } = useApp();
  const maxXP = questTasks.reduce((sum, t) => sum + t.xp, 0);
  const progressPercent = Math.min((totalXP / maxXP) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl p-6 border-2 border-cyan-100 shadow-lg">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-md">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-rounded font-bold text-xl text-teal-800">Daily Hygiene Quest</h3>
          <p className="text-sm text-teal-600">Complete tasks to earn XP and unlock badges!</p>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-rounded font-bold text-2xl text-teal-700">{totalXP} XP</span>
          <span className="text-sm font-medium text-teal-500">Max: {maxXP} XP</span>
        </div>
        <div className="h-6 bg-teal-100 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 rounded-full relative"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ backgroundSize: '200% 100%' }} />
          </motion.div>
          {progressPercent > 10 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white drop-shadow">{Math.round(progressPercent)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Quest items */}
      <div className="space-y-2.5 mb-6">
        {questTasks.map((task, i) => (
          <motion.button
            key={task.id}
            onClick={() => toggleQuestTask(task.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-300 ${
              task.completed
                ? 'bg-teal-500 border-teal-500 text-white shadow-md'
                : 'bg-white border-teal-100 hover:border-teal-300 text-teal-800 hover:bg-teal-50'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                task.completed ? 'bg-white' : 'bg-teal-50 border-2 border-teal-200'
              }`}
            >
              <AnimatePresence>
                {task.completed && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                    <Check className="w-5 h-5 text-teal-600" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-2xl">{task.icon}</span>
            <span className={`flex-1 text-left font-medium ${task.completed ? 'line-through opacity-80' : ''}`}>
              {task.label}
            </span>
            <span className={`text-sm font-bold px-2 py-1 rounded-lg ${task.completed ? 'bg-white/20' : 'bg-teal-50 text-teal-600'}`}>
              +{task.xp} XP
            </span>
          </motion.button>
        ))}
      </div>

      {/* Badges */}
      <div>
        <h4 className="font-rounded font-bold text-sm text-teal-700 mb-3 flex items-center gap-1">
          <Star className="w-4 h-4" /> Badges
        </h4>
        <div className="grid grid-cols-4 gap-3">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${
                badge.unlocked
                  ? `bg-gradient-to-br ${badge.color} border-transparent shadow-lg`
                  : 'bg-gray-50 border-gray-200 opacity-50'
              }`}
            >
              <span className="text-3xl">{badge.unlocked ? badge.icon : '🔒'}</span>
              <span className={`text-xs font-bold text-center ${badge.unlocked ? 'text-white' : 'text-gray-400'}`}>
                {badge.name}
              </span>
              <span className={`text-[10px] ${badge.unlocked ? 'text-white/80' : 'text-gray-400'}`}>
                {badge.threshold} XP
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
