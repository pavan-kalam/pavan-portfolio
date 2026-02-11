import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(contentRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Avatar (smaller, working pose) */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[80px]" />
              <img
                src={`${import.meta.env.BASE_URL}avatar-hero.png`}
                alt="Pavan Kalam"
                className="relative w-48 h-60 object-cover opacity-80"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef}>
            <p className="text-sm font-mono text-purple-400 mb-4">ABOUT ME</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Data Engineer with{' '}
              <span className="gradient-text">4+ years</span> of experience
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                I specialize in designing, building, and maintaining modern data platforms that 
                power analytics and machine learning. From ingesting raw data to serving curated 
                datasets, I work across the stack using Python, SQL, and cloud-native services.
              </p>
              <p>
                Most of my work focuses on data pipelines, warehousing, and reliability: 
                orchestrating ETL/ELT workflows, optimizing queries, and building resilient 
                batch and streaming pipelines that teams can trust for decision making.
              </p>
              <p>
                I care deeply about clean data models, observability, and documentation, and I 
                enjoy collaborating with analysts, data scientists, and engineers to turn messy 
                real-world data into well-structured, high-quality assets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
