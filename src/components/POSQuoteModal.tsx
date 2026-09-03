import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  Sparkles, 
  Calculator, 
  CheckCircle2, 
  Building2, 
  Printer, 
  CreditCard, 
  Barcode, 
  Monitor, 
  FileSpreadsheet,
  Info
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WORKSHOP_DETAILS, getWhatsAppUrl, POS_KEYPOINTS } from '../data/workshopData';

interface POSQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface POSHardwareOption {
  id: string;
  name: string;
  desc: string;
  price: number;
  icon: 'monitor' | 'printer' | 'drawer' | 'scanner' | 'software' | 'setup';
  required?: boolean;
}

const POS_OPTIONS: POSHardwareOption[] = [
  {
    id: 'touch-terminal',
    name: '15.6" Capacitive Touch POS Terminal',
    desc: 'Heavy-duty aluminum stand, Intel CPU, 4GB RAM, 64GB SSD',
    price: 6499,
    icon: 'monitor'
  },
  {
    id: 'thermal-printer',
    name: '80mm Auto-Cutter Thermal Slip Printer',
    desc: 'Ultra fast 260mm/s, USB + LAN, standard till roll compatible',
    price: 1650,
    icon: 'printer'
  },
  {
    id: 'cash-drawer',
    name: 'Heavy-Duty Steel Cash Drawer',
    desc: '5 Note / 8 Coin slots, auto-open RJ11 cable, security keys',
    price: 950,
    icon: 'drawer'
  },
  {
    id: 'barcode-scanner',
    name: 'Hands-Free 2D/1D Barcode Scanner',
    desc: 'Omnidirectional high-speed scanning for barcodes & phone QR codes',
    price: 1250,
    icon: 'scanner'
  },
  {
    id: 'pos-software',
    name: 'Smart POS Software License (Lifetime)',
    desc: 'Includes Sales Reporting, Stock Control, Debtors, Mobile App & permissions',
    price: 1200,
    icon: 'software'
  },
  {
    id: 'onsite-installation',
    name: 'On-Site Installation & Staff Training',
    desc: 'Full installation, cable routing and staff training in Tzaneen / Mopani',
    price: 500,
    icon: 'setup'
  }
];

export const POSQuoteModal: React.FC<POSQuoteModalProps> = ({ isOpen, onClose }) => {
  const [businessType, setBusinessType] = useState('Supermarket / Spaza Shop');
  const [businessName, setBusinessName] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'touch-terminal',
    'thermal-printer',
    'cash-drawer',
    'barcode-scanner',
    'pos-software',
    'onsite-installation'
  ]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(POS_OPTIONS.map((o) => o.id));
  };

  const selectStarter = () => {
    setSelectedItems(['touch-terminal', 'thermal-printer', 'cash-drawer', 'pos-software']);
  };

  const subtotal = selectedItems.reduce((acc, id) => {
    const item = POS_OPTIONS.find((o) => o.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  // Apply bundle discount if all core hardware is selected
  const hasFullBundle = selectedItems.length >= 5;
  const discount = hasFullBundle ? 500 : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  const selectedNames = selectedItems
    .map((id) => POS_OPTIONS.find((o) => o.id === id)?.name)
    .filter(Boolean);

  const whatsappMessage = 
    `*NovaTech POS Reselling Quote Request*\n` +
    `• *Business Type:* ${businessType}\n` +
    (businessName ? `• *Business Name:* ${businessName}\n` : '') +
    `• *Selected Equipment:*\n${selectedNames.map(n => `  - ${n}`).join('\n')}\n` +
    (discount > 0 ? `• *Bundle Discount:* -R ${discount.toLocaleString('en-ZA')}\n` : '') +
    `• *Estimated Total:* R ${finalTotal.toLocaleString('en-ZA')}\n` +
    `• *Included Software Features:* Sales Reporting, Smart Stock Control, Debtor/Creditor, Role Access, Mobile Daily Summary App, Full Device Compatibility.\n` +
    `Hi Umarfaruk, please confirm quotation, delivery & installation for Tzaneen.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const getOptionIcon = (icon: string) => {
    switch (icon) {
      case 'monitor': return <Monitor className="w-4 h-4 text-[#00d4ff]" />;
      case 'printer': return <Printer className="w-4 h-4 text-[#00d4ff]" />;
      case 'drawer': return <CreditCard className="w-4 h-4 text-[#00d4ff]" />;
      case 'scanner': return <Barcode className="w-4 h-4 text-[#00d4ff]" />;
      case 'software': return <FileSpreadsheet className="w-4 h-4 text-[#00d4ff]" />;
      default: return <CheckCircle2 className="w-4 h-4 text-[#00d4ff]" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0a2540]/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      id="pos-quote-modal-overlay"
    >
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#e6ebf1] overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
        id="pos-quote-modal-content"
      >
        {/* Header */}
        <div className="bg-[#0a2540] text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-[#00d4ff] px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1.5">
              <Calculator className="w-3 h-3" />
              <span>Instant POS System Estimator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Get POS Quote
            </h3>
            <p className="text-xs sm:text-sm text-[#c1c9d2] mt-0.5">
              Customize your point-of-sale hardware &amp; software package for retail or hospitality.
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#f7f9fc]">
          {/* Business Type & Name */}
          <div className="bg-white p-4 rounded-xl border border-[#e6ebf1] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1.5">
                  Business Industry
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1a1f36] font-medium focus:outline-none focus:border-[#00d4ff]"
                >
                  <option value="Supermarket / Spaza Shop">Supermarket / Spaza Shop</option>
                  <option value="Retail Clothing & Boutique">Retail Clothing &amp; Boutique</option>
                  <option value="Butchery / Fresh Produce">Butchery / Fresh Produce</option>
                  <option value="Restaurant, Cafe & Fast Food">Restaurant, Cafe &amp; Fast Food</option>
                  <option value="Liquor Store / Bar">Liquor Store / Bar</option>
                  <option value="Hardware & Agro Supply">Hardware &amp; Agro Supply</option>
                  <option value="Pharmacy / General Store">Pharmacy / General Store</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a1f36] uppercase tracking-wider mb-1.5">
                  Business / Store Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tzaneen Superette"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1a1f36] focus:outline-none focus:border-[#00d4ff]"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-[#697386]">Quick Presets:</span>
              <button
                type="button"
                onClick={selectAll}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-[#0a2540] hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
              >
                Complete Complete Setup (Recommended)
              </button>
              <button
                type="button"
                onClick={selectStarter}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-[#697386] hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              >
                Essential Starter Pack
              </button>
            </div>
          </div>

          {/* Hardware & Software Component Checkboxes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#1a1f36] uppercase tracking-wider">
                Select POS Hardware &amp; Services
              </label>
              <span className="text-xs text-[#697386]">
                {selectedItems.length} of {POS_OPTIONS.length} components selected
              </span>
            </div>

            <div className="space-y-2">
              {POS_OPTIONS.map((opt) => {
                const isChecked = selectedItems.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleItem(opt.id)}
                    className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked 
                        ? 'bg-white border-[#00d4ff] shadow-xs ring-1 ring-[#00d4ff]/20' 
                        : 'bg-white/80 border-[#e6ebf1] hover:border-slate-300 opacity-75'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        isChecked ? 'bg-[#0a2540] text-white' : 'border border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        {getOptionIcon(opt.icon)}
                      </div>

                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-[#1a1f36]">
                          {opt.name}
                        </div>
                        <div className="text-[11px] text-[#697386] leading-relaxed">
                          {opt.desc}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-bold text-xs sm:text-sm text-[#0a2540]">
                        R {opt.price.toLocaleString('en-ZA')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6 Core Keypoints Banner */}
          <div className="bg-white p-4 rounded-xl border border-[#e6ebf1] space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0a2540] uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span>Included with POS Software (6 Core Features):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#697386]">
              {POS_KEYPOINTS.map((kp) => (
                <div key={kp.number} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#1a1f36]">{kp.number}. {kp.title}:</strong> {kp.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary Card */}
          <div className="bg-[#0a2540] text-white p-4 sm:p-5 rounded-xl flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs text-[#c1c9d2]">
                Estimated POS Package Price
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  R {finalTotal.toLocaleString('en-ZA')}
                </span>
                {discount > 0 && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-semibold">
                    Includes R{discount} Bundle Discount
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#a3acb9] mt-0.5">
                Local stock in Tzaneen. Quick on-site deployment available.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a2540] bg-white hover:bg-slate-100 px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#0a2540]" />}
                <span>{copied ? 'Copied!' : 'Copy Quote'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#e6ebf1] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#697386]">
            Manager: <strong className="text-[#1a1f36]">{WORKSHOP_DETAILS.manager}</strong> ({WORKSHOP_DETAILS.phoneDisplay})
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial text-xs font-semibold text-[#697386] hover:text-[#1a1f36] px-4 py-2.5 rounded-lg border border-[#e6ebf1] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>

            <a
              href={getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-2.5 px-6 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer shadow-none"
              id="pos-quote-send-wa"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Send POS Quote on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
