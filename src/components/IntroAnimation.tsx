import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, GraduationCap, Atom } from 'lucide-react';

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        setTimeout(onComplete, 300);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  const slides = [
    {
      icon: Brain,
      title: "Welcome to EduAI",
      subtitle: "Your Intelligent Study Companion",
      gradient: "from-purple-600 via-pink-600 to-blue-600"
    },
    {
      icon: Sparkles,
      title: "Personalized Learning",
      subtitle: "Master your subjects with AI guidance",
      gradient: "from-blue-600 via-cyan-600 to-green-600"
    },
    {
      icon: GraduationCap,
      title: "Expert Guidance",
      subtitle: "Achieve your academic goals",
      gradient: "from-green-600 via-yellow-600 to-red-600"
    }
  ];

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`,
            opacity: 0.2
          }}
          animate={{ 
            y: [`${particle.y}%`, `${particle.y - 20}%`, `${particle.y}%`],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, particle.size, 1]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main content */}
      <AnimatePresence mode="wait">
        {step < 3 && (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4 }}
            className="relative text-center text-white p-8 max-w-2xl"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.8, times: [0, 0.5, 0.8, 1] }}
              className="mb-8 inline-block"
            >
              <div className={`p-6 rounded-full bg-gradient-to-br ${slides[step].gradient} shadow-lg backdrop-blur-xl`}>
                {React.createElement(slides[step].icon, { 
                  className: "w-20 h-20",
                  strokeWidth: 1.5 
                })}
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
            >
              {slides[step].title}
            </motion.h1>
            
            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl text-purple-100"
            >
              {slides[step].subtitle}
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              className="absolute -z-10 inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 30% 30%, purple 0%, transparent 70%)',
                  'radial-gradient(circle at 70% 70%, blue 0%, transparent 70%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroAnimation;