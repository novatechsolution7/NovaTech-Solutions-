/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { StockSection } from './components/StockSection';
import { QuickQuoteBuilder } from './components/QuickQuoteBuilder';
import { WorkshopSection } from './components/WorkshopSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { InquireNowModal } from './components/InquireNowModal';
import { POSQuoteModal } from './components/POSQuoteModal';
import { BookServiceModal } from './components/BookServiceModal';
import { StockModal } from './components/StockModal';
import { ServiceItem } from './types';

export default function App() {
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>();
  
  // Modals state
  const [isInquireModalOpen, setIsInquireModalOpen] = useState(false);
  const [inquireService, setInquireService] = useState('Computer Repairing');

  const [isPOSQuoteModalOpen, setIsPOSQuoteModalOpen] = useState(false);

  const [isBookServiceModalOpen, setIsBookServiceModalOpen] = useState(false);
  const [bookServiceType, setBookServiceType] = useState('CCTV Maintenance & Surveillance');

  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockCategory, setStockCategory] = useState('all');

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForQuote(service.id);
    const quoteElement = document.getElementById('quote-builder');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenInquire = (serviceName?: string) => {
    if (serviceName) setInquireService(serviceName);
    setIsInquireModalOpen(true);
  };

  const handleOpenPOSQuote = () => {
    setIsPOSQuoteModalOpen(true);
  };

  const handleOpenBookService = (serviceName?: string) => {
    if (serviceName) setBookServiceType(serviceName);
    setIsBookServiceModalOpen(true);
  };

  const handleOpenStock = (category?: string) => {
    if (category) setStockCategory(category);
    setIsStockModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#1a1f36] flex flex-col selection:bg-[#00d4ff]/30">
      {/* Navigation */}
      <Navbar 
        onOpenInquire={() => handleOpenInquire('General Tech Inquiry')}
        onOpenBookService={() => handleOpenBookService('Workshop Diagnostic / Callout')}
        onOpenPOSQuote={handleOpenPOSQuote}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with 4-action quick bar */}
        <Hero 
          onOpenBookService={() => handleOpenBookService('CCTV / PC Service')}
          onOpenStock={() => handleOpenStock('laptop')}
          onOpenInquire={() => handleOpenInquire('Computer Repairing')}
          onOpenPOSQuote={handleOpenPOSQuote}
        />

        {/* Services Grid with individual action triggers */}
        <ServicesSection 
          onSelectServiceForQuote={handleSelectService}
          onOpenInquire={handleOpenInquire}
          onOpenPOSQuote={handleOpenPOSQuote}
          onOpenBookService={handleOpenBookService}
          onOpenStock={handleOpenStock}
        />

        {/* Client Feedback & Trust Building Testimonials Carousel */}
        <TestimonialsCarousel />

        {/* Dedicated Hardware Stock Catalog Section */}
        <StockSection 
          onOpenPOSQuote={handleOpenPOSQuote}
        />

        {/* Quick WhatsApp Inquiry & Quote Estimator */}
        <QuickQuoteBuilder initialServiceId={selectedServiceForQuote} />

        {/* Workshop Location & Manager Details */}
        <WorkshopSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating 60px Circular WhatsApp Button */}
      <FloatingWhatsApp />

      {/* 4 Interactive Modals for the user requests */}
      <InquireNowModal 
        isOpen={isInquireModalOpen}
        onClose={() => setIsInquireModalOpen(false)}
        defaultService={inquireService}
      />

      <POSQuoteModal 
        isOpen={isPOSQuoteModalOpen}
        onClose={() => setIsPOSQuoteModalOpen(false)}
      />

      <BookServiceModal 
        isOpen={isBookServiceModalOpen}
        onClose={() => setIsBookServiceModalOpen(false)}
        defaultService={bookServiceType}
      />

      <StockModal 
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        initialCategory={stockCategory}
      />
    </div>
  );
}


