import React, { useState } from 'react';
import { 
  Laptop, 
  Monitor, 
  Video, 
  CreditCard, 
  Cpu, 
  Search, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Tag, 
  Phone, 
  ShoppingBag, 
  ArrowRight,
  SlidersHorizontal,
  Wrench,
  Clock,
  Zap
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { STOCK_ITEMS, COMPUTER_REPAIR_PRICING, RepairServicePrice } from '../data/stockData';
import { StockItem } from '../types';
import { WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';

interface StockSectionProps {
  onOpenInquire?: (item: StockItem) => void;
  onOpenPOSQuote?: () => void;
}

export const StockSection: React.FC<StockSectionProps> = ({ 
  onOpenInquire,
  onOpenPOSQuote 
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'repairs'>('inventory');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [priceRange, setPriceRange] = useState<'all' | 'under-3000' | '3000-5000' | 'above-5000'>('all');

  const categories = [
    { id: 'all', label: 'All Inventory', count: STOCK_ITEMS.length },
    { id: 'laptop', label: 'Laptops', count: STOCK_ITEMS.filter(i => i.category === 'laptop').length },
    { id: 'desktop', label: 'Desktop PCs', count: STOCK_ITEMS.filter(i => i.category === 'desktop').length },
    { id: 'pos', label: 'POS Hardware', count: STOCK_ITEMS.filter(i => i.category === 'pos').length },
    { id: 'cctv', label: 'CCTV Kits', count: STOCK_ITEMS.filter(i => i.category === 'cctv').length },
    { id: 'accessory', label: 'Upgrades & Parts', count: STOCK_ITEMS.filter(i => i.category === 'accessory').length }
  ];

  const filteredItems = STOCK_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specs.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.highlight && item.highlight.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesPrice = true;
    if (priceRange === 'under-3000') matchesPrice = item.priceZAR < 3000;
    else if (priceRange === '3000-5000') matchesPrice = item.priceZAR >= 3000 && item.priceZAR <= 5000;
    else if (priceRange === 'above-5000') matchesPrice = item.priceZAR > 5000;

    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceZAR - b.priceZAR;
    if (sortBy === 'price-desc') return b.priceZAR - a.priceZAR;
    return 0;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'laptop': return <Laptop className="w-3.5 h-3.5" />;
      case 'desktop': return <Monitor className="w-3.5 h-3.5" />;
      case 'pos': return <CreditCard className="w-3.5 h-3.5" />;
      case 'cctv': return <Video className="w-3.5 h-3.5" />;
      default: return <Cpu className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="stock" className="py-12 sm:py-16 px-6 sm:px-12 bg-white border-t border-[#e6ebf1]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0a2540] border border-blue-100 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-2">
              <ShoppingBag className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span>Arbor Park Workshop • Live Hardware Stock &amp; Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a2540]">
              Computers, Laptops &amp; Hardware Prices
            </h2>
            <p className="text-[#697386] text-sm sm:text-base mt-1 max-w-2xl">
              Transparent South African Rand (ZAR) prices for certified business laptops, desktop PC towers, upgrades, and fixed repair costs in Tzaneen.
            </p>
          </div>

          {/* Quick Price Guide Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#f7f9fc] border border-[#e6ebf1] text-center">
              <span className="text-[#697386] block text-[10px] uppercase font-semibold">Laptops</span>
              <span className="font-bold text-[#0a2540] text-sm">From R 3,699</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f7f9fc] border border-[#e6ebf1] text-center">
              <span className="text-[#697386] block text-[10px] uppercase font-semibold">Desktop PCs</span>
              <span className="font-bold text-[#0a2540] text-sm">From R 2,499</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f7f9fc] border border-[#e6ebf1] text-center">
              <span className="text-[#697386] block text-[10px] uppercase font-semibold">Full PC Bundle</span>
              <span className="font-bold text-[#0a2540] text-sm">Only R 3,899</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-center">
              <span className="text-emerald-700 block text-[10px] uppercase font-semibold">Diagnostics</span>
              <span className="font-bold text-emerald-800 text-sm">R 150 / Free</span>
            </div>
          </div>
        </div>

        {/* Top View Selector: Hardware For Sale vs Repair Price Guide */}
        <div className="flex items-center gap-3 p-1.5 bg-[#f7f9fc] rounded-xl border border-[#e6ebf1] mb-6 max-w-md">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#0a2540] text-white shadow-xs'
                : 'text-[#697386] hover:text-[#0a2540]'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Devices For Sale ({STOCK_ITEMS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('repairs')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'repairs'
                ? 'bg-[#0a2540] text-white shadow-xs'
                : 'text-[#697386] hover:text-[#0a2540]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Repair &amp; Service Rates ({COMPUTER_REPAIR_PRICING.length})</span>
          </button>
        </div>

        {activeTab === 'inventory' ? (
          <>
            {/* Filter Toolbar: Search, Categories & Price Filter */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                          isActive
                            ? 'bg-[#0a2540] text-white border-[#0a2540]'
                            : 'bg-[#f7f9fc] text-[#697386] border-[#e6ebf1] hover:text-[#1a1f36] hover:bg-slate-100'
                        }`}
                      >
                        {cat.id !== 'all' && getCategoryIcon(cat.id)}
                        <span>{cat.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Search Input */}
                <div className="w-full md:w-64 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search Dell, HP, Core i5..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg text-xs sm:text-sm text-[#1a1f36] placeholder:text-slate-400 focus:outline-none focus:border-[#00d4ff]"
                  />
                </div>
              </div>

              {/* Secondary Filter Row: Price Ranges & Sort */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-[#e6ebf1]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[#697386] font-semibold flex items-center gap-1 mr-1">
                    <Tag className="w-3.5 h-3.5 text-[#0a2540]" />
                    <span>Price Range:</span>
                  </span>
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-3000', label: 'Under R 3,000' },
                    { id: '3000-5000', label: 'R 3,000 – R 5,000' },
                    { id: 'above-5000', label: 'R 5,000+' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriceRange(p.id as any)}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer text-xs ${
                        priceRange === p.id
                          ? 'bg-[#0a2540] text-white'
                          : 'bg-[#f7f9fc] text-[#697386] hover:bg-slate-200 border border-[#e6ebf1]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-[#697386] font-semibold">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#f7f9fc] border border-[#e6ebf1] text-[#1a1f36] rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#00d4ff]"
                  >
                    <option value="featured">Featured Order</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Stock Items Grid */}
            {filteredItems.length === 0 ? (
              <div className="p-12 text-center bg-[#f7f9fc] rounded-xl border border-dashed border-[#e6ebf1]">
                <p className="text-[#697386] text-sm">No items found matching your filter or search.</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); setPriceRange('all'); }}
                  className="mt-3 text-xs font-bold text-[#00d4ff] hover:underline cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  const savings = item.originalPriceZAR ? item.originalPriceZAR - item.priceZAR : 0;
                  const itemWaMessage = 
                    `Hi Umarfaruk, I am interested in buying the *${item.name}* (Price: R ${item.priceZAR.toLocaleString('en-ZA')}) from your NovaTech inventory. Is it available for collection at Arbor Park?`;

                  return (
                    <div
                      key={item.id}
                      id={`stock-item-${item.id}`}
                      className="bg-[#f7f9fc] rounded-xl border border-[#e6ebf1] p-5 hover:border-[#00d4ff] transition-all flex flex-col justify-between shadow-xs hover:shadow-md group"
                    >
                      <div>
                        {/* Top Row: Condition Badge + Highlight */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                            item.condition === 'Brand New'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {item.condition}
                          </span>

                          {item.highlight && (
                            <span className="text-[10px] font-semibold text-[#0a2540] bg-white px-2 py-0.5 rounded-md border border-[#e6ebf1]">
                              {item.highlight}
                            </span>
                          )}
                        </div>

                        {/* Item Name */}
                        <h3 className="font-bold text-base text-[#1a1f36] group-hover:text-[#00d4ff] transition-colors leading-snug mb-2">
                          {item.name}
                        </h3>

                        {/* Price in ZAR with Savings Badge */}
                        <div className="mb-3.5 p-2.5 rounded-lg bg-white border border-[#e6ebf1]">
                          <div className="flex items-baseline justify-between gap-2">
                            <div>
                              {item.originalPriceZAR && (
                                <div className="text-xs text-slate-400 line-through">
                                  Retail: R {item.originalPriceZAR.toLocaleString('en-ZA')}
                                </div>
                              )}
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-extrabold text-[#0a2540]">
                                  R {item.priceZAR.toLocaleString('en-ZA')}
                                </span>
                                <span className="text-xs font-semibold text-[#697386]">ZAR</span>
                              </div>
                            </div>

                            {savings > 0 && (
                              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
                                Save R {savings.toLocaleString('en-ZA')}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bullet Specs */}
                        <div className="space-y-1.5 mb-4 text-xs text-[#697386]">
                          {item.specs.map((spec, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#00d4ff] shrink-0 mt-0.5" />
                              <span className="leading-tight">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer of Card */}
                      <div className="pt-3.5 border-t border-[#e6ebf1] space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] text-[#697386]">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{item.warranty}</span>
                          </span>
                          <span className="font-semibold text-emerald-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            In Stock
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.category === 'pos' && onOpenPOSQuote ? (
                            <button
                              type="button"
                              onClick={onOpenPOSQuote}
                              className="flex-1 text-xs font-semibold py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-[#0a2540] border border-[#e6ebf1] transition-colors cursor-pointer text-center"
                            >
                              POS Configurator
                            </button>
                          ) : null}

                          <a
                            href={getWhatsAppUrl(itemWaMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-2.5 px-3 rounded-lg text-xs transition-colors cursor-pointer shadow-none text-center"
                            id={`btn-wa-stock-${item.id}`}
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
                            <span>Inquire / Buy Now</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* Repair & Service Rates Tab */
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0a2540] flex items-center justify-center shrink-0">
                  <Wrench className="w-4 h-4 text-[#00d4ff]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0a2540]">Workshop Transparent Repair Rates</h4>
                  <p className="text-xs text-[#697386]">No hidden charges. Diagnostics are 100% free if you proceed with repair at Arbor Park.</p>
                </div>
              </div>
              <a
                href={`tel:${WORKSHOP_DETAILS.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a2540] bg-white px-3.5 py-2 rounded-lg border border-blue-200 hover:bg-slate-50 transition-colors shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>Call Umarfaruk</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMPUTER_REPAIR_PRICING.map((repair) => {
                const repairWaMsg = `Hi Umarfaruk, I need a repair service for *${repair.service}* (Quoted: R ${repair.priceZAR}). When can I bring my device to Arbor Park?`;

                return (
                  <div
                    key={repair.id}
                    className="bg-[#f7f9fc] rounded-xl border border-[#e6ebf1] p-4 sm:p-5 flex flex-col justify-between hover:border-[#00d4ff] transition-all shadow-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-bold text-sm sm:text-base text-[#1a1f36]">
                          {repair.service}
                        </h4>
                        <div className="text-right shrink-0">
                          <div className="text-lg sm:text-xl font-extrabold text-[#0a2540]">
                            R {repair.priceZAR}
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold block">
                            {repair.priceNote}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#697386] mb-3 leading-relaxed">
                        {repair.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#e6ebf1] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1 text-[11px] text-[#697386]">
                        <Clock className="w-3.5 h-3.5 text-[#00d4ff]" />
                        <span>Turnaround: <strong className="text-[#1a1f36]">{repair.turnaround}</strong></span>
                      </div>

                      <a
                        href={getWhatsAppUrl(repairWaMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-[#25d366] hover:bg-[#128c7e] text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors"
                      >
                        <WhatsAppIcon className="w-3 h-3 text-white" />
                        <span>Book Fix</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-10 p-5 rounded-xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-[#0a2540] text-center sm:text-left">
            <span className="font-bold">Looking for a specific model, gaming laptop, or bulk corporate desktop quotation?</span>
            <p className="text-[#697386] text-xs mt-0.5">We source and prepare custom orders with verified battery health within 24–48 hours for Tzaneen businesses and individuals.</p>
          </div>

          <a
            href={getWhatsAppUrl('Hi Umarfaruk, I am looking for a specific computer/laptop specification and quote not listed on your page.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a2540] hover:text-[#00d4ff] bg-white px-4 py-2.5 rounded-lg border border-blue-200 transition-colors shrink-0 shadow-xs"
          >
            <span>Request Custom Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
