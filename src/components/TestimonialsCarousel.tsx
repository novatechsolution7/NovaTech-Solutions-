import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  MessageSquare, 
  ThumbsUp, 
  Sparkles,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import { CLIENT_TESTIMONIALS, TESTIMONIAL_STATS } from '../data/testimonialsData';
import { Testimonial } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getWhatsAppUrl } from '../data/workshopData';

export const TestimonialsCarousel: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Reviews', count: CLIENT_TESTIMONIALS.length },
    { id: 'repairs', label: 'PC & Laptop Repairs', count: CLIENT_TESTIMONIALS.filter(t => t.serviceCategory === 'repairs').length },
    { id: 'pos', label: 'POS Systems', count: CLIENT_TESTIMONIALS.filter(t => t.serviceCategory === 'pos').length },
    { id: 'cctv', label: 'CCTV Security', count: CLIENT_TESTIMONIALS.filter(t => t.serviceCategory === 'cctv').length },
    { id: 'hardware', label: 'Hardware Sales', count: CLIENT_TESTIMONIALS.filter(t => t.serviceCategory === 'hardware').length },
    { id: 'digital', label: 'Data & Networking', count: CLIENT_TESTIMONIALS.filter(t => t.serviceCategory === 'digital').length }
  ];

  const filteredTestimonials = activeCategory === 'all'
    ? CLIENT_TESTIMONIALS
    : CLIENT_TESTIMONIALS.filter(t => t.serviceCategory === activeCategory);

  // Scroll carousel to a specific card index
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>('[data-testimonial-card]');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
      setCurrentIndex(index);
    }
  }, []);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % filteredTestimonials.length;
    scrollToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + filteredTestimonials.length) % filteredTestimonials.length;
    scrollToIndex(prevIdx);
  };

  // Sync currentIndex on manual user drag/scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>('[data-testimonial-card]');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    if (closestIdx !== currentIndex && closestIdx < filteredTestimonials.length) {
      setCurrentIndex(closestIdx);
    }
  };

  // Autoplay effect with pause on hover
  useEffect(() => {
    if (!isAutoPlay || filteredTestimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % filteredTestimonials.length;
        scrollToIndex(next);
        return next;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlay, filteredTestimonials.length, scrollToIndex]);

  // Reset index when category filter changes
  useEffect(() => {
    setCurrentIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <section 
      id="client-testimonials" 
      className="py-12 sm:py-16 px-6 sm:px-12 bg-white border-t border-[#e6ebf1] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0a2540] border border-blue-100 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span>Verified Client Experiences • Tzaneen &amp; Mopani District</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a2540]">
              What Our Clients Say
            </h2>
            <p className="text-[#697386] text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
              Real feedback from local supermarket owners, citrus farms, schools, and professionals who rely on NovaTech Solutions for dependable repairs, POS systems, and IT hardware.
            </p>
          </div>

          {/* Social Proof Stats Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f7f9fc] border border-[#e6ebf1]">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-extrabold text-[#0a2540]">
                {TESTIMONIAL_STATS.averageRating}
              </span>
              <span className="text-[11px] text-[#697386]">({TESTIMONIAL_STATS.totalVerifiedReviews} Reviews)</span>
            </div>

            <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{TESTIMONIAL_STATS.satisfactionRate} Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Carousel Filter Pills & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`filter-testimonial-${cat.id}`}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                    isActive
                      ? 'bg-[#0a2540] text-white border-[#0a2540]'
                      : 'bg-[#f7f9fc] text-[#697386] border-[#e6ebf1] hover:text-[#1a1f36] hover:bg-slate-100'
                  }`}
                >
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

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-[#697386] font-medium mr-1">
              {currentIndex + 1} of {filteredTestimonials.length}
            </span>
            <button
              type="button"
              id="btn-prev-testimonial"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-8 h-8 rounded-lg bg-[#f7f9fc] hover:bg-slate-200 border border-[#e6ebf1] flex items-center justify-center text-[#0a2540] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="btn-next-testimonial"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-8 h-8 rounded-lg bg-[#f7f9fc] hover:bg-slate-200 border border-[#e6ebf1] flex items-center justify-center text-[#0a2540] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1 -mx-1"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredTestimonials.map((item, idx) => {
              const isSelected = idx === currentIndex;

              return (
                <div
                  key={item.id}
                  data-testimonial-card
                  id={`testimonial-card-${item.id}`}
                  className={`snap-center shrink-0 w-full sm:w-[380px] md:w-[420px] bg-[#f7f9fc] rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 relative select-none ${
                    isSelected 
                      ? 'border-[#00d4ff] shadow-md bg-white' 
                      : 'border-[#e6ebf1] hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Top Row: Rating Stars + Verified Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Verified Client</span>
                      </div>
                    </div>

                    {/* Service Used Badge */}
                    <div className="mb-3.5">
                      <span className="inline-block text-[11px] font-bold text-[#0a2540] bg-blue-50/90 border border-blue-100/80 px-2.5 py-1 rounded-md">
                        {item.serviceUsed}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <div className="relative mb-6">
                      <Quote className="w-7 h-7 text-slate-200 absolute -top-2.5 -left-1 opacity-60 -z-0 pointer-events-none" />
                      <p className="text-sm text-[#1a1f36] leading-relaxed relative z-10 italic">
                        "{item.feedback}"
                      </p>
                    </div>
                  </div>

                  {/* Client Details Footer */}
                  <div className="pt-4 border-t border-[#e6ebf1] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar Initials Circle */}
                      <div className="w-10 h-10 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-[#00d4ff]/30">
                        {item.avatarInitials}
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-[#1a1f36] truncate leading-tight">
                          {item.name}
                        </h4>
                        <div className="text-[11px] text-[#697386] truncate">
                          {item.role} • <span className="font-medium text-[#0a2540]">{item.businessType}</span>
                        </div>
                        <div className="text-[10px] text-[#8898aa] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5 text-[#00d4ff]" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 shrink-0 text-right font-medium">
                      {item.date}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {filteredTestimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                id={`dot-testimonial-${idx}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-6 bg-[#0a2540]' 
                    : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Callout: Leave Feedback or Request Service */}
        <div className="mt-8 p-5 rounded-2xl bg-[#f7f9fc] border border-[#e6ebf1] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 hidden sm:flex">
              <MessageSquare className="w-5 h-5 text-[#0a2540]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0a2540]">
                Have you received service from NovaTech in Arbor Park?
              </h4>
              <p className="text-xs text-[#697386] mt-0.5">
                We value your local feedback. Message Umarfaruk to share your review or ask for technical assistance.
              </p>
            </div>
          </div>

          <a
            href={getWhatsAppUrl('Hi Umarfaruk, I would like to leave feedback on the technical service provided by NovaTech Solutions.')}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-leave-review-wa"
            className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Leave a Client Review</span>
          </a>
        </div>
      </div>
    </section>
  );
};
