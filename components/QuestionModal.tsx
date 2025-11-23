import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types';

interface QuestionModalProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({ question, isOpen, onClose, playerName }) => {
  const [showHint, setShowHint] = useState(false);

  // Reset hint state when question changes or modal opens/closes
  React.useEffect(() => {
    setShowHint(false);
  }, [question, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose} // Optional: click outside to close? Better to force button click
          />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400"
          >
            {/* Header */}
            <div className="bg-yellow-400 p-4 flex justify-between items-center">
              <h3 className="text-xl font-black text-yellow-900 uppercase tracking-wider">
                Turno de {playerName}
              </h3>
              <div className="px-3 py-1 bg-white/30 rounded-full text-yellow-900 font-bold text-sm">
                Unidad {question.unit}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 text-center flex flex-col gap-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight font-['Fredoka']">
                {question.text}
              </h2>

              {/* Hint Section */}
              <div className="w-full">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-indigo-500 font-bold text-sm hover:underline flex items-center justify-center gap-2 w-full mb-2"
                >
                  {showHint ? 'Ocultar Ayuda' : '¿Necesitas Ayuda?'}
                  <span>{showHint ? '🙈' : '👀'}</span>
                </button>

                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-indigo-50 border-2 border-indigo-100 rounded-xl p-4 text-left shadow-inner">
                        <h4 className="font-bold text-indigo-800 mb-2 border-b border-indigo-200 pb-1">
                          {question.hintTitle}
                        </h4>
                        <div className="text-indigo-900 text-sm space-y-2 font-['Nunito']">
                          {question.hintContent}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-xl py-4 rounded-xl shadow-lg border-b-4 border-green-700 active:translate-y-1 active:border-b-0 transition-all"
              >
                ¡Hecho! Continuar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};