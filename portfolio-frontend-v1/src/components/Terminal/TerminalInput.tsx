import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../../context/TerminalContext';

const TerminalInput: React.FC = () => {
  const { executeCommand } = useTerminal();
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim()) {
      executeCommand(input);
      
      // Add to command history
      setCommandHistory(prev => [input, ...prev]);
      setHistoryIndex(-1);
      
      // Clear input
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle up arrow for command history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
    
    // Handle down arrow for command history
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-2">
      <span className="text-green-500 mr-2">$</span>
      <input
        type="text"
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none terminal-text text-white caret-green-500"
        autoFocus
      />
    </form>
  );
};

export default TerminalInput;