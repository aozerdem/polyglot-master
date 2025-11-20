import React, { useState, useEffect } from 'react';
import { Trophy, Clock, RotateCcw, Play, CheckCircle, XCircle, Globe, SkipForward, AlertCircle } from 'lucide-react';

// --- DATASET (Same as V7) ---
const LANGUAGES = [
  // LATIN FAMILY
  { id: 'es', name: 'Spanish', countryCode: 'es', family: 'latin' },
  { id: 'fr', name: 'French', countryCode: 'fr', family: 'latin' },
  { id: 'de', name: 'German', countryCode: 'de', family: 'latin' },
  { id: 'it', name: 'Italian', countryCode: 'it', family: 'latin' },
  { id: 'pt', name: 'Portuguese', countryCode: 'pt', family: 'latin' },
  { id: 'br', name: 'Portuguese (Brazil)', countryCode: 'br', family: 'latin' },
  { id: 'nl', name: 'Dutch', countryCode: 'nl', family: 'latin' },
  { id: 'tr', name: 'Turkish', countryCode: 'tr', family: 'latin' },
  { id: 'se', name: 'Swedish', countryCode: 'se', family: 'latin' },
  { id: 'no', name: 'Norwegian', countryCode: 'no', family: 'latin' },
  { id: 'dk', name: 'Danish', countryCode: 'dk', family: 'latin' },
  { id: 'fi', name: 'Finnish', countryCode: 'fi', family: 'latin' },
  { id: 'pl', name: 'Polish', countryCode: 'pl', family: 'latin' },
  { id: 'cz', name: 'Czech', countryCode: 'cz', family: 'latin' },
  { id: 'hu', name: 'Hungarian', countryCode: 'hu', family: 'latin' },
  { id: 'vn', name: 'Vietnamese', countryCode: 'vn', family: 'latin' },
  { id: 'id', name: 'Indonesian', countryCode: 'id', family: 'latin' },
  { id: 'sw', name: 'Swahili', countryCode: 'ke', family: 'latin' },
  { id: 'ro', name: 'Romanian', countryCode: 'ro', family: 'latin' },
  { id: 'my', name: 'Malay', countryCode: 'my', family: 'latin' },
  { id: 'hr', name: 'Croatian', countryCode: 'hr', family: 'latin' },
  { id: 'rs', name: 'Serbian', countryCode: 'rs', family: 'latin' }, 

  // CYRILLIC / GREEK FAMILY
  { id: 'ru', name: 'Russian', countryCode: 'ru', family: 'cyrillic' },
  { id: 'ua', name: 'Ukrainian', countryCode: 'ua', family: 'cyrillic' },
  { id: 'bg', name: 'Bulgarian', countryCode: 'bg', family: 'cyrillic' },
  { id: 'gr', name: 'Greek', countryCode: 'gr', family: 'cyrillic' },

  // ASIAN / COMPLEX FAMILY
  { id: 'jp', name: 'Japanese', countryCode: 'jp', family: 'asian' },
  { id: 'kr', name: 'Korean', countryCode: 'kr', family: 'asian' },
  { id: 'cn', name: 'Chinese', countryCode: 'cn', family: 'asian' },
  { id: 'sa', name: 'Arabic', countryCode: 'sa', family: 'asian' },
  { id: 'in', name: 'Hindi', countryCode: 'in', family: 'asian' },
  { id: 'th', name: 'Thai', countryCode: 'th', family: 'asian' },
  { id: 'il', name: 'Hebrew', countryCode: 'il', family: 'asian' }
];

const QUESTION_POOL = [
  // --- EASY (Full Sentences / Clear Grammar) ---
  { text: "El gato duerme en la cama.", langId: 'es', difficulty: 'easy' },
  { text: "Je voudrais un croissant, s'il vous plaît.", langId: 'fr', difficulty: 'easy' },
  { text: "Das Wetter ist heute sehr schön.", langId: 'de', difficulty: 'easy' },
  { text: "Mi piace mangiare la pizza.", langId: 'it', difficulty: 'easy' },
  { text: "Eu gosto muito de música.", langId: 'pt', difficulty: 'easy' },
  { text: "Het is vandaag een mooie dag.", langId: 'nl', difficulty: 'easy' },
  { text: "Меня зовут Александр.", langId: 'ru', difficulty: 'easy' },
  { text: "おはようございます", langId: 'jp', difficulty: 'easy' }, 
  { text: "안녕하세요, 반가워요.", langId: 'kr', difficulty: 'easy' }, 
  { text: "今天天气很好.", langId: 'cn', difficulty: 'easy' },
  { text: "أحب شرب القهوة في الصباح.", langId: 'sa', difficulty: 'easy' },
  { text: "La vita è bella.", langId: 'it', difficulty: 'easy' },
  { text: "Bugün hava çok güzel.", langId: 'tr', difficulty: 'easy' },
  { text: "Dziecko bawi się w parku.", langId: 'pl', difficulty: 'easy' },
  { text: "Jag älskar att läsa böcker.", langId: 'se', difficulty: 'easy' },
  { text: "Saya suka makan nasi goreng.", langId: 'id', difficulty: 'easy' },
  { text: "Tôi đang học tiếng Việt.", langId: 'vn', difficulty: 'easy' },
  { text: "Ninaenda sokoni kununua chakula.", langId: 'sw', difficulty: 'easy' },
  { text: "Jeg liker å gå på tur i skogen.", langId: 'no', difficulty: 'easy' },
  { text: "Minä rakastan sinua.", langId: 'fi', difficulty: 'easy' },
  { text: "O tempo está muito bom hoje.", langId: 'br', difficulty: 'easy' },
  { text: "Uau, ce frumos este aici!", langId: 'ro', difficulty: 'easy' },
  { text: "Danes je lep dan.", langId: 'hr', difficulty: 'easy' },

  // --- MEDIUM (Phrases / Greetings / Short Sentences) ---
  { text: "Καλημέρα", langId: 'gr', difficulty: 'medium' },
  { text: "Teşekkür ederim", langId: 'tr', difficulty: 'medium' },
  { text: "Tack så mycket", langId: 'se', difficulty: 'medium' },
  { text: "Hvordan har du det?", langId: 'no', difficulty: 'medium' },
  { text: "Mange tak", langId: 'dk', difficulty: 'medium' },
  { text: "Dziękuję bardzo", langId: 'pl', difficulty: 'medium' },
  { text: "Ahoj, jak se máš?", langId: 'cz', difficulty: 'medium' },
  { text: "नमस्ते", langId: 'in', difficulty: 'medium' },
  { text: "Xin chào", langId: 'vn', difficulty: 'medium' },
  { text: "Apa kabar?", langId: 'id', difficulty: 'medium' },
  { text: "Hakuna Matata", langId: 'sw', difficulty: 'medium' },
  { text: "שָׁלוֹם עֲלֵיכֶם", langId: 'il', difficulty: 'medium' }, // Shalom Aleichem
  { text: "Selamat pagi", langId: 'my', difficulty: 'medium' },
  { text: "Слава Україні", langId: 'ua', difficulty: 'medium' },
  { text: "Mulțumesc", langId: 'ro', difficulty: 'medium' },
  { text: "Kiitos paljon", langId: 'fi', difficulty: 'medium' },
  { text: "Jó napot", langId: 'hu', difficulty: 'medium' },
  { text: "Dobrý den", langId: 'cz', difficulty: 'medium' },
  { text: "Bom dia", langId: 'pt', difficulty: 'medium' },
  { text: "בוקר טוב", langId: 'il', difficulty: 'medium' }, // Boker Tov
  { text: "ขอบคุณ", langId: 'th', difficulty: 'medium' }, // Khob khun
  { text: "شكراً", langId: 'sa', difficulty: 'medium' }, // Shukran
  { text: "Tot ziens", langId: 'nl', difficulty: 'medium' },
  { text: "Guten Tag", langId: 'de', difficulty: 'medium' },
  // New Medium Additions
  { text: "Selamat malam", langId: 'id', difficulty: 'medium' },
  { text: "Dobranoc", langId: 'pl', difficulty: 'medium' },
  { text: "Hyvää huomenta", langId: 'fi', difficulty: 'medium' },
  { text: "Güle güle", langId: 'tr', difficulty: 'medium' },
  { text: "Tervetuloa", langId: 'fi', difficulty: 'medium' },
  { text: "Entschuldigung", langId: 'de', difficulty: 'medium' },
  { text: "Perdón", langId: 'es', difficulty: 'medium' },
  { text: "Undskyld", langId: 'dk', difficulty: 'medium' },
  { text: "Var så god", langId: 'se', difficulty: 'medium' },
  { text: "Sziasztok", langId: 'hu', difficulty: 'medium' },
  { text: "Merhaba", langId: 'tr', difficulty: 'medium' },
  { text: "Buna ziua", langId: 'ro', difficulty: 'medium' },
  { text: "Undskyld", langId: 'no', difficulty: 'medium' },
  { text: "Ciao", langId: 'it', difficulty: 'medium' },
  { text: "Hola", langId: 'es', difficulty: 'medium' },
  { text: "Hallo", langId: 'nl', difficulty: 'medium' },
  { text: "Prego", langId: 'it', difficulty: 'medium' },

  // --- HARD (False Friends, Single Words, Tricky Spellings) ---
  { text: "Kippis", langId: 'fi', difficulty: 'hard' }, 
  { text: "Egészségedre", langId: 'hu', difficulty: 'hard' }, 
  { text: "สวัสดี", langId: 'th', difficulty: 'hard' }, 
  { text: "Öl", langId: 'de', difficulty: 'hard' }, // Oil (looks like nothing)
  { text: "Burro", langId: 'it', difficulty: 'hard' }, // Butter
  { text: "Gift", langId: 'de', difficulty: 'hard' }, // Poison
  { text: "Благодаря", langId: 'bg', difficulty: 'hard' }, 
  { text: "Hvala", langId: 'hr', difficulty: 'hard' }, 
  { text: "Živjeli", langId: 'rs', difficulty: 'hard' }, 
  { text: "Obrigado", langId: 'br', difficulty: 'hard' },
  { text: "ありがとう", langId: 'jp', difficulty: 'hard' }, 
  { text: "Grazie", langId: 'it', difficulty: 'hard' },
  { text: "Merci", langId: 'fr', difficulty: 'hard' },
  { text: "Danke", langId: 'de', difficulty: 'hard' },
  { text: "Спасибо", langId: 'ru', difficulty: 'hard' },
  { text: "Glass", langId: 'se', difficulty: 'hard' }, // Ice Cream
  { text: "Pain", langId: 'fr', difficulty: 'hard' }, // Bread
  { text: "Barn", langId: 'se', difficulty: 'hard' }, // Child
  { text: "Pies", langId: 'pl', difficulty: 'hard' }, // Dog
  { text: "Rot", langId: 'de', difficulty: 'hard' }, // Red
  { text: "Hell", langId: 'de', difficulty: 'hard' }, // Bright
  { text: "Bad", langId: 'de', difficulty: 'hard' }, // Bath
  { text: "Camera", langId: 'it', difficulty: 'hard' }, // Room
  { text: "Rien", langId: 'fr', difficulty: 'hard' }, // Nothing
  { text: "Água", langId: 'pt', difficulty: 'hard' }, 
  { text: "Agua", langId: 'es', difficulty: 'hard' }, 
  { text: "Coin", langId: 'fr', difficulty: 'hard' }, // Corner
  { text: "Chair", langId: 'fr', difficulty: 'hard' }, // Flesh
  { text: "Brief", langId: 'de', difficulty: 'hard' }, // Letter
  { text: "Wand", langId: 'de', difficulty: 'hard' }, // Wall
  { text: "Rat", langId: 'de', difficulty: 'hard' }, // Council
  { text: "Vatten", langId: 'se', difficulty: 'hard' },
  { text: "Moi", langId: 'fi', difficulty: 'hard' }, // Hi
  { text: "Szia", langId: 'hu', difficulty: 'hard' }, // Hi
  { text: "Ano", langId: 'cz', difficulty: 'hard' }, // Yes
  { text: "Hayır", langId: 'tr', difficulty: 'hard' }, // No
  // New Hard Additions (Super Tricky)
  { text: "Fart", langId: 'se', difficulty: 'hard' }, // Speed
  { text: "Slut", langId: 'se', difficulty: 'hard' }, // End
  { text: "Kiss", langId: 'se', difficulty: 'hard' }, // Pee
  { text: "Bra", langId: 'se', difficulty: 'hard' }, // Good
  { text: "Men", langId: 'nl', difficulty: 'hard' }, // People
  { text: "Mist", langId: 'de', difficulty: 'hard' }, // Crap/Dung
  { text: "Fast", langId: 'de', difficulty: 'hard' }, // Almost
  { text: "Angel", langId: 'de', difficulty: 'hard' }, // Fishing Rod
  { text: "Rock", langId: 'de', difficulty: 'hard' }, // Skirt
  { text: "Preservativo", langId: 'it', difficulty: 'hard' }, // Condom
  { text: "Embarazada", langId: 'es', difficulty: 'hard' }, // Pregnant
  { text: "Sensible", langId: 'fr', difficulty: 'hard' }, // Sensitive
  { text: "Actualmente", langId: 'es', difficulty: 'hard' }, // Currently
  { text: "Librería", langId: 'es', difficulty: 'hard' }, // Bookstore
  { text: "Carpeta", langId: 'es', difficulty: 'hard' }, // Folder
  { text: "Sim", langId: 'pt', difficulty: 'hard' }, // Yes (looks like Sim card)
  { text: "Bier", langId: 'de', difficulty: 'hard' }, // Beer
  { text: "Beer", langId: 'nl', difficulty: 'hard' }, // Bear
  { text: "Vila", langId: 'se', difficulty: 'hard' }, // Rest
  { text: "Gata", langId: 'se', difficulty: 'hard' }, // Street (vs Cat in latin)
  { text: "Kakor", langId: 'se', difficulty: 'hard' }, // Cookies
  { text: "Rar", langId: 'se', difficulty: 'hard' }, // Cute/Sweet (vs Rare/Weird)
  { text: "Full", langId: 'se', difficulty: 'hard' }, // Drunk
];

// --- UTILS ---

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const getOptions = (correctLangId) => {
  const correctLang = LANGUAGES.find(l => l.id === correctLangId);
  
  // 1. Filter for same family
  let potentialDistractors = LANGUAGES.filter(
    l => l.id !== correctLangId && l.family === correctLang.family
  );
  
  // 2. Fallback: If not enough in family (needs 3), add randoms from anywhere
  if (potentialDistractors.length < 3) {
    const otherLangs = LANGUAGES.filter(l => l.id !== correctLangId && l.family !== correctLang.family);
    potentialDistractors = [...potentialDistractors, ...otherLangs];
  }

  const shuffledDistractors = shuffle(potentialDistractors).slice(0, 3);
  return shuffle([...shuffledDistractors, correctLang]);
};

export default function LanguageGame() {
  const [gameState, setGameState] = useState('start'); 
  const [roundQuestions, setRoundQuestions] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const [penaltyAmount, setPenaltyAmount] = useState(0);

  // --- Game Logic ---

  const getDifficulty = (roundIndex) => {
    if (roundIndex < 4) return 'easy';
    if (roundIndex < 12) return 'medium';
    return 'hard';
  };

  const getPenalty = (difficulty) => {
    // UPDATED PENALTIES
    if (difficulty === 'easy') return 300; // -300 points
    if (difficulty === 'medium') return 200; // -200 points
    return 100; // -100 points (hard)
  };

  const startGame = () => {
    const easyQ = shuffle(QUESTION_POOL.filter(q => q.difficulty === 'easy')).slice(0, 4);
    const mediumQ = shuffle(QUESTION_POOL.filter(q => q.difficulty === 'medium')).slice(0, 8);
    const hardQ = shuffle(QUESTION_POOL.filter(q => q.difficulty === 'hard')).slice(0, 8);
    
    const finalSet = [...easyQ, ...mediumQ, ...hardQ];
    
    setRoundQuestions(finalSet);
    setCurrentRound(0);
    setScore(0);
    setStreak(0);
    setGameState('playing');
    loadRound(0, finalSet);
  };

  const loadRound = (index, questions) => {
    const q = questions[index];
    setOptions(getOptions(q.langId));
    setTimeLeft(15);
    setSelectedOption(null);
    setIsAnswered(false);
    setFeedback(null);
    setPenaltyAmount(0);
  };

  useEffect(() => {
    if (gameState !== 'playing' || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, isAnswered, currentRound]);

  const handleTimeout = () => {
    setIsAnswered(true);
    const diff = getDifficulty(currentRound);
    const penalty = getPenalty(diff);
    
    setScore(prev => prev - penalty);
    setPenaltyAmount(penalty);
    setFeedback('wrong');
    setStreak(0);
    
    setTimeout(nextRound, 2000);
  };

  const handlePass = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setFeedback('pass');
    setStreak(0); 
    setTimeout(nextRound, 1000);
  }

  const handleAnswer = (langId) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    setSelectedOption(langId);
    
    const currentQ = roundQuestions[currentRound];
    const isCorrect = langId === currentQ.langId;

    if (isCorrect) {
      const timeBonus = timeLeft * 10;
      const streakBonus = streak * 10;
      const points = 100 + timeBonus + streakBonus;
      
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setFeedback('correct');
    } else {
      const diff = getDifficulty(currentRound);
      const penalty = getPenalty(diff);
      
      setScore(prev => prev - penalty);
      setPenaltyAmount(penalty);
      setStreak(0);
      setFeedback('wrong');
    }

    setTimeout(nextRound, 2000);
  };

  const nextRound = () => {
    if (currentRound + 1 < roundQuestions.length) {
      setCurrentRound(prev => prev + 1);
      loadRound(currentRound + 1, roundQuestions);
    } else {
      setGameState('end');
    }
  };

  // --- VISUAL HELPERS ---
  const difficulty = getDifficulty(currentRound);
  
  const getDifficultyColor = (diff) => {
    if (diff === 'easy') return "text-green-500 border-green-500 bg-green-500/10";
    if (diff === 'medium') return "text-yellow-500 border-yellow-500 bg-yellow-500/10";
    return "text-red-500 border-red-500 bg-red-500/10";
  };

  // --- SCREENS ---

  // 1. Start Screen
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
        <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-slate-800">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Globe size={64} className="text-blue-500 animate-spin-slow" />
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 p-2 rounded-full text-slate-900">
                 <Trophy size={20} />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Polyglot<span className="text-blue-500">Master</span></h1>
          <p className="text-slate-400 mb-8 font-medium">Which language is this?</p>
          
          <div className="space-y-3 text-left bg-slate-950 p-6 rounded-2xl mb-8 border border-slate-800">
            <div className="flex items-center text-slate-300">
              <CheckCircle size={18} className="mr-3 text-green-400 flex-shrink-0" />
              <span className="text-sm">Identify the language from the flag</span>
            </div>
            <div className="flex items-center text-slate-300">
              <Clock size={18} className="mr-3 text-blue-400 flex-shrink-0" />
              <span className="text-sm">Speed matters! Extra points for time.</span>
            </div>
            <div className="flex items-center text-slate-300">
              <AlertCircle size={18} className="mr-3 text-red-400 flex-shrink-0" />
              <span className="text-sm">Wrong answers carry high penalties!</span>
            </div>
          </div>

          <button 
            onClick={startGame}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl text-xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <Play size={24} fill="currentColor" />
            Start Game
          </button>
        </div>
      </div>
    );
  }

  // 2. End Screen
  if (gameState === 'end') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
        <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-slate-800 animate-in fade-in zoom-in duration-300">
          <div className="inline-block p-4 rounded-full bg-yellow-500/10 mb-6">
            <Trophy size={64} className="text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Session Complete!</h2>
          <p className="text-slate-400 mb-8">You survived 20 rounds.</p>
          
          <div className="bg-slate-950 rounded-2xl p-6 mb-8 border border-slate-800">
             <p className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-2">Final Score</p>
             <div className={`text-5xl font-black ${score >= 0 ? 'text-white' : 'text-red-500'}`}>
               {score}
             </div>
          </div>

          <button 
            onClick={startGame}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2 border border-slate-700"
          >
            <RotateCcw size={20} />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // 3. Playing State
  const currentQ = roundQuestions[currentRound];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-4 font-sans text-slate-100 selection:bg-blue-500/30">
      
      {/* Header */}
      <div className="w-full max-w-xl flex justify-between items-center mb-6 pt-2">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5">
            <span className="text-xs font-bold text-slate-400 tracking-wider">
              ROUND {currentRound + 1}<span className="text-slate-600">/20</span>
            </span>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${getDifficultyColor(difficulty)} uppercase tracking-wider`}>
            {difficulty}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border ${score < 0 ? 'border-red-900/50 text-red-400' : 'border-slate-800 text-yellow-400'}`}>
             <Trophy size={16} />
             <span className="font-bold font-mono">{score}</span>
           </div>
        </div>
      </div>

      {/* Timer Bar (Visual) */}
      <div className="w-full max-w-xl h-1.5 bg-slate-900 rounded-full mb-8 overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 linear ${timeLeft < 5 ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white text-slate-900 p-8 rounded-3xl shadow-2xl text-center min-h-[180px] flex flex-col items-center justify-center relative overflow-hidden mb-6 transition-all w-full max-w-xl">
          <span className="absolute top-4 left-6 text-6xl text-slate-200 font-serif leading-none select-none">“</span>
          <h2 className="text-2xl md:text-3xl font-medium z-10 leading-relaxed max-w-prose">
            {currentQ?.text}
          </h2>
          <span className="absolute bottom-0 right-6 text-6xl text-slate-200 font-serif leading-none select-none">”</span>
      </div>

      {/* Flags Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        {options.map((opt) => {
          let btnClass = "bg-slate-900 border-2 border-slate-800 hover:border-slate-600 hover:bg-slate-800"; // Default
          
          if (isAnswered) {
            if (opt.id === currentQ.langId) {
              btnClass = "bg-green-500/20 border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]"; 
            } else if (selectedOption === opt.id) {
              btnClass = "bg-red-500/20 border-2 border-red-500 opacity-50"; 
            } else {
              btnClass = "bg-slate-900 border-slate-800 opacity-20 grayscale";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              disabled={isAnswered}
              className={`group relative h-28 rounded-2xl transition-all duration-200 flex items-center justify-center overflow-hidden ${btnClass} active:scale-95`}
            >
              {/* Flag Image from CDN */}
              <img 
                src={`https://flagcdn.com/w160/${opt.countryCode}.png`}
                srcSet={`https://flagcdn.com/w320/${opt.countryCode}.png 2x`}
                alt={opt.name}
                className="w-24 h-auto object-cover shadow-sm transform transition-transform group-hover:scale-110 duration-300"
              />
            </button>
          );
        })}
      </div>

      {/* Pass Button */}
      <div className="mt-6 flex justify-center w-full max-w-xl">
        <button 
          onClick={handlePass}
          disabled={isAnswered}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-300 px-6 py-3 rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-0"
        >
          <SkipForward size={20} />
          <span className="font-semibold">Pass Question</span>
        </button>
      </div>

      {/* Feedback Overlay */}
      {feedback && (
        <div className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-2xl font-bold shadow-2xl animate-in slide-in-from-bottom-4 fade-in zoom-in duration-300 border flex flex-col items-center
          ${feedback === 'correct' ? 'bg-slate-900 border-green-500/50 text-green-400' : 
            feedback === 'pass' ? 'bg-slate-900 border-slate-700 text-slate-400' :
            'bg-slate-900 border-red-500/50 text-red-400'}
        `}>
          {feedback === 'correct' ? (
            <>
              <div className="flex items-center gap-2 text-lg">
                <CheckCircle size={24}/> <span>Correct!</span>
              </div>
              <div className="text-xs font-normal mt-1 text-green-500/70">
                +{100 + (timeLeft*10) + (streak*10)} pts
              </div>
            </>
          ) : feedback === 'pass' ? (
             <div className="flex items-center gap-2 text-lg">
                <SkipForward size={24}/> <span>Passed</span>
             </div>
          ) : (
            <>
               <div className="flex items-center gap-2 text-lg">
                <XCircle size={24}/> <span>Wrong!</span>
              </div>
              <div className="text-xs font-normal mt-1 text-red-500/70">
                It was {LANGUAGES.find(l => l.id === currentQ.langId)?.name} • -{penaltyAmount} pts
              </div>
            </>
          )}
        </div>
      )}

    </div>
  );
}