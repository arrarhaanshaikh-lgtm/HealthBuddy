import { motion } from 'framer-motion';
import { Check, Utensils, AlertTriangle, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function KitchenSafetyTracker() {
  const { kitchenTasks, toggleKitchenTask } = useApp();
  const completedCount = kitchenTasks.filter((t) => t.completed).length;
  const progressPercent = (completedCount / kitchenTasks.length) * 100;

  const categories = Array.from(new Set(kitchenTasks.map((t) => t.category)));

  return (
    <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-lg">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
          <Utensils className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-teal-800">Kitchen & Sanitation Safety</h3>
          <p className="text-sm text-teal-600">Track your cleaning and safety routines</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-teal-700">
            {completedCount} of {kitchenTasks.length} tasks done
          </span>
          <span className="text-sm font-bold text-teal-600">{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-3 bg-teal-50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Tasks by category */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const tasks = kitchenTasks.filter((t) => t.category === cat);
          return (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-teal-500" />
                <h4 className="font-semibold text-sm text-teal-700">{cat}</h4>
              </div>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => toggleKitchenTask(task.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                      task.completed
                        ? 'bg-teal-50 border-teal-300'
                        : 'bg-gray-50 border-gray-100 hover:border-teal-200'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                        task.completed ? 'bg-teal-500' : 'bg-white border-2 border-gray-200'
                      }`}
                    >
                      {task.completed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </div>
                    <span className={`flex-1 text-left text-sm ${task.completed ? 'text-teal-600 line-through' : 'text-gray-700'}`}>
                      {task.label}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {task.frequency}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
