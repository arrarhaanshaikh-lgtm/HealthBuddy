import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { ProfileMode, QuestTask, Badge, KitchenTask, FamilyMember, MedicationSlot, FallPreventionTip } from '../types';

interface AppState {
  mode: ProfileMode;
  setMode: (mode: ProfileMode) => void;

  // Kids
  questTasks: QuestTask[];
  toggleQuestTask: (id: string) => void;
  totalXP: number;
  badges: Badge[];

  // Homemaker
  kitchenTasks: KitchenTask[];
  toggleKitchenTask: (id: string) => void;
  familyMembers: FamilyMember[];
  toggleMeal: (memberId: string, mealIndex: number) => void;

  // Elderly
  medications: MedicationSlot[];
  toggleMedication: (id: string) => void;
  waterIntake: number;
  addWater: () => void;
  removeWater: () => void;
  fallTips: FallPreventionTip[];
  toggleFallTip: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const initialQuestTasks: QuestTask[] = [
  { id: 'q1', label: 'Brushed Teeth (Morning)', icon: '🪥', completed: false, xp: 20 },
  { id: 'q2', label: 'Sanitized ID Card', icon: '🪪', completed: false, xp: 15 },
  { id: 'q3', label: 'Washed Hands Before Lunch', icon: '🧼', completed: false, xp: 25 },
  { id: 'q4', label: 'Took a Bath', icon: '🛁', completed: false, xp: 20 },
  { id: 'q5', label: 'Trimmed Nails', icon: '✂️', completed: false, xp: 10 },
  { id: 'q6', label: 'Wore Clean Uniform', icon: '👕', completed: false, xp: 10 },
];

const initialBadges: Badge[] = [
  { id: 'b1', name: 'Soap Star', icon: '⭐', color: 'from-yellow-400 to-orange-400', unlocked: false, threshold: 30 },
  { id: 'b2', name: 'Germ Buster', icon: '🦸', color: 'from-teal-400 to-cyan-500', unlocked: false, threshold: 60 },
  { id: 'b3', name: 'Hygiene Hero', icon: '🏆', color: 'from-amber-400 to-yellow-500', unlocked: false, threshold: 90 },
  { id: 'b4', name: 'Health Champion', icon: '👑', color: 'from-pink-400 to-rose-500', unlocked: false, threshold: 100 },
];

const initialKitchenTasks: KitchenTask[] = [
  { id: 'k1', label: 'Sanitized cutting boards after raw meat', category: 'Cross-Contamination', completed: false, frequency: 'Daily' },
  { id: 'k2', label: 'Washed utensils with hot soapy water', category: 'Utensil Sterilizing', completed: false, frequency: 'Daily' },
  { id: 'k3', label: 'Wiped kitchen counters and stovetop', category: 'Surface Cleaning', completed: false, frequency: 'Daily' },
  { id: 'k4', label: 'Deep cleaned refrigerator shelves', category: 'Deep Cleaning', completed: false, frequency: 'Weekly' },
  { id: 'k5', label: 'Descaled kettle and faucet heads', category: 'Deep Cleaning', completed: false, frequency: 'Monthly' },
  { id: 'k6', label: 'Separated raw and cooked food storage', category: 'Cross-Contamination', completed: false, frequency: 'Daily' },
  { id: 'k7', label: 'Replaced dish sponge/scrub pad', category: 'Hygiene Supplies', completed: false, frequency: 'Weekly' },
  { id: 'k8', label: 'Cleaned microwave interior', category: 'Surface Cleaning', completed: false, frequency: 'Weekly' },
];

const initialFamilyMembers: FamilyMember[] = [
  {
    id: 'f1',
    name: 'Aarav',
    relation: 'Son (Age 10)',
    avatar: '👦',
    vaccinations: [
      { name: 'Tetanus Booster', date: '2026-01-15', nextDue: '2027-01-15' },
      { name: 'Flu Shot', date: '2026-09-01', nextDue: '2027-09-01' },
    ],
    healthLogs: [
      { date: '2026-09-20', note: 'Mild cold, resting at home' },
      { date: '2026-09-22', note: 'Recovered, back to school' },
    ],
    meals: [
      { meal: 'Breakfast', calories: 420, logged: true },
      { meal: 'Lunch', calories: 580, logged: true },
      { meal: 'Dinner', calories: 0, logged: false },
    ],
  },
  {
    id: 'f2',
    name: 'Priya',
    relation: 'Mother (Age 38)',
    avatar: '👩',
    vaccinations: [
      { name: 'Annual Checkup', date: '2026-03-10', nextDue: '2027-03-10' },
    ],
    healthLogs: [
      { date: '2026-09-18', note: 'Regular checkup - all normal' },
    ],
    meals: [
      { meal: 'Breakfast', calories: 350, logged: true },
      { meal: 'Lunch', calories: 0, logged: false },
      { meal: 'Dinner', calories: 0, logged: false },
    ],
  },
  {
    id: 'f3',
    name: 'Rajesh',
    relation: 'Grandfather (Age 68)',
    avatar: '👴',
    vaccinations: [
      { name: 'Pneumococcal', date: '2026-02-20', nextDue: '2027-02-20' },
      { name: 'Shingles', date: '2026-06-05', nextDue: '2031-06-05' },
    ],
    healthLogs: [
      { date: '2026-09-15', note: 'Blood pressure slightly elevated' },
      { date: '2026-09-21', note: 'BP normal after medication adjustment' },
    ],
    meals: [
      { meal: 'Breakfast', calories: 300, logged: true },
      { meal: 'Lunch', calories: 450, logged: true },
      { meal: 'Dinner', calories: 0, logged: false },
    ],
  },
];

const initialMedications: MedicationSlot[] = [
  { id: 'm1', label: 'Morning Pills', time: '8:00 AM', taken: false },
  { id: 'm2', label: 'Afternoon Pills', time: '1:00 PM', taken: false },
  { id: 'm3', label: 'Night Pills', time: '8:00 PM', taken: false },
];

const initialFallTips: FallPreventionTip[] = [
  { id: 'ft1', title: 'Non-slip Bathroom Mats', description: 'Place rubber-backed mats inside and outside the bathtub to prevent slipping on wet surfaces.', icon: '🛁', checked: false },
  { id: 'ft2', title: 'Well-lit Hallways', description: 'Install nightlights along corridors and stairways. Ensure switches are easily reachable from bed.', icon: '💡', checked: false },
  { id: 'ft3', title: 'Clear Floor Pathways', description: 'Remove loose rugs, electrical cords, and clutter from walkways. Keep furniture arranged for wide paths.', icon: '🚶', checked: false },
  { id: 'ft4', title: 'Secure Grab Bars', description: 'Install sturdy grab bars next to the toilet and in the shower. Check they can support full body weight.', icon: '🚿', checked: false },
  { id: 'ft5', title: 'Proper Footwear', description: 'Wear non-slip, well-fitting shoes indoors. Avoid walking in socks or loose slippers on smooth floors.', icon: '👟', checked: false },
  { id: 'ft6', title: 'Sturdy Furniture', description: 'Ensure chairs and beds are at a comfortable height. Use furniture with armrests for support when sitting or standing.', icon: '🪑', checked: false },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ProfileMode>('kids');
  const [questTasks, setQuestTasks] = useState<QuestTask[]>(initialQuestTasks);
  const [kitchenTasks, setKitchenTasks] = useState<KitchenTask[]>(initialKitchenTasks);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [medications, setMedications] = useState<MedicationSlot[]>(initialMedications);
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [fallTips, setFallTips] = useState<FallPreventionTip[]>(initialFallTips);

  const toggleQuestTask = useCallback((id: string) => {
    setQuestTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const toggleKitchenTask = useCallback((id: string) => {
    setKitchenTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const toggleMeal = useCallback((memberId: string, mealIndex: number) => {
    setFamilyMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              meals: m.meals.map((meal: { meal: string; calories: number; logged: boolean }, i: number) =>
                i === mealIndex ? { ...meal, logged: !meal.logged } : meal
              ),
            }
          : m
      )
    );
  }, []);

  const toggleMedication = useCallback((id: string) => {
    setMedications((prev) => prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)));
  }, []);

  const addWater = useCallback(() => {
    setWaterIntake((prev) => Math.min(prev + 1, 12));
  }, []);

  const removeWater = useCallback(() => {
    setWaterIntake((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleFallTip = useCallback((id: string) => {
    setFallTips((prev) => prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)));
  }, []);

  const totalXP = questTasks.filter((t) => t.completed).reduce((sum, t) => sum + t.xp, 0);
  const badges = initialBadges.map((b) => ({ ...b, unlocked: totalXP >= b.threshold }));

  const value: AppState = {
    mode,
    setMode,
    questTasks,
    toggleQuestTask,
    totalXP,
    badges,
    kitchenTasks,
    toggleKitchenTask,
    familyMembers,
    toggleMeal,
    medications,
    toggleMedication,
    waterIntake,
    addWater,
    removeWater,
    fallTips,
    toggleFallTip,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
