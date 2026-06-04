import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { CheckCircle2, XCircle, Trophy, RotateCcw, HelpCircle } from 'lucide-react';
import { quizData } from '../data/content';

type Phase = 'answering' | 'feedback' | 'completed';

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

export default function QuizSection() {
  const [currentQ, setCurrentQ]   = useState(0);
  const [answers, setAnswers]      = useState<number[]>([]);
  const [selected, setSelected]    = useState<number | null>(null);
  const [phase, setPhase]          = useState<Phase>('answering');
  const [showConfetti, setShowConfetti] = useState(false);

  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });
  const { width, height } = useWindowSize();

  const question = quizData[currentQ];
  const score = answers.filter((a, i) => a === quizData[i].correctIndex).length;
  const scorePercent = Math.round((score / quizData.length) * 100);

  const handleSelect = (idx: number) => {
    if (phase !== 'answering') return;
    setSelected(idx);
    setPhase('feedback');
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected!];
    if (currentQ < quizData.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(c => c + 1);
      setSelected(null);
      setPhase('answering');
    } else {
      setAnswers(newAnswers);
      setPhase('completed');
      const finalScore = newAnswers.filter((a, i) => a === quizData[i].correctIndex).length;
      if (finalScore / quizData.length >= 0.6) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 6000);
      }
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setPhase('answering');
    setShowConfetti(false);
  };

  const getOptionStyle = (idx: number): string => {
    if (phase === 'answering') {
      return 'border-white/10 text-slate-300 hover:border-amber-400/40 hover:bg-amber-400/8 hover:text-slate-100 cursor-pointer';
    }
    if (idx === question.correctIndex) {
      return 'border-green-400/60 bg-green-400/15 text-green-200';
    }
    if (idx === selected && idx !== question.correctIndex) {
      return 'border-red-400/60 bg-red-400/15 text-red-200';
    }
    return 'border-white/5 text-slate-500 opacity-50';
  };

  return (
    <section id="quiz" className="relative py-24 sm:py-32 overflow-hidden">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={250}
          colors={['#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#8B5CF6']}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#080d1a] to-slate-900 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(139,92,246,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/25 text-purple-300 text-xs font-medium mb-6">
            <HelpCircle size={12} />
            Người trình bày: Quý
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 mb-4">
            Kiểm tra{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Kiến thức
            </span>
          </h2>
          <div className="section-divider" />
          <p className="text-slate-400 text-base sm:text-lg">
            5 câu hỏi về lý luận Lenin và Nhà nước. Bạn sẵn sàng chưa?
          </p>
        </motion.div>

        {/* Quiz content */}
        <AnimatePresence mode="wait">
          {phase !== 'completed' ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>Câu hỏi {currentQ + 1} / {quizData.length}</span>
                  <span>{Math.round(((currentQ) / quizData.length) * 100)}% hoàn thành</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-400 rounded-full"
                    animate={{ width: `${((currentQ) / quizData.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="glass rounded-2xl border border-white/8 p-6 sm:p-8 mb-5">
                <div className="text-amber-400/60 text-xs font-medium tracking-widest uppercase mb-4">
                  Câu {currentQ + 1}
                </div>
                <p className="text-slate-100 text-base sm:text-xl font-semibold leading-relaxed mb-6">
                  {question.question}
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={phase === 'feedback'}
                      whileHover={phase === 'answering' ? { scale: 1.01 } : {}}
                      whileTap={phase === 'answering' ? { scale: 0.99 } : {}}
                      className={`w-full text-left px-4 py-3.5 rounded-xl glass border transition-all duration-200 text-sm flex items-center gap-3 ${getOptionStyle(idx)}`}
                    >
                      {/* Option letter */}
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                        phase === 'feedback' && idx === question.correctIndex ? 'border-green-400 text-green-400' :
                        phase === 'feedback' && idx === selected && idx !== question.correctIndex ? 'border-red-400 text-red-400' :
                        'border-current'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>

                      <span className="flex-1 leading-snug">{opt}</span>

                      {/* Feedback icon */}
                      {phase === 'feedback' && idx === question.correctIndex && (
                        <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                      )}
                      {phase === 'feedback' && idx === selected && idx !== question.correctIndex && (
                        <XCircle size={16} className="text-red-400 shrink-0" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Explanation & Next */}
              <AnimatePresence>
                {phase === 'feedback' && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Explanation */}
                    <div className={`rounded-xl p-4 mb-4 border ${
                      selected === question.correctIndex
                        ? 'bg-green-400/10 border-green-400/30'
                        : 'bg-red-400/10 border-red-400/30'
                    }`}>
                      <div className="flex items-start gap-2">
                        {selected === question.correctIndex
                          ? <CheckCircle2 size={15} className="text-green-400 mt-0.5 shrink-0" />
                          : <XCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
                        }
                        <div>
                          <p className={`text-xs font-bold mb-1 ${selected === question.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
                            {selected === question.correctIndex ? 'Chính xác!' : 'Chưa đúng!'}
                          </p>
                          <p className="text-slate-300 text-xs leading-relaxed">{question.explanation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Next button */}
                    <motion.button
                      onClick={handleNext}
                      whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(245,158,11,0.4)' }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 bg-amber-400 text-slate-900 font-bold rounded-xl text-sm tracking-wide transition-all"
                    >
                      {currentQ < quizData.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          ) : (
            /* Results */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl border border-amber-400/25 p-8 sm:p-12 text-center"
            >
              {/* Trophy */}
              <div className="mb-6">
                <Trophy
                  size={52}
                  className={`mx-auto ${scorePercent >= 60 ? 'text-amber-400' : 'text-slate-500'}`}
                />
              </div>

              {/* Score */}
              <div className="text-5xl font-black text-amber-400 mb-2">{scorePercent}%</div>
              <p className="text-slate-300 text-lg font-semibold mb-2">
                {score} / {quizData.length} câu đúng
              </p>
              <p className={`text-sm mb-8 ${
                scorePercent >= 80 ? 'text-green-400' :
                scorePercent >= 60 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {scorePercent >= 80 ? '🎉 Xuất sắc! Bạn nắm vững lý luận Lenin.' :
                 scorePercent >= 60 ? '👍 Tốt! Bạn hiểu khá về chủ đề này.' :
                 '📚 Cần ôn thêm. Thử lại nhé!'}
              </p>

              {/* Answer summary */}
              <div className="grid grid-cols-5 gap-2 mb-8">
                {quizData.map((q, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full ${
                      answers[i] === q.correctIndex ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  />
                ))}
              </div>

              {/* Retry */}
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 mx-auto px-8 py-3.5 glass border border-amber-400/30 text-amber-400 font-medium rounded-xl text-sm hover:bg-amber-400/10 transition-all"
              >
                <RotateCcw size={14} /> Làm lại
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
