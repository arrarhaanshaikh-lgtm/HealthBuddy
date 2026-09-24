import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import KidsMode from '@/components/kids/KidsMode';
import HomemakerMode from '@/components/homemaker/HomemakerMode';
import ElderlyMode from '@/components/elderly/ElderlyMode';

function ModeContent() {
  const { mode } = useApp();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {mode === 'kids' && <KidsMode />}
        {mode === 'homemaker' && <HomemakerMode />}
        {mode === 'elderly' && <ElderlyMode />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <ModeContent />
      </div>
    </AppProvider>
  );
}
