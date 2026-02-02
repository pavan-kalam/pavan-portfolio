import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { X, FileText, Loader2 } from 'lucide-react';

interface DocsViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  docPath: string | null;
  docFiles?: { label: string; path: string }[];
  projectTitle?: string;
}

export default function DocsViewerModal({
  isOpen,
  onClose,
  docPath,
  docFiles,
  projectTitle = 'Documentation'
}: DocsViewerModalProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(docPath);
  const [showFilePicker, setShowFilePicker] = useState(!!docFiles?.length && !docPath);
  const [retryCount, setRetryCount] = useState(0);

  const pathToLoad = docFiles ? selectedFile : docPath;

  useEffect(() => {
    if (!isOpen) return;

    if (docFiles && !selectedFile) {
      setShowFilePicker(true);
      setContent('');
      return;
    }

    if (!pathToLoad) {
      setContent('');
      return;
    }

    setLoading(true);
    setError(null);
    setShowFilePicker(false);

    const url =
      pathToLoad.startsWith('http')
        ? pathToLoad
        : new URL(pathToLoad.replace(/^\//, './'), window.location.href).href;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load document');
        return res.text();
      })
      .then((text) => {
        setContent(text);
      })
      .catch(() => {
        setError('Failed to load document. Please try again.');
        setContent('');
      })
      .finally(() => setLoading(false));
  }, [isOpen, pathToLoad, docFiles, selectedFile, retryCount]);

  useEffect(() => {
    if (isOpen) {
      setSelectedFile(docPath);
      setShowFilePicker(!!docFiles?.length && !docPath);
      setContent('');
      setError(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, docPath, docFiles]);

  const handleBackToFiles = () => {
    setSelectedFile(null);
    setShowFilePicker(true);
    setContent('');
  };

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
        className="relative z-10 flex w-full max-w-4xl max-h-[90vh] flex-col rounded-xl bg-white shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="docs-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between shrink-0 px-6 py-4 border-b border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-3">
            {docFiles && selectedFile && !showFilePicker && (
              <button
                onClick={handleBackToFiles}
                className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                ← Back to files
              </button>
            )}
            <FileText className="w-5 h-5 text-purple-600" />
            <h2 id="docs-modal-title" className="text-lg font-semibold text-zinc-900">
              {showFilePicker ? `${projectTitle} - Select Document` : projectTitle}
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

        {/* Content - text-zinc-900 to override body's text-white inheritance */}
        <div className="flex-1 min-h-[300px] overflow-y-auto text-zinc-900">
          <div className="p-6 md:p-10">
            {showFilePicker && docFiles ? (
              <div className="space-y-3">
                <p className="text-zinc-600 mb-6">
                  Select a document to read from the {projectTitle} documentation:
                </p>
                <div className="grid gap-2">
                  {docFiles.map((file) => (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file.path)}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg border border-zinc-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all group"
                    >
                      <FileText className="w-4 h-4 text-zinc-400 group-hover:text-purple-600 shrink-0" />
                      <span className="text-zinc-800 group-hover:text-purple-900 font-medium">
                        {file.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                <p className="text-zinc-500">Loading document...</p>
              </div>
            ) : error ? (
              <div className="py-20 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => setRetryCount((c) => c + 1)}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : content ? (
              <article
                className="prose prose-zinc prose-lg max-w-none text-zinc-800 [&_*]:text-zinc-800 [&_h1]:text-zinc-900 [&_h2]:text-zinc-900 [&_h3]:text-zinc-900 [&_p]:text-zinc-700 [&_li]:text-zinc-700 prose-headings:font-serif prose-h1:text-2xl prose-h1:border-b prose-h1:border-zinc-200 prose-h1:pb-2 prose-h1:mb-6 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-p:leading-relaxed prose-p:mb-4 prose-li:my-1 prose-code:bg-zinc-100 prose-code:text-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-pre:rounded-lg prose-blockquote:border-l-purple-500 prose-blockquote:bg-zinc-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-table:border-collapse prose-th:border prose-th:border-zinc-300 prose-th:bg-zinc-100 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-zinc-200 prose-td:px-4 prose-td:py-2"
              >
                <ReactMarkdown>{content}</ReactMarkdown>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
