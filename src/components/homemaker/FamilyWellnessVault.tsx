import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Syringe, ClipboardList, UtensilsCrossed, ChevronRight, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { FamilyMember } from '@/types';

type Tab = 'overview' | 'vaccinations' | 'health' | 'meals';

export default function FamilyWellnessVault() {
  const { familyMembers, toggleMeal } = useApp();
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-lg">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-teal-800">Family Wellness Vault</h3>
          <p className="text-sm text-teal-600">Vaccinations, health logs, and nutrition for the whole family</p>
        </div>
      </div>

      {/* Family member cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {familyMembers.map((member) => {
          const totalMeals = member.meals.length;
          const totalCalories = member.meals.filter((m) => m.logged).reduce((sum, m) => sum + m.calories, 0);
          return (
            <button
              key={member.id}
              onClick={() => { setSelectedMember(member); setActiveTab('overview'); }}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 border border-teal-100 hover:border-teal-300 transition-all text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{member.avatar}</span>
                <div>
                  <p className="font-bold text-teal-800">{member.name}</p>
                  <p className="text-xs text-teal-500">{member.relation}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-teal-400 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/60 rounded-lg p-2">
                  <p className="text-teal-500 font-medium">Vaccines</p>
                  <p className="font-bold text-teal-700">{member.vaccinations.length} records</p>
                </div>
                <div className="bg-white/60 rounded-lg p-2">
                  <p className="text-teal-500 font-medium">Nutrition</p>
                  <p className="font-bold text-teal-700">{totalCalories} kcal logged</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-cyan-600 p-5 flex items-center gap-4 rounded-t-3xl">
                <span className="text-4xl">{selectedMember.avatar}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-white">{selectedMember.name}</h4>
                  <p className="text-sm text-teal-50">{selectedMember.relation}</p>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-teal-100 sticky top-[88px] bg-white z-10">
                {([
                  { id: 'overview', label: 'Overview', icon: Heart },
                  { id: 'vaccinations', label: 'Vaccines', icon: Syringe },
                  { id: 'health', label: 'Health Log', icon: ClipboardList },
                  { id: 'meals', label: 'Meals', icon: UtensilsCrossed },
                ] as const).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-teal-500 text-teal-600'
                          : 'border-transparent text-gray-400 hover:text-teal-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              <div className="p-5">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-teal-50 rounded-2xl p-4">
                          <Syringe className="w-6 h-6 text-teal-600 mb-2" />
                          <p className="text-sm text-teal-500">Vaccination Records</p>
                          <p className="text-2xl font-bold text-teal-700">{selectedMember.vaccinations.length}</p>
                        </div>
                        <div className="bg-cyan-50 rounded-2xl p-4">
                          <ClipboardList className="w-6 h-6 text-cyan-600 mb-2" />
                          <p className="text-sm text-cyan-500">Health Log Entries</p>
                          <p className="text-2xl font-bold text-cyan-700">{selectedMember.healthLogs.length}</p>
                        </div>
                        <div className="bg-teal-50 rounded-2xl p-4">
                          <UtensilsCrossed className="w-6 h-6 text-teal-600 mb-2" />
                          <p className="text-sm text-teal-500">Meals Logged Today</p>
                          <p className="text-2xl font-bold text-teal-700">
                            {selectedMember.meals.filter((m: { meal: string; calories: number; logged: boolean }) => m.logged).length}/{selectedMember.meals.length}
                          </p>
                        </div>
                        <div className="bg-cyan-50 rounded-2xl p-4">
                          <Heart className="w-6 h-6 text-cyan-600 mb-2" />
                          <p className="text-sm text-cyan-500">Calories Today</p>
                          <p className="text-2xl font-bold text-cyan-700">
                            {selectedMember.meals.filter((m: { meal: string; calories: number; logged: boolean }) => m.logged).reduce((s: number, m: { meal: string; calories: number; logged: boolean }) => s + m.calories, 0)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'vaccinations' && (
                    <motion.div
                      key="vaccinations"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      {selectedMember.vaccinations.map((v, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-teal-50 rounded-2xl">
                          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                            <Syringe className="w-5 h-5 text-teal-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-teal-800">{v.name}</p>
                            <p className="text-xs text-teal-500">Last given: {v.date}</p>
                            <p className="text-xs text-teal-600 font-medium">Next due: {v.nextDue}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'health' && (
                    <motion.div
                      key="health"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      {selectedMember.healthLogs.map((log, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-cyan-50 rounded-2xl">
                          <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                            <ClipboardList className="w-5 h-5 text-cyan-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-cyan-500 font-medium">{log.date}</p>
                            <p className="text-sm text-teal-700">{log.note}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'meals' && (
                    <motion.div
                      key="meals"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      {selectedMember.meals.map((meal, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-teal-50 rounded-2xl">
                          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                            <UtensilsCrossed className="w-5 h-5 text-teal-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-teal-800">{meal.meal}</p>
                            <p className="text-xs text-teal-500">{meal.logged ? `${meal.calories} kcal` : 'Not logged yet'}</p>
                          </div>
                          <button
                            onClick={() => toggleMeal(selectedMember.id, i)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                              meal.logged
                                ? 'bg-teal-500 text-white'
                                : 'bg-white border-2 border-teal-200 text-teal-600 hover:bg-teal-50'
                            }`}
                          >
                            {meal.logged ? 'Logged' : 'Log'}
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
