import workUiux from "@/assets/work-uiux.jpg";
import workBrand from "@/assets/work-brand.jpg";
import workGraphic from "@/assets/work-graphic.jpg";
import workVideo from "@/assets/work-video.jpg";

export const CONTACT = {
  company: "DS-Graphix",
  person: "Dhananjay Chalke",
  email: "hello@dsgraphix.in",
  domain: "dsgraphix.in",
  phone: "+91 866 886 5646",
  whatsapp: "918668865646",
  address: "Sati, Taluka: Chiplun, District: Ratnagiri, Maharashtra, 415604, India",
  hours: "Mon – Sat · 10:00 – 19:00 IST",
  socials: {
    instagram: "https://www.instagram.com/dsgra.phix/",
    behance: "https://www.behance.net/dhananjaychalke",
    linkedin: "https://www.linkedin.com/in/dhananjay-chalke-a217b629a",
  },
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

export const SERVICES = [
  {
    slug: "ui-ux-design",
    to: "/services/ui-ux-design",
    title: "UI/UX Design",
    short: "Product interfaces engineered around real user behaviour.",
    summary: "Research-led product design for SaaS platforms, mobile apps and e-commerce journeys — from discovery workshops and information architecture to pixel-perfect design systems your engineers can ship without guesswork.",
    deliverables: [
      "User research, personas & journey maps",
      "Information architecture and user flows",
      "Wireframes and clickable prototypes",
      "High-fidelity UI and interaction specs",
      "Scalable design system with tokens",
      "Usability testing and iteration rounds"
    ],
    outcomes: [
      { label: "Faster onboarding", value: "-38%" },
      { label: "Conversion uplift", value: "+52%" },
      { label: "Design-to-dev handoff", value: "2x" }
    ],
    image: workUiux
  },
  {
    slug: "brand-identity",
    to: "/services/brand-identity",
    title: "Logo & Brand Identity",
    short: "Distinctive marks and identity systems built to scale.",
    summary: "Positioning, naming support, logo craft and a complete identity toolkit — colour, type, grid, iconography and voice — documented in guidelines that keep every touchpoint consistent as you grow.",
    deliverables: [
      "Brand discovery & positioning workshop",
      "Logo concepts and refinement rounds",
      "Colour, typography and grid systems",
      "Stationery, packaging and collateral",
      "Brand guideline documentation",
      "Asset library in all export formats"
    ],
    outcomes: [
      { label: "Brand recall lift", value: "+64%" },
      { label: "Rollout time", value: "3 wks" },
      { label: "Touchpoints covered", value: "40+" }
    ],
    image: workBrand
  },
  {
    slug: "graphic-design",
    to: "/services/graphic-design",
    title: "Graphic & Social Design",
    short: "Campaign-ready creatives that keep your feed unmistakable.",
    summary: "Marketing collateral, pitch decks, packaging and always-on social creatives produced on a predictable calendar — templated so your in-house team can extend the system without losing quality.",
    deliverables: [
      "Social media creative systems",
      "Campaign key visuals and ad sets",
      "Brochures, decks and print collateral",
      "Packaging and merchandise design",
      "Infographics and data visuals",
      "Editable templates for your team"
    ],
    outcomes: [
      { label: "Engagement lift", value: "+3.1x" },
      { label: "Creatives / month", value: "60+" },
      { label: "Avg. turnaround", value: "48 hrs" }
    ],
    image: workGraphic
  },
  {
    slug: "video-production",
    to: "/services/video-production",
    title: "Video Production & Reels",
    short: "Short-form stories, product films and motion identity.",
    summary: "Scripting, shooting, editing, motion graphics and sound — built for the scroll. We deliver platform-native cuts for Reels, Shorts and YouTube alongside brand films that carry your identity into motion.",
    deliverables: [
      "Concept, script and storyboard",
      "Production and direction",
      "Editing, colour and sound design",
      "Motion graphics & animated logos",
      "Platform-native aspect ratio cuts",
      "Subtitles and thumbnail packs"
    ],
    outcomes: [
      { label: "Avg. watch-through", value: "72%" },
      { label: "Reels / month", value: "20+" },
      { label: "First cut in", value: "5 days" }
    ],
    image: workVideo
  }
];

export const CASE_STUDIES = [
  {
    slug: "fintech-app-redesign",
    title: "Rebuilding a fintech app around one-tap payments",
    client: "Paylane",
    category: "UI/UX",
    excerpt: "A full product redesign for a payments app serving 400k users, anchored on a new design system and simplified transaction flow.",
    result: "+52% checkout completion",
    image: workUiux
  },
  {
    slug: "saas-identity-system",
    title: "An identity system for a fast-scaling SaaS",
    client: "Northloop",
    category: "Branding",
    excerpt: "Positioning, logo craft and a modular identity toolkit rolled out across product, web, sales and event collateral in three weeks.",
    result: "40+ touchpoints unified",
    image: workBrand
  },
  {
    slug: "d2c-campaign-creatives",
    title: "Always-on social system for a D2C skincare brand",
    client: "Aurelle",
    category: "Graphic",
    excerpt: "A templated creative system delivering 60+ monthly assets while keeping every post recognisably on-brand.",
    result: "3.1x engagement lift",
    image: workGraphic
  },
  {
    slug: "product-launch-film",
    title: "Launch film and reel series for a hardware startup",
    client: "Kite Labs",
    category: "Video",
    excerpt: "A hero product film plus twelve platform-native reels, shot in one studio block and cut for every channel.",
    result: "72% avg. watch-through",
    image: workVideo
  },
  {
    slug: "marketplace-web-app",
    title: "Marketplace dashboard for enterprise sellers",
    client: "Cartway",
    category: "UI/UX",
    excerpt: "Complex inventory data made legible through a considered hierarchy, dense tables and a calm, accessible palette.",
    result: "-38% support tickets",
    image: workUiux
  },
  {
    slug: "restaurant-rebrand",
    title: "Rebranding a restaurant group across 14 outlets",
    client: "Copper & Clay",
    category: "Branding",
    excerpt: "A warm, tactile identity applied to menus, signage, packaging and uniforms without a single inconsistent asset.",
    result: "14 outlets rolled out",
    image: workBrand
  }
];

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    body: "Kick-off workshop, stakeholder interviews and competitor teardown. We leave with a written brief, success metrics and a scope both sides agree on."
  },
  {
    step: "02",
    title: "Define",
    body: "Information architecture, content strategy and a creative direction board. You approve the direction before a single final pixel is drawn."
  },
  {
    step: "03",
    title: "Design",
    body: "Wireframes to high-fidelity UI in weekly review cycles. Everything is built as a reusable system, never one-off screens."
  },
  {
    step: "04",
    title: "Deliver",
    body: "Developer-ready handoff, source files, guidelines and a walkthrough session so your team can run with it confidently."
  },
  {
    step: "05",
    title: "Grow",
    body: "Retainer support for iterations, campaign creative and new features — with the same team that shipped your first release."
  }
];

export const TESTIMONIALS = [
  {
    quote: "DS-Graphix rebuilt our product experience in eight weeks. The design system alone cut our front-end build time in half, and checkout completion jumped over 50%.",
    name: "Meera Iyer",
    role: "Co-founder, Paylane"
  },
  {
    quote: "They treated our brand like a business problem, not a beauty contest. Every decision came with reasoning, and the guidelines have held up for two years.",
    name: "Rohan Desai",
    role: "CEO, Northloop"
  },
  {
    quote: "Sixty creatives a month, consistently on-brand, always on time. Dhananjay's team is the most reliable creative partner we've worked with.",
    name: "Sana Kapoor",
    role: "Marketing Head, Aurelle"
  },
  {
    quote: "The launch film outperformed every paid asset we'd produced before. Sharp strategy, calm process, no drama.",
    name: "Arjun Nair",
    role: "Founder, Kite Labs"
  }
];

export const CLIENTS = [
  "Paylane",
  "Northloop",
  "Aurelle",
  "Kite Labs",
  "Cartway",
  "Copper & Clay",
  "Vantage",
  "Beacon Health"
];

export const FAQS = [
  {
    question: "What does a typical project cost?",
    answer: "Brand identity engagements start at ₹85,000, product UI/UX projects from ₹1,80,000, and monthly creative retainers from ₹45,000. Every quote is scoped after a discovery call — you get a fixed price and timeline, not an hourly meter."
  },
  {
    question: "How long does a project take?",
    answer: "A logo and identity system typically takes 3–4 weeks. A full product UI/UX engagement runs 6–10 weeks depending on scope. Social and video retainers deliver on a weekly calendar with 48-hour turnaround on standard assets."
  },
  {
    question: "Do you work with clients outside India?",
    answer: "Yes. Roughly half our clients are in the US, UK, UAE and Singapore. We overlap working hours, run async updates in Slack or Notion, and schedule reviews to suit your timezone."
  },
  {
    question: "Who will I be working with?",
    answer: "Dhananjay Chalke leads every engagement directly, supported by a focused pod of designers, motion artists and editors. No account-manager telephone game."
  },
  {
    question: "How many revision rounds are included?",
    answer: "Two structured rounds per milestone, which covers the vast majority of projects. Anything beyond that is quoted transparently before we start."
  },
  {
    question: "Do we get the source files?",
    answer: "Yes. Figma files, editable AI/PSD artwork, project files and full-resolution exports are handed over at the end of every engagement. You own the work."
  },
  {
    question: "Can you work alongside our in-house team?",
    answer: "Often we do. We can act as an embedded design pod, hand over a system for your team to extend, or simply take the overflow during a launch."
  },
  {
    question: "How do we get started?",
    answer: "Send an enquiry or message us on WhatsApp. We reply within 48 hours, run a free 30-minute discovery call, and follow up with a written scope and fixed price."
  }
];

export const POSTS = [
  {
    slug: "design-system-roi",
    title: "The real ROI of a design system for a 15-person startup",
    category: "Product Design",
    date: "12 Jul 2026",
    read: "6 min read",
    excerpt: "Design systems are usually pitched as a consistency tool. The bigger win is engineering velocity — here's how we measure it."
  },
  {
    slug: "logo-vs-identity",
    title: "Your logo isn't your brand — and why that matters commercially",
    category: "Branding",
    date: "28 Jun 2026",
    read: "5 min read",
    excerpt: "A mark is one asset in a system. The businesses that grow fastest invest in the other forty touchpoints."
  },
  {
    slug: "reels-that-convert",
    title: "Anatomy of a reel that actually converts",
    category: "Video",
    date: "09 Jun 2026",
    read: "4 min read",
    excerpt: "First-second hooks, silent-viewing legibility and the three-beat structure we use across every short-form brief."
  },
  {
    slug: "saas-onboarding-teardown",
    title: "A teardown of five SaaS onboarding flows",
    category: "UX",
    date: "21 May 2026",
    read: "8 min read",
    excerpt: "What separates a 30-second activation from a five-step drop-off, illustrated with real interfaces."
  },
  {
    slug: "colour-in-conversion",
    title: "Colour, contrast and conversion: a practical guide",
    category: "UI Design",
    date: "02 May 2026",
    read: "5 min read",
    excerpt: "Accessible palettes are not a compromise. They routinely outperform the high-saturation alternatives."
  },
  {
    slug: "briefing-a-designer",
    title: "How to brief a design agency so you get what you wanted",
    category: "Working Together",
    date: "18 Apr 2026",
    read: "4 min read",
    excerpt: "The six inputs that shorten every project timeline, straight from our discovery questionnaire."
  }
];

export const JOBS = [
  {
    title: "Senior Product Designer",
    type: "Full-time",
    location: "Pune / Hybrid",
    body: "Lead UI/UX engagements for SaaS and fintech clients. 4+ years shipping product design, strong systems thinking, comfortable presenting to founders."
  },
  {
    title: "Motion & Video Editor",
    type: "Full-time",
    location: "Pune / On-site",
    body: "Cut short-form reels and brand films end to end. Strong After Effects and Premiere skills, an eye for pacing and sound."
  },
  {
    title: "Visual Designer (Social)",
    type: "Full-time",
    location: "Remote (India)",
    body: "Own always-on social creative for D2C and SaaS brands. Fast, template-minded, obsessive about typographic detail."
  },
  {
    title: "Design Intern",
    type: "6-month internship",
    location: "Pune / On-site",
    body: "Work alongside the core pod across branding and UI projects. Portfolio matters far more than the college on your CV."
  }
];

export const STATS = [
  { value: "250+", label: "Projects delivered" },
  { value: "120+", label: "Brands partnered" },
  { value: "8 yrs", label: "Of studio craft" },
  { value: "48 hrs", label: "Avg. first response" }
];

export function whatsappLink(message = "Hi DS-Graphix, I'd like to discuss a project.") {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}
