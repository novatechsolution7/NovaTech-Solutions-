import React, { useState } from 'react';
import { Send, Check, Copy, MessageSquareCode, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SERVICES, WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';

interface QuickQuoteBuilderProps {
  initialServiceId?: string;
}

export const QuickQuoteBuilder: React.FC<QuickQuoteBuilderProps> = ({ initialServiceId }) => {
  const [selectedService, setSelectedService] = useState<string>(initialServiceId || SERVICES[0].id);
  const [customerName, setCustomerName] = useState<string>('');
  const [deviceModel, setDeviceModel] = useState<string>('');
  const [issueDetails, setIssueDetails] = useState<string>('');
  const [urgency, setUrgency] = useState<string>('Normal');
  const [copied, setCopied] = useState<boolean>(false);

  const currentServiceObj = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  const buildMessage = () => {
    let msg = `Hello Umarfaruk, I am contacting NovaTech Solutions.\n\n`;
    msg += `Service Needed: ${currentServiceObj.title}\n`;
    if (customerName.trim()) msg += `My Name: ${customerName.trim()}\n`;
    if (deviceModel.trim()) msg += `Device / Brand: ${deviceModel.trim()}\n`;
    if (issueDetails.trim()) msg += `Details / Problem: ${issueDetails.trim()}\n`;
    msg += `Urgency: ${urgency}\n`;
    msg += `Location: Tzaneen / Limpopo area\n\n`;
    msg += `Could you please provide an estimate or let me know when I can bring it to the Arbor Park workshop?`;
    return msg;
  };

  const formattedMsg = buildMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    window.open(getWhatsAppUrl(formattedMsg), '_blank');
  };

  return (
    <section id="quote-builder" className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
      <div className="bg-white rounded-xl shadow-xs border border-[#e6ebf1] p-6 sm:p-10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left column: Form */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold text-[#0a2540] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>Fast WhatsApp Estimate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a2540] mb-2">
                Need a Quick Repair Quote or Device Inquiry?
              </h2>
              <p className="text-sm text-[#697386] leading-relaxed">
                Select your service category and details below. This will prepare a clear, pre-formatted inquiry directly to workshop manager <strong>Umarfaruk</strong> for quick response.
              </p>
            </div>

            {/* Service Selection buttons */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#697386] mb-2">
                1. Select Service Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES.map((srv) => {
                  const isSelected = selectedService === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedService(srv.id)}
                      className={`text-left p-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0a2540] text-white border-[#0a2540] shadow-xs'
                          : 'bg-[#f7f9fc] border-[#e6ebf1] text-[#697386] hover:text-[#1a1f36] hover:bg-slate-100'
                      }`}
                    >
                      {srv.title}
                    </button>
                  );
                })}
              </div>
              {selectedService === 'pos-reselling' && (
                <div className="mt-2.5 p-2.5 rounded-lg bg-blue-50 border border-blue-100 text-xs text-[#0a2540] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#00d4ff] shrink-0" />
                  <span>Includes: Sales Reporting, Stock Control, Debtors &amp; Creditors, Role Access, Mobile Summary App &amp; Full Device Compatibility.</span>
                </div>
              )}
            </div>

            {/* Device & Issue details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#697386] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. John / Sarah"
                  className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3.5 py-2.5 text-sm text-[#1a1f36] placeholder-[#a3acb9] focus:outline-none focus:border-[#00d4ff] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#697386] mb-1.5">
                  Device / Model
                </label>
                <input
                  type="text"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  placeholder="e.g. HP Pavilion, Hikvision CCTV, POS"
                  className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3.5 py-2.5 text-sm text-[#1a1f36] placeholder-[#a3acb9] focus:outline-none focus:border-[#00d4ff] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#697386] mb-1.5">
                Describe the problem or requirement
              </label>
              <textarea
                value={issueDetails}
                onChange={(e) => setIssueDetails(e.target.value)}
                rows={2}
                placeholder="e.g. Broken screen, won't turn on, looking for 8GB Core i5 laptop, or quote for 4 CCTV cameras..."
                className="w-full bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg px-3.5 py-2.5 text-sm text-[#1a1f36] placeholder-[#a3acb9] focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
            </div>

            {/* Urgency */}
            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#697386] font-semibold uppercase">Urgency:</span>
              {(['Normal', 'Same Day Urgent', 'General Inquiry'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setUrgency(lvl)}
                  className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                    urgency === lvl
                      ? 'bg-[#0a2540] text-white border-[#0a2540]'
                      : 'border-[#e6ebf1] bg-[#f7f9fc] text-[#697386] hover:text-[#1a1f36]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Right column: Message Preview & Send */}
          <div className="lg:col-span-5 bg-[#f7f9fc] border border-[#e6ebf1] rounded-xl p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between text-xs text-[#697386] mb-3 pb-2 border-b border-[#e6ebf1]">
                <span className="flex items-center gap-1.5 font-semibold text-[#1a1f36]">
                  <MessageSquareCode className="w-4 h-4 text-[#00d4ff]" />
                  Live WhatsApp Message Preview
                </span>
                <span className="text-[11px] text-[#25d366] font-mono font-semibold">Ready to send</span>
              </div>

              {/* Chat bubble simulation */}
              <div className="bg-white rounded-lg p-4 text-xs font-mono text-[#1a1f36] border border-[#e6ebf1] whitespace-pre-line leading-relaxed shadow-xs max-h-56 overflow-y-auto">
                {formattedMsg}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full bg-[#25d366] hover:bg-[#128c7e] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-98"
                id="quote-builder-send-wa"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>Send to Umarfaruk on WhatsApp</span>
              </button>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-xs font-semibold text-[#697386] hover:text-[#1a1f36] border border-[#e6ebf1] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#697386]" />
                      <span>Copy Message Text</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${WORKSHOP_DETAILS.phone}`}
                  className="py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-xs font-semibold text-[#0a2540] border border-[#e6ebf1] transition-colors text-center"
                >
                  Call: {WORKSHOP_DETAILS.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
