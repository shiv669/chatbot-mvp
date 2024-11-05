import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ExamBoard from './pages/ExamBoard';
import SubjectSelection from './pages/SubjectSelection';
import ChatInterface from './pages/ChatInterface';
import IntroAnimation from './components/IntroAnimation';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/exam-board/:qualification" element={<ExamBoard />} />
        <Route path="/subjects/:qualification/:board" element={<SubjectSelection />} />
        <Route path="/chat/:qualification/:board/:subject" element={<ChatInterface />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;