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
    year: '2019 - 2021',
    title: 'Data Analyst → ML Engineer',
    company: 'Persistent Systems',
    description: 'Started as Data Analyst analyzing structured datasets using SQL and Python. Transitioned to ML Engineer role, building predictive models with Scikit-learn and automating data preprocessing workflows, reducing manual effort by 30%.'
  },
  {
    year: '2021 - 2022',
    title: 'Data Scientist',
    company: 'Tata Consultancy Services (TCS)',
    description: 'Performed exploratory data analysis and feature engineering on enterprise datasets. Built predictive models using XGBoost and Scikit-learn, integrated batch inference workflows with AWS Athena and Glue.'
  },
  {
    year: '2022 - 2023',
    title: 'Machine Learning Engineer',
    company: 'Aircom Systems Pvt Ltd',
    description: 'Designed and operationalized ML models using AWS SageMaker, improving forecasting accuracy by 18-22%. Built real-time RESTful APIs handling 5K+ daily requests. Automated model retraining workflows with Apache Airflow, reducing update cycles by 50%.'
  },
  {
    year: '2024 - 2025',
    title: 'MS in Computer Science',
    company: 'University of Missouri-Kansas City',
    description: 'Pursuing Master\'s degree with focus on Machine Learning, AI, and Software Engineering. Enhancing theoretical foundations while working on advanced ML projects and research.'
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
