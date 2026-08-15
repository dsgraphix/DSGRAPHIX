import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Briefcase, User, Mail, Phone, Link2, FileText, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { sendWebsiteEmail } from "@/lib/resend";
import { Button } from "@/components/ui/button";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";

export function JobApplyModal({ isOpen, onClose, jobTitle = "General Application" }) {
  useModalScrollLock(isOpen);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: jobTitle,
    portfolioUrl: "",
    experience: "3-5 years",
    coverLetter: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (jobTitle) {
      setFormData((prev) => ({ ...prev, role: jobTitle }));
    }
  }, [jobTitle]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      toast.error("Please fill in all required fields (Name, Email, Role)");
      return;
    }

    setLoading(true);

    try {
      const result = await sendWebsiteEmail({
        type: "JOB APPLICATION",
        title: `Job Application: ${formData.role}`,
        subject: `🚀 Job Application: ${formData.role} - ${formData.name}`,
        replyTo: formData.email,
        data: {
          "Position Applied": formData.role,
          "Applicant Name": formData.name,
          "Email Address": formData.email,
          "Phone Number": formData.phone || "Not provided",
          "Experience Level": formData.experience,
          "Portfolio / Links": formData.portfolioUrl || "Not provided",
        },
        notes: formData.coverLetter || "No cover note attached.",
      });

      if (result.success) {
        toast.success(`Application submitted for ${formData.role}!`);
        setSubmitted(true);
      } else {
        toast.error(`Failed to submit application: ${result.error}`);
      }
    } catch (err) {
      toast.error("Something went wrong while sending your application.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: jobTitle,
      portfolioUrl: "",
      experience: "3-5 years",
      coverLetter: "",
    });
    onClose();
  };

  const inputClasses = "w-full border-2 border-white bg-[#2A2A29] px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-[#FF6636] focus:outline-none font-bold";

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-[#1A1A19]/80 backdrop-blur-md overflow-y-auto overscroll-contain"
      onClick={handleReset}
    >
      <div
        data-lenis-prevent="true"
        className="w-full max-w-xl brutalist-border bg-[#2A2A29] text-white overflow-hidden shadow-2xl my-8 max-h-[90vh] overflow-y-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1A1A19] border-b-2 border-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#FF6636] text-xs font-black uppercase tracking-widest">
              <Sparkles size={14} /> DS-Graphix Careers
            </div>
            <h3 className="font-display text-2xl font-black uppercase text-white mt-1">
              {submitted ? "APPLICATION RECEIVED!" : `APPLY: ${formData.role}`}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-2 brutalist-border bg-[#2A2A29] hover:bg-[#FF6636] hover:text-[#2A2A29] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center brutalist-border bg-[#FF6636] text-[#2A2A29]">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h4 className="font-display text-3xl font-black uppercase text-white">
              THANK YOU, {formData.name.toUpperCase()}!
            </h4>
            <p className="text-slate-300 font-bold text-sm max-w-md mx-auto leading-relaxed">
              Your application for <span className="text-[#FF6636]">{formData.role}</span> has been received directly in our inbox (<span className="text-[#FF6636]">hello@dsgraphix.in</span>). Our design leads will review your portfolio and reach back out to you.
            </p>
            <div className="pt-4">
              <Button variant="brand" size="lg" onClick={handleReset}>
                Done & Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Rivera"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-1.5">
                  Role Applying For *
                </label>
                <input
                  type="text"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Senior UI/UX Designer"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-1.5">
                  Portfolio / Behance / GitHub Link
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://behance.net/yourprofile"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-1.5">
                  Years of Experience
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`${inputClasses} cursor-pointer`}
                >
                  <option value="1-2 years" className="bg-[#2A2A29]">1 – 2 years</option>
                  <option value="3-5 years" className="bg-[#2A2A29]">3 – 5 years</option>
                  <option value="5+ years" className="bg-[#2A2A29]">5+ years (Senior / Lead)</option>
                  <option value="Student/Junior" className="bg-[#2A2A29]">Student / Junior</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-1.5">
                Why DS-Graphix? / Brief Cover Note
              </label>
              <textarea
                name="coverLetter"
                rows={3}
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Tell us briefly about your design philosophy or key projects..."
                className={inputClasses}
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-700">
              <a
                href={`mailto:hello@dsgraphix.in?subject=Application for ${encodeURIComponent(formData.role)}`}
                className="text-xs text-slate-400 hover:text-[#FF6636] underline font-bold"
              >
                Or use traditional Email Client
              </a>

              <Button
                type="submit"
                variant="brand"
                size="lg"
                disabled={loading}
                className="min-w-[160px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit Application <Send className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
