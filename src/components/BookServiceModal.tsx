import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Copy, 
  Check, 
  Wrench, 
  Video, 
  Laptop, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';

interface BookServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const BookServiceModal: React.FC<BookServiceModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'CCTV Maintenance & Surveillance'
}) => {
  const [serviceType, setServiceType] = useState(defaultService);
  const [locationType, setLocationType] = useState('On-Site Visit (Tzaneen Area)');
  const [addressOrArea, setAddressOrArea] = useState('');
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [preferredTime, setPreferredTime] = useState('Morning (08:30 – 12:00)');
  const [customerName, setCustomerName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [bookingRef] = useState(() => `NT-${Math.floor(1000 + Math.random() * 9000)}`);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const bookingSummary = 
    `*NovaTech Service Booking [#${bookingRef}]*\n` +
    `• *Service:* ${serviceType}\n` +
    `• *Location Mode:* ${locationType}\n` +
    (addressOrArea ? `• *Address/Area:* ${addressOrArea}\n` : '') +
    `• *Date & Time:* ${preferredDate} (${preferredTime})\n` +
    (customerName ? `• *Customer:* ${customerName}\n` : '') +
    (contactPhone ? `• *Phone:* ${contactPhone}\n` : '') +
    (description ? `• *Problem Details:* ${description}\n` : '') +
    `• *Workshop Contact:* ${WORKSHOP_DETAILS.manager} (${WORKSHOP_DETAILS.phoneDisplay})\n` +
    `Hi Umarfaruk, I want to book this service appointment. Please confirm availability.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bookingSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0a2540]/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      id="book-service-modal-overlay"
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e6ebf1] overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
        id="book-service-modal-content"
      >
        {/* Header */}
        <div className="bg-[#0a2540] text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-[#00d4ff] px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1.5">
              <Calendar className="w-3 h-3" />
              <span>Service Appointment &amp; Callouts</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Book a Service</span>
              <span className="text-xs bg-[#00d4ff]/20 text-[#00d4ff] px-2 py-0.5 rounded border border-[#00d4ff]/30 font-mono font-normal">
                Ref: {bookingRef}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-[#c1c9d2] mt-0.5">
              Schedule an on-site technician callout or reserve a workshop diagnostic slot in Arbor Park.
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

        {/* Modal Form */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm bg-[#f7f9fc]">
          {/* Service Type Selection */}
          <div className="bg-white p-4 rounded-xl border border-[#e6ebf1]">
            <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-2">
              Select Service Required
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: 'CCTV Maintenance & Alignment', desc: 'Fix dark channels, align lenses, restore phone app', icon: Video },
                { label: 'New CCTV Full Installation', desc: 'Complete 4 or 8 camera install with cabling & HDD', icon: Video },
                { label: 'Computer / Laptop Repair Slot', desc: 'Motherboard soldering, broken screen, slow speed', icon: Laptop },
                { label: 'POS System On-Site Setup', desc: 'Till rollout, slip printer & cash drawer config', icon: Wrench },
                { label: 'Network & Wi-Fi Configuration', desc: 'Office routers, switches, long-range Wi-Fi', icon: ShieldCheck }
              ].map((item) => {
                const isSelected = serviceType === item.label;
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    onClick={() => setServiceType(item.label)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected 
                        ? 'bg-blue-50/70 border-[#00d4ff] ring-1 ring-[#00d4ff]/30' 
                        : 'bg-white border-[#e6ebf1] hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#00d4ff]' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-bold text-xs text-[#1a1f36] leading-tight">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#697386] mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location Mode */}
          <div className="bg-white p-4 rounded-xl border border-[#e6ebf1] space-y-3">
            <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider">
              Service Location Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                'Drop-Off at Arbor Park Workshop',
                'On-Site Visit (Tzaneen Area)',
                'Farm / Greater Mopani Callout'
              ].map((loc) => {
                const isSelected = locationType === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocationType(loc)}
                    className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-[#0a2540] text-white border-[#0a2540]' 
                        : 'bg-white text-[#1a1f36] border-[#e6ebf1] hover:bg-slate-50'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>

            {locationType !== 'Drop-Off at Arbor Park Workshop' ? (
              <div>
                <label className="block text-[11px] font-bold text-[#697386] uppercase tracking-wider mb-1">
                  Street Address, Farm Name or Area in Tzaneen
                </label>
                <input
                  type="text"
                  placeholder="e.g. Medipark, Aqua Park, Letaba Estates, Haenertsburg road, etc."
                  value={addressOrArea}
                  onChange={(e) => setAddressOrArea(e.target.value)}
                  className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3 py-2 text-xs text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
                />
              </div>
            ) : (
              <div className="text-xs text-[#697386] bg-blue-50/80 p-2.5 rounded-lg border border-blue-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00d4ff] shrink-0" />
                <span>Bring your equipment to <strong>{WORKSHOP_DETAILS.address}</strong>. Open Mon - Fri: 08:00 - 17:30 | Sat: 08:30 - 14:00.</span>
              </div>
            )}
          </div>

          {/* Date & Time Slot */}
          <div className="bg-white p-4 rounded-xl border border-[#e6ebf1] grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>Preferred Day</span>
              </label>
              <select
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3 py-2 text-xs text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
              >
                <option value="Today (Urgent Diagnostic)">Today (Urgent Diagnostic)</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Within this week">Within this week</option>
                <option value="This Saturday (08:30 – 14:00)">This Saturday (08:30 – 14:00)</option>
                <option value="Specific date / Flexible">Specific date / Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>Preferred Time</span>
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3 py-2 text-xs text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
              >
                <option value="Morning (08:30 – 12:00)">Morning (08:30 – 12:00)</option>
                <option value="Early Afternoon (12:00 – 14:30)">Early Afternoon (12:00 – 14:30)</option>
                <option value="Late Afternoon (14:30 – 17:30)">Late Afternoon (14:30 – 17:30)</option>
                <option value="Anytime during working hours">Anytime during working hours</option>
              </select>
            </div>
          </div>

          {/* Contact & Problem Details */}
          <div className="bg-white p-4 rounded-xl border border-[#e6ebf1] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3 py-2 text-xs text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 074 503 7149"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3 py-2 text-xs text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1">
                Brief Description of Issue (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 2 cameras not displaying, need cable re-run, or PC motherboard dead..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3 py-2 text-xs text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#e6ebf1] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#697386] hover:text-[#1a1f36] bg-[#f7f9fc] hover:bg-slate-100 border border-[#e6ebf1] py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Booking Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#697386]" />
                <span>Copy Booking Slip</span>
              </>
            )}
          </button>

          <a
            href={getWhatsAppUrl(bookingSummary)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-2.5 px-6 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer shadow-none"
            id="book-service-send-wa"
          >
            <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
            <span>Confirm Booking on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
