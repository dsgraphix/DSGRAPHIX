import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoothScroll, getLenis } from "@/lib/smooth-scroll";

import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLoginPage } from "@/pages/admin/AdminLoginPage";
import { AdminProjectsPage } from "@/pages/admin/AdminProjectsPage";
import { AdminProjectFormPage } from "@/pages/admin/AdminProjectFormPage";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { AmbientBackground } from "@/components/site/AmbientBackground";

import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { ServicesIndexPage } from "@/pages/ServicesIndexPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { ProcessPage } from "@/pages/ProcessPage";
import { BlogPage } from "@/pages/BlogPage";
import { TestimonialsPage } from "@/pages/TestimonialsPage";
import { FaqPage } from "@/pages/FaqPage";
import { CareersPage } from "@/pages/CareersPage";
import { ContactPage } from "@/pages/ContactPage";
import { QuotePage } from "@/pages/QuotePage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsPage } from "@/pages/TermsPage";
import { CookiePolicyPage } from "@/pages/CookiePolicyPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="flex min-h-screen flex-col bg-[#2A2A29] font-sans antialiased text-white selection:bg-[#FF6636] selection:text-white relative">
      {!isAdminRoute && <AmbientBackground />}
      {!isAdminRoute && <Header />}
      <main key={pathname} className="flex-1 animate-in fade-in duration-200 relative z-10">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesIndexPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/get-quote" element={<QuotePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />

          {/* Admin CMS Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Navigate to="/admin/projects" replace />} />
            <Route path="/admin/projects" element={<AdminProjectsPage />} />
            <Route path="/admin/projects/new" element={<AdminProjectFormPage />} />
            <Route path="/admin/projects/:id/edit" element={<AdminProjectFormPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppFab />}
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <MainLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}


