import { useEffect, useState } from 'react';
import { Menu, X, FileText, Download } from 'lucide-react';
import ResumeViewerModal from './ResumeViewerModal';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'ABOUT', id: 'about' },
    { label: 'WORK', id: 'experience' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'TECHSTACK', id: 'techstack' },
    { label: 'CONTACT', id: 'contact' }
  ];

  const handleViewResume = () => {
    setResumeModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Pavan_Resume.pdf';
    link.download = 'Pavan_Kalam_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'nav-blur bg-[#0a0a0a]/80 border-b border-white/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-white hover:text-purple-400 transition-colors"
            >
              pavan.dev
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-xs font-mono text-zinc-400 hover:text-white transition-colors link-underline"
                >
                  {link.label}
                </button>
              ))}
              
              {/* Resume Buttons */}
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={handleViewResume}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white border border-zinc-700 hover:border-purple-500 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-500/20"
                  title="View Resume"
                >
                  <FileText size={14} />
                  <span>VIEW RESUME</span>
                </button>
                <button
                  onClick={handleDownloadResume}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-white bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-500/30"
                  title="Download Resume"
                >
                  <Download size={14} />
                  <span>DOWNLOAD</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0a0a0a] transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-2xl font-medium text-white hover:text-purple-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
          
          {/* Resume Buttons - Mobile */}
          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={handleViewResume}
              className="flex items-center gap-2 px-6 py-3 text-sm font-mono text-zinc-400 hover:text-white border border-zinc-700 hover:border-purple-500 rounded-lg transition-all"
            >
              <FileText size={16} />
              <span>VIEW RESUME</span>
            </button>
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-6 py-3 text-sm font-mono text-white bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg transition-all"
            >
              <Download size={16} />
              <span>DOWNLOAD RESUME</span>
            </button>
          </div>
        </div>
      </div>

      <ResumeViewerModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
}
