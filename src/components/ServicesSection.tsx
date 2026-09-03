import React, { useState } from 'react';
import { 
  Wrench, 
  Store, 
  Video, 
  Laptop, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ExternalLink,
  Search,
  Sparkles,
  Layers,
  Tag
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SERVICES, getWhatsAppUrl } from '../data/workshopData';
import { ServiceItem } from '../types';
import { POSKeypointsModal } from './POSKeypointsModal';

interface ServicesSectionProps {
  onSelectServiceForQuote?: (service: ServiceItem) => void;
  onOpenInquire?: (serviceName?: string) => void;
  onOpenPOSQuote?: () => void;
  onOpenBookService?: (serviceName?: string) => void;
  onOpenStock?: (category?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectServiceForQuote,
  onOpenInquire,
  onOpenPOSQuote,
  onOpenBookService,
  onOpenStock
}) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isPOSModalOpen, setIsPOSModalOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const handleServiceAction = (service: ServiceItem) => {
    if (service.id === 'computer-repairing') {
      onOpenInquire ? onOpenInquire(service.title) : window.open(getWhatsAppUrl(service.whatsappMessage), '_blank');
    } else if (service.id === 'pos-reselling') {
      onOpenPOSQuote ? onOpenPOSQuote() : window.open(getWhatsAppUrl(service.whatsappMessage), '_blank');
    } else if (service.id === 'cctv-maintenance') {
      onOpenBookService ? onOpenBookService(service.title) : window.open(getWhatsAppUrl(service.whatsappMessage), '_blank');
    } else if (service.id === 'hardware-reselling') {
      onOpenStock ? onOpenStock('laptop') : window.open(getWhatsAppUrl(service.whatsappMessage), '_blank');
    } else {
      onOpenInquire ? onOpenInquire(service.title) : window.open(getWhatsAppUrl(service.whatsappMessage), '_blank');
    }
  };

  const filteredServices = SERVICES.filter(service => {
    if (!searchFilter) return true;
    const query = searchFilter.toLowerCase();
    return (
      service.title.toLowerCase().includes(query) ||
      service.shortDesc.toLowerCase().includes(query) ||
      service.popularFor.toLowerCase().includes(query) ||
      service.benefits.some(b => b.toLowerCase().includes(query))
    );
  });

  const getServiceIcon = (iconName: ServiceItem['iconName']) => {
    switch (iconName) {
      case 'tools':
        return <Wrench className="w-6 h-6 text-[#00d4ff]" />;
      case 'cash-register':
        return <Store className="w-6 h-6 text-[#00d4ff]" />;
      case 'video':
        return <Video className="w-6 h-6 text-[#00d4ff]" />;
      case 'laptop':
        return <Laptop className="w-6 h-6 text-[#00d4ff]" />;
      case 'globe':
        return <Globe className="w-6 h-6 text-[#00d4ff]" />;
    }
  };

  return (
    <section id="services" className="relative z-20 -mt-8 max-w-7xl mx-auto px-6 sm:px-12 pb-14">
      {/* Search and filter bar */}
      <div className="bg-white rounded-xl shadow-xs border border-[#e6ebf1] p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-[#1a1f36] font-semibold text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00d4ff]" />
          <span>Specialized Tech Services in Tzaneen</span>
          <span className="text-xs bg-[#f7f9fc] text-[#697386] border border-[#e6ebf1] px-2.5 py-0.5 rounded-full font-medium">
            {SERVICES.length} Categories
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#a3acb9] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search repairs, CCTV, laptops..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg text-[#1a1f36] focus:outline-none focus:border-[#00d4ff] transition-colors placeholder:text-[#a3acb9]"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#697386] hover:text-[#1a1f36]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Clean Minimalism Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const isExpanded = expandedCardId === service.id;
          const directWhatsAppUrl = getWhatsAppUrl(service.whatsappMessage);
          const isPOS = service.id === 'pos-reselling';

          return (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className={`bg-white p-6 rounded-xl shadow-xs border transition-all flex flex-col justify-between ${
                isPOS 
                  ? 'border-[#00d4ff]/60 hover:border-[#00d4ff] ring-1 ring-[#00d4ff]/20' 
                  : 'border-[#e6ebf1] hover:border-[#00d4ff]'
              }`}
            >
              <div>
                {/* Header row with Icon and POS Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {isPOS && (
                    <button
                      type="button"
                      onClick={() => setIsPOSModalOpen(true)}
                      className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-[#0a2540] text-xs font-bold py-1 px-2.5 rounded-full border border-blue-200 transition-colors cursor-pointer"
                      title="Click to view 6 Key Points"
                    >
                      <Sparkles className="w-3 h-3 text-[#00d4ff]" />
                      <span>6 Key Features</span>
                    </button>
                  )}
                </div>

                {/* Tag */}
                <div className="text-[11px] font-semibold text-[#697386] uppercase tracking-wider mb-1.5">
                  {service.popularFor}
                </div>

                {/* Title */}
                <h3 
                  onClick={() => isPOS ? setIsPOSModalOpen(true) : toggleExpand(service.id)}
                  className={`font-bold text-lg text-[#1a1f36] mb-2 ${isPOS ? 'cursor-pointer hover:text-[#00d4ff] flex items-center justify-between' : ''}`}
                >
                  <span>{service.title}</span>
                  {isPOS && (
                    <span className="text-xs text-[#0a2540] font-normal underline decoration-[#00d4ff] ml-2">
                      (Click for Key Points)
                    </span>
                  )}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#697386] leading-relaxed mb-3">
                  {service.shortDesc}
                </p>

                {/* Service Indicative Price Badge */}
                {service.priceBadge && (
                  <div className="mb-3.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f7f9fc] border border-[#e6ebf1] text-xs font-semibold text-[#0a2540]">
                    <Tag className="w-3.5 h-3.5 text-[#00d4ff] shrink-0" />
                    <span className="truncate">{service.priceBadge}</span>
                  </div>
                )}

                {/* Dedicated Interactive Button for POS Key Points */}
                {isPOS && (
                  <button
                    type="button"
                    onClick={() => setIsPOSModalOpen(true)}
                    className="w-full mb-4 flex items-center justify-between p-2.5 rounded-lg bg-blue-50/90 border border-blue-200 text-xs font-semibold text-[#0a2540] hover:bg-blue-100 transition-colors cursor-pointer text-left"
                    id="pos-keypoints-badge-btn"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#00d4ff] shrink-0" />
                      <span>View 6 Core POS Key Points</span>
                    </span>
                    <span className="text-[11px] font-bold text-[#0a2540] bg-white px-2 py-0.5 rounded-md border border-blue-200">
                      Open &rarr;
                    </span>
                  </button>
                )}

                {/* Expandable details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#e6ebf1] text-xs text-[#697386] space-y-2.5">
                    <p className="leading-relaxed">{service.fullDesc}</p>

                    {/* POS Keypoints List if present */}
                    {service.posKeypoints && (
                      <div className="mt-3 pt-3 border-t border-[#e6ebf1]">
                        <div className="flex items-center justify-between mb-2.5">
                          <p className="font-bold text-[#1a1f36] text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" />
                            <span>6 Core Key Points:</span>
                          </p>
                          <button
                            type="button"
                            onClick={() => setIsPOSModalOpen(true)}
                            className="text-[11px] font-semibold text-[#0a2540] hover:text-[#00d4ff] underline cursor-pointer"
                          >
                            Modal View
                          </button>
                        </div>

                        <div className="space-y-2">
                          {service.posKeypoints.map((kp) => (
                            <div 
                              key={kp.number}
                              className="p-2.5 rounded-lg bg-[#f7f9fc] border border-[#e6ebf1] flex items-start gap-2.5 hover:border-[#00d4ff]/60 transition-colors"
                            >
                              <span className="w-5 h-5 rounded-full bg-[#0a2540] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {kp.number}
                              </span>
                              <div className="min-w-0">
                                <div className="font-bold text-xs text-[#1a1f36] leading-tight">
                                  {kp.title}
                                </div>
                                <div className="text-[11px] text-[#697386] leading-snug mt-0.5">
                                  {kp.description}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5 pt-2">
                      <p className="font-semibold text-[#1a1f36] text-[11px] uppercase tracking-wide">
                        What we provide:
                      </p>
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#25d366] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-[#e6ebf1] flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleServiceAction(service)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0a2540] hover:bg-[#1a3a60] text-white font-bold py-2.5 px-4 rounded-lg text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
                    id={`btn-action-${service.id}`}
                  >
                    <span>{service.actionLabel}</span>
                  </button>

                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Direct WhatsApp"
                    className="inline-flex items-center justify-center bg-[#25d366] hover:bg-[#128c7e] text-white p-2.5 rounded-lg transition-colors cursor-pointer shadow-xs shrink-0"
                    id={`btn-wa-${service.id}`}
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs text-[#697386] pt-1">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="inline-flex items-center gap-1 text-[#697386] hover:text-[#0a2540] font-semibold py-1 px-2 rounded-md hover:bg-[#f7f9fc] transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <span>Less info</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Details &amp; scope</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {onSelectServiceForQuote && (
                    <button
                      onClick={() => onSelectServiceForQuote(service)}
                      className="text-[#0a2540] hover:text-[#00d4ff] font-semibold hover:underline flex items-center gap-1 transition-colors"
                    >
                      <span>Custom inquiry</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-xs border border-[#e6ebf1] p-8">
          <p className="text-[#697386] text-sm mb-2">No services found matching "{searchFilter}".</p>
          <button
            onClick={() => setSearchFilter('')}
            className="text-sm font-semibold text-[#0a2540] hover:text-[#00d4ff] underline"
          >
            Show all available services
          </button>
        </div>
      )}

      {/* POS Keypoints Spotlight Modal */}
      <POSKeypointsModal 
        isOpen={isPOSModalOpen} 
        onClose={() => setIsPOSModalOpen(false)} 
        onSelectForQuote={
          onSelectServiceForQuote 
            ? () => onSelectServiceForQuote(SERVICES.find(s => s.id === 'pos-reselling')!) 
            : undefined
        } 
      />
    </section>
  );
};
