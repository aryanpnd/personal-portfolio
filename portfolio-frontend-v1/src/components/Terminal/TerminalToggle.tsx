import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useTerminal } from '../../context/TerminalContext';

const TerminalToggle: React.FC = () => {
  const { toggleTerminal, isOpen } = useTerminal();

  return (
    <motion.button
      className="fixed bottom-6 right-6 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-colors z-40 border border-gray-700"
      onClick={toggleTerminal}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? 'Close terminal' : 'Open terminal'}
    >
      <Terminal size={20} />
    </motion.button>
  );
};

export default TerminalToggle;