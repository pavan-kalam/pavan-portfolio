import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CursorGlow from './components/CursorGlow';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import WhatIDoSection from './sections/WhatIDoSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import TechStackSection from './sections/TechStackSection';
import ContactSection from './sections/ContactSection';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Cursor Glow Effect */}
      <CursorGlow />
      
      {/* Main Content */}
      {showContent && (
        <>
          <Navigation />
          
          <main>
            <HeroSection />
            <AboutSection />
            <WhatIDoSection />
            <ExperienceSection />
            <ProjectsSection />
            <TechStackSection />
            <ContactSection />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
