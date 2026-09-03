import React from 'react';
import { 
  X, 
  BarChart3, 
  Boxes, 
  CreditCard, 
  ShieldCheck, 
  Smartphone, 
  Printer, 
  CheckCircle2, 
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { POS_KEYPOINTS, WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';

interface POSKeypointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectForQuote?: () => void;
}

export const POSKeypointsModal: React.FC<POSKeypointsModalProps> = ({
  isOpen,
  onClose,
  onSelectForQuote
}) => {
  if (!isOpen) return null;

  const getKeypointIcon = (number: number) => {
    switch (number) {
      case 1:
        return <BarChart3 className="w-5 h-5 text-[#00d4ff]" />;
      case 2:
        return <Boxes className="w-5 h-5 text-[#00d4ff]" />;
      case 3:
        return <CreditCard className="w-5 h-5 text-[#00d4ff]" />;
      case 4:
        return <ShieldCheck className="w-5 h-5 text-[#00d4ff]" />;
      case 5:
        return <Smartphone className="w-5 h-5 text-[#00d4ff]" />;
      case 6:
        return <Printer className="w-5 h-5 text-[#00d4ff]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#00d4ff]" />;
    }
  };

  const whatsappMessage = 
    'Hi Umarfaruk, I am interested in the POS Reselling solution with the 6 key features: ' +
    '1. Powerful Sales Reporting, 2. Smart Stock Control, 3. Debtor & Creditor Management, ' +
    '4. Role-based User Access, 5. Mobile Daily Summary App, 6. Full Device Compatibility. ' +
    'Please provide details & pricing for my business in Tzaneen.';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0a2540]/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      id="pos-keypoints-modal-overlay"
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e6ebf1] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        id="pos-keypoints-modal-content"
      >
        {/* Modal Header */}
        <div className="bg-[#0a2540] text-white p-5 sm:p-6 flex items-start justify-between relative">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#00d4ff]">
              <Sparkles className="w-3 h-3 text-[#00d4ff]" />
              <span>POS Reselling Features</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              POS System Core Key Points
            </h3>
            <p className="text-xs sm:text-sm text-[#c1c9d2]">
              Everything your business needs to manage sales, inventory, accounts, and hardware seamlessly.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer ml-4 shrink-0"
            aria-label="Close modal"
            id="close-pos-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 6 Keypoints Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 bg-[#f7f9fc]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {POS_KEYPOINTS.map((kp) => (
              <div 
                key={kp.number}
                className="bg-white p-4 rounded-xl border border-[#e6ebf1] shadow-xs flex items-start gap-3.5 hover:border-[#00d4ff] transition-all"
                id={`pos-keypoint-${kp.number}`}
              >
                {/* Numbered badge with icon */}
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  {getKeypointIcon(kp.number)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0a2540] text-white text-[11px] font-bold shrink-0">
                      {kp.number}
                    </span>
                    <h4 className="font-bold text-sm text-[#1a1f36] leading-tight capitalize">
                      {kp.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#697386] leading-relaxed mt-1">
                    {kp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Hardware & Compatibility Note */}
          <div className="bg-white p-4 rounded-xl border border-[#e6ebf1] flex items-center justify-between flex-wrap gap-3">
            <div className="text-xs text-[#697386]">
              <span className="font-semibold text-[#1a1f36]">Compatible Devices:</span> Thermal printers, slip printers, barcode readers, cash drawers, touch monitors &amp; mobile phones.
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
              In-Stock in Tzaneen
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#e6ebf1] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#697386] text-center sm:text-left">
            Manager: <strong className="text-[#1a1f36]">{WORKSHOP_DETAILS.manager}</strong> ({WORKSHOP_DETAILS.phoneDisplay})
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onSelectForQuote && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectForQuote();
                }}
                className="flex-1 sm:flex-initial text-xs font-semibold text-[#0a2540] bg-[#f7f9fc] hover:bg-slate-100 border border-[#e6ebf1] py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Custom Estimate
              </button>
            )}

            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-2.5 px-5 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer shadow-none"
              id="pos-modal-whatsapp-btn"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
