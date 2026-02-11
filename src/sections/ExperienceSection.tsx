import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
}

const experiences: Experience[] = [
  {
    year: 'May 2025 - Present',
    title: 'Data Engineer',
    company: 'CVS Health, United States',
    description:
      'Lead end-to-end Azure data engineering work across claims, pharmacy, and member engagement domains. Build and operate Azure Data Factory pipelines, Event Hubs / Stream Analytics streaming flows, and Databricks (PySpark) feature datasets powering analytics, risk-scoring models, and GenAI / LLM initiatives at enterprise scale.'
  },
  {
    year: 'Mar 2022 - Dec 2023',
    title: 'Data Engineer',
    company: 'Zensar Technologies, India',
    description:
      'Redesigned large-scale batch data pipelines on AWS using Glue, S3, PySpark, and Redshift to improve cost, performance, and reliability. Delivered incremental ingestion and CDC patterns, governed datasets for 18+ dashboards and ML consumers, and monitoring/alerting with CloudWatch to catch pipeline issues before they impacted downstream teams.'
  },
  {
    year: 'Jan 2020 - Feb 2022',
    title: 'Junior Data Engineer',
    company: 'Zensar Technologies, India',
    description:
      'Built foundational ETL and ML-supporting ingestion flows with AWS Glue, Python, and S3 processing hundreds of thousands of records daily. Standardized schemas and features with PySpark, maintained Redshift tables and views for reporting and ML feature pipelines, and automated orchestrations with Lambda and Step Functions to reduce manual effort.'
  },
  {
    year: 'Education',
    title: 'MS in Computer Science',
    company: 'University of Missouri - Kansas City, Missouri',
    description:
      'Masters of Science in Computer Science with a focus on data engineering, distributed systems, and cloud-native architectures.'
  }
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draw animation
      gsap.fromTo('.timeline-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Items stagger reveal
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        gsap.fromTo(item,
          { x: index % 2 === 0 ? -30 : 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            My career <span className="gradient-text">&amp; experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2">
            <div className="timeline-progress absolute inset-0 bg-gradient-to-b from-purple-500 via-purple-400 to-purple-500 origin-top" />
          </div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={el => { itemsRef.current[index] = el; }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ${
                  index % 2 === 0 ? '' : 'md:text-right'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 top-0 w-3 h-3 -translate-x-1/2">
                  <div className="w-full h-full rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
                </div>

                {/* Content */}
                <div className={`pl-12 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'
                }`}>
                  <span className="text-sm font-mono text-purple-400">{exp.year}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{exp.title}</h3>
                  <p className="text-zinc-500 text-sm mt-1">{exp.company}</p>
                  <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
