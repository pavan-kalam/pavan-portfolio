import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Twitter, FileText } from 'lucide-react';

const roles = [
  'MACHINE LEARNING ENGINEER',
  'DATA SCIENTIST',
  'ML ENGINEER',
  'AI DEVELOPER'
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const roleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal animation
      const tl = gsap.timeline({ delay: 0.3 });

      // Avatar scale in with glow
      tl.fromTo(avatarRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Name reveal
      tl.fromTo(nameRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.5'
      );

      // Role reveal
      tl.fromTo(roleRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      );

      // Socials reveal
      tl.fromTo(socialsRef.current?.children || [],
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      );

      // Role text rotation
      const roleItems = roleContainerRef.current?.querySelectorAll('.role-item');
      if (roleItems && roleItems.length > 0) {
        gsap.to(roleItems, {
          yPercent: -100 * (roles.length),
          duration: 8,
          ease: 'none',
          repeat: -1,
          modifiers: {
            yPercent: gsap.utils.wrap(-100 * roles.length, 0)
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse tracking for avatar
  useEffect(() => {
    const avatar = avatarRef.current;
    if (!avatar) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = avatar.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 30;
      const deltaY = (e.clientY - centerY) / 30;

      gsap.to(avatar, {
        rotateY: deltaX,
        rotateX: -deltaY,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(avatar, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    avatar.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      avatar.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
      
      {/* Purple glow behind avatar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[80vh]">
          
          {/* Left - Name */}
          <div ref={nameRef} className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-sm font-mono text-zinc-500 mb-2">Hello! I&apos;m</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              PAVAN
              <br />
              KALAM
            </h1>
          </div>

          {/* Center - Avatar */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative" style={{ perspective: '1000px' }}>
              <img
                ref={avatarRef}
                src={`${import.meta.env.BASE_URL}avatar-hero.png`}
                alt="Pavan Kalam"
                className="w-64 h-80 md:w-80 md:h-96 object-cover avatar-glow"
                style={{ transformStyle: 'preserve-3d' }}
              />
            </div>
          </div>

          {/* Right - Role */}
          <div ref={roleRef} className="text-center lg:text-right order-3">
            <p className="text-sm font-mono text-zinc-500 mb-2">A Creative</p>
            <div className="h-12 md:h-14 overflow-hidden">
              <div ref={roleContainerRef} className="relative">
                {roles.map((role, index) => (
                  <div 
                    key={index}
                    className="role-item h-12 md:h-14 flex items-center justify-center lg:justify-end"
                  >
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold gradient-text">
                      {role}
                    </span>
                  </div>
                ))}
                {/* Duplicate first role for seamless loop */}
                <div className="role-item h-12 md:h-14 flex items-center justify-center lg:justify-end">
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold gradient-text">
                    {roles[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links - Left Side */}
        <div 
          ref={socialsRef}
          className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-40"
        >
          <a 
            href="https://github.com/pavan-kalam" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon text-zinc-500 hover:text-purple-400"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/pavan-kalam-9b0605202" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon text-zinc-500 hover:text-purple-400"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon text-zinc-500 hover:text-purple-400"
          >
            <Twitter size={20} />
          </a>
          <a 
            href="#"
            className="social-icon text-zinc-500 hover:text-purple-400"
          >
            <FileText size={20} />
          </a>
        </div>

        {/* Resume link - Bottom Right */}
        <div className="absolute bottom-8 right-6 hidden lg:block">
          <a 
            href="#"
            className="text-xs font-mono text-zinc-500 hover:text-white transition-colors flex items-center gap-2"
          >
            <span className="writing-vertical">RESUME</span>
            <FileText size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
