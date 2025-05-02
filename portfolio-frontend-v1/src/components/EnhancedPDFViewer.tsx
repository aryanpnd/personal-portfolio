import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, Maximize, Minimize, ChevronLeft, ChevronRight } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


interface PDFViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedPDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, isOpen, onClose }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Reset states when component opens
    if (isOpen) {
      setIsPdfLoaded(false);
      setScale(1);
      setHasError(false);
      setPageNumber(1);
    }

    // Handle escape key to close the viewer
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsPdfLoaded(true);
    setHasError(false);
  };

  const onDocumentLoadError = () => {
    setHasError(true);
    setIsPdfLoaded(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'resume.pdf'; // Set a default file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`bg-gray-900 rounded-lg overflow-hidden flex flex-col ${
              isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl max-h-[90vh]'
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 bg-gray-800">
              <div className="text-white font-medium">Resume - Aryan Pandey</div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut size={18} className="text-white" />
                </button>
                <div className="text-white text-sm">
                  {Math.round(scale * 100)}%
                </div>
                <button
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn size={18} className="text-white" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize size={18} className="text-white" />
                  ) : (
                    <Maximize size={18} className="text-white" />
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Download"
                >
                  <Download size={18} className="text-white" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto bg-gray-800 flex flex-col items-center">
              {!isPdfLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              )}
              
              {hasError ? (
                <div className="flex flex-col items-center justify-center p-8 text-gray-400 h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">Failed to load PDF</h3>
                  <p className="text-sm mb-4">The PDF could not be loaded. Please try downloading it instead.</p>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-primary text-white rounded flex items-center"
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </button>
                </div>
              ) : (
                <>
                  <div 
                    className="flex-1 w-full flex justify-center py-4 px-2 min-h-[500px]"
                    style={{ transform: `scale(${scale})`, transformOrigin: 'center top' }}
                  >
                    <Document
                      file={pdfUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={onDocumentLoadError}
                      loading={
                        <div className="flex items-center justify-center h-full">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                      }
                      className="pdf-document"
                      options={{
                        cMapUrl: 'https://unpkg.com/pdfjs-dist@2.16.105/cmaps/',
                        cMapPacked: true,
                      }}
                    >
                      <Page 
                        pageNumber={pageNumber} 
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="pdf-page"
                      />
                    </Document>
                  </div>
                  
                  {isPdfLoaded && numPages && numPages > 1 && (
                    <div className="flex items-center justify-center p-3 bg-gray-800 w-full border-t border-gray-700">
                      <button
                        onClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                        className={`p-2 rounded-full transition-colors ${
                          pageNumber <= 1 ? 'text-gray-600 cursor-not-allowed' : 'hover:bg-gray-700 text-white'
                        }`}
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <span className="mx-4 text-white">
                        Page {pageNumber} of {numPages}
                      </span>
                      <button
                        onClick={goToNextPage}
                        disabled={numPages !== null && pageNumber >= numPages}
                        className={`p-2 rounded-full transition-colors ${
                          numPages !== null && pageNumber >= numPages ? 'text-gray-600 cursor-not-allowed' : 'hover:bg-gray-700 text-white'
                        }`}
                        aria-label="Next page"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedPDFViewer;