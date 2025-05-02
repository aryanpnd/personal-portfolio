import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TerminalContextType = {
  isOpen: boolean;
  history: { type: 'command' | 'response'; content: string }[];
  toggleTerminal: () => void;
  executeCommand: (command: string) => void;
  clearTerminal: () => void;
};

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};

export const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ type: 'command' | 'response'; content: string }[]>([
    { type: 'response', content: 'Welcome to Aryan Pandey\'s portfolio terminal! Type "help" to see available commands.' }
  ]);

  // Load terminal state from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('terminalHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save terminal state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('terminalHistory', JSON.stringify(history));
  }, [history]);

  const toggleTerminal = () => {
    setIsOpen(prev => !prev);
  };

  const clearTerminal = () => {
    setHistory([{ type: 'response', content: 'Terminal cleared.' }]);
  };

  const executeCommand = (command: string) => {
    // Add the command to history
    setHistory(prev => [...prev, { type: 'command', content: command }]);

    // Process command
    switch (command.toLowerCase().trim()) {
      case 'help':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `
Available commands:
- about: Display information about me
- skills: List my technical skills
- projects: Show my notable projects
- experience: Show my work experience
- contact: Show contact information
- clear: Clear the terminal
- help: Show this help message
          `.trim()
        }]);
        break;
      
      case 'about':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `
About Aryan Pandey:
- B.Tech in CSE @ Lovely Professional University (2022–Present)
- GPA: 7.34
- Full-stack developer building high-impact, real-world projects
- Focus on efficient systems, real-time features, and scalable backends
          `.trim()
        }]);
        break;
      
      case 'skills':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `
Skills:
- Languages: Java, JavaScript/TypeScript, Go, Kotlin, Python, C/C++, SQL
- Frameworks: React Native, ReactJS, NodeJS, Go-Fiber, Jetpack Compose
- Databases: MongoDB, PostgreSQL, MySQL, Redis, DynamoDB
- Cloud & Tools: Azure, AWS, FCM, OTA updates, Selenium, Puppeteer
- Other: Strong DSA, system design, analytics tracking, CI/CD familiarity
          `.trim()
        }]);
        break;
      
      case 'projects':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `
Projects:
1. Find My Verto
   - Cross-platform app for LPU students (100+ MAUs)
   - Tech: React Native, NodeJS, MongoDB, Golang microservices, Azure

2. Clipy
   - Real-time clipboard sync between Android and PC via WebSockets
   - Tech: Go (backend), Kotlin + XML (frontend)

3. Retro-Bazaar
   - College buy/sell platform using MERN stack + OAuth
   - Beautiful frontend, fast search, responsive layout
          `.trim()
        }]);
        break;
      
      case 'experience':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `
Experience:
1. Mobile App Dev Intern – Webcube Infotech
   - Built "Bean" app, optimized pantry + recipe experience using AI
   - Achieved 30% reduction in prep time & resource consumption

2. Full-stack Dev – PiCode Solutions
   - Built "LOADEZ" logistics app backend using Node.js, AWS Lambda
   - Created vendor-matching logic, reduced ops effort by 60%

3. Frontend Dev – Greenbhumi
   - Built student dashboard with React + Material UI
   - Improved engagement & tracking
          `.trim()
        }]);
        break;
      
      case 'contact':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `
Contact Information:
- Email: aryanpnd3@gmail.com
- Phone: +91 8910486736
- Location: Punjab, India
- LinkedIn: linkedin.com/in/aryanpnd
- GitHub: github.com/aryanpnd
- Portfolio: aryanpnd.in
          `.trim()
        }]);
        break;
      
      case 'clear':
        clearTerminal();
        break;
      
      default:
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `Command not found: ${command}. Type "help" to see available commands.` 
        }]);
    }
  };

  return (
    <TerminalContext.Provider value={{ 
      isOpen, 
      history, 
      toggleTerminal, 
      executeCommand, 
      clearTerminal 
    }}>
      {children}
    </TerminalContext.Provider>
  );
};