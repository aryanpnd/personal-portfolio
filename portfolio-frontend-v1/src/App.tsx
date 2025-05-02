import React, { useEffect } from 'react';
import { TerminalProvider } from './context/TerminalContext';
import { BackgroundProvider, useBackground } from './context/BackgroundContext';
import { CursorProvider, useCursor } from './context/CursorContext';
import { PDFViewerProvider, usePDFViewer } from './context/PDFViewerContext';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import Terminal from './components/Terminal/Terminal';
import TerminalToggle from './components/Terminal/TerminalToggle';
import BackToTop from './components/BackToTop';
import BackgroundToggle from './components/BackgroundToggle';
import ParticlesBackground from './components/ParticlesBackground';
import ParticlesNetworkBackground from './components/ParticlesNetworkBackground';
import GradientShaderBackground from './components/GradientShaderBackground';
import CustomCursor from './components/CustomCursor';
import EnhancedPDFViewer from './components/EnhancedPDFViewer';

const AppContent = () => {
  const { backgroundType } = useBackground();
  const { cursorType, cursorColor } = useCursor();
  const { isPdfViewerOpen, pdfUrl, closePdfViewer } = usePDFViewer();
  
  // Add or remove 'custom-cursor-enabled' class to body based on cursor type
  useEffect(() => {
    if (cursorType !== 'default') {
      document.body.classList.add('custom-cursor-enabled');
    } else {
      document.body.classList.remove('custom-cursor-enabled');
    }
    
    return () => {
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, [cursorType]);
  
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      {/* Custom cursor - only render if not default */}
      {cursorType !== 'default' && <CustomCursor cursorType={cursorType} cursorColor={cursorColor} />}
      
      {/* Enhanced PDF Viewer */}
      <EnhancedPDFViewer 
        isOpen={isPdfViewerOpen} 
        pdfUrl={pdfUrl} 
        onClose={closePdfViewer} 
      />
      
      {/* Conditional background rendering */}
      {backgroundType === 'gradient' && <div className="bg-background fixed inset-0 opacity-80 z-[-2]"></div>}
      {backgroundType === 'particles' && <ParticlesBackground />}
      {backgroundType === 'network' && <ParticlesNetworkBackground />}
      {backgroundType === 'shader' && <GradientShaderBackground />}
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
        <Terminal />
        <TerminalToggle />
        <BackgroundToggle />
        <BackToTop />
      </div>
    </div>
  );
};

function App() {
  return (
    <CursorProvider>
      <BackgroundProvider>
        <TerminalProvider>
          <PDFViewerProvider>
            <AppContent />
          </PDFViewerProvider>
        </TerminalProvider>
      </BackgroundProvider>
    </CursorProvider>
  );
}

export default App;