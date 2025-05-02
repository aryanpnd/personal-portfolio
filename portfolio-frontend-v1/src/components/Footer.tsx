import React from 'react';
import { Github as GitHub, Linkedin, Mail, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-background/80 backdrop-blur-lg border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white">Aryan Pandey</h3>
            <p className="text-gray-400 mt-2">Full-stack Developer | CS Undergrad | Product Builder</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/aryanpnd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <GitHub size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/aryanpnd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:aryanpnd3@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://aryanpnd.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Website"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Aryan Pandey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;