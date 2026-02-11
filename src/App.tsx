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
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* Cursor Glow Effect */}
      <CursorGlow />
      
      {/* Main Content */}
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
    </div>
  );
}

export default App;
