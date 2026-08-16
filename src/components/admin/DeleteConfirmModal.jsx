import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, projectTitle, deleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg brutalist-border bg-[#2A2A29] p-6 text-white shadow-2xl relative">
        <button
          onClick={onClose}
          disabled={deleting}
          className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-red-600/20 border-2 border-red-500 text-red-400 shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display font-black text-xl uppercase tracking-tight text-white">
              Archive Project?
            </h3>
            <p className="text-xs text-white/70 mt-1 font-sans">
              This action will soft-delete and archive <strong className="text-white font-mono">{projectTitle}</strong> from both the admin dashboard and live public portfolio.
            </p>
          </div>
        </div>

        <div className="bg-[#1F1F1E] border-2 border-white/20 p-3 mb-6 text-xs text-white/60 font-mono">
          Note: Soft-deleted projects are safely archived with status = "deleted" and can be restored if needed.
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-white/20">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent animate-spin" />
                Archiving...
              </span>
            ) : (
              'Yes, Archive Project'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
