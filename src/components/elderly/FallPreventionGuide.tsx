import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function FallPreventionGuide() {
  const { fallTips, toggleFallTip } = useApp();
  const checkedCount = fallTips.filter((t) => t.checked).length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-100 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-2xl text-teal-800">Home Fall Prevention</h3>
          <p className="text-lg text-teal-600">Check your home for safety hazards</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 h-4 bg-teal-50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"
            animate={{ width: `${(checkedCount / fallTips.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-lg font-bold text-teal-700">
          {checkedCount}/{fallTips.length}
        </span>
      </div>

      {/* Tips grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {fallTips.map((tip, i) => (
          <motion.button
            key={tip.id}
            onClick={() => toggleFallTip(tip.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.98 }}
            className={`text-left p-5 rounded-2xl border-4 transition-all duration-300 ${
              tip.checked
                ? 'bg-teal-50 border-teal-400'
                : 'bg-gray-50 border-gray-100 hover:border-teal-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                tip.checked ? 'bg-teal-200' : 'bg-white border-2 border-gray-100'
              }`}>
                {tip.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-lg text-teal-800">{tip.title}</h4>
                  {tip.checked && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="w-5 h-5 text-teal-500" strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
                <p className="text-base text-teal-600 leading-relaxed">{tip.description}</p>
                <p className={`text-sm font-medium mt-2 ${tip.checked ? 'text-teal-500' : 'text-gray-400'}`}>
                  {tip.checked ? 'Checked and safe' : 'Tap to check this off'}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
