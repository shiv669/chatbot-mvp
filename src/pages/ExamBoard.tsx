import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Award } from 'lucide-react';

function ExamBoard() {
  const navigate = useNavigate();
  const { qualification } = useParams();

  const examBoards = [
    {
      id: 'aqa',
      name: 'AQA',
      icon: CheckCircle,
      description: 'Assessment and Qualifications Alliance',
    },
    {
      id: 'edexcel',
      name: 'Edexcel',
      icon: Award,
      description: 'Pearson Edexcel Examinations',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Qualifications</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select Your Exam Board
          </h1>
          <p className="text-xl text-gray-600">
            Choose your examination board to access relevant study materials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {examBoards.map((board, index) => {
            const Icon = board.icon;
            return (
              <motion.button
                key={board.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2 + index * 0.1 }
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/subjects/${qualification}/${board.id}`)}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-4">
                  <div className="inline-block p-3 bg-purple-100 rounded-lg text-purple-600">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{board.name}</h2>
                  <p className="text-gray-600">{board.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExamBoard;