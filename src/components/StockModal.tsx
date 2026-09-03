import React, { useState } from 'react';
import { 
  X, 
  Search, 
  ShoppingBag, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Laptop, 
  Monitor, 
  Video, 
  CreditCard, 
  Cpu 
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { STOCK_ITEMS } from '../data/stockData';
import { WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';

interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const StockModal: React.FC<StockModalProps> = ({ 
  isOpen, 
  onClose,
  initialCategory = 'all'
}) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'laptop', label: 'Laptops' },
    { id: 'desktop', label: 'Desktops' },
    { id: 'pos', label: 'POS Hardware' },
    { id: 'cctv', label: 'CCTV Kits' },
    { id: 'accessory', label: 'Parts & Upgrades' }
  ];

  const filteredItems = STOCK_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specs.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0a2540]/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      id="stock-modal-overlay"
    >
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#e6ebf1] overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
        id="stock-modal-content"
      >
        {/* Header */}
        <div className="bg-[#0a2540] text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-[#00d4ff] px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1.5">
              <ShoppingBag className="w-3 h-3" />
              <span>Arbor Park Workshop Inventory</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Hardware Stock Catalog
            </h3>
            <p className="text-xs sm:text-sm text-[#c1c9d2] mt-0.5">
              Available today for immediate collection or same-day Tzaneen delivery.
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

        {/* Filter Toolbar */}
        <div className="p-4 bg-[#f7f9fc] border-b border-[#e6ebf1] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-[#0a2540] text-white border-[#0a2540]'
                    : 'bg-white text-[#697386] border-[#e6ebf1] hover:text-[#1a1f36]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stock..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#e6ebf1] rounded-lg text-xs text-[#1a1f36] placeholder:text-slate-400 focus:outline-none focus:border-[#00d4ff]"
            />
          </div>
        </div>

        {/* Inventory List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 bg-[#f7f9fc]">
          {filteredItems.map((item) => {
            const itemWaMessage = 
              `Hi Umarfaruk, I want to inquire about the *${item.name}* (Price: R ${item.priceZAR.toLocaleString('en-ZA')}) from your stock catalog.`;

            return (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-[#e6ebf1] hover:border-[#00d4ff] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      item.condition === 'Brand New'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {item.condition}
                    </span>
                    {item.highlight && (
                      <span className="text-[10px] font-semibold text-[#0a2540] bg-[#f7f9fc] px-2 py-0.5 rounded border border-[#e6ebf1]">
                        {item.highlight}
                      </span>
                    )}
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      In Stock
                    </span>
                  </div>

                  <h4 className="font-bold text-sm sm:text-base text-[#1a1f36]">
                    {item.name}
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#697386]">
                    {item.specs.map((spec, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#00d4ff]" />
                        <span>{spec}</span>
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#697386] flex items-center gap-1 pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.warranty}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#e6ebf1]">
                  <div className="text-left sm:text-right">
                    {item.originalPriceZAR && (
                      <div className="text-xs text-slate-400 line-through">
                        R {item.originalPriceZAR.toLocaleString('en-ZA')}
                      </div>
                    )}
                    <div className="text-lg font-bold text-[#0a2540]">
                      R {item.priceZAR.toLocaleString('en-ZA')}
                    </div>
                    {item.originalPriceZAR && item.originalPriceZAR > item.priceZAR && (
                      <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                        Save R {(item.originalPriceZAR - item.priceZAR).toLocaleString('en-ZA')}
                      </div>
                    )}
                    <div className="text-[10px] text-[#697386]">Incl. Workshop Testing</div>
                  </div>

                  <a
                    href={getWhatsAppUrl(itemWaMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-2 px-3.5 rounded-lg text-xs transition-colors cursor-pointer shadow-none"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#e6ebf1] flex items-center justify-between text-xs text-[#697386]">
          <div>
            Workshop Walk-in: <strong>{WORKSHOP_DETAILS.street}, {WORKSHOP_DETAILS.suburb}, Tzaneen</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-semibold text-[#0a2540] hover:underline cursor-pointer"
          >
            Close Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
