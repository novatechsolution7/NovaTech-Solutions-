import React, { useState } from 'react';
import { Phone, Menu, X, Clock, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';

interface NavbarProps {
  onOpenQuickQuote?: () => void;
  onOpenInquire?: () => void;
  onOpenBookService?: () => void;
  onOpenPOSQuote?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenQuickQuote,
  onOpenInquire,
  onOpenBookService,
  onOpenPOSQuote
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e6ebf1]">
      {/* Top micro-bar with operating hours & location */}
      <div className="bg-[#0a2540] text-slate-300 text-xs py-1.5 px-6 sm:px-12 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00d4ff]" />
              {WORKSHOP_DETAILS.street}, {WORKSHOP_DETAILS.suburb}, {WORKSHOP_DETAILS.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00d4ff]" />
              Mon - Fri: 08:00 - 17:30 | Sat: 08:30 - 14:00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#a3acb9]">Workshop Manager: <strong className="text-white font-medium">{WORKSHOP_DETAILS.manager}</strong></span>
            <a
              href={`tel:${WORKSHOP_DETAILS.phone}`}
              className="hover:text-[#00d4ff] text-slate-200 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#00d4ff]" />
              {WORKSHOP_DETAILS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex justify-between items-center" id="main-nav">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" id="nav-brand-logo">
          <div className="text-2xl font-bold tracking-tight text-[#0a2540]">
            NovaTech <span className="text-[#00d4ff]">Solutions</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-7">
          <a href="#services" className="text-sm font-semibold text-[#697386] hover:text-[#0a2540] transition-colors">Services</a>
          <a href="#client-testimonials" className="text-sm font-semibold text-[#697386] hover:text-[#0a2540] transition-colors">Client Reviews</a>
          <button 
            type="button" 
            onClick={onOpenPOSQuote} 
            className="text-sm font-semibold text-[#697386] hover:text-[#0a2540] transition-colors cursor-pointer"
          >
            POS Systems
          </button>
          <a href="#stock" className="text-sm font-semibold text-[#697386] hover:text-[#0a2540] transition-colors">Computer &amp; Laptop Prices</a>
          <a href="#quote-builder" className="text-sm font-semibold text-[#697386] hover:text-[#0a2540] transition-colors">Quick Estimate</a>
          <a href="#workshop" className="text-sm font-semibold text-[#697386] hover:text-[#0a2540] transition-colors">Workshop &amp; Map</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenBookService}
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a2540] bg-[#f7f9fc] hover:bg-slate-200 border border-[#e6ebf1] py-2 px-3.5 rounded-full transition-colors cursor-pointer"
            id="nav-book-service-btn"
          >
            <span>Book Service</span>
          </button>

          <a
            href={`tel:${WORKSHOP_DETAILS.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a2540] bg-[#f7f9fc] hover:bg-slate-200 border border-[#e6ebf1] py-2 px-3.5 rounded-full transition-colors"
            id="nav-call-btn"
          >
            <Phone className="w-3.5 h-3.5 text-[#0a2540]" />
            <span>Call</span>
          </a>

          <button
            type="button"
            onClick={onOpenInquire}
            className="inline-flex items-center bg-[#25d366] hover:bg-[#128c7e] text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-xs active:scale-98"
            id="nav-whatsapp-quick-btn"
          >
            <WhatsAppIcon className="w-4 h-4 mr-1.5 text-white shrink-0" />
            <span>Inquire Now</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle navigation menu"
            id="nav-mobile-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e6ebf1] px-6 py-4 shadow-sm flex flex-col gap-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-semibold text-[#697386] hover:text-[#0a2540]"
          >
            Services
          </a>
          <a
            href="#client-testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-semibold text-[#697386] hover:text-[#0a2540]"
          >
            Client Reviews (4.9 ★)
          </a>
          <button
            type="button"
            onClick={() => { setMobileMenuOpen(false); onOpenPOSQuote && onOpenPOSQuote(); }}
            className="py-2 text-sm font-semibold text-[#697386] hover:text-[#0a2540] text-left cursor-pointer"
          >
            POS Reselling &amp; Quote
          </button>
          <a
            href="#stock"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-semibold text-[#697386] hover:text-[#0a2540]"
          >
            Computer &amp; Laptop Prices (Stock)
          </a>
          <button
            type="button"
            onClick={() => { setMobileMenuOpen(false); onOpenBookService && onOpenBookService(); }}
            className="py-2 text-sm font-semibold text-[#697386] hover:text-[#0a2540] text-left cursor-pointer"
          >
            Book a Service Slot
          </button>
          <a
            href="#quote-builder"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-semibold text-[#697386] hover:text-[#0a2540]"
          >
            Quick Estimate &amp; Inquiry
          </a>
          <a
            href="#workshop"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-semibold text-[#697386] hover:text-[#0a2540]"
          >
            Workshop &amp; Map (Tzaneen)
          </a>
          <div className="pt-2 border-t border-[#e6ebf1] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); onOpenInquire && onOpenInquire(); }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25d366] text-white font-bold text-sm cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Inquire Now (WhatsApp)</span>
            </button>
            <a
              href={`tel:${WORKSHOP_DETAILS.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#f7f9fc] border border-[#e6ebf1] text-[#0a2540] font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-[#0a2540]" />
              Call {WORKSHOP_DETAILS.phoneDisplay}
            </a>
            <div className="text-xs text-center text-[#697386] py-1">
              Workshop Manager: <strong className="text-[#1a1f36]">{WORKSHOP_DETAILS.manager}</strong>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
