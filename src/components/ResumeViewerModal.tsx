import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, FileText } from 'lucide-react';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESUME_PATH = '/Pavan_Resume.pdf';

export default function ResumeViewerModal({
  isOpen,
  onClose
}: ResumeViewerModalProps) {
  const [cacheBust, setCacheBust] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCacheBust(Date.now());
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const baseUrl = new URL(RESUME_PATH.replace(/^\//, './'), window.location.href).href;
  const resumeUrl = cacheBust ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}v=${cacheBust}` : baseUrl;

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative z-10 flex w-full max-w-4xl max-h-[90vh] flex-col rounded-xl bg-white shadow-2xl overflow-hidden text-zinc-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between shrink-0 px-6 py-4 border-b border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-purple-600" />
            <h2 id="resume-modal-title" className="text-lg font-semibold text-zinc-900">
              Resume
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - PDF Viewer */}
        <div className="flex-1 min-h-[500px] overflow-hidden bg-zinc-100">
          <iframe
            src={resumeUrl}
            title="Resume"
            className="w-full h-full min-h-[70vh] border-0"
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
