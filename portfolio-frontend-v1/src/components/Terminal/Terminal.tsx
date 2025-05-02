import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize, Maximize } from 'lucide-react';
import { useTerminal } from '../../context/TerminalContext';
import TerminalInput from './TerminalInput';

const Terminal: React.FC = () => {
  const { isOpen, toggleTerminal, history } = useTerminal();
  const [isMinimized, setIsMinimized] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalBodyRef.current && isOpen && !isMinimized) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, isOpen, isMinimized]);

  // Handle ESC key to close terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        toggleTerminal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleTerminal]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) return null;

  const terminal = (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-20 right-6 w-full md:w-[600px] max-w-[90vw] z-40 shadow-2xl rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={isMinimized 
          ? { opacity: 1, y: 0, height: 'auto' } 
          : { opacity: 1, y: 0, height: 'auto' }
        }
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="terminal-header">
          <div className="flex space-x-2">
            <button 
              className="terminal-btn bg-red-500"
              onClick={toggleTerminal}
              aria-label="Close terminal"
            />
            <button 
              className="terminal-btn bg-yellow-500"
              onClick={toggleMinimize}
              aria-label={isMinimized ? "Maximize terminal" : "Minimize terminal"}
            />
            <button 
              className="terminal-btn bg-green-500"
              aria-label="Terminal button"
            />
          </div>
          <div className="flex-1 text-center text-xs text-gray-400">aryan@portfolio:~</div>
        </div>
        
        <AnimatePresence>
          {!isMinimized && (
            <motion.div 
              className="terminal-body"
              style={{ height: '350px' }}
              ref={terminalBodyRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '350px', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {history.map((item, index) => (
                <div key={index} className="mb-1">
                  {item.type === 'command' ? (
                    <div className="flex">
                      <span className="text-green-500 mr-2">$</span>
                      <span>{item.content}</span>
                    </div>
                  ) : (
                    <div className="pl-4 text-gray-300 whitespace-pre-wrap">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
              <TerminalInput />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(terminal, document.getElementById('terminal-portal')!);
};

export default Terminal;