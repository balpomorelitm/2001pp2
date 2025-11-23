import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { questions, spareQuestions } from './data/questions';
import { GameState, Player, TOTAL_SQUARES } from './types';
import { Die } from './components/Die';
import { BoardSquare } from './components/BoardSquare';
import { PlayerToken } from './components/PlayerToken';
import { QuestionModal } from './components/QuestionModal';
import { AnimatePresence, motion } from 'framer-motion';

// Fun avatar options
const AVATAR_OPTIONS = [
    '👩‍🎓', '👨‍🎓', '🧟', '👨‍🚀', '🧛', '🤖', '🦸', '🕵️', '🥷', '👽', 
    '🤠', '🧚', '🧞', '👻', '🤡', '👩‍🍳', '👩‍🎤', '🛹', '🦄', '🦖',
    '🦁', '🐷', '🦊', '🐶', '🐱'
];

// Colors for up to 5 players
const PLAYER_COLORS = [
    '#ffadad', // Red/Pink
    '#ffd6a5', // Orange
    '#fdffb6', // Yellow
    '#caffbf', // Green
    '#9bf6ff', // Cyan
];

function App() {
  // Setup State
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [setupStage, setSetupStage] = useState<'COUNT' | 'CHARACTERS'>('COUNT');
  const [gameState, setGameState] = useState<GameState>(GameState.SETUP);
  
  // Game Play State
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [targetSquare, setTargetSquare] = useState<number | null>(null);
  const [waitingForMove, setWaitingForMove] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<typeof questions[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  
  // Track used questions to avoid repetition
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);

  // Refs for rendering tokens on board
  const boardRef = useRef<HTMLDivElement>(null);
  
  // Win logic
  const { width, height } = useWindowSizeCustom();

  // --- Setup Handlers ---

  const initCharacterSelection = (count: number) => {
    setNumPlayers(count);
    // Initialize empty players for selection
    const initialPlayers: Player[] = Array.from({ length: count }).map((_, i) => ({
        id: i,
        name: `Estudiante ${i + 1}`,
        avatar: '', // To be selected
        position: 0,
        color: PLAYER_COLORS[i],
        turnsToSkip: 0
    }));
    setPlayers(initialPlayers);
    setSetupStage('CHARACTERS');
  };

  const handleSelectAvatar = (playerId: number, avatar: string) => {
    const updatedPlayers = players.map(p => 
        p.id === playerId ? { ...p, avatar } : p
    );
    setPlayers(updatedPlayers);
  };

  const handleStartGame = () => {
    if (players.some(p => !p.avatar)) return;
    setGameState(GameState.PLAYING);
    setCurrentPlayerIndex(0);
    setUsedQuestionIds([]);
  };

  const handleResetGame = () => {
    // We use a direct check or window.confirm. 
    // Ensuring the state reset is complete.
    if (window.confirm("¿Seguro que quieres reiniciar la partida?")) {
        setGameState(GameState.SETUP);
        setSetupStage('COUNT');
        setPlayers([]);
        setCurrentPlayerIndex(0);
        setTargetSquare(null);
        setWaitingForMove(false);
        setUsedQuestionIds([]);
        setActiveQuestion(null);
        setIsModalOpen(false);
        setAlertMessage(null);
    }
  };

  // --- Game Loop Handlers ---

  const currentPlayer = players[currentPlayerIndex];

  // Auto-skip turn if player is in jail
  useEffect(() => {
    if (gameState === GameState.PLAYING && !waitingForMove && !isModalOpen && currentPlayer.turnsToSkip > 0) {
       const timer = setTimeout(() => {
           setAlertMessage(`${currentPlayer.name} está en la cárcel. Pierde el turno. (${currentPlayer.turnsToSkip} rondas restantes)`);
           
           const updatedPlayers = [...players];
           updatedPlayers[currentPlayerIndex].turnsToSkip -= 1;
           setPlayers(updatedPlayers);

           setTimeout(() => {
               setAlertMessage(null);
               nextTurn();
           }, 2000);
       }, 500);
       return () => clearTimeout(timer);
    }
  }, [currentPlayerIndex, gameState, players, waitingForMove, isModalOpen]);


  const handleRoll = (roll: number) => {
    if (waitingForMove || isModalOpen || currentPlayer.turnsToSkip > 0) return;

    let nextPosition = currentPlayer.position + roll;

    // Bounce logic rule says: "no puede rebotar, tiene que entrar con número exacto"
    if (nextPosition > TOTAL_SQUARES) {
      setWaitingForMove(true);
      setTimeout(() => {
        alert(`¡Te has pasado! Necesitas un número exacto para llegar al profe. Te quedas en la ${currentPlayer.position}.`);
        setWaitingForMove(false);
        nextTurn();
      }, 500);
      return;
    }

    // Determine target type ahead of time
    const targetQ = questions.find(q => q.id === nextPosition);
    const isPrison = targetQ?.specialType === 'PRISON';

    // COLLISION MECHANIC:
    let finalPosition = nextPosition;
    
    // Bump forward if occupied (unless it's the final square OR PRISON)
    if (!isPrison && finalPosition < TOTAL_SQUARES) {
        while (
            finalPosition < TOTAL_SQUARES && 
            players.some(p => p.position === finalPosition && p.id !== currentPlayer.id)
        ) {
            // Check if the NEXT square is prison, if we bump into prison, we stay there (stack)
            const nextQ = questions.find(q => q.id === finalPosition + 1);
            if (nextQ?.specialType === 'PRISON') {
                finalPosition++;
                break; // Stop bumping, we are now in prison stacked
            }
            finalPosition++;
        }
    }

    if (finalPosition > TOTAL_SQUARES) {
        finalPosition = TOTAL_SQUARES;
    }

    setTargetSquare(finalPosition);
    setWaitingForMove(true);
  };

  const handleSquareClick = (index: number) => {
    // Only interact if we are waiting for a move and clicked the correct target
    if (gameState !== GameState.PLAYING || !waitingForMove || index !== targetSquare) return;

    // Move logic confirmed
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].position = index;
    setPlayers(updatedPlayers);
    setWaitingForMove(false);
    setTargetSquare(null);

    if (index === TOTAL_SQUARES) {
      setGameState(GameState.WIN);
    } else {
      // Find the question associated with this square
      const baseQuestion = questions.find(q => q.id === index);
      
      if (!baseQuestion) {
          nextTurn();
          return;
      }

      // CHECK FOR REPLACEMENT QUESTION
      let questionToAsk = baseQuestion;
      
      // If it's a normal question (not special) and has been used...
      if (!baseQuestion.specialType && usedQuestionIds.includes(baseQuestion.id)) {
          // Find unused spares
          const availableSpares = spareQuestions.filter(sq => !usedQuestionIds.includes(sq.id));
          if (availableSpares.length > 0) {
              const randomIndex = Math.floor(Math.random() * availableSpares.length);
              questionToAsk = availableSpares[randomIndex];
          } else {
             // Fallback: recycle spares if all used (unlikely in one game)
             const randomIndex = Math.floor(Math.random() * spareQuestions.length);
             questionToAsk = spareQuestions[randomIndex];
          }
      }

      // Mark question as used
      if (!usedQuestionIds.includes(questionToAsk.id)) {
          setUsedQuestionIds(prev => [...prev, questionToAsk.id]);
      }

      setActiveQuestion(questionToAsk);
      setIsModalOpen(true);
    }
  };

  const handleQuestionComplete = () => {
    setIsModalOpen(false);

    // Apply special effects based on the JUST COMPLETED question (activeQuestion might be a spare, spares are usually BONUS type or NORMAL)
    if (activeQuestion?.specialType === 'BONUS') {
        setTimeout(() => setAlertMessage("¡Turno Extra! Tira de nuevo 🎲"), 300);
        setTimeout(() => setAlertMessage(null), 2500);
        // Do NOT call nextTurn(), player stays same
    } else if (activeQuestion?.specialType === 'PRISON') {
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayerIndex].turnsToSkip = 2; 
        setPlayers(updatedPlayers);
        nextTurn();
    } else {
        nextTurn();
    }
    
    setActiveQuestion(null);
  };

  const nextTurn = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  // Helper to render board
  const renderBoard = () => {
    const grid = [];
    // Total squares 0 to 34.
    for (let i = 0; i <= TOTAL_SQUARES; i++) {
        const q = questions.find(qu => qu.id === i);
        grid.push(
            <div key={i} className={`relative ${i === TOTAL_SQUARES ? 'col-span-2 sm:col-span-2' : ''}`}>
                <BoardSquare 
                    index={i} 
                    isStart={i === 0}
                    isEnd={i === TOTAL_SQUARES}
                    isTarget={i === targetSquare}
                    specialType={q?.specialType}
                    onClick={() => handleSquareClick(i)}
                />
                
                {/* Render players on this square */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                    {players.filter(p => p.position === i).map((player, idx) => (
                        <div key={player.id} className="relative pointer-events-auto transition-all duration-500" style={{ 
                            transform: `translate(${idx * 8}px, ${idx * -4}px)`,
                            zIndex: 20 + idx
                        }}>
                             <PlayerToken 
                                player={player} 
                                isActive={gameState === GameState.PLAYING && currentPlayerIndex === player.id}
                                squareSize={80} // Approx
                             />
                             {player.turnsToSkip > 0 && (
                                 <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white z-50">
                                     {player.turnsToSkip}
                                 </div>
                             )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return grid;
  };

  // Check which avatars are taken
  const takenAvatars = players.map(p => p.avatar).filter(Boolean);

  return (
    <div className="min-h-screen bg-orange-50 text-slate-800 flex flex-col items-center font-['Nunito']">
      {gameState === GameState.WIN && <Confetti width={width} height={height} numberOfPieces={500} recycle={false} />}

      {/* Global Alert Toast */}
      <AnimatePresence>
          {alertMessage && (
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="fixed top-20 z-50 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl border-2 border-yellow-400 font-bold flex items-center gap-2"
            >
                <span>📢</span>
                {alertMessage}
            </motion.div>
          )}
      </AnimatePresence>

      {/* Header */}
      <header className="w-full bg-orange-600 text-white p-3 shadow-lg sticky top-0 z-40 border-b-4 border-orange-800">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏫</span>
            <h1 className="text-lg md:text-2xl font-black tracking-wide font-['Fredoka']">
               Clase de Español: Misión PP2
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {gameState === GameState.PLAYING && (
                <>
                    <button 
                        onClick={handleResetGame}
                        className="text-xs bg-orange-800 hover:bg-orange-900 text-white px-3 py-1 rounded shadow"
                    >
                        Reiniciar
                    </button>
                    <div className="flex gap-2 text-sm font-bold bg-white text-orange-800 px-3 py-1 rounded-full border-2 border-orange-800 shadow-sm">
                    Turno: {players[currentPlayerIndex].name}
                    </div>
                </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl p-4 flex flex-col gap-6">
        
        {/* Setup Screen Phase 1: Count */}
        {gameState === GameState.SETUP && setupStage === 'COUNT' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-fade-in-up mt-10">
            <div className="bg-white p-8 rounded-sm shadow-2xl border-4 border-orange-200 text-center max-w-md w-full relative">
              <span className="text-6xl mb-4 block mt-4">🎒</span>
              <h2 className="text-3xl font-black text-orange-900 mb-2 font-['Fredoka']">La Misión PP2</h2>
              <p className="text-slate-500 mb-4 font-bold">
                  Objetivo: Llegar a la mesa del profesor para echar un vistazo al examen PP2 👁️👁️
              </p>
              <p className="text-sm text-slate-400 mb-8 italic">
                  (El profe se ha quedado dormido roncando... ¡es tu oportunidad!)
              </p>
              
              <div className="mb-8 bg-orange-50 p-6 rounded-xl">
                <label className="block text-slate-700 font-bold mb-4 uppercase tracking-wider">¿Cuántos estudiantes?</label>
                <div className="flex justify-center gap-3">
                  {[2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => initCharacterSelection(n)}
                      className="w-14 h-14 rounded-xl font-black text-2xl transition-all border-b-4 bg-white text-orange-500 border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-700 hover:-translate-y-1 active:translate-y-0"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Setup Screen Phase 2: Characters */}
        {gameState === GameState.SETUP && setupStage === 'CHARACTERS' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-fade-in-up">
                 <h2 className="text-3xl font-black text-orange-900 font-['Fredoka'] uppercase">Elige tu personaje</h2>
                 <p className="text-slate-600">Cada estudiante debe elegir un avatar único.</p>
                 
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                    {players.map((player) => (
                        <div key={player.id} className="bg-white p-4 rounded-xl shadow-lg border-b-4 flex flex-col items-center gap-3 transition-colors" style={{ borderColor: player.color }}>
                            <div className="font-bold text-slate-700">{player.name}</div>
                            
                            {/* Selected Avatar Display */}
                            <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl bg-slate-100 border-2 border-slate-200 relative">
                                {player.avatar || '❓'}
                            </div>

                            {/* Avatar Picker Grid for this player */}
                            <div className="w-full h-32 overflow-y-auto custom-scroll bg-slate-50 rounded-lg p-2 grid grid-cols-4 gap-2">
                                {AVATAR_OPTIONS.map((emoji) => {
                                    const isTaken = takenAvatars.includes(emoji) && player.avatar !== emoji;
                                    const isSelected = player.avatar === emoji;
                                    
                                    return (
                                        <button
                                            key={emoji}
                                            disabled={isTaken}
                                            onClick={() => handleSelectAvatar(player.id, emoji)}
                                            className={`text-xl p-1 rounded hover:bg-white hover:shadow-sm transition-all ${isSelected ? 'bg-green-200 ring-2 ring-green-500' : ''} ${isTaken ? 'opacity-20 cursor-not-allowed grayscale' : ''}`}
                                        >
                                            {emoji}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                 </div>

                 <div className="flex gap-4 mt-8">
                     <button 
                        onClick={() => setSetupStage('COUNT')}
                        className="text-slate-500 font-bold hover:underline"
                     >
                         ← Volver
                     </button>
                     <button
                        onClick={handleStartGame}
                        disabled={players.some(p => !p.avatar)}
                        className={`px-8 py-4 rounded-xl font-black text-xl shadow-lg border-b-4 transition-all transform ${
                            players.some(p => !p.avatar) 
                            ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed' 
                            : 'bg-green-500 text-white border-green-700 hover:bg-green-400 hover:-translate-y-1'
                        }`}
                     >
                        ¡EMPEZAR CLASE!
                     </button>
                 </div>
            </div>
        )}

        {/* Win Screen */}
        {gameState === GameState.WIN && (
           <div className="flex-1 flex flex-col items-center justify-center text-center animate-bounce-in mt-10">
             <div className="bg-white p-10 rounded-sm shadow-2xl border-8 border-yellow-400 aspect-square flex flex-col items-center justify-center max-w-md relative rotate-1">
                <div className="absolute -top-6 bg-red-600 text-white px-4 py-2 font-black text-2xl rotate-[-5deg] shadow-lg">A+</div>
                <span className="text-8xl mb-4">🎓</span>
                <h2 className="text-4xl font-black text-slate-800 mb-2 font-['Fredoka']">¡APROBADO!</h2>
                <p className="text-xl font-bold text-slate-600 mb-6">
                    {players[currentPlayerIndex].name} ha visto el examen.
                </p>
                <div className="bg-green-100 text-green-800 p-4 border-2 border-green-200 rounded font-mono text-sm">
                    SPAN2001 FINAL GRADE:<br/>
                    <strong>A+</strong>
                </div>
                <button 
                    onClick={() => {
                         setGameState(GameState.SETUP); 
                         setSetupStage('COUNT');
                         setPlayers([]);
                         setCurrentPlayerIndex(0);
                    }}
                    className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-blue-600 transition"
                >
                    Jugar otra vez
                </button>
             </div>
           </div>
        )}

        {/* Board & Game Area */}
        {gameState === GameState.PLAYING && (
          <div className="flex flex-col-reverse md:flex-row gap-8 items-start justify-center">
            
            {/* Board Area */}
            <div className="flex-1 w-full max-w-4xl">
                {/* Floor Texture Background */}
               <div className="bg-[#e5d0b1] p-6 rounded-lg shadow-2xl border-8 border-[#8d6e63] relative overflow-hidden">
                   {/* Decorative floor tiles pattern */}
                   <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#8d6e63 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
                   
                   <div ref={boardRef} className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-6 relative z-10">
                      {renderBoard()}
                   </div>
               </div>
            </div>

            {/* Side Controls */}
            <div className="w-full md:w-72 flex flex-col gap-4 sticky top-24 z-30">
                {/* Active Player Card */}
                <div className="bg-white p-4 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.2)] border-2 border-slate-800 text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-xs font-black px-3 py-1 border-2 border-slate-800 rounded-full uppercase">
                        Turno Actual
                    </div>
                    <div className="mt-2 text-5xl mb-2 animate-bounce-slow">
                        {players[currentPlayerIndex].avatar}
                    </div>
                    <h3 className="text-xl font-black text-slate-800 font-['Fredoka']">
                        {players[currentPlayerIndex].name}
                    </h3>
                    
                    {waitingForMove ? (
                        <div className="mt-3 bg-green-100 text-green-800 text-sm font-bold px-3 py-2 rounded border-2 border-green-200 animate-pulse-custom">
                            👉 ¡Ve a la mesa {targetSquare}!
                        </div>
                    ) : (
                        <div className="mt-3 text-slate-400 text-xs font-bold">
                            {players[currentPlayerIndex].turnsToSkip > 0 
                                ? '😴 En la cárcel...' 
                                : 'Tira el dado para avanzar'
                            }
                        </div>
                    )}
                </div>

                {/* Dice Roller */}
                <div className="bg-slate-800 p-6 rounded-lg shadow-xl flex justify-center border-4 border-slate-600">
                    <Die 
                        onRoll={handleRoll} 
                        disabled={waitingForMove || currentPlayer.turnsToSkip > 0} 
                    />
                </div>

                {/* Mini Leaderboard */}
                <div className="bg-white/80 p-3 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-xs text-slate-500 uppercase mb-2">Clase</h4>
                    <div className="flex flex-col gap-1">
                        {players.map(p => (
                            <div key={p.id} className={`flex items-center justify-between text-xs p-1 rounded ${currentPlayerIndex === p.id ? 'bg-orange-100 font-bold' : ''}`}>
                                <div className="flex items-center gap-2">
                                    <span>{p.avatar}</span>
                                    <span>{p.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {p.turnsToSkip > 0 && <span>⛓️</span>}
                                    <span className="text-slate-400">Mesa {p.position}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        )}
      </main>

      {/* Question Modal */}
      {activeQuestion && (
        <QuestionModal 
            question={activeQuestion} 
            isOpen={isModalOpen} 
            onClose={handleQuestionComplete}
            playerName={players[currentPlayerIndex].name}
        />
      )}
    </div>
  );
}

// Simple window size hook implementation
function useWindowSizeCustom() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default App;