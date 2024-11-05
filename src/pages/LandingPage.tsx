import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import PhysicsAnimation from '../components/PhysicsAnimation';

function LandingPage() {
  const navigate = useNavigate();

  const qualificationOptions = [
    {
      title: 'GCSE',
      icon: GraduationCap,
      description: 'General Certificate of Secondary Education',
      path: '/exam-board/gcse',
    },
    {
      title: 'A-Level',
      icon: BookOpen,
      description: 'Advanced Level Qualification',
      path: '/exam-board/a-level',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      <PhysicsAnimation />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Personal Study Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your qualification to get started with personalized learning support
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {qualificationOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2 + index * 0.1 }
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(option.path)}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-4">
                  <div className="inline-block p-3 bg-indigo-100 rounded-lg text-indigo-600">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{option.title}</h2>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;