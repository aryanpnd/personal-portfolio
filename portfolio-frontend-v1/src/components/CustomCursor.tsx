import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  cursorType: 'default' | 'pointer' | 'dot' | 'ring' | 'glow';
  cursorColor: string; // Hex color
}

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorType, cursorColor }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  
  // Create smoother spring animations for cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // For the trailing dots effect
  const dotsRef = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  
  // Update cursor position on mouse move
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);
  
  // Detect hovering over interactive elements
  useEffect(() => {
    if (cursorType === 'default') return;
    
    const handleMouseOver = (e: MouseEvent) => {
      // Check if the element or its parent has cursor-interactive class
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.classList.contains('cursor-interactive') || 
        target.closest('.cursor-interactive') !== null ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button';
      
      setIsHovering(isInteractive);
    };
    
    const handleMouseOut = () => {
      setIsHovering(false);
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorType]);
  
  // Handle the dot trail effect for 'dot' cursor type
  useEffect(() => {
    if (cursorType !== 'dot') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initialize canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Initialize dots
    dotsRef.current = [];
    for (let i = 0; i < 15; i++) {
      dotsRef.current.push({
        x: -100,
        y: -100,
        alpha: i / 15,
      });
    }
    
    // Animation function for dots
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update dot positions
      const x = cursorXSpring.get();
      const y = cursorYSpring.get();
      
      // Shift all dots in the trail
      for (let i = dotsRef.current.length - 1; i > 0; i--) {
        dotsRef.current[i].x = dotsRef.current[i - 1].x;
        dotsRef.current[i].y = dotsRef.current[i - 1].y;
      }
      
      // Update the first dot to current cursor position
      if (dotsRef.current.length > 0) {
        dotsRef.current[0].x = x;
        dotsRef.current[0].y = y;
      }
      
      // Draw dots
      for (let i = 0; i < dotsRef.current.length; i++) {
        const dot = dotsRef.current[i];
        const size = (isHovering ? 10 : 8) * (1 - i / dotsRef.current.length);
        
        // Convert hex color to rgb for transparency
        const hex = cursorColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dot.alpha * (isHovering ? 0.9 : 0.75)})`;
        ctx.fill();
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [cursorType, cursorColor, cursorXSpring, cursorYSpring, isHovering]);
  
  // Hide default cursor
  useEffect(() => {
    if (cursorType === 'default') {
      document.body.style.cursor = 'auto';
    } else {
      document.body.style.cursor = 'none';
    }
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [cursorType]);
  
  if (cursorType === 'default') {
    return null;
  }
  
  if (cursorType === 'dot') {
    return (
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none"
      />
    );
  }
  
  // All other cursor types (pointer, ring, glow)
  const getCursorSize = () => {
    const baseSize = {
      pointer: 8,
      ring: 36,
      glow: 48,
    }[cursorType] || 20;
    
    // Increase size when hovering over interactive elements
    return isHovering ? baseSize * 1.25 : baseSize;
  };
  
  const cursorSize = getCursorSize();
  
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        {cursorType === 'pointer' && (
          <motion.div 
            className="rounded-full"
            animate={{
              width: cursorSize,
              height: cursorSize,
              backgroundColor: cursorColor,
              scale: isHovering ? 1.2 : 1,
            }}
            transition={{ duration: 0.15 }}
          />
        )}
        
        {cursorType === 'ring' && (
          <motion.div 
            className="rounded-full border-2"
            animate={{
              width: cursorSize,
              height: cursorSize,
              borderColor: cursorColor,
              scale: isHovering ? 1.2 : 1,
            }}
            transition={{ duration: 0.15 }}
          />
        )}
        
        {cursorType === 'glow' && (
          <motion.div 
            className="rounded-full"
            animate={{
              width: cursorSize,
              height: cursorSize,
              backgroundColor: hexToRgba(cursorColor, isHovering ? 0.3 : 0.2),
              boxShadow: `0 0 15px 3px ${hexToRgba(cursorColor, isHovering ? 0.6 : 0.4)}`,
              scale: isHovering ? 1.2 : 1,
            }}
            transition={{ duration: 0.15 }}
          />
        )}
      </motion.div>
      
      {/* Small dot in center for ring and glow types */}
      {(cursorType === 'ring' || cursorType === 'glow') && (
        <motion.div
          className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            width: isHovering ? '8px' : '6px',
            height: isHovering ? '8px' : '6px',
            backgroundColor: cursorColor
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </>
  );
};

export default CustomCursor;