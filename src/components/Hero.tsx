import React from 'react';
import { Shield, Zap, MapPin, PhoneCall, Sparkles, ShoppingBag, Calculator, Calendar } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';

interface HeroProps {
  onOpenBookService?: () => void;
  onOpenStock?: () => void;
  onOpenInquire?: () => void;
  onOpenPOSQuote?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBookService,
  onOpenStock,
  onOpenInquire,
  onOpenPOSQuote
}) => {
  return (
    <section className="bg-[#0a2540] text-white px-6 sm:px-12 py-14 sm:py-20 flex flex-col items-center text-center relative overflow-hidden">
      {/* Clean Minimalist geometric ambient circles from design */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4ff] opacity-10 rounded-full -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center">
        {/* Local trust pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-200 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff]" />
          <span>Arbor Park, Tzaneen</span>
          <span className="text-white/40">•</span>
          <span className="text-[#00d4ff]">Direct Service by Umarfaruk</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight max-w-3xl text-white">
          Advanced Tech Support <br className="hidden sm:inline" />
          &amp; Professional Solutions
        </h1>

        {/* Hero Subtext */}
        <p className="text-base sm:text-lg text-[#c1c9d2] max-w-2xl mb-8 leading-relaxed">
          Premium Computer Repair, CCTV Maintenance, and IT Hardware in Tzaneen. Reliable. Professional. Guaranteed Fast.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => onOpenBookService ? onOpenBookService() : undefined}
            className="bg-[#00d4ff] hover:bg-[#33ddff] text-[#0a2540] px-8 py-3 rounded-lg font-bold text-base shadow-sm transition-all cursor-pointer flex items-center gap-2 active:scale-98"
            id="hero-book-service-btn"
          >
            <Calendar className="w-4 h-4 text-[#0a2540]" />
            <span>Book a Service</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('stock');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else if (onOpenStock) onOpenStock();
            }}
            className="bg-white/10 border border-white/20 hover:bg-white/15 text-white px-8 py-3 rounded-lg font-semibold text-base transition-all cursor-pointer flex items-center gap-2"
            id="hero-view-services-btn"
          >
            <ShoppingBag className="w-4 h-4 text-[#00d4ff]" />
            <span>Laptop &amp; PC Prices</span>
          </button>

          <a
            href={`tel:${WORKSHOP_DETAILS.phone}`}
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white px-4 py-3 text-sm font-semibold transition-colors"
            id="hero-call-btn"
          >
            <PhoneCall className="w-4 h-4 text-[#00d4ff]" />
            <span>Call: {WORKSHOP_DETAILS.phoneDisplay}</span>
          </a>
        </div>

        {/* 4 Core Shortcuts Grid requested by user */}
        <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-10 text-left">
          <button
            type="button"
            onClick={() => onOpenInquire ? onOpenInquire() : undefined}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00d4ff]/40 transition-all text-left cursor-pointer group"
            id="quickbar-inquire-now"
          >
            <div className="flex items-center justify-between mb-1">
              <Sparkles className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-[10px] text-white/50 group-hover:text-white/80">&rarr;</span>
            </div>
            <div className="font-bold text-xs sm:text-sm text-white">Inquire Now</div>
            <div className="text-[11px] text-[#a3acb9] truncate">Fast Diagnostics</div>
          </button>

          <button
            type="button"
            onClick={() => onOpenPOSQuote ? onOpenPOSQuote() : undefined}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00d4ff]/40 transition-all text-left cursor-pointer group"
            id="quickbar-pos-quote"
          >
            <div className="flex items-center justify-between mb-1">
              <Calculator className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-[10px] text-white/50 group-hover:text-white/80">&rarr;</span>
            </div>
            <div className="font-bold text-xs sm:text-sm text-white">Get POS Quote</div>
            <div className="text-[11px] text-[#a3acb9] truncate">6 Core Keypoints</div>
          </button>

          <button
            type="button"
            onClick={() => onOpenBookService ? onOpenBookService() : undefined}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00d4ff]/40 transition-all text-left cursor-pointer group"
            id="quickbar-book-service"
          >
            <div className="flex items-center justify-between mb-1">
              <Calendar className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-[10px] text-white/50 group-hover:text-white/80">&rarr;</span>
            </div>
            <div className="font-bold text-xs sm:text-sm text-white">Book Service</div>
            <div className="text-[11px] text-[#a3acb9] truncate">CCTV &amp; Repairs</div>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('stock');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else if (onOpenStock) onOpenStock();
            }}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00d4ff]/40 transition-all text-left cursor-pointer group"
            id="quickbar-view-stock"
          >
            <div className="flex items-center justify-between mb-1">
              <ShoppingBag className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-[10px] text-white/50 group-hover:text-white/80">&rarr;</span>
            </div>
            <div className="font-bold text-xs sm:text-sm text-white">View Stock &amp; Prices</div>
            <div className="text-[11px] text-[#a3acb9] truncate">From R 2,499</div>
          </button>
        </div>

        {/* Feature Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 border-t border-white/10 text-xs sm:text-sm text-[#c1c9d2]">
          <div className="flex items-center justify-center gap-2 py-1">
            <Zap className="w-4 h-4 text-[#00d4ff]" />
            <span>Same-Day Diagnostic Check</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1">
            <Shield className="w-4 h-4 text-[#00d4ff]" />
            <span>Hardware Warranty on Repairs</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-1">
            <MapPin className="w-4 h-4 text-[#00d4ff]" />
            <span>Walk-In Workshop in Tzaneen</span>
          </div>
        </div>
      </div>
    </section>
  );
};

