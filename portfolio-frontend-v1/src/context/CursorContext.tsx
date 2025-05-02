import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CursorType = 'default' | 'pointer' | 'dot' | 'ring' | 'glow';
type CursorColor = string;

type CursorContextType = {
  cursorType: CursorType;
  cursorColor: CursorColor;
  setCursorType: (type: CursorType) => void;
  setCursorColor: (color: CursorColor) => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [cursorColor, setCursorColor] = useState<CursorColor>('#7c3aed'); // Default to primary color
  
  // Detect device capabilities to set appropriate cursor
  useEffect(() => {
    // Don't enable custom cursor on touch devices
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0));
    };
    
    // Load saved preferences
    const savedType = localStorage.getItem('cursorType') as CursorType;
    const savedColor = localStorage.getItem('cursorColor');
    
    if (!isTouchDevice()) {
      if (savedType && ['default', 'pointer', 'dot', 'ring', 'glow'].includes(savedType)) {
        setCursorType(savedType);
      }
      
      if (savedColor) {
        setCursorColor(savedColor);
      }
    }
  }, []);
  
  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('cursorType', cursorType);
    localStorage.setItem('cursorColor', cursorColor);
  }, [cursorType, cursorColor]);
  
  return (
    <CursorContext.Provider value={{ 
      cursorType, 
      cursorColor, 
      setCursorType, 
      setCursorColor 
    }}>
      {children}
    </CursorContext.Provider>
  );
};