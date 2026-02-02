import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Mail, Phone, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
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

  const socialLinks = [
    { icon: Github, label: 'Github', href: 'https://github.com/pavan-kalam' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/pavan-kalam-9b0605202' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' }
  ];

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={contentRef}>
          {/* Section Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            CONTACT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <p className="text-sm font-mono text-zinc-500 mb-4">Email</p>
              <a 
                href="mailto:kalampavan369@gmail.com"
                className="text-white hover:text-purple-400 transition-colors flex items-center gap-2"
              >
                <Mail size={16} className="text-zinc-500" />
                kalampavan369@gmail.com
              </a>
            </div>

            <div>
              <p className="text-sm font-mono text-zinc-500 mb-4">Phone</p>
              <a 
                href="tel:+19132634885"
                className="text-white hover:text-purple-400 transition-colors flex items-center gap-2"
              >
                <Phone size={16} className="text-zinc-500" />
                +1 (913) 263-4885
              </a>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-mono text-zinc-500 mb-4">Social</p>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-white hover:text-purple-400 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <link.icon size={16} className="text-zinc-500 group-hover:text-purple-400" />
                      {link.label}
                    </span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-24 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-500">
                Designed and Developed by{' '}
                <span className="text-purple-400">Pavan Kalam</span>
              </p>
              <p className="text-sm text-zinc-600">
                &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
