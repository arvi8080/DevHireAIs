import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { DeveloperSection } from './components/DeveloperSection';
import { RecruiterSection } from './components/RecruiterSection';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { AuthModal } from './features/auth/components/AuthModal';

export const App: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleOpenLogin = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleSelectFeature = (_featureName: string) => {
    const featuresEl = document.getElementById('features');
    if (featuresEl) {
      featuresEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar 
        onLoginClick={handleOpenLogin} 
        onGetStartedClick={handleOpenSignup} 
      />

      <main>
        {/* 2. Hero Section */}
        <Hero onGetStarted={handleOpenSignup} />

        {/* 3. Trust & Stats Bar */}
        <Stats />

        {/* 4. Core Features Suite */}
        <Features onSelectFeature={handleSelectFeature} />

        {/* 5. How It Works (4 Steps) */}
        <HowItWorks />

        {/* 6. For Developers Section */}
        <DeveloperSection onGetStarted={handleOpenSignup} />

        {/* 7. For Recruiters Section */}
        <RecruiterSection onGetStarted={handleOpenSignup} />

        {/* 8. Loved by Developers & Hiring Teams (Testimonials) */}
        <Testimonials />

        {/* 9. Final CTA */}
        <CTA onGetStarted={handleOpenSignup} />
      </main>

      {/* 10. Enterprise Footer */}
      <Footer />

      {/* 11. Auth Modal (Login / Signup) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default App;
