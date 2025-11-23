import React from 'react';
import { motion } from 'framer-motion';

interface BoardSquareProps {
  index: number;
  isStart?: boolean;
  isEnd?: boolean;
  isTarget?: boolean;
  specialType?: 'NORMAL' | 'BONUS' | 'PRISON';
  onClick?: () => void;
}

export const BoardSquare: React.FC<BoardSquareProps> = ({ 
  index, 
  isStart, 
  isEnd, 
  isTarget,
  specialType,
  onClick
}) => {
  // Base Styles
  let deskColor = "bg-[#eab676]"; // Wood color
  let deskBorder = "border-[#854d0e]";
  let deskShadow = "shadow-[0_4px_0_#854d0e]";

  // Custom Styles based on type
  if (specialType === 'BONUS') {
    deskColor = "bg-gradient-to-br from-pink-300 to-purple-400";
    deskBorder = "border-purple-700";
    deskShadow = "shadow-[0_4px_0_#6b21a8]";
  } else if (specialType === 'PRISON') {
    deskColor = "bg-slate-300";
    deskBorder = "border-slate-600";
    deskShadow = "shadow-[0_4px_0_#334155]";
  }

  return (
    <div 
      className={`relative aspect-square w-full flex items-center justify-center`}
      onClick={onClick}
    >
        {/* Chair Back (Visual decoration appearing 'behind' the desk) */}
        {!isEnd && specialType !== 'PRISON' && (
             <div className="absolute -top-2 w-2/3 h-4 bg-gray-600 rounded-t-lg z-0"></div>
        )}

        <motion.div 
            className={`
                w-full h-full rounded-md border-b-8 z-10 flex flex-col items-center justify-center relative select-none overflow-hidden
                ${isEnd ? 'bg-slate-700 border-slate-900 shadow-xl' : `${deskColor} ${deskBorder} ${deskShadow}`}
                ${isTarget ? 'ring-4 ring-yellow-400 animate-pulse cursor-pointer' : ''}
            `}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.01 }}
        >
            {isStart ? (
                <>
                    <span className="text-3xl">🚪</span>
                    <span className="text-[10px] font-black uppercase text-amber-900 mt-1">Entrada</span>
                </>
            ) : isEnd ? (
                // Teacher's Desk Design
                <div className="w-full h-full flex flex-row items-center justify-center gap-2 relative overflow-hidden px-2">
                    <div className="absolute top-2 right-2 bg-white w-8 h-10 shadow-sm rotate-12 flex items-center justify-center border border-gray-300 z-20">
                        <span className="text-[8px] font-bold text-red-600">PP2</span>
                    </div>
                    <div className="text-4xl relative z-10 filter drop-shadow-md">
                        🧔🏻‍♂️
                        <div className="absolute -top-1 right-0 text-sm animate-pulse bg-white rounded-full px-1 border border-black font-bold">Zzz</div>
                    </div>
                </div>
            ) : specialType === 'BONUS' ? (
                // Bonus Square Design
                <>
                   <span className="text-3xl animate-bounce">🎲</span>
                   <span className="text-[8px] font-black uppercase text-white mt-1 drop-shadow-md">Bonus</span>
                   <div className="absolute inset-0 bg-white/20 z-0"></div>
                   {/* Confetti specs */}
                   <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-300 rounded-full"></div>
                   <div className="absolute bottom-2 right-1 w-2 h-2 bg-blue-300 rounded-full"></div>
                </>
            ) : specialType === 'PRISON' ? (
                // Prison Design
                <>
                    <span className="text-3xl z-0">⛓️</span>
                    <span className="text-[8px] font-black uppercase text-slate-800 mt-1">Cárcel</span>
                    {/* Bars overlay */}
                    <div className="absolute inset-0 flex justify-evenly pointer-events-none">
                        <div className="w-1 h-full bg-slate-700 shadow-sm"></div>
                        <div className="w-1 h-full bg-slate-700 shadow-sm"></div>
                        <div className="w-1 h-full bg-slate-700 shadow-sm"></div>
                    </div>
                </>
            ) : (
                // Normal Desk Design
                <>
                    <span className={`text-xl font-bold text-amber-900 opacity-40 font-['Fredoka']`}>{index}</span>
                    <div className="absolute bottom-2 left-2 w-6 h-8 bg-white/60 rounded-sm rotate-[-5deg]"></div>
                </>
            )}
            
            {/* Target indicator */}
            {isTarget && (
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 text-xs font-black px-2 py-1 rounded-full animate-bounce z-30 border-2 border-yellow-600 shadow-sm">
                    ¡AQUÍ!
                </div>
            )}
        </motion.div>
    </div>
  );
};