import React, { useState } from 'react';
import { MapPin, Phone, User, Clock, Navigation, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WorkshopMap } from './WorkshopMap';

export const WorkshopSection: React.FC = () => {
  const [addressCopied, setAddressCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(WORKSHOP_DETAILS.address);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2500);
  };

  return (
    <section id="workshop" className="py-12 sm:py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0a2540] border border-blue-100 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#00d4ff]" />
            <span>Tzaneen Repair Lab &amp; Hardware Store</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a2540] mb-3">
            Visit Our Workshop
          </h2>
          <p className="text-[#697386] text-sm sm:text-base leading-relaxed">
            Drop in with your laptop, computer, or CCTV equipment for an immediate diagnostic assessment. We are conveniently located in Arbor Park, Tzaneen.
          </p>
        </div>

        {/* 3-Column Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Address */}
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#e6ebf1] shadow-xs hover:border-[#00d4ff] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <h3 className="font-bold text-lg text-[#1a1f36] mb-2">
                Workshop Location
              </h3>
              <p className="text-[#697386] text-sm leading-relaxed mb-4">
                <strong className="text-[#1a1f36] block">{WORKSHOP_DETAILS.street}</strong>
                <span>{WORKSHOP_DETAILS.suburb}, {WORKSHOP_DETAILS.city}</span><br />
                <span>{WORKSHOP_DETAILS.province} - {WORKSHOP_DETAILS.postalCode}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-[#e6ebf1] flex items-center gap-2">
              <button
                onClick={copyAddress}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#697386] hover:text-[#1a1f36] bg-[#f7f9fc] hover:bg-slate-100 py-2 px-3 rounded-lg border border-[#e6ebf1] transition-colors cursor-pointer"
              >
                {addressCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#697386]" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={WORKSHOP_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a2540] hover:text-[#00d4ff] bg-[#f7f9fc] hover:bg-slate-100 py-2 px-3 rounded-lg border border-[#e6ebf1] transition-colors ml-auto"
              >
                <Navigation className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Card 2: Contact & Manager */}
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#e6ebf1] shadow-xs hover:border-[#00d4ff] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <h3 className="font-bold text-lg text-[#1a1f36] mb-2">
                Manager &amp; Direct Line
              </h3>
              <p className="text-[#697386] text-sm leading-relaxed mb-4">
                Workshop Manager: <strong className="text-[#1a1f36]">{WORKSHOP_DETAILS.manager}</strong><br />
                Direct Mobile: <a href={`tel:${WORKSHOP_DETAILS.phone}`} className="text-[#0a2540] font-semibold hover:underline">{WORKSHOP_DETAILS.phoneDisplay}</a><br />
                WhatsApp: Direct chat for device diagnostics
              </p>
            </div>

            <div className="pt-4 border-t border-[#e6ebf1] flex items-center gap-2">
              <a
                href={`tel:${WORKSHOP_DETAILS.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a2540] bg-[#f7f9fc] hover:bg-slate-100 py-2 px-3.5 rounded-lg border border-[#e6ebf1] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#0a2540]" />
                <span>Call Manager</span>
              </a>

              <a
                href={getWhatsAppUrl('Hi Umarfaruk, I am looking to bring a device to your Arbor Park workshop.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#25d366] hover:bg-[#128c7e] py-2 px-3.5 rounded-lg transition-colors ml-auto shadow-none"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span>Chat</span>
              </a>
            </div>
          </div>

          {/* Card 3: Operating Hours */}
          <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#e6ebf1] shadow-xs hover:border-[#00d4ff] transition-colors flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <h3 className="font-bold text-lg text-[#1a1f36] mb-2">
                Operating Hours
              </h3>
              <div className="text-xs text-[#697386] space-y-2.5 mb-4">
                <div className="flex justify-between pb-1.5 border-b border-[#e6ebf1]">
                  <span className="font-medium text-[#697386]">Mon - Fri:</span>
                  <span className="text-[#1a1f36] font-bold">{WORKSHOP_DETAILS.operatingHours.weekdays}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#e6ebf1]">
                  <span className="font-medium text-[#697386]">Sat:</span>
                  <span className="text-[#1a1f36] font-bold">{WORKSHOP_DETAILS.operatingHours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#697386]">Sunday:</span>
                  <span className="text-amber-700 font-semibold">{WORKSHOP_DETAILS.operatingHours.sunday}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e6ebf1]">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Walk-ins Always Welcome
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Google Maps Platform Component */}
        <div className="mb-8">
          <WorkshopMap />
        </div>

        {/* Map / Directions banner */}
        <div className="bg-[#0a2540] rounded-xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-xl font-bold tracking-tight">
              Need Directions or On-Site CCTV / POS Assessment?
            </h4>
            <p className="text-[#c1c9d2] text-sm max-w-xl">
              We also visit local shops, homes, farms, and offices around Tzaneen, Letaba, and Greater Mopani District for CCTV and network installations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={WORKSHOP_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0a2540] hover:bg-slate-100 font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#0a2540]" />
              <span>Open in Google Maps</span>
            </a>

            <a
              href={getWhatsAppUrl('Hello Umarfaruk, I need an on-site visit in Tzaneen for CCTV / POS / Networking.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-colors shadow-none cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Book On-Site Visit</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
