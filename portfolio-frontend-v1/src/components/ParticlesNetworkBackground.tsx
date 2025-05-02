import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticlesNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const mousePosition = useRef({ x: null as number | null, y: null as number | null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle mouse movement to attract particles
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.x, y: event.y };
    };

    // Handle mouse leaving to reset attraction
    const handleMouseLeave = () => {
      mousePosition.current = { x: null, y: null };
    };

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Create particles
    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 20000); // Adjust for density
      
      for (let i = 0; i < particleCount; i++) {
        const hue = Math.random() * 60 + 220; // Blue to purple range
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          color: `hsla(${hue}, 100%, 70%, 0.8)`
        });
      }
    };

    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Set opacity based on distance (closer = more opaque)
            const opacity = 1 - distance / maxDistance;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(138, 108, 246, ${opacity * 0.3})`; // Purple-ish color
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.current.forEach(particle => {
        // Apply mouse attraction if mouse is on canvas
        if (mousePosition.current.x !== null && mousePosition.current.y !== null) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            // Attract particle to mouse
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxSpeed = 0.5;
            const force = (200 - distance) / 200;
            
            particle.speedX = (forceDirectionX * force * maxSpeed + particle.speedX) * 0.98;
            particle.speedY = (forceDirectionY * force * maxSpeed + particle.speedY) * 0.98;
          }
        }
        
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Gradually slow down the particle
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Draw connections
      connectParticles();
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ParticlesNetworkBackground;