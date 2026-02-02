import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate progress
    const duration = 2500;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Complete animation
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              onComplete();
            }
          });
          
          tl.to(circleRef.current, {
            scale: 50,
            duration: 0.8,
            ease: 'power3.inOut'
          })
          .to(containerRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
          }, '-=0.2');
        }, 300);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="loading-screen"
    >
      {/* Loading bar */}
      <div className="relative">
        <div className="loading-bar-container mb-4">
          <div 
            ref={barRef}
            className="loading-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Loading text */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-1">
            LOADING
            <span className="animate-pulse">...</span>
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      
      {/* Expanding circle */}
      <div 
        ref={circleRef}
        className="absolute w-4 h-4 rounded-full bg-[#0a0a0a]"
        style={{ transform: 'scale(0)' }}
      />
    </div>
  );
}
