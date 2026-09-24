import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Home, User, HeartPulse, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import type { ProfileMode } from '@/types';

const profiles: { id: ProfileMode; label: string; icon: typeof Baby; gradient: string; emoji: string }[] = [
  { id: 'kids', label: 'Kids Mode', icon: Baby, gradient: 'from-teal-400 to-cyan-500', emoji: '🧒' },
  { id: 'homemaker', label: 'Homemaker Mode', icon: Home, gradient: 'from-cyan-400 to-teal-500', emoji: '🏠' },
  { id: 'elderly', label: 'Elderly Mode', icon: User, gradient: 'from-teal-500 to-cyan-600', emoji: '👴' },
];

export default function Navbar() {
  const { mode, setMode } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeProfile = profiles.find((p) => p.id === mode)!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-teal-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-200">
              <HeartPulse className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-rounded font-bold text-lg text-teal-800 leading-none">Hygiea</h1>
              <p className="text-xs text-teal-500 font-medium">Family Health Hub</p>
            </div>
          </div>

          {/* Desktop profile toggle */}
          <div className="hidden md:flex items-center gap-2">
            {profiles.map((p) => {
              const Icon = p.icon;
              const isActive = mode === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setMode(p.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${p.gradient} text-white shadow-lg`
                      : 'text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{p.label}</span>
                  <span className="text-base">{p.emoji}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile dropdown */}
          <div className="md:hidden relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r ${activeProfile.gradient} text-white shadow-lg`}
            >
              <activeProfile.icon className="w-4 h-4" />
              <span className="text-base">{activeProfile.emoji}</span>
              <span>{activeProfile.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-teal-100 overflow-hidden"
                >
                  {profiles.map((p) => {
                    const Icon = p.icon;
                    const isActive = mode === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setMode(p.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                          isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-base">{p.emoji}</span>
                        {p.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}
