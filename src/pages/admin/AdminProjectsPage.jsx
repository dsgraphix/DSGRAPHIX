import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { Button } from '@/components/ui/button';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  FolderKanban
} from 'lucide-react';

export function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== 'All') params.append('category', categoryFilter);
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/admin/projects?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load projects');
      const data = await res.json();
      setProjects(data.data || []);
    } catch (err) {
      toast.error('Failed to load portfolio case studies');
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, statusFilter, search]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleToggleStatus = async (project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    setUpdatingId(project.id);
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Status update failed');
      
      // Refresh to get normalized display order and fresh data
      await fetchProjects();
      toast.success(`Project "${project.title}" status changed to ${newStatus.toUpperCase()}`);
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOrderChange = async (project, newOrder) => {
    const parsedOrder = parseInt(newOrder, 10);
    if (isNaN(parsedOrder) || parsedOrder < 1) return;

    setUpdatingId(project.id);
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ display_order: parsedOrder })
      });
      if (!res.ok) throw new Error('Reorder failed');

      // Refresh to reflect smart normalized sequence 1, 2, 3...
      await fetchProjects();
      toast.success(`Display order updated`);
    } catch (err) {
      toast.error('Failed to update order');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${deleteTarget.id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Delete failed');

      toast.success(`Archived project "${deleteTarget.title}". Orders re-indexed automatically!`);
      setDeleteTarget(null);
      await fetchProjects();
    } catch (err) {
      toast.error('Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2A2A29] text-white flex flex-col">
      <AdminHeader />

      <main className="flex-1 container-page py-8 space-y-8">
        {/* Top Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-white pb-6">
          <div>
            <div className="eyebrow mb-2">
              <span className="h-px w-8 bg-[#FF6636]" />
              Portfolio CMS Dashboard
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-white">
              Projects & Case Studies
            </h1>
            <p className="text-sm text-white/70 mt-1 font-sans">
              Manage, publish, reorder and edit all portfolio items displayed on the public site.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              onClick={fetchProjects}
              variant="outline"
              size="sm"
              className="h-10 px-4 inline-flex flex-row items-center gap-2 whitespace-nowrap"
              title="Refresh project list"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
            <Button
              asChild
              variant="brand"
              size="lg"
              className="h-10 px-5 inline-flex flex-row items-center gap-2 whitespace-nowrap"
            >
              <Link to="/admin/projects/new">
                <Plus className="h-4 w-4" />
                <span>Add New Case Study</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="brutalist-border bg-[#2A2A29] p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-white/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by project title, client or keywords..."
              className="w-full bg-[#1F1F1E] border-2 border-white pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FF6636] transition-colors"
            />
          </div>

          {/* Category & Status Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#1F1F1E] border-2 border-white px-3 py-1.5">
              <Filter className="h-4 w-4 text-[#FF6636]" />
              <span className="font-display text-xs font-bold uppercase tracking-wider text-white/70">Cat:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent text-xs font-display font-bold uppercase text-white focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#2A2A29]">All Categories</option>
                <option value="UI/UX" className="bg-[#2A2A29]">UI/UX</option>
                <option value="Branding" className="bg-[#2A2A29]">Branding</option>
                <option value="Graphic" className="bg-[#2A2A29]">Graphic</option>
                <option value="Video" className="bg-[#2A2A29]">Video</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-[#1F1F1E] border-2 border-white px-3 py-1.5">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-white/70">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs font-display font-bold uppercase text-white focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#2A2A29]">All Statuses</option>
                <option value="published" className="bg-[#2A2A29]">Published</option>
                <option value="draft" className="bg-[#2A2A29]">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Table / Cards */}
        {loading ? (
          <div className="brutalist-border bg-[#2A2A29] p-12 text-center flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#FF6636] border-t-transparent animate-spin mb-4" />
            <p className="font-display font-bold uppercase text-sm tracking-wider">Fetching Projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="brutalist-border bg-[#2A2A29] p-12 text-center">
            <FolderKanban className="h-12 w-12 text-[#FF6636] mx-auto mb-3 opacity-60" />
            <h3 className="font-display font-black text-xl uppercase tracking-tight">No Projects Found</h3>
            <p className="text-xs text-white/60 mt-1 max-w-md mx-auto">
              No matching case studies found with current filters. Try clearing your search query or add a new project.
            </p>
            <Button
              asChild
              variant="brand"
              size="sm"
              className="mt-6 inline-flex flex-row items-center gap-2"
            >
              <Link to="/admin/projects/new">
                <Plus className="h-4 w-4" />
                <span>Create First Project</span>
              </Link>
            </Button>
          </div>
        ) : (
          <div className="brutalist-border bg-[#2A2A29] overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[768px]">
              <thead>
                <tr className="border-b-2 border-white bg-[#1F1F1E] font-display text-xs font-black uppercase tracking-wider text-white">
                  <th className="py-4 px-4 w-16 text-center">Order</th>
                  <th className="py-4 px-4 w-24">Media</th>
                  <th className="py-4 px-6">Title & Client</th>
                  <th className="py-4 px-4 text-center">Category</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-white/10 text-sm">
                {projects.map((project, index) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    {/* Order Input (Smart sequential re-indexing) */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        key={`${project.id}-${project.display_order}`}
                        defaultValue={project.display_order || (index + 1)}
                        onBlur={(e) => handleOrderChange(project, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleOrderChange(project, e.currentTarget.value);
                            e.currentTarget.blur();
                          }
                        }}
                        className="w-12 bg-[#1F1F1E] border-2 border-white/50 text-center py-1 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#FF6636]"
                        title="Edit sequence number, then press Enter or click outside"
                      />
                    </td>

                    {/* Image Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-16 h-12 brutalist-border bg-black overflow-hidden relative group/thumb">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/fintech_app.png';
                          }}
                        />
                      </div>
                    </td>

                    {/* Title & Client */}
                    <td className="py-3 px-6">
                      <div className="font-display font-bold uppercase tracking-tight text-white group-hover:text-[#FF6636] transition-colors line-clamp-1">
                        {project.title}
                      </div>
                      <div className="text-xs text-white/60 font-sans flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-white/90">Client: {project.client}</span>
                        {project.result && (
                          <span className="text-[#FF6636] font-mono text-[11px]">[{project.result}]</span>
                        )}
                      </div>
                    </td>

                    {/* Category Box (Styled matching Status column) */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-display font-bold uppercase tracking-wider border-2 border-white/60 bg-white/5 text-white whitespace-nowrap min-w-[100px]">
                        {project.category}
                      </span>
                    </td>

                    {/* Status Badge (Clickable with hover highlight & cursor indicator) */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(project)}
                        disabled={updatingId === project.id}
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-display font-bold uppercase border-2 cursor-pointer transition-all duration-200 hover:scale-[1.03] select-none whitespace-nowrap min-w-[120px] ${
                          project.status === 'published'
                            ? 'bg-[#FF6636]/20 border-[#FF6636] text-[#FF6636] hover:bg-[#FF6636] hover:text-[#2A2A29]'
                            : 'bg-white/10 border-white/40 text-white/70 hover:border-white hover:bg-white hover:text-[#2A2A29]'
                        }`}
                        title="Click to toggle status between Published and Draft"
                      >
                        {updatingId === project.id ? (
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        ) : project.status === 'published' ? (
                          <Eye className="h-3.5 w-3.5 shrink-0" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5 shrink-0" />
                        )}
                        <span>{project.status}</span>
                      </button>
                    </td>

                    {/* Action Buttons (Clean horizontal layout, no vertical stacking) */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Button */}
                        <Link
                          to={`/admin/projects/${project.id}/edit`}
                          className="inline-flex flex-row items-center justify-center gap-1.5 px-3 py-1.5 border-2 border-white bg-transparent text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-[#2A2A29] transition-colors cursor-pointer whitespace-nowrap"
                          title="Edit project details"
                        >
                          <Edit className="h-3.5 w-3.5 shrink-0" />
                          <span>Edit</span>
                        </Link>

                        {/* Delete Icon Button */}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(project)}
                          className="inline-flex flex-row items-center justify-center w-8 h-8 border-2 border-red-500 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors cursor-pointer shrink-0"
                          title="Archive / Delete project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Soft Delete Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        projectTitle={deleteTarget?.title}
        deleting={deleting}
      />
    </div>
  );
}
