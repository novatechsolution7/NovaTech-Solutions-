import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { WORKSHOP_DETAILS, SERVICES, getWhatsAppUrl } from '../data/workshopData';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a2540] text-white pt-14 pb-10 px-6 sm:px-12 border-t border-[#163859] text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#163859]">
        {/* Col 1: Brand & Bio */}
        <div className="space-y-4">
          <div className="text-2xl font-bold tracking-tight text-white">
            NovaTech <span className="text-[#00d4ff]">Solutions</span>
          </div>
          <p className="text-[#c1c9d2] text-xs sm:text-sm leading-relaxed">
            Your trusted tech partner in Tzaneen. Offering rapid computer diagnostics, high-performance POS setups, crystal-clear CCTV surveillance, and certified laptop hardware.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-xs text-[#c1c9d2] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-[#00d4ff]" />
              <span>Workshop Manager: <strong>{WORKSHOP_DETAILS.manager}</strong></span>
            </span>
          </div>
        </div>

        {/* Col 2: Services Quick Links */}
        <div>
          <h4 className="font-bold text-white text-base mb-4 tracking-wide">
            Our Services
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-[#c1c9d2]">
            {SERVICES.map((srv) => (
              <li key={srv.id}>
                <a
                  href={`#service-card-${srv.id}`}
                  className="hover:text-[#00d4ff] transition-colors flex items-center gap-2"
                >
                  <span className="text-[#00d4ff]">•</span>
                  <span>{srv.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Workshop Address & Hours */}
        <div>
          <h4 className="font-bold text-white text-base mb-4 tracking-wide">
            Workshop Location
          </h4>
          <div className="space-y-3 text-xs sm:text-sm text-[#c1c9d2]">
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#00d4ff] shrink-0 mt-0.5" />
              <span>{WORKSHOP_DETAILS.address}</span>
            </p>
            <p className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#00d4ff] shrink-0 mt-0.5" />
              <span>Mon - Fri: 08:00 - 17:30<br />Sat: 08:30 - 14:00</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#00d4ff] shrink-0" />
              <a href={`tel:${WORKSHOP_DETAILS.phone}`} className="hover:text-white">
                {WORKSHOP_DETAILS.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        {/* Col 4: WhatsApp Direct */}
        <div>
          <h4 className="font-bold text-white text-base mb-4 tracking-wide">
            Direct Contact
          </h4>
          <p className="text-[#c1c9d2] text-xs sm:text-sm mb-4 leading-relaxed">
            Need urgent PC repair or a POS system quote? Message Umarfaruk directly on WhatsApp.
          </p>
          <a
            href={getWhatsAppUrl('Hi Umarfaruk, I would like to get a quote from NovaTech Solutions.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-2.5 px-5 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer shadow-none"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Copyright line exactly as specified in the original template */}
      <div className="max-w-7xl mx-auto pt-8 text-center text-xs text-[#a3acb9]">
        <p>&copy; 2023 NovaTech Solutions. All Rights Reserved. | Designed with Excellence.</p>
      </div>
    </footer>
  );
};
