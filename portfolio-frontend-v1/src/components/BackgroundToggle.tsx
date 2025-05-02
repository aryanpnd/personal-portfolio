import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, X, MousePointer, PaintBucket } from 'lucide-react';
import { useBackground } from '../context/BackgroundContext';
import { useCursor } from '../context/CursorContext';

const BackgroundToggle: React.FC = () => {
  const { backgroundType, setBackgroundType } = useBackground();
  const { cursorType, cursorColor, setCursorType, setCursorColor } = useCursor();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'background' | 'cursor'>('background');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectBackground = (type: 'gradient' | 'particles' | 'network' | 'shader') => {
    setBackgroundType(type);
  };

  const handleSelectCursor = (type: 'default' | 'pointer' | 'dot' | 'ring' | 'glow') => {
    setCursorType(type);
  };

  const handleSelectColor = (color: string) => {
    setCursorColor(color);
  };

  const backgrounds = [
    { type: 'gradient', label: 'Simple Gradient' },
    { type: 'particles', label: 'Floating Particles' },
    { type: 'network', label: 'Network Connections' },
    { type: 'shader', label: 'Animated Gradient' },
  ];

  const cursors = [
    { type: 'default', label: 'Default' },
    { type: 'pointer', label: 'Pointer' },
    { type: 'dot', label: 'Dot Trail' },
    { type: 'ring', label: 'Ring' },
    { type: 'glow', label: 'Glow' },
  ];

  const cursorColors = [
    { color: '#7c3aed', label: 'Purple' },
    { color: '#3b82f6', label: 'Blue' },
    { color: '#10b981', label: 'Green' },
    { color: '#f59e0b', label: 'Orange' },
    { color: '#ef4444', label: 'Red' },
    { color: '#ffffff', label: 'White' },
  ];

  return (
    <>
      <motion.button
        className="fixed bottom-24 left-6 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-colors z-40 border border-gray-700"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change background and cursor"
      >
        <Layers size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-40 left-6 bg-gray-900/90 backdrop-blur-sm border border-gray-800/50 rounded-lg shadow-lg z-40"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('background')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'background'
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  Background
                </button>
                <button
                  onClick={() => setActiveTab('cursor')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'cursor'
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  Cursor
                </button>
              </div>
              <button 
                onClick={toggleMenu}
                className="text-gray-400 hover:text-white"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'background' && (
                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Select Background</h3>
                  <div className="space-y-2">
                    {backgrounds.map((bg) => (
                      <button
                        key={bg.type}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          backgroundType === bg.type
                            ? 'bg-primary/20 text-primary'
                            : 'hover:bg-gray-800 text-gray-300'
                        }`}
                        onClick={() => handleSelectBackground(bg.type as any)}
                      >
                        {bg.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'cursor' && (
                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Select Cursor Style</h3>
                  <div className="space-y-2 mb-4">
                    {cursors.map((cursor) => (
                      <button
                        key={cursor.type}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center ${
                          cursorType === cursor.type
                            ? 'bg-primary/20 text-primary'
                            : 'hover:bg-gray-800 text-gray-300'
                        }`}
                        onClick={() => handleSelectCursor(cursor.type as any)}
                      >
                        <MousePointer size={14} className="mr-2" />
                        {cursor.label}
                      </button>
                    ))}
                  </div>

                  {cursorType !== 'default' && (
                    <div>
                      <h3 className="text-sm font-medium text-white mb-3">Select Cursor Color</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {cursorColors.map((color) => (
                          <button
                            key={color.color}
                            className={`flex flex-col items-center p-2 rounded transition-colors ${
                              cursorColor === color.color
                                ? 'bg-primary/20'
                                : 'hover:bg-gray-800'
                            }`}
                            onClick={() => handleSelectColor(color.color)}
                          >
                            <div 
                              className="w-6 h-6 rounded-full mb-1"
                              style={{ backgroundColor: color.color }}
                            />
                            <span className="text-xs text-gray-400">{color.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackgroundToggle;