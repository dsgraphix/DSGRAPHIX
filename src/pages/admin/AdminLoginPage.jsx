import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/site/Logo';
import { Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin/projects', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      navigate('/admin/projects', { replace: true });
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#2A2A29] flex flex-col justify-center items-center p-4 text-white">
      <div className="w-full max-w-md">
        {/* Header Logo Card */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo />
          <p className="font-display text-xs font-bold uppercase tracking-widest text-[#FF6636] mt-4">
            Secured CMS Admin Panel
          </p>
        </div>

        {/* Login Form Box */}
        <div className="brutalist-border bg-[#2A2A29] p-6 sm:p-8 space-y-6">
          <div className="border-b-2 border-white pb-4">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white flex items-center gap-2">
              <Lock className="h-6 w-6 text-[#FF6636]" />
              Admin Portal
            </h1>
            <p className="text-xs text-white/70 mt-1 font-sans">
              Enter authorized administrator credentials to manage DS-Graphix portfolio case studies.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-950/80 border-2 border-red-500 p-3.5 text-xs text-red-200 flex items-start gap-2 animate-in fade-in">
              <ShieldAlert className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold font-display uppercase tracking-wider">Authentication Error</p>
                <p className="mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-display text-xs font-bold uppercase tracking-wider text-white mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dsgraphix.in"
                  disabled={submitting}
                  required
                  className="w-full bg-[#1F1F1E] border-2 border-white px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FF6636] transition-colors font-sans"
                />
                <Mail className="absolute right-3.5 top-3.5 h-4 w-4 text-white/40" />
              </div>
            </div>

            <div>
              <label className="block font-display text-xs font-bold uppercase tracking-wider text-white mb-2">
                Master Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={submitting}
                  required
                  className="w-full bg-[#1F1F1E] border-2 border-white px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FF6636] transition-colors font-sans"
                />
                <Lock className="absolute right-3.5 top-3.5 h-4 w-4 text-white/40" />
              </div>
            </div>

            <Button
              type="submit"
              variant="brand"
              size="xl"
              disabled={submitting}
              className="w-full mt-2 group"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-none" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Access CMS Dashboard
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-white/40 mt-6 font-mono">
          DS-Graphix Security Guard System v1.0 • Rate Limited Protection Active
        </p>
      </div>
    </div>
  );
}
