import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/site/Logo';
import { LogOut, FolderKanban, Plus, ExternalLink } from 'lucide-react';

export function AdminHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#2A2A29] border-b-2 border-white text-white">
      <div className="container-page h-20 flex items-center justify-between gap-4">
        {/* Left: Logo + Admin Title */}
        <div className="flex items-center gap-6">
          <Logo />
          <div className="hidden sm:flex items-center gap-2 border-l-2 border-white/20 pl-6">
            <FolderKanban className="h-5 w-5 text-[#FF6636]" />
            <span className="font-display font-black uppercase text-sm tracking-wider text-white">
              CMS Admin Panel
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <a
            href="/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-white hover:text-[#FF6636] transition-colors mr-2"
          >
            <span>Live Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {user && (
            <div className="hidden sm:block text-xs font-mono text-white/70 bg-white/5 border border-white/20 px-3 py-1.5">
              {user.email}
            </div>
          )}

          <Button
            asChild
            variant="brand"
            size="sm"
            className="h-9 px-3 sm:px-4"
          >
            <Link to="/admin/projects/new" className="inline-flex flex-row items-center gap-1.5 whitespace-nowrap">
              <Plus className="h-4 w-4 shrink-0" />
              <span>New Project</span>
            </Link>
          </Button>

          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="h-9 px-3 border border-white/30 hover:border-white hover:bg-red-600/80 hover:text-white inline-flex flex-row items-center gap-1.5 whitespace-nowrap"
            title="Log out"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

