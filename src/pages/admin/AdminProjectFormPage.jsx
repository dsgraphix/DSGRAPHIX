import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Upload, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';

export function AdminProjectFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    category: 'UI/UX',
    result: '',
    excerpt: '',
    image: '',
    display_order: 0,
    status: 'published'
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loadingProject, setLoadingProject] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch project details in Edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/admin/projects/${id}`);
        if (!res.ok) throw new Error('Project not found');
        const data = await res.json();
        const p = data.data;
        setFormData({
          title: p.title || '',
          slug: p.slug || '',
          client: p.client || '',
          category: p.category || 'UI/UX',
          result: p.result || '',
          excerpt: p.excerpt || '',
          image: p.image || '',
          display_order: p.display_order ?? 0,
          status: p.status || 'published'
        });
        setImagePreview(p.image || '');
      } catch (err) {
        toast.error('Failed to load project details');
        navigate('/admin/projects');
      } finally {
        setLoadingProject(false);
      }
    };

    fetchProject();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be under 5MB');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    // Client-side quick check
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.client.trim()) errors.client = 'Client is required';
    if (!formData.excerpt.trim()) errors.excerpt = 'Excerpt is required';
    if (!isEditMode && !imageFile && !formData.image) {
      errors.image = 'Image file or path is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Please fix the form errors before submitting');
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      if (formData.slug) data.append('slug', formData.slug);
      data.append('client', formData.client);
      data.append('category', formData.category);
      data.append('result', formData.result);
      data.append('excerpt', formData.excerpt);
      data.append('display_order', formData.display_order);
      data.append('status', formData.status);

      if (imageFile) {
        data.append('imageFile', imageFile);
      } else if (formData.image) {
        data.append('image', formData.image);
      }

      const url = isEditMode ? `/api/admin/projects/${id}` : '/api/admin/projects';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: data
      });

      const responseData = await res.json();
      if (!res.ok) {
        if (responseData.details) {
          setValidationErrors(responseData.details);
        }
        throw new Error(responseData.error || 'Failed to save project');
      }

      toast.success(isEditMode ? 'Project updated successfully!' : 'New project created successfully!');
      navigate('/admin/projects');
    } catch (err) {
      toast.error(err.message || 'An error occurred while saving');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProject) {
    return (
      <div className="min-h-screen bg-[#2A2A29] text-white flex flex-col">
        <AdminHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-10 h-10 border-4 border-[#FF6636] border-t-transparent animate-spin mb-4" />
          <p className="font-display font-bold uppercase text-sm">Loading Project Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2A2A29] text-white flex flex-col">
      <AdminHeader />

      <main className="flex-1 container-page py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-white pb-6">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-10 px-3"
            >
              <Link to="/admin/projects">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <div>
              <div className="eyebrow mb-1">
                <span className="h-px w-8 bg-[#FF6636]" />
                {isEditMode ? 'Edit Case Study' : 'New Case Study'}
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
                {isEditMode ? `Edit: ${formData.title || 'Project'}` : 'Create Portfolio Project'}
              </h1>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="brutalist-border bg-[#2A2A29] p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Text Data */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Project Title <span className="text-[#FF6636]">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Rebuilding a fintech app"
                    required
                    className={`w-full bg-[#1F1F1E] border-2 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-colors ${
                      validationErrors.title ? 'border-red-500' : 'border-white focus:border-[#FF6636]'
                    }`}
                  />
                  {validationErrors.title && (
                    <p className="text-xs text-red-400 mt-1 font-mono">{validationErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-white mb-2">
                    URL Slug <span className="text-white/40 font-normal">(Optional, auto-slugify)</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="fintech-app-redesign"
                    className="w-full bg-[#1F1F1E] border-2 border-white px-4 py-3 text-sm font-mono text-white placeholder-white/40 focus:outline-none focus:border-[#FF6636]"
                  />
                </div>
              </div>

              {/* Client & Category & Result */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Client Name <span className="text-[#FF6636]">*</span>
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    placeholder="e.g. Paylane"
                    required
                    className={`w-full bg-[#1F1F1E] border-2 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-colors ${
                      validationErrors.client ? 'border-red-500' : 'border-white focus:border-[#FF6636]'
                    }`}
                  />
                  {validationErrors.client && (
                    <p className="text-xs text-red-400 mt-1 font-mono">{validationErrors.client}</p>
                  )}
                </div>

                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Category <span className="text-[#FF6636]">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#1F1F1E] border-2 border-white px-4 py-3 text-sm font-display font-bold uppercase text-white focus:outline-none focus:border-[#FF6636] cursor-pointer"
                  >
                    <option value="UI/UX">UI/UX</option>
                    <option value="Branding">Branding</option>
                    <option value="Graphic">Graphic</option>
                    <option value="Video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Key Outcome Metric
                  </label>
                  <input
                    type="text"
                    name="result"
                    value={formData.result}
                    onChange={handleChange}
                    placeholder="e.g. +52% checkout completion"
                    className="w-full bg-[#1F1F1E] border-2 border-white px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FF6636]"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-display text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Case Study Excerpt / Summary <span className="text-[#FF6636]">*</span>
                </label>
                <textarea
                  name="excerpt"
                  rows={4}
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Detailed summary describing the challenge, approach, and impact delivered..."
                  required
                  className={`w-full bg-[#1F1F1E] border-2 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-colors ${
                    validationErrors.excerpt ? 'border-red-500' : 'border-white focus:border-[#FF6636]'
                  }`}
                />
                {validationErrors.excerpt && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{validationErrors.excerpt}</p>
                )}
              </div>

              {/* Display Order & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-white/10">
                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Display Order Sequence
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleChange}
                    className="w-full bg-[#1F1F1E] border-2 border-white px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#FF6636]"
                  />
                  <p className="text-[11px] text-white/50 mt-1 font-mono">Lower numbers appear first on portfolio pages.</p>
                </div>

                <div>
                  <label className="block font-display text-xs font-bold uppercase tracking-wider text-white mb-2">
                    Publishing Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-[#1F1F1E] border-2 border-white px-4 py-3 text-sm font-display font-bold uppercase text-white focus:outline-none focus:border-[#FF6636] cursor-pointer"
                  >
                    <option value="published">Published (Visible Publicly)</option>
                    <option value="draft">Draft (Hidden Publicly)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Image Upload & Live Preview */}
            <div className="space-y-6">
              <label className="block font-display text-xs font-bold uppercase tracking-wider text-white">
                Project Image <span className="text-[#FF6636]">*</span>
              </label>

              {/* Live Preview Box */}
              <div className="brutalist-border bg-black aspect-video relative overflow-hidden flex items-center justify-center group">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/fintech_app.png';
                    }}
                  />
                ) : (
                  <div className="text-center p-6 text-white/40 flex flex-col items-center">
                    <ImageIcon className="h-10 w-10 mb-2 opacity-50 text-[#FF6636]" />
                    <p className="font-display text-xs font-bold uppercase">No Image Selected</p>
                    <p className="text-[11px] mt-1 font-mono text-white/40">JPG, PNG, WEBP up to 5MB</p>
                  </div>
                )}
              </div>

              {/* File Upload Input */}
              <div className="space-y-3">
                <label className="cursor-pointer block">
                  <div className="border-2 border-dashed border-white hover:border-[#FF6636] bg-[#1F1F1E] p-4 text-center transition-colors">
                    <Upload className="h-5 w-5 text-[#FF6636] mx-auto mb-1" />
                    <span className="font-display text-xs font-bold uppercase text-white">
                      {imageFile ? imageFile.name : 'Upload New Image File'}
                    </span>
                    <p className="text-[11px] text-white/50 mt-0.5 font-mono">Click to browse or drag image</p>
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>

                {validationErrors.image && (
                  <p className="text-xs text-red-400 font-mono">{validationErrors.image}</p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t-2 border-white">
            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link to="/admin/projects" className="inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap">Cancel</Link>
            </Button>
            <Button
              type="submit"
              variant="brand"
              size="lg"
              disabled={submitting}
              className="min-w-[160px] inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap"
            >
              {submitting ? (
                <span className="flex flex-row items-center gap-2 whitespace-nowrap">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent animate-spin shrink-0" />
                  <span>Saving...</span>
                </span>
              ) : (
                <span className="flex flex-row items-center gap-2 whitespace-nowrap">
                  <Save className="h-4 w-4 shrink-0" />
                  <span>{isEditMode ? 'Update Project' : 'Save & Publish'}</span>
                </span>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

