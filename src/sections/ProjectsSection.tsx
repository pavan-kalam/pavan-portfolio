import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Wallet, Bot, Shield, ExternalLink, FileText } from 'lucide-react';
import DocsViewerModal from '@/components/DocsViewerModal';

gsap.registerPlugin(ScrollTrigger);

interface DocFile {
  label: string;
  path: string;
}

interface Project {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  image: string;
  technologies: string[];
  docsLink?: string;
  docsFiles?: DocFile[];
  githubLink?: string;
}

const CYBERSECURITY_DOCS: DocFile[] = [
  { label: 'README', path: '/docs/cybersecurity/README.md' },
  { label: 'README (Overview)', path: '/docs/cybersecurity/README.markdown' },
  { label: 'API Research', path: '/docs/cybersecurity/api_research.md' },
  { label: 'Deployment Checklist', path: '/docs/cybersecurity/deployment_checklist.md' },
  { label: 'Issue Tracking', path: '/docs/cybersecurity/issue_tracking.md' },
  { label: 'NIST Framework Summary', path: '/docs/cybersecurity/nist_framework_summary.md' },
  { label: 'OSINT Framework', path: '/docs/cybersecurity/osint_framework.md' },
  { label: 'Peer Review', path: '/docs/cybersecurity/peer_review.md' },
  { label: 'Performance Testing', path: '/docs/cybersecurity/performance_testing.md' },
  { label: 'Security Audit', path: '/docs/cybersecurity/security_audit.md' },
  { label: 'Security Validation', path: '/docs/cybersecurity/security_validation.md' },
  { label: 'System Manual', path: '/docs/cybersecurity/system_manual.md' },
  { label: 'System Walkthrough', path: '/docs/cybersecurity/system_walkthrough.markdown' },
  { label: 'Team Structures', path: '/docs/cybersecurity/team_structures.md' },
  { label: 'Tech Stack', path: '/docs/cybersecurity/tech_stack.md' },
  { label: 'Troubleshooting Guide', path: '/docs/cybersecurity/troubleshooting_guide.md' },
  { label: 'User Guide', path: '/docs/cybersecurity/user_guide.md' }
];

const projects: Project[] = [
  {
    title: 'Deep Fake Detection Using CNN',
    description: 'Developed a Convolutional Neural Network (CNN) based project to identify AI-generated or edited images, enhancing digital content authenticity. Focused on image processing and deep learning techniques for robust detection.',
    icon: <Brain className="w-6 h-6" />,
    gradient: 'from-blue-600 via-purple-600 to-purple-700',
    image: '/project_images/deepfake_cnn.png',
    technologies: ['TensorFlow', 'Keras', 'Python', 'CNN', 'Computer Vision', 'Google Colab'],
    docsLink: '/docs/Deepfake_README.md'
  },
  {
    title: 'Blockchain-Based Real Estate Management System',
    description: 'Designed and implemented a secure real estate management system leveraging blockchain technology. Enabled all real estate transactions to be conducted using Ethereum coins, ensuring transparency and immutability.',
    icon: <Wallet className="w-6 h-6" />,
    gradient: 'from-cyan-500 via-blue-600 to-blue-700',
    image: '/project_images/blockchain.png',
    technologies: ['Ethereum', 'Solidity', 'React.js', 'Web3', 'Smart Contracts', 'IPFS'],
    docsLink: '/docs/TokenLand_Documentation.md',
    githubLink: 'https://github.com/pavan-kalam/Blockchain-based-realestate-management-system'
  },
  {
    title: 'AI Call Agent With RAG Strategy',
    description: 'Created an AI Call Agent capable of interacting with callers naturally. Implemented a Retrieval-Augmented Generation (RAG) strategy within an Agentic AI system to process queries and identify important calls, forwarding them automatically to the user when necessary.',
    icon: <Bot className="w-6 h-6" />,
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    image: 'https://via.placeholder.com/600x400/1a1a1a/a855f7?text=AI+Call+Agent',
    technologies: ['RAG', 'LLM', 'Python', 'N8N', 'Agentic AI', 'NLP']
  },
  {
    title: 'Real-Time Threat Intelligence System',
    description: 'Developed a cybersecurity project focused on real-time threat intelligence for organizational security. Utilized OSINT tools to monitor threats and integrated Machine Learning models to accelerate the threat mitigation process.',
    icon: <Shield className="w-6 h-6" />,
    gradient: 'from-purple-600 via-teal-500 to-emerald-600',
    image: '/project_images/security_project.png',
    technologies: ['OSINT', 'Machine Learning', 'Python', 'Cybersecurity', 'Real-time Analytics'],
    docsFiles: CYBERSECURITY_DOCS
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [docsModal, setDocsModal] = useState<{
    isOpen: boolean;
    docPath: string | null;
    docFiles?: DocFile[];
    projectTitle: string;
  }>({ isOpen: false, docPath: null, projectTitle: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo('.projects-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleViewDocs = (project: Project) => {
    if (project.docsLink) {
      setDocsModal({
        isOpen: true,
        docPath: project.docsLink,
        projectTitle: project.title
      });
    } else if (project.docsFiles?.length) {
      setDocsModal({
        isOpen: true,
        docPath: null,
        docFiles: project.docsFiles,
        projectTitle: project.title
      });
    }
  };

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 projects-header">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Projects <span className="gradient-text">I've Worked On</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A collection of innovative projects spanning AI/ML, blockchain, cybersecurity, and more
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x400/1a1a1a/a855f7?text=' + encodeURIComponent(project.title);
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-40`} />
              </div>

              {/* Content */}
              <div className="relative p-6">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${project.gradient} text-white mb-4`}>
                  {project.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-white/[0.05] text-purple-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {(project.docsLink || project.docsFiles?.length) && (
                    <button
                      onClick={() => handleViewDocs(project)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white border border-zinc-700 hover:border-purple-500 rounded-lg transition-all"
                    >
                      <FileText size={14} />
                      <span>DOCS</span>
                    </button>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-white bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                    >
                      <ExternalLink size={14} />
                      <span>GITHUB</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Docs Viewer Modal */}
      <DocsViewerModal
        isOpen={docsModal.isOpen}
        onClose={() => setDocsModal((p) => ({ ...p, isOpen: false }))}
        docPath={docsModal.docPath}
        docFiles={docsModal.docFiles}
        projectTitle={docsModal.projectTitle}
      />
    </section>
  );
}
