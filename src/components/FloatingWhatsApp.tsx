import React, { useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';
import { X, MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {/* Friendly prompt bubble */}
      {showTooltip && (
        <div className="pointer-events-auto bg-white text-[#1a1f36] rounded-xl p-3 shadow-xs border border-[#e6ebf1] max-w-xs flex items-start gap-2.5 transition-all">
          <div className="w-2 h-2 rounded-full bg-[#25d366] mt-1.5 shrink-0" />
          <div className="text-xs">
            <p className="font-semibold text-[#0a2540]">Need immediate help?</p>
            <p className="text-[#697386] text-[11px] mt-0.5">
              Chat directly with manager <strong>{WORKSHOP_DETAILS.manager}</strong> on WhatsApp.
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#a3acb9] hover:text-[#1a1f36] p-0.5 cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating 56px WhatsApp circular button */}
      <a
        href={getWhatsAppUrl('Hello Umarfaruk, I visited NovaTech Solutions website and need assistance.')}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#128c7e] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all pulse-wa group relative"
        aria-label="Chat with NovaTech Solutions on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
        <span className="sr-only">Chat with Umarfaruk on WhatsApp</span>
      </a>
    </div>
  );
};
