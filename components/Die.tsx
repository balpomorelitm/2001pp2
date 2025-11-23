import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DieProps {
  onRoll: (value: number) => void;
  disabled: boolean;
}

export const Die: React.FC<DieProps> = ({ onRoll, disabled }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [faceValue, setFaceValue] = useState<number | null>(null);

  const handleRoll = () => {
    if (disabled || isRolling) return;

    setIsRolling(true);
    setFaceValue(null);

    // Sound effect could go here

    setTimeout(() => {
      // 5-sided die logic (1-5)
      const newValue = Math.floor(Math.random() * 5) + 1;
      setFaceValue(newValue);
      setIsRolling(false);
      onRoll(newValue);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleRoll}
        disabled={disabled || isRolling}
        className={`relative w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-xl border-b-8 border-red-700 flex items-center justify-center transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'
        }`}
        animate={isRolling ? {
          rotate: [0, 90, 180, 270, 360],
          y: [0, -20, 0, -10, 0],
          scale: [1, 1.1, 1]
        } : {}}
        transition={isRolling ? { duration: 0.8, repeat: Infinity } : {}}
      >
        {faceValue ? (
            <span className="text-5xl font-black text-white drop-shadow-md font-['Fredoka']">
              {faceValue}
            </span>
        ) : (
            <span className="text-white text-sm font-bold uppercase tracking-widest">
              {isRolling ? '...' : 'Tirar'}
            </span>
        )}
        
        {/* Shine effect */}
        <div className="absolute top-2 left-2 w-6 h-6 bg-white opacity-20 rounded-full blur-sm"></div>
      </motion.button>
      <div className="text-gray-600 font-bold text-sm bg-white/80 px-3 py-1 rounded-full shadow-sm">
        Dado 1-5
      </div>
    </div>
  );
};