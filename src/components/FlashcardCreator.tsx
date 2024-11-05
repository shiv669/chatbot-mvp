import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useFlashcardStore } from '../store/flashcardStore';

interface FlashcardCreatorProps {
  subject: string;
  onClose: () => void;
}

const FlashcardCreator: React.FC<FlashcardCreatorProps> = ({ subject, onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const addFlashcard = useFlashcardStore((state) => state.addFlashcard);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      addFlashcard({
        question: question.trim(),
        answer: answer.trim(),
        subject,
        confidence: 1,
        lastReviewed: new Date(),
      });
      setQuestion('');
      setAnswer('');
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-2xl font-semibold mb-4">Create New Flashcard</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={3}
            placeholder="Enter your question..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Answer
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={3}
            placeholder="Enter the answer..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Flashcard</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FlashcardCreator;