import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  title: string;
  description: string;
  skills: string[];
}

const services: ServiceItem[] = [
  {
    title: 'DATA ENGINEERING',
    description: 'Designing and building reliable data pipelines and warehouses. Working with batch and streaming data, ETL/ELT workflows, and modern data stacks to ensure clean, well-modeled datasets for analytics and machine learning.',
    skills: ['Python', 'SQL', 'Airflow', 'dbt', 'Spark', 'Kafka', 'Data Warehousing', 'ETL / ELT']
  },
  {
    title: 'ANALYTICS & ML ENABLEMENT',
    description: 'Partnering with analysts and data scientists to productionize their work. Exposing curated data via views, APIs, and dashboards, and operationalizing models with monitoring, alerting, and performance-focused best practices.',
    skills: ['Pandas', 'NumPy', 'Power BI', 'Tableau', 'Data Modeling', 'Metric Design', 'Monitoring', 'Documentation']
  }
];

export default function WhatIDoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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

  const toggleAccordion = (index: number) => {
    const content = contentRefs.current[index];
    if (!content) return;

    if (openIndex === index) {
      // Close
      gsap.to(content, {
        height: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      });
      setOpenIndex(null);
    } else {
      // Close previous
      if (openIndex !== null && contentRefs.current[openIndex]) {
        gsap.to(contentRefs.current[openIndex], {
          height: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        });
      }
      // Open new
      gsap.to(content, {
        height: 'auto',
        duration: 0.4,
        ease: 'power2.inOut'
      });
      setOpenIndex(index);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">WHAT</span>
            <br />
            <span className="gradient-text">I DO</span>
          </h2>
        </div>

        {/* Accordion Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="border border-white/10 rounded-lg overflow-hidden card-hover bg-white/[0.02]"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <ChevronDown 
                  size={20} 
                  className={`text-zinc-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Accordion Content */}
              <div
                ref={el => { contentRefs.current[index] = el; }}
                className="overflow-hidden"
                style={{ height: index === 0 ? 'auto' : 0 }}
              >
                <div className="px-6 pb-6">
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
