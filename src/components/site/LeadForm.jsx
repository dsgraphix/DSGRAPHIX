import React, { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/site-data";
import { sendWebsiteEmail } from "@/lib/resend";

export function LeadForm({ defaultService = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: defaultService || SERVICES[0].title,
    budget: "₹50k – ₹1.5L",
    timeline: "Within 1 month",
    details: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email address.");
      return;
    }

    setLoading(true);

    try {
      const result = await sendWebsiteEmail({
        type: "CLIENT ENQUIRY",
        title: `Service Enquiry: ${formData.service}`,
        subject: `📩 New Client Enquiry: ${formData.service} - ${formData.name}`,
        replyTo: formData.email,
        data: {
          "Service Requested": formData.service,
          "Client Name": formData.name,
          "Email Address": formData.email,
          "Phone Number": formData.phone || "Not provided",
          "Company / Brand": formData.company || "Not provided",
          "Budget Range": formData.budget,
          "Target Timeline": formData.timeline || "Not specified",
        },
        notes: formData.details || "No project details specified.",
      });

      if (result.success) {
        toast.success("Thanks — your enquiry has been sent directly to our team.");
        setSubmitted(true);
      } else {
        toast.error(`Could not send enquiry: ${result.error}`);
      }
    } catch (err) {
      toast.error("Something went wrong sending your enquiry.");
    } finally {
      setLoading(false);
    }
  };

  const budgetOptions = [
    "Under ₹50k",
    "₹50k – ₹1.5L",
    "₹1.5L – ₹4L",
    "₹4L+"
  ];

  const serviceOptions = [
    ...SERVICES.map((s) => s.title),
    "Something else"
  ];

  const inputClasses = "w-full rounded-none border-2 border-white bg-[#2A2A29] px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-[#FF6636] focus:outline-none font-bold";

  if (submitted) {
    return (
      <div className="brutalist-border bg-[#2A2A29] p-8 lg:p-12 text-center space-y-6 text-white">
        <div className="mx-auto flex h-16 w-16 items-center justify-center brutalist-border bg-[#FF6636] text-[#2A2A29]">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="font-display text-3xl font-black uppercase tracking-tighter">ENQUIRY SENT!</h3>
        <p className="text-slate-300 text-base max-w-md mx-auto font-bold">
          Thank you, <span className="text-[#FF6636]">{formData.name}</span>. Dhananjay Chalke and the team will review your project details and respond within 48 hours with a clear scope and quote.
        </p>
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                service: SERVICES[0].title,
                budget: "₹50k – ₹1.5L",
                timeline: "Within 1 month",
                details: "",
              });
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="brutalist-border bg-[#2A2A29] p-6 lg:p-10 text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Meera Iyer"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="meera@paylane.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 98765 00000"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-2">
              Company / Brand
            </label>
            <input
              type="text"
              name="company"
              placeholder="Paylane Technologies"
              value={formData.company}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-2">
              Service
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`${inputClasses} cursor-pointer`}
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#2A2A29] text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-2">
              Budget Range
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={`${inputClasses} cursor-pointer`}
            >
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#2A2A29] text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-2">
            Timeline
          </label>
          <input
            type="text"
            name="timeline"
            placeholder="e.g. Next 3-4 weeks"
            value={formData.timeline}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#FF6636] mb-2">
            Project Details
          </label>
          <textarea
            name="details"
            rows={4}
            placeholder="Describe your project, goals, key deliverables, or links to reference sites..."
            value={formData.details}
            onChange={handleChange}
            className={`${inputClasses} resize-y`}
          />
        </div>

        <Button type="submit" variant="brand" size="xl" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Sending Enquiry...
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
