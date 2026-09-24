import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Activity, PersonStanding } from 'lucide-react';
import type { StretchExercise } from '@/types';

const stretches: StretchExercise[] = [
  { id: 's1', name: 'Neck Rolls', duration: '20s', description: 'Slowly roll your head in a circle, 5 times each direction. Relieves neck tension from cooking.', icon: '🔄' },
  { id: 's2', name: 'Shoulder Shrugs', duration: '20s', description: 'Lift both shoulders to your ears, hold 5 seconds, release. Repeat 5 times to ease upper back strain.', icon: '🤷' },
  { id: 's3', name: 'Standing Side Stretch', duration: '20s', description: 'Raise one arm overhead, lean to opposite side. Hold 10 seconds each side. Stretches your spine and obliques.', icon: '🧍' },
  { id: 's4', name: 'Wrist Rotations', duration: '20s', description: 'Extend arms, rotate wrists 10 times clockwise, then counter-clockwise. Prevents wrist strain from chopping.', icon: '✋' },
  { id: 's5', name: 'Standing Forward Fold', duration: '20s', description: 'Stand with feet hip-width apart, bend forward from hips. Let arms hang. Hold 15 seconds. Releases lower back tension.', icon: '🙇' },
  { id: 's6', name: 'Hip Circles', duration: '20s', description: 'Hands on hips, circle hips 5 times each direction. Loosens lower back and hip joints after standing.', icon: '🔄' },
];

export default function ErgonomicBreaks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStretch = stretches[activeIndex];

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (activeIndex < stretches.length - 1) {
              setActiveIndex((i) => i + 1);
              return 20;
            } else {
              setIsRunning(false);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, activeIndex]);

  const handlePlayPause = useCallback(() => {
    if (timeLeft === 0) {
      setActiveIndex(0);
      setTimeLeft(20);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  }, [timeLeft, isRunning]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setActiveIndex(0);
    setTimeLeft(20);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-lg">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-md">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-teal-800">Ergonomic Breaks</h3>
          <p className="text-sm text-teal-600">2-minute stretching routines for household strain relief</p>
        </div>
      </div>

      {/* Active stretch display */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 mb-5 border border-teal-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-md">
            {currentStretch.icon}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-teal-800">{currentStretch.name}</h4>
            <p className="text-xs text-teal-500">{currentStretch.description}</p>
          </div>
          <div className="text-3xl font-bold text-teal-600 tabular-nums">{timeLeft}s</div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-white rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-400 to-cyan-500"
            animate={{ width: `${((20 - timeLeft) / 20) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="w-10 h-10 rounded-xl bg-white border border-teal-200 flex items-center justify-center text-teal-600 hover:bg-teal-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handlePlayPause}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 ${
              isRunning ? 'bg-orange-500' : 'bg-teal-500'
            }`}
          >
            {isRunning ? <Pause className="w-6 h-6 text-white" fill="white" /> : <Play className="w-6 h-6 text-white ml-0.5" fill="white" />}
          </button>
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* Stretch list */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <PersonStanding className="w-4 h-4 text-teal-500" />
          <h4 className="font-semibold text-sm text-teal-700">All Stretches</h4>
        </div>
        {stretches.map((stretch, i) => (
          <button
            key={stretch.id}
            onClick={() => {
              setActiveIndex(i);
              setTimeLeft(20);
              setIsRunning(false);
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
              i === activeIndex
                ? 'bg-teal-50 border-teal-300'
                : 'bg-gray-50 border-gray-100 hover:border-teal-200'
            }`}
          >
            <span className="text-2xl">{stretch.icon}</span>
            <div className="flex-1 text-left">
              <p className={`text-sm font-medium ${i === activeIndex ? 'text-teal-700' : 'text-gray-700'}`}>
                {stretch.name}
              </p>
            </div>
            <span className="text-xs text-gray-400">{stretch.duration}</span>
            {i < activeIndex && <Check className="w-4 h-4 text-teal-500" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
