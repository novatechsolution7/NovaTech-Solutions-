import React, { useState } from 'react';
import { X, Send, Copy, Check, HelpCircle, Laptop, Wrench, ShieldAlert, Sparkles, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';

interface InquireNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const InquireNowModal: React.FC<InquireNowModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Computer Repairing'
}) => {
  const [service, setService] = useState(defaultService);
  const [deviceModel, setDeviceModel] = useState('');
  const [issueType, setIssueType] = useState('Screen / Hardware Fault');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [urgency, setUrgency] = useState('Normal (Same-day diagnostic)');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const inquiryText = 
    `*NovaTech Quick Inquiry*\n` +
    `• *Service:* ${service}\n` +
    `• *Device:* ${deviceModel || 'Not specified'}\n` +
    `• *Primary Issue:* ${issueType}\n` +
    `• *Urgency:* ${urgency}\n` +
    (customerName ? `• *Client Name:* ${customerName}\n` : '') +
    (notes ? `• *Details:* ${notes}\n` : '') +
    `• *Workshop:* ${WORKSHOP_DETAILS.street}, ${WORKSHOP_DETAILS.suburb}, Tzaneen\n` +
    `Hi Umarfaruk, I'd like to get an assessment / quote for this.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inquiryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0a2540]/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      id="inquire-now-modal-overlay"
    >
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#e6ebf1] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        id="inquire-now-modal-content"
      >
        {/* Header */}
        <div className="bg-[#0a2540] text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-[#00d4ff] px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Direct Diagnostic Assessment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Inquire Now
            </h3>
            <p className="text-xs sm:text-sm text-[#c1c9d2] mt-0.5">
              Get rapid advice &amp; repair estimates from Umarfaruk at Arbor Park workshop.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer shrink-0 ml-4"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm bg-white">
          {/* Service Selector */}
          <div>
            <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1.5">
              Select Service Required
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#1a1f36] font-medium focus:outline-none focus:border-[#00d4ff]"
            >
              <option value="Computer Repairing">Computer &amp; Laptop Repairing</option>
              <option value="POS Reselling & Systems">POS Hardware &amp; Software Reselling</option>
              <option value="CCTV Maintenance & Installation">CCTV Maintenance &amp; Security Cameras</option>
              <option value="Hardware Stock Purchase">Refurbished Laptop / Desktop Purchase</option>
              <option value="SSD & RAM Speed Upgrade">SSD &amp; RAM Speed Upgrade</option>
              <option value="Digital / Software Services">Software, Windows &amp; Networking</option>
            </select>
          </div>

          {/* Device Model & Issue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1.5">
                Device / Brand Model
              </label>
              <input
                type="text"
                placeholder="e.g. Dell Latitude, HP 15, DVR, etc."
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1.5">
                Common Fault / Request
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
              >
                <option value="Screen Cracked / No Display">Screen Cracked / No Display</option>
                <option value="Won't Turn On / Power Issue">Won't Turn On / Power Issue</option>
                <option value="Extremely Slow / Needs SSD Upgrade">Extremely Slow / Needs SSD Upgrade</option>
                <option value="Virus / Blue Screen / Windows Corrupted">Virus / Blue Screen / Windows</option>
                <option value="Liquid / Water Spillage">Liquid / Water Spillage</option>
                <option value="Battery / Charger Not Charging">Battery / Charger Fault</option>
                <option value="CCTV Camera Black / Offline">CCTV Camera Black / Offline</option>
                <option value="New Equipment Price Inquiry">New Equipment Price Inquiry</option>
              </select>
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sipho, Johan, Maria"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1.5">
                Urgency
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
              >
                <option value="Urgent (Today / Emergency)">Urgent (Today / Emergency)</option>
                <option value="Normal (Same-day diagnostic)">Normal (Same-day diagnostic)</option>
                <option value="General inquiry / Budgeting">General inquiry / Budgeting</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1.5">
              Additional Details or Symptoms (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Describe what happened or any error messages shown..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
            />
          </div>

          {/* Workshop Address Badge */}
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between text-xs text-[#0a2540]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00d4ff] shrink-0" />
              <span><strong>Workshop Walk-ins:</strong> H-11, Saligna Street, Arbor Park, Tzaneen, Limpopo - 0850</span>
            </div>
            <span className="font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded text-[11px] shrink-0">
              Open Today
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#e6ebf1] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#697386] hover:text-[#1a1f36] bg-[#f7f9fc] hover:bg-slate-100 border border-[#e6ebf1] py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#697386]" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <a
            href={getWhatsAppUrl(inquiryText)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-2.5 px-6 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer shadow-none"
            id="inquire-modal-submit-wa"
          >
            <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
            <span>Send WhatsApp to Umarfaruk</span>
          </a>
        </div>
      </div>
    </div>
  );
};
