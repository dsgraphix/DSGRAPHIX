import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, Calendar, DollarSign, Clock, User, Mail, Phone, Building, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { agencyInfo } from '../data/mockData';
import { sendWebsiteEmail } from '@/lib/resend';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';

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

  return (
    <div
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(26, 26, 25, 0.82)',
        backdropFilter: 'blur(12px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={resetModal}
    >
      <div
        data-lenis-prevent="true"
        style={{
          width: '100%',
          maxWidth: '750px',
          maxHeight: '90vh',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          animation: 'float 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div
          style={{
            background: 'var(--color-dark-neutral)',
            color: '#FFFFFF',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>
              <Sparkles size={16} /> DS-Graphix Project Calculator
            </div>
            <h3 style={{ fontSize: '22px', color: '#FFFFFF', marginTop: '2px' }}>
              {submitted ? 'Inquiry Submitted!' : `Step ${step} of 4: Project Scope & Quote`}
            </h3>
          </div>
          <button onClick={resetModal} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!submitted && (
          <div style={{ display: 'flex', height: '4px', background: '#E2E8F0' }}>
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                style={{
                  flex: 1,
                  background: s <= step ? 'var(--color-primary)' : 'transparent',
                  transition: '0.3s'
                }}
              />
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div style={{ padding: '32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}
              >
                <Check size={36} />
              </div>
              <h3 style={{ fontSize: '28px', marginBottom: '12px' }}>Thank You, {formData.name || 'Partner'}!</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 24px' }}>
                Dhananjay Chalke and the DS-Graphix team have received your project parameters. We will review your specs and contact you at <strong>{formData.email}</strong> with a detailed proposal within 24 hours.
              </p>
              <div style={{ background: 'var(--color-bg-section)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'inline-block', textAlign: 'left', fontSize: '14px', marginBottom: '24px' }}>
                <div><strong>Selected Services:</strong> {selectedServices.join(', ')}</div>
                <div><strong>Estimated Budget:</strong> {budgetRange}</div>
                <div><strong>Timeline:</strong> {timeline}</div>
              </div>
              <div>
                <button onClick={resetModal} className="btn-primary">
                  Done & Return to Site
                </button>
              </div>
            </div>
          ) : (
            <div>
              
              {/* STEP 1: Services Selection */}
              {step === 1 && (
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>What creative capabilities do you require?</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '24px' }}>
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
                          style={{
                            padding: '16px',
                            borderRadius: 'var(--radius-md)',
                            border: selected ? '2px solid var(--color-primary)' : '1px solid var(--color-border-light)',
                            background: selected ? 'var(--color-primary-light)' : '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'var(--transition)',
                            display: 'flex',
                            gap: '12px'
                          }}
                        >
                          <div
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '6px',
                              border: selected ? 'none' : '2px solid #CBD5E1',
                              background: selected ? 'var(--color-primary)' : '#FFFFFF',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {selected && <Check size={14} />}
                          </div>
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '15px' }}>{s.name}</div>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{s.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Budget Selection */}
              {step === 2 && (
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>What is your estimated project budget range?</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {[
                      { label: '$950 - $2,500', desc: 'Ideal for branding, quick pitch decks, or single landing pages' },
                      { label: '$3,000 - $7,000', desc: 'Ideal for full UI/UX design apps, complete branding packages & video reels' },
                      { label: '$7,000 - $15,000', desc: 'Ideal for complex SaaS platforms, e-commerce rebrands & end-to-end design' },
                      { label: '$15,000+', desc: 'Enterprise design retainer or multi-platform product architecture' }
                    ].map(b => (
                      <div
                        key={b.label}
                        onClick={() => setBudgetRange(b.label)}
                        style={{
                          padding: '16px 20px',
                          borderRadius: 'var(--radius-md)',
                          border: budgetRange === b.label ? '2px solid var(--color-primary)' : '1px solid var(--color-border-light)',
                          background: budgetRange === b.label ? 'var(--color-primary-light)' : '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '16px' }}>{b.label}</div>
                          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{b.desc}</div>
                        </div>
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: budgetRange === b.label ? '6px solid var(--color-primary)' : '2px solid #CBD5E1'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Timeline & Scope */}
              {step === 3 && (
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Desired Turnaround & Execution Timeline</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
                    {[
                      { label: 'Urgent (1 - 2 Wks)', desc: 'Fast-track priority turnaround' },
                      { label: 'Standard (3 - 4 Wks)', desc: 'Regular agency sprint pace' },
                      { label: 'Flexible (5+ Wks)', desc: 'Phased launch sprint schedule' }
                    ].map(t => (
                      <div
                        key={t.label}
                        onClick={() => setTimeline(t.label)}
                        style={{
                          padding: '16px',
                          borderRadius: 'var(--radius-md)',
                          border: timeline === t.label ? '2px solid var(--color-primary)' : '1px solid var(--color-border-light)',
                          background: timeline === t.label ? 'var(--color-primary-light)' : '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <Clock size={24} color={timeline === t.label ? 'var(--color-primary)' : '#666'} style={{ margin: '0 auto 8px' }} />
                        <div style={{ fontWeight: '700', fontSize: '14px' }}>{t.label}</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{t.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px' }}>Project Notes / Key Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your goals, app features, or reference websites..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border-light)',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Contact Info & Discovery Call */}
              {step === 4 && (
                <form onSubmit={handleSubmit}>
                  <h4 style={{ fontSize: '18px', marginBottom: '16px' }}>Contact Information & Schedule Call</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-light)', fontSize: '14px', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-light)', fontSize: '14px', outline: 'none' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Phone / WhatsApp</label>
                      <input
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-light)', fontSize: '14px', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Company / Brand</label>
                      <input
                        type="text"
                        placeholder="Apex SaaS / Startup"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-light)', fontSize: '14px', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ background: 'var(--color-bg-section)', padding: '14px 18px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)' }}>Quote Summary Overview:</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-dark)', marginTop: '4px' }}>
                      <strong>Services:</strong> {selectedServices.join(', ')} | <strong>Budget:</strong> {budgetRange} | <strong>Timeline:</strong> {timeline}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Sending Inquiry...
                      </>
                    ) : (
                      <>
                        Submit Inquiry & Request Proposal <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Bottom Controls */}
              {step < 4 && (
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {step > 1 ? (
                    <button onClick={handleBack} className="btn-outline" style={{ padding: '10px 20px', fontSize: '14px' }}>
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : <div />}

                  <button onClick={handleNext} className="btn-primary" style={{ padding: '12px 28px' }}>
                    Next Step <ArrowRight size={16} />
                  </button>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
