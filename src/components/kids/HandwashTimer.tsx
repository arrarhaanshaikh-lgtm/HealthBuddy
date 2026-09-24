import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Hand } from 'lucide-react';

const STEPS = [
  { label: 'Wet hands with water', emoji: '💧', duration: 3 },
  { label: 'Apply soap to palms', emoji: '🧼', duration: 3 },
  { label: 'Rub palm to palm', emoji: '🤲', duration: 3 },
  { label: 'Rub back of hands', emoji: '✋', duration: 3 },
  { label: 'Clean between fingers', emoji: '🤞', duration: 3 },
  { label: 'Rub fingertips & thumbs', emoji: '👍', duration: 3 },
  { label: 'Rinse with water', emoji: '💦', duration: 2 },
];

const TOTAL_DURATION = STEPS.reduce((sum, s) => sum + s.duration, 0);

export default function HandwashTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStepIndex = STEPS.findIndex((_, i, arr) => {
    const stepStart = arr.slice(0, i).reduce((sum, s) => sum + s.duration, 0);
    return elapsed >= stepStart && elapsed < stepStart + STEPS[i].duration;
  });

  const progress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const triggerConfetti = useCallback(() => {
    const colors = ['#14b8a6', '#06b6d4', '#fb923c', '#fde047', '#f472b6'];
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.5}s`;
      piece.style.animationDuration = `${2 + Math.random() * 2}s`;
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 5000);
    }
  }, []);

  useEffect(() => {
    if (isRunning && elapsed < TOTAL_DURATION) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 0.1;
          if (next >= TOTAL_DURATION) {
            setIsRunning(false);
            setIsComplete(true);
            triggerConfetti();
            return TOTAL_DURATION;
          }
          return next;
        });
      }, 100);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, elapsed, triggerConfetti]);

  const handlePlayPause = () => {
    if (isComplete) {
      setElapsed(0);
      setIsComplete(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsed(0);
    setIsComplete(false);
  };

  const currentStep = currentStepIndex >= 0 ? STEPS[currentStepIndex] : STEPS[STEPS.length - 1];

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-6 sm:p-8 border-2 border-teal-100 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md">
          <Hand className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-rounded font-bold text-xl text-teal-800">Handwash Timer</h3>
          <p className="text-sm text-teal-600">Wash for 20 seconds to stay germ-free!</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Progress wheel */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 280 280">
            <circle cx="140" cy="140" r={radius} fill="none" stroke="#ccfbf1" strokeWidth="16" />
            <motion.circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="url(#washGradient)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transition={{ duration: 0.1 }}
            />
            <defs>
              <linearGradient id="washGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.label}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-6xl"
              >
                {currentStep.emoji}
              </motion.div>
            </AnimatePresence>
            <div className="text-4xl font-rounded font-bold text-teal-700">
              {Math.max(0, Math.ceil(TOTAL_DURATION - elapsed))}
            </div>
            <div className="text-sm font-medium text-teal-500 text-center max-w-[180px]">
              {currentStep.label}
            </div>
          </div>

          {/* Completion badge */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-xl"
              >
                <span className="text-3xl">🎉</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step indicators */}
        <div className="flex gap-1.5">
          {STEPS.map((step, i) => {
            const stepStart = STEPS.slice(0, i).reduce((sum, s) => sum + s.duration, 0);
            const isStepDone = elapsed >= stepStart + step.duration;
            const isStepActive = i === currentStepIndex;
            return (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isStepDone
                    ? 'bg-teal-500 flex-1'
                    : isStepActive
                    ? 'bg-cyan-400 flex-1'
                    : 'bg-teal-100 w-2'
                }`}
                style={{ minWidth: isStepActive || isStepDone ? 'auto' : '8px' }}
              />
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-2xl bg-white border-2 border-teal-200 flex items-center justify-center text-teal-600 hover:bg-teal-50 transition-colors shadow-sm"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={handlePlayPause}
            className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 ${
              isRunning
                ? 'bg-gradient-to-br from-orange-400 to-warm-500'
                : 'bg-gradient-to-br from-teal-400 to-cyan-500'
            }`}
          >
            {isRunning ? (
              <Pause className="w-10 h-10 text-white" fill="white" />
            ) : (
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            )}
          </button>
          <div className="w-12 h-12" />
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <p className="font-rounded font-bold text-lg text-teal-700">Sparkling clean! 🌟</p>
              <p className="text-sm text-teal-500">You washed for 20 seconds and beat the germs!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
