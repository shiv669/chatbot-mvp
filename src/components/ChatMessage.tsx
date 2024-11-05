import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  type: 'bot' | 'user';
  content: string;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, content, isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start space-x-3 ${type === 'bot' ? 'bg-gray-50' : ''} p-4 rounded-lg`}
    >
      <div className={`p-2 rounded-full ${type === 'bot' ? 'bg-indigo-100' : 'bg-purple-100'}`}>
        {type === 'bot' ? (
          <Bot className="w-5 h-5 text-indigo-600" />
        ) : (
          <User className="w-5 h-5 text-purple-600" />
        )}
      </div>
      <div className="flex-1">
        {isLoading ? (
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        ) : (
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;