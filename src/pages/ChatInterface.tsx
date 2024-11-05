import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Plus, BookOpen, PenTool, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from '../components/ChatMessage';
import Flashcard from '../components/Flashcard';
import FlashcardCreator from '../components/FlashcardCreator';

const ESSAY_SUBJECTS = ['english', 'history', 'religious-studies'];

const exampleFlashcard = {
  question: "What are the key themes in Shakespeare's Macbeth?",
  answer: "1. Ambition and its corrupting influence\n2. Guilt and conscience\n3. Appearance vs. Reality\n4. Fate vs. Free will\n5. Gender roles and power\n6. Violence and tyranny",
  confidence: 3
};

const exampleEssayResponse = {
  question: "How does Shakespeare present the theme of ambition in Macbeth?",
  answer: "Shakespeare presents ambition as a dangerous force through Macbeth's actions...",
  feedback: "Grade: 8/9 (GCSE) - Excellent analysis of language and themes.\n\nStrengths:\n- Strong textual evidence\n- Clear argument structure\n- Sophisticated vocabulary\n\nAreas for improvement:\n- Include more context\n- Analyze multiple interpretations",
  modelAnswer: "In 'Macbeth', Shakespeare masterfully portrays ambition as a corrupting force..."
};

function ChatInterface() {
  const navigate = useNavigate();
  const { qualification, board, subject } = useParams();
  const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user'; content: string }>>([]);
  const [mode, setMode] = useState<'chat' | 'essay' | 'flashcards' | null>(null);
  const [showCreator, setShowCreator] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isEssaySubject = ESSAY_SUBJECTS.includes(subject || '');

  useEffect(() => {
    if (!mode) {
      setMessages([{
        type: 'bot',
        content: `Welcome to your ${subject} study assistant! How can I help you today?`
      }]);
    }
  }, [mode, subject]);

  const handleOptionSelect = (option: string) => {
    if (option === 'essay') {
      setMode('essay');
      setShowExample(true);
    } else if (option === 'flashcards') {
      setMode('flashcards');
      setShowExample(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(`/subjects/${qualification}/${board}`)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            {subject?.charAt(0).toUpperCase()}{subject?.slice(1)} - {board?.toUpperCase()}
          </h1>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full p-4 space-y-4">
        <div className="space-y-4">
          {!mode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect('essay')}
                className="p-6 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <PenTool className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {isEssaySubject ? 'Essay Feedback' : 'Practice Questions'}
                </h3>
                <p className="text-purple-100">
                  {isEssaySubject 
                    ? 'Get detailed feedback on your essays' 
                    : 'Practice with exam-style questions'}
                </p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect('flashcards')}
                className="p-6 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Brain className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Flashcards & Notes</h3>
                <p className="text-blue-100">Create and review smart flashcards</p>
              </motion.button>
            </motion.div>
          )}

          {showExample && mode === 'essay' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl p-6 shadow-lg space-y-4"
            >
              <div className="flex items-center space-x-3 text-purple-600 mb-4">
                <BookOpen className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Example Essay Feedback</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Question:</h4>
                  <p>{exampleEssayResponse.question}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Feedback:</h4>
                  <p className="whitespace-pre-wrap">{exampleEssayResponse.feedback}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                AI feedback system coming in the next update!
              </p>
            </motion.div>
          )}

          {showExample && mode === 'flashcards' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <Flashcard
                question={exampleFlashcard.question}
                answer={exampleFlashcard.answer}
                confidence={exampleFlashcard.confidence}
                onConfidenceUpdate={() => {}}
                onNext={() => {}}
                onPrevious={() => {}}
              />
              <p className="text-center text-gray-500 text-sm mt-4">
                AI-powered flashcard generation coming in the next update!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;