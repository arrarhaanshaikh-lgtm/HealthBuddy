import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { GermCard } from '@/types';

const germCards: GermCard[] = [
  {
    id: 'g1',
    name: 'Bacteria',
    emoji: '🦠',
    color: 'from-teal-400 to-cyan-500',
    front: 'I am a Bacteria!',
    back: 'I am everywhere! Some are good (in your tummy) and some make you sick. Washing hands with soap sends the bad ones down the drain!',
  },
  {
    id: 'g2',
    name: 'Virus',
    emoji: '😷',
    color: 'from-cyan-400 to-blue-500',
    front: 'I am a Virus!',
    back: 'I am super tiny and can make you sneeze and cough. But I cannot survive soap and water for 20 seconds. That is why handwashing is your superpower!',
  },
  {
    id: 'g3',
    name: 'Fungi',
    emoji: '🍄',
    color: 'from-amber-400 to-orange-500',
    front: 'I am a Fungus!',
    back: 'I love warm, damp places like between your toes! Keeping dry and clean keeps me away. I also make mushrooms on your pizza!',
  },
  {
    id: 'g4',
    name: 'Dirt',
    emoji: '🧹',
    color: 'from-orange-400 to-warm-500',
    front: 'I am Dirt & Dust!',
    back: 'I carry germs on my back! When you play outside, I stick to your hands. A good bath with soap washes me and my germ friends away!',
  },
];

function FlipCard({ card, index }: { card: GermCard; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-48"
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} p-5 flex flex-col items-center justify-center gap-3 shadow-lg`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-5xl">{card.emoji}</span>
          <p className="font-rounded font-bold text-lg text-white text-center">{card.front}</p>
          <div className="flex items-center gap-1 text-white/80 text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            Tap to flip!
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-white border-2 border-teal-200 p-5 flex flex-col items-center justify-center gap-2 shadow-lg"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-3xl">{card.emoji}</span>
          <p className="text-sm text-teal-700 text-center leading-relaxed">{card.back}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GermCards() {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-6 border-2 border-teal-100 shadow-lg">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md">
          <span className="text-2xl">🦠</span>
        </div>
        <div>
          <h3 className="font-rounded font-bold text-xl text-teal-800">Germ Education Cards</h3>
          <p className="text-sm text-teal-600">Tap a card to flip and learn about germs!</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {germCards.map((card, i) => (
          <FlipCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </div>
  );
}
