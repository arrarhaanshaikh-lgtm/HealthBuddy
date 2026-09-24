export type ProfileMode = 'kids' | 'homemaker' | 'elderly';

export interface QuestTask {
  id: string;
  label: string;
  icon: string;
  completed: boolean;
  xp: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  unlocked: boolean;
  threshold: number;
}

export interface GermCard {
  id: string;
  name: string;
  emoji: string;
  color: string;
  front: string;
  back: string;
}

export interface KitchenTask {
  id: string;
  label: string;
  category: string;
  completed: boolean;
  frequency: string;
}

export interface StretchExercise {
  id: string;
  name: string;
  duration: string;
  description: string;
  icon: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  vaccinations: { name: string; date: string; nextDue: string }[];
  healthLogs: { date: string; note: string }[];
  meals: { meal: string; calories: number; logged: boolean }[];
}

export interface MedicationSlot {
  id: string;
  label: string;
  time: string;
  taken: boolean;
}

export interface FallPreventionTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  checked: boolean;
}
