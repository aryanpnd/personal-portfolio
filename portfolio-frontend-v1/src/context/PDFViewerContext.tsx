import React, { createContext, useContext, useState, ReactNode } from 'react';

type PDFViewerContextType = {
  isPdfViewerOpen: boolean;
  pdfUrl: string;
  openPdfViewer: (url: string) => void;
  closePdfViewer: () => void;
};

const PDFViewerContext = createContext<PDFViewerContextType | undefined>(undefined);

export const usePDFViewer = () => {
  const context = useContext(PDFViewerContext);
  if (context === undefined) {
    throw new Error('usePDFViewer must be used within a PDFViewerProvider');
  }
  return context;
};

export const PDFViewerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const openPdfViewer = (url: string) => {
    setPdfUrl(url);
    setIsPdfViewerOpen(true);
    // Prevent scrolling of the body when viewer is open
    document.body.style.overflow = 'hidden';
  };

  const closePdfViewer = () => {
    setIsPdfViewerOpen(false);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <PDFViewerContext.Provider value={{ 
      isPdfViewerOpen, 
      pdfUrl, 
      openPdfViewer, 
      closePdfViewer 
    }}>
      {children}
    </PDFViewerContext.Provider>
  );
};