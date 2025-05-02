import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type BackgroundType = 'gradient' | 'particles' | 'network' | 'shader';

type BackgroundContextType = {
  backgroundType: BackgroundType;
  setBackgroundType: (type: BackgroundType) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('shader');

  // Detect device capabilities to set appropriate background
  useEffect(() => {
    // Check if device is low-end
    const isLowEndDevice = () => {
      const memory = (navigator as any).deviceMemory;
      if (memory && memory < 4) return true;
      
      // Check for mobile devices with touchscreen
      if ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) {
        return true;
      }
      
      return false;
    };
    
    // Check if WebGL is supported
    const isWebGLSupported = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };
    
    // Set optimal background based on device capabilities
    if (isLowEndDevice()) {
      setBackgroundType('gradient'); // Fallback for low-end devices
    } else if (!isWebGLSupported()) {
      setBackgroundType('particles'); // Fallback if WebGL not supported
    } else {
      setBackgroundType('shader'); // Use shader background by default
    }
    
    // Allow user to override via localStorage
    const savedType = localStorage.getItem('backgroundPreference');
    if (savedType && ['gradient', 'particles', 'network', 'shader'].includes(savedType)) {
      setBackgroundType(savedType as BackgroundType);
    }
  }, []);
  
  // Save preference when it changes
  useEffect(() => {
    localStorage.setItem('backgroundPreference', backgroundType);
  }, [backgroundType]);

  return (
    <BackgroundContext.Provider value={{ backgroundType, setBackgroundType }}>
      {children}
    </BackgroundContext.Provider>
  );
};