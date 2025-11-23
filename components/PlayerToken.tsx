import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '../types';

interface PlayerTokenProps {
  player: Player;
  isActive: boolean;
  squareSize: number; // Approximate size to calculate relative drag constraints if needed, though we use free drag here.
}

export const PlayerToken: React.FC<PlayerTokenProps> = ({ player, isActive }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.2, zIndex: 100, cursor: 'grabbing' }}
      whileHover={{ scale: 1.1, cursor: 'grab' }}
      className={`absolute w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg border-2 flex items-center justify-center text-2xl md:text-3xl select-none z-20 transition-colors duration-300`}
      style={{
        backgroundColor: player.color,
        borderColor: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        boxShadow: isActive ? '0 0 0 4px rgba(255, 255, 255, 0.8), 0 0 0 8px rgba(99, 102, 241, 0.5)' : 'none'
      }}
    >
      {player.avatar}
      {isActive && (
        <div className="absolute -bottom-8 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap pointer-events-none">
          Tu turno
        </div>
      )}
    </motion.div>
  );
};