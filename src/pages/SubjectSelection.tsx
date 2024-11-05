import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Brain, Atom, Cross, History, Calculator } from 'lucide-react';

function SubjectSelection() {
  const navigate = useNavigate();
  const { qualification, board } = useParams();

  const subjects = {
    gcse: [
      { id: 'english', name: 'English', icon: BookOpen },
      { id: 'biology', name: 'Biology', icon: Brain },
      { id: 'chemistry', name: 'Chemistry', icon: Atom },
      { id: 'physics', name: 'Physics', icon: Calculator },
      { id: 'religious-studies', name: 'Religious Studies', icon: Cross },
    ],
    'a-level': [
      { id: 'history', name: 'History', icon: History },
      { id: 'chemistry', name: 'Chemistry', icon: Atom },
      { id: 'mathematics', name: 'Mathematics', icon: Calculator },
    ],
  }[qualification?.toLowerCase() || 'gcse'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/exam-board/${qualification}`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Exam Boards</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Subject
          </h1>
          <p className="text-xl text-gray-600">
            Select a subject to start your personalized learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.button
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.1 * index }
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/chat/${qualification}/${board}/${subject.id}`)}
                className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="inline-block p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {subject.name}
                  </h2>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SubjectSelection;