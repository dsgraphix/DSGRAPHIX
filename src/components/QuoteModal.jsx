import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { sendWebsiteEmail } from '@/lib/resend';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';
import { Button } from '@/components/ui/button';

export default function QuoteModal({ isOpen, onClose }) {
  useModalScrollLock(isOpen);

  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState(['UI/UX Design']);
  const [budgetRange, setBudgetRange] = useState('$3,000 - $7,000');
  const [timeline, setTimeline] = useState('Standard (3 - 4 Weeks)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        resetModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error('Please enter your name and email address.');
      return;
    }

    setLoading(true);

    try {
      const result = await sendWebsiteEmail({
        type: "PROJECT CALCULATOR QUOTE",
        title: `Project Quote: ${selectedServices.join(', ')}`,
        subject: `💰 New Project Calculator Quote Request - ${formData.name}`,
        replyTo: formData.email,
        data: {
          "Services Requested": selectedServices.join(', '),
          "Client Name": formData.name,
          "Email Address": formData.email,
          "Phone Number": formData.phone || "Not provided",
          "Company / Brand": formData.company || "Not provided",
          "Selected Budget": budgetRange,
          "Desired Timeline": timeline,
        },
        notes: formData.notes || "No additional notes provided.",
      });

      if (result.success) {
        toast.success('Quote request sent successfully!');
        setSubmitted(true);
      } else {
        toast.error(`Could not submit quote: ${result.error}`);
      }
    } catch (err) {
      toast.error('Failed to submit quote request.');
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  const inputClasses = "w-full border-2 border-white bg-[#1F1F1E] px-4 py-3 text-sm font-sans font-bold text-white placeholder-white/40 focus:border-[#FF6636] focus:outline-none transition-colors";

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      onClick={resetModal}
    >
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain brutalist-border bg-[#2A2A29] text-white shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#1F1F1E] border-b-2 border-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#FF6636] text-xs font-display font-bold uppercase tracking-widest">
              <Sparkles className="h-4 w-4" /> DS-Graphix Project Calculator
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white mt-1 tracking-tight">
              {submitted ? 'Inquiry Submitted!' : `Step ${step} of 4: Project Scope & Quote`}
            </h3>
          </div>
          <button
            onClick={resetModal}
            className="w-10 h-10 min-w-[44px] min-h-[44px] inline-flex items-center justify-center brutalist-border bg-[#2A2A29] text-white hover:bg-white hover:text-[#2A2A29] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!submitted && (
          <div className="flex h-1.5 bg-white/20">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`flex-1 transition-all duration-300 ${s <= step ? 'bg-[#FF6636]' : 'bg-transparent'}`}
              />
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 brutalist-border bg-[#FF6636] text-[#2A2A29] flex items-center justify-center mx-auto">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-white">
                Thank You, {formData.name || 'Partner'}!
              </h3>
              <p className="text-sm font-sans text-white/80 max-w-md mx-auto leading-relaxed">
                Dhananjay Chalke and the DS-Graphix team have received your project parameters. We will review your specs and contact you at <strong className="text-white">{formData.email}</strong> within 24 hours.
              </p>
              <div className="brutalist-border bg-[#1F1F1E] p-4 text-left font-mono text-xs text-white space-y-1.5 inline-block">
                <div><strong>Selected Services:</strong> {selectedServices.join(', ')}</div>
                <div><strong>Estimated Budget:</strong> {budgetRange}</div>
                <div><strong>Timeline:</strong> {timeline}</div>
              </div>
              <div className="pt-2">
                <Button variant="brand" size="lg" onClick={resetModal}>
                  Done & Return to Site
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: Services Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <h4 className="font-display font-black text-lg uppercase tracking-tight text-white">
                    What creative capabilities do you require?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'UI/UX Design', desc: 'Web apps, mobile interfaces & design systems' },
                      { name: 'Logo & Brand Identity', desc: 'Custom logo, guidelines & visual branding' },
                      { name: 'Graphic Design', desc: 'Pitch decks, social creatives & marketing collaterals' },
                      { name: 'Video Production & Reels', desc: '3D motion graphics & social video editing' }
                    ].map(s => {
                      const selected = selectedServices.includes(s.name);
                      return (
                        <div
                          key={s.name}
                          onClick={() => toggleService(s.name)}
                          className={`p-4 brutalist-border cursor-pointer transition-all duration-200 flex items-start gap-3 select-none ${
                            selected ? 'bg-[#FF6636] text-[#2A2A29]' : 'bg-[#1F1F1E] text-white hover:bg-white/10'
                          }`}
                        >
                          <div className={`w-5 h-5 border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                            selected ? 'border-[#2A2A29] bg-[#2A2A29] text-[#FF6636]' : 'border-white bg-[#2A2A29]'
                          }`}>
                            {selected && <Check className="h-3.5 w-3.5" />}
                          </div>
                          <div>
                            <div className="font-display font-bold uppercase text-sm">{s.name}</div>
                            <div className="text-xs font-sans mt-0.5 opacity-80">{s.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Budget Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <h4 className="font-display font-black text-lg uppercase tracking-tight text-white">
                    What is your estimated project budget range?
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: '$950 - $2,500', desc: 'Ideal for branding, quick pitch decks, or single landing pages' },
                      { label: '$3,000 - $7,000', desc: 'Ideal for full UI/UX design apps, complete branding packages & video reels' },
                      { label: '$7,000 - $15,000', desc: 'Ideal for complex SaaS platforms, e-commerce rebrands & end-to-end design' },
                      { label: '$15,000+', desc: 'Enterprise design retainer or multi-platform product architecture' }
                    ].map(b => (
                      <div
                        key={b.label}
                        onClick={() => setBudgetRange(b.label)}
                        className={`p-4 brutalist-border cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 select-none ${
                          budgetRange === b.label ? 'bg-[#FF6636] text-[#2A2A29]' : 'bg-[#1F1F1E] text-white hover:bg-white/10'
                        }`}
                      >
                        <div>
                          <div className="font-display font-black uppercase text-base">{b.label}</div>
                          <div className="text-xs font-sans mt-0.5 opacity-80">{b.desc}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 shrink-0 ${
                          budgetRange === b.label ? 'border-[#2A2A29] bg-[#2A2A29]' : 'border-white'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Timeline & Notes */}
              {step === 3 && (
                <div className="space-y-6">
                  <h4 className="font-display font-black text-lg uppercase tracking-tight text-white">
                    Desired Turnaround & Execution Timeline
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Urgent (1 - 2 Wks)', desc: 'Fast-track priority turnaround' },
                      { label: 'Standard (3 - 4 Wks)', desc: 'Regular agency sprint pace' },
                      { label: 'Flexible (5+ Wks)', desc: 'Phased launch sprint schedule' }
                    ].map(t => (
                      <div
                        key={t.label}
                        onClick={() => setTimeline(t.label)}
                        className={`p-4 brutalist-border cursor-pointer transition-all duration-200 text-center select-none ${
                          timeline === t.label ? 'bg-[#FF6636] text-[#2A2A29]' : 'bg-[#1F1F1E] text-white hover:bg-white/10'
                        }`}
                      >
                        <Clock className="h-6 w-6 mx-auto mb-2" />
                        <div className="font-display font-bold uppercase text-xs">{t.label}</div>
                        <div className="text-[11px] font-sans mt-1 opacity-80">{t.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="block font-display text-xs font-bold uppercase tracking-wider text-white">
                      Project Notes / Key Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your goals, app features, or reference websites..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Contact Information */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h4 className="font-display font-black text-lg uppercase tracking-tight text-white">
                    Contact Information & Schedule Call
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#FF6636] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#FF6636] mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block font-display text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        placeholder="Apex SaaS / Startup"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="brutalist-border bg-[#1F1F1E] p-4 text-xs font-sans text-white/80 space-y-1">
                    <div className="font-display font-bold uppercase text-[#FF6636]">Quote Summary:</div>
                    <div><strong>Services:</strong> {selectedServices.join(', ')}</div>
                    <div><strong>Budget:</strong> {budgetRange} | <strong>Timeline:</strong> {timeline}</div>
                  </div>

                  <Button type="submit" variant="brand" size="xl" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Submitting Inquiry...
                      </>
                    ) : (
                      <>
                        Submit Inquiry & Request Proposal <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}

              {/* Bottom Nav Controls */}
              {step < 4 && (
                <div className="mt-8 pt-6 border-t-2 border-white/20 flex items-center justify-between gap-4">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={handleBack}
                      className="inline-flex flex-row items-center justify-center gap-2.5 whitespace-nowrap min-h-[44px]"
                    >
                      <ArrowLeft className="h-4 w-4 shrink-0" />
                      <span>Back</span>
                    </Button>
                  ) : <div />}

                  <Button
                    type="button"
                    variant="brand"
                    size="lg"
                    onClick={handleNext}
                    className="inline-flex flex-row items-center justify-center gap-2.5 whitespace-nowrap min-h-[44px]"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
