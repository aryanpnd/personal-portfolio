import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github as GitHub, Linkedin, FileText, Terminal } from 'lucide-react';
import { useTerminal } from '../context/TerminalContext';
import { usePDFViewer } from '../context/PDFViewerContext';

const HeroSection: React.FC = () => {
  const { toggleTerminal, isOpen } = useTerminal();
  const { openPdfViewer } = usePDFViewer();
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Full-stack Developer | CS Undergrad | Product Builder';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  const handleOpenResume = (e: React.MouseEvent) => {
    e.preventDefault();
    openPdfViewer('/resume.pdf');
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <motion.div 
            className="lg:col-span-3 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="inline-block text-lg text-primary mb-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I'm
            </motion.span>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Aryan Pandey
            </motion.h1>
            
            <motion.div 
              className="text-xl text-gray-300 mb-8 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {displayText}
              <span className="typed-cursor">|</span>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 max-w-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              I build high-impact, real-world projects with a performance-first mindset.
              My focus is on efficient systems, real-time features, and scalable backends.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a 
                href="#projects" 
                className="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-md transition-colors duration-200 inline-flex items-center"
              >
                View Projects
              </a>
              
              <button 
                onClick={handleOpenResume}
                className="px-6 py-3 bg-transparent border border-primary hover:bg-primary/10 text-primary rounded-md transition-colors duration-200 inline-flex items-center"
              >
                <FileText size={18} className="mr-2" />
                Resume
              </button>
              
              <button
                onClick={toggleTerminal}
                className="px-6 py-3 bg-transparent border border-gray-600 hover:bg-gray-800 text-white rounded-md transition-colors duration-200 inline-flex items-center"
              >
                <Terminal size={18} className="mr-2" />
                {isOpen ? 'Close Terminal' : 'Open Terminal'}
              </button>
            </motion.div>
            
            <motion.div 
              className="flex space-x-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a 
                href="https://github.com/aryanpnd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <GitHub size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/aryanpnd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-50"></div>
              <div className="relative bg-background p-4 rounded-full">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
                  <img
                    src="https://avatars.githubusercontent.com/u/67853686?v=4"
                    alt="Aryan Pandey"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;