import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Trash2, Star, Plus, Layers, AlertCircle, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { InstagramCarousel } from '@/components/site/InstagramCarousel';
import { authFetch } from '@/context/AuthContext';

const MAX_IMAGES_PER_PROJECT = 10;

export function AdminProjectFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    category: 'UI/UX',
    result: '',
    excerpt: '',
    display_order: 0,
    status: 'published'
  });

  // Array of image items: { id: string, url: string, file?: File, isNew?: boolean }
  const [imageList, setImageList] = useState([]);
  const [loadingProject, setLoadingProject] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Drag-and-drop state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Fetch project details in Edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const fetchProject = async () => {
      try {
        const res = await authFetch(`/api/admin/projects/${id}`);
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
          display_order: p.display_order ?? 0,
          status: p.status || 'published'
        });

        // Parse existing images (up to 10)
        let loadedImages = [];
        if (Array.isArray(p.images) && p.images.length > 0) {
          loadedImages = p.images.slice(0, MAX_IMAGES_PER_PROJECT);
        } else if (p.image) {
          loadedImages = [p.image];
        }

        setImageList(
          loadedImages.map((url, idx) => ({
            id: `existing-${idx}-${Date.now()}`,
            url,
            isNew: false
          }))
        );
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

  // Handle multiple image selection
  const handleMultipleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const availableSlots = MAX_IMAGES_PER_PROJECT - imageList.length;
    if (availableSlots <= 0) {
      toast.error(`Maximum limit of ${MAX_IMAGES_PER_PROJECT} images reached for this project.`);
      return;
    }

    const filesToAdd = files.slice(0, availableSlots);
    if (files.length > availableSlots) {
      toast.warning(`Only ${availableSlots} more image(s) added to stay within the ${MAX_IMAGES_PER_PROJECT}-image limit.`);
    }

    filesToAdd.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`Image ${file.name} exceeds 5MB limit`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageList(prev => {
          if (prev.length >= MAX_IMAGES_PER_PROJECT) return prev;
          return [
            ...prev,
            {
              id: `new-${Date.now()}-${Math.random()}`,
              url: reader.result,
              file,
              isNew: true
            }
          ];
        });
      };
      reader.readAsDataURL(file);
    });

    if (validationErrors.image) {
      setValidationErrors(prev => ({ ...prev, image: null }));
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageList(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleMakeCover = (indexToCover) => {
    if (indexToCover === 0) return;
    setImageList(prev => {
      const copy = [...prev];
      const [item] = copy.splice(indexToCover, 1);
      copy.unshift(item);
      return copy;
    });
    toast.success('Cover image set to position #1');
  };

  const handleMoveStep = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= imageList.length) return;
    setImageList(prev => {
      const copy = [...prev];
      const [movedItem] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, movedItem);
      return copy;
    });
  };

  // Drag-and-drop Handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = draggedIndex !== null ? draggedIndex : parseInt(e.dataTransfer.getData('text/plain'), 10);
    
    if (isNaN(sourceIndex) || sourceIndex === targetIndex || sourceIndex < 0 || sourceIndex >= imageList.length) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    setImageList(prev => {
      const copy = [...prev];
      const [movedItem] = copy.splice(sourceIndex, 1);
      copy.splice(targetIndex, 0, movedItem);
      return copy;
    });

    setDraggedIndex(null);
    setDragOverIndex(null);
    toast.success(`Image moved to position #${targetIndex + 1}`);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.client.trim()) errors.client = 'Client is required';
    if (!formData.excerpt.trim()) errors.excerpt = 'Excerpt is required';
    if (imageList.length === 0) {
      errors.image = 'At least 1 project image is required (up to 10 max)';
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

      // Separate existing remote URLs and new binary File objects
      const existingUrls = imageList
        .filter(img => !img.isNew && typeof img.url === 'string' && !img.url.startsWith('data:'))
        .map(img => img.url);

      data.append('images', JSON.stringify(existingUrls));

      // Append new files
      const newFiles = imageList.filter(img => img.isNew && img.file);
      newFiles.forEach(img => {
        data.append('imageFiles', img.file);
      });

      const url = isEditMode ? `/api/admin/projects/${id}` : '/api/admin/projects';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await authFetch(url, {
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

  const previewUrls = imageList.map(img => img.url);

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: Text Data */}
            <div className="lg:col-span-7 space-y-6">
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
                    className={`w-full bg-[#1F1F1E] border-2 px-4 py-3 text-sm font-mono text-white placeholder-white/40 focus:outline-none transition-colors ${
                      validationErrors.slug ? 'border-red-500' : 'border-white focus:border-[#FF6636]'
                    }`}
                  />
                  {validationErrors.slug && (
                    <p className="text-xs text-red-400 mt-1 font-mono">{validationErrors.slug}</p>
                  )}
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

            {/* Right 5 Cols: Multi-Image Manager & Instagram Carousel Preview */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between border-b-2 border-white/20 pb-3">
                <div>
                  <label className="block font-display text-sm font-bold uppercase tracking-wider text-white">
                    Project Gallery <span className="text-[#FF6636]">*</span>
                  </label>
                  <p className="text-[11px] font-mono text-slate-300">
                    Upload multiple images (Limit: {MAX_IMAGES_PER_PROJECT} images)
                  </p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-mono font-bold brutalist-border ${
                  imageList.length >= MAX_IMAGES_PER_PROJECT
                    ? 'bg-[#FF6636] text-[#2A2A29]'
                    : 'bg-[#1F1F1E] text-white'
                }`}>
                  {imageList.length} / {MAX_IMAGES_PER_PROJECT}
                </span>
              </div>

              {/* Instagram-Style Live Preview Carousel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-display font-bold uppercase text-[#FF6636] flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" />
                    Live Instagram Carousel Preview
                  </span>
                  {imageList.length > 0 && (
                    <span className="text-[11px] text-slate-300 font-mono">Image #1 is Cover</span>
                  )}
                </div>

                <div className="brutalist-border overflow-hidden bg-black shadow-xl">
                  {imageList.length > 0 ? (
                    <InstagramCarousel
                      images={previewUrls}
                      aspectRatio="aspect-16/10"
                      showBadge={true}
                    />
                  ) : (
                    <div className="aspect-16/10 bg-[#1F1F1E] flex flex-col items-center justify-center p-6 text-center text-white/40">
                      <ImageIcon className="h-12 w-12 mb-2 text-[#FF6636] opacity-40" />
                      <p className="font-display text-xs font-bold uppercase">No Images Uploaded Yet</p>
                      <p className="text-[11px] font-mono mt-1 text-white/40">Upload 1 to 10 images below</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Multi-File Upload Drop Zone */}
              <div className="space-y-3">
                <label className={`block ${imageList.length >= MAX_IMAGES_PER_PROJECT ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                  <div className="border-2 border-dashed border-white hover:border-[#FF6636] bg-[#1F1F1E] p-4 text-center transition-colors">
                    <Upload className="h-6 w-6 text-[#FF6636] mx-auto mb-1.5" />
                    <span className="font-display text-xs font-bold uppercase text-white block">
                      {imageList.length >= MAX_IMAGES_PER_PROJECT
                        ? `Maximum Limit of ${MAX_IMAGES_PER_PROJECT} Images Reached`
                        : `Click or Drag to Upload Images (${MAX_IMAGES_PER_PROJECT - imageList.length} slots left)`}
                    </span>
                    <p className="text-[11px] text-white/50 mt-0.5 font-mono">JPG, PNG, WEBP, GIF up to 5MB each</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    onChange={handleMultipleFilesChange}
                    disabled={imageList.length >= MAX_IMAGES_PER_PROJECT}
                    className="hidden"
                  />
                </label>

                {validationErrors.image && (
                  <p className="text-xs text-red-400 font-mono">{validationErrors.image}</p>
                )}
              </div>

              {/* Image Thumbnails Grid with Drag-and-Drop Reorder & Independent Isolated Scroll */}
              {imageList.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold uppercase text-slate-300">
                      Reorder Images ({imageList.length})
                    </span>
                    <span className="text-[11px] text-[#FF6636] font-mono">
                      Drag & Drop to reorder or click Cover
                    </span>
                  </div>

                  {/* Isolated Scroll Container with data-lenis-prevent to stop main window scroll */}
                  <div
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto overscroll-contain p-2 brutalist-border bg-[#1F1F1E]"
                    style={{ overscrollBehavior: 'contain' }}
                  >
                    {imageList.map((item, idx) => {
                      const isDragging = draggedIndex === idx;
                      const isDragOver = dragOverIndex === idx && draggedIndex !== idx;

                      return (
                        <div
                          key={item.id}
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, idx)}
                          onDragOver={(e) => handleDragOver(e, idx)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, idx)}
                          onDragEnd={handleDragEnd}
                          className={`relative group aspect-square brutalist-border overflow-hidden bg-black transition-all cursor-grab active:cursor-grabbing ${
                            idx === 0 ? 'ring-2 ring-[#FF6636]' : ''
                          } ${isDragging ? 'opacity-40 scale-95 border-dashed border-[#FF6636]' : ''} ${
                            isDragOver ? 'scale-105 border-2 border-[#FF6636] ring-4 ring-[#FF6636]/40 shadow-2xl' : ''
                          }`}
                        >
                          <img
                            src={item.url}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover pointer-events-none"
                            onError={(e) => {
                              e.target.src = '/assets/fintech_app.png';
                            }}
                          />

                          {/* Badges */}
                          <div className="absolute top-1 left-1 z-10 flex items-center gap-1">
                            {idx === 0 ? (
                              <span className="px-1.5 py-0.5 bg-[#FF6636] text-[#2A2A29] font-mono text-[9px] font-black uppercase shadow">
                                Cover
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 bg-[#2A2A29]/90 text-white font-mono text-[9px] font-bold">
                                #{idx + 1}
                              </span>
                            )}
                          </div>

                          {/* Drag Handle Icon Indicator */}
                          <div className="absolute top-1 right-1 z-10 p-1 bg-black/60 rounded text-white/80 group-hover:text-white">
                            <GripVertical className="h-3 w-3" />
                          </div>

                          {/* Hover Overlay Actions */}
                          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-2">
                            {/* Reorder Left / Right quick arrows */}
                            <div className="flex items-center justify-between w-full">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveStep(idx, idx - 1);
                                }}
                                title="Move Left"
                                className={`p-1 bg-[#2A2A29] text-white hover:bg-[#FF6636] hover:text-[#2A2A29] transition-colors cursor-pointer ${
                                  idx === 0 ? 'opacity-20 cursor-not-allowed' : ''
                                }`}
                              >
                                <ChevronLeft className="h-3 w-3" />
                              </button>

                              <button
                                type="button"
                                disabled={idx === imageList.length - 1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveStep(idx, idx + 1);
                                }}
                                title="Move Right"
                                className={`p-1 bg-[#2A2A29] text-white hover:bg-[#FF6636] hover:text-[#2A2A29] transition-colors cursor-pointer ${
                                  idx === imageList.length - 1 ? 'opacity-20 cursor-not-allowed' : ''
                                }`}
                              >
                                <ChevronRight className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Middle / Bottom Action Buttons */}
                            <div className="flex items-center gap-2">
                              {idx !== 0 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMakeCover(idx);
                                  }}
                                  title="Make Primary Cover"
                                  className="p-1.5 bg-[#FF6636] text-[#2A2A29] hover:bg-white transition-colors cursor-pointer text-[10px] font-bold uppercase flex items-center gap-1"
                                >
                                  <Star className="h-3.5 w-3.5 fill-current" />
                                  Cover
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveImage(idx);
                                }}
                                title="Delete image"
                                className="p-1.5 bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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
