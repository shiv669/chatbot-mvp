import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';

interface FlashcardProps {
  question: string;
  answer: string;
  confidence: number;
  onConfidenceUpdate: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  question,
  answer,
  confidence,
  onConfidenceUpdate,
  onNext,
  onPrevious,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <motion.div
        className="relative h-96 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
        initial={false}
      >
        <motion.div
          className="absolute w-full h-full rounded-2xl shadow-lg"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card */}
          <div
            className={`absolute w-full h-full rounded-2xl p-8 
              bg-gradient-to-br from-purple-500 to-indigo-600
              ${isFlipped ? 'pointer-events-none' : ''}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex flex-col items-center justify-center h-full text-white relative">
              <Sparkles className="w-8 h-8 mb-6 animate-pulse" />
              <h3 className="text-2xl font-semibold text-center leading-relaxed">
                {question}
              </h3>
              <motion.div
                className="absolute -z-10 inset-0 opacity-20"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 30%, white 0%, transparent 70%)',
                    'radial-gradient(circle at 70% 70%, white 0%, transparent 70%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>

          {/* Back of card */}
          <div
            className={`absolute w-full h-full rounded-2xl p-8
              bg-gradient-to-br from-indigo-500 to-purple-600 text-white
              ${!isFlipped ? 'pointer-events-none' : ''}`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="flex flex-col items-center justify-center h-full relative">
              <p className="text-xl text-center whitespace-pre-wrap leading-relaxed">
                {answer}
              </p>
              <motion.div
                className="absolute -z-10 inset-0 opacity-20"
                animate={{
                  background: [
                    'radial-gradient(circle at 70% 70%, white 0%, transparent 70%)',
                    'radial-gradient(circle at 30% 30%, white 0%, transparent 70%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-8 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrevious}
          className="p-2 rounded-full hover:bg-purple-100 text-purple-600"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onConfidenceUpdate(value)}
              className={`p-2 rounded-full transition-colors
                ${confidence === value ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              <Star className="w-6 h-6" />
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="p-2 rounded-full hover:bg-purple-100 text-purple-600"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default Flashcard;