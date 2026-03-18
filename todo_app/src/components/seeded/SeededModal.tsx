'use client';

import { ReactNode } from 'react';
import { isSeedEnabled } from '@/lib/seeds';

interface SeededModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  seedPage: string;
}

export function SeededModal({ isOpen, onClose, title, children, seedPage }: SeededModalProps) {
  const noClose = isSeedEnabled(seedPage, 'modal_no_close');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-gray-900/60 backdrop-blur-sm" 
          aria-hidden="true"
          onClick={noClose ? undefined : onClose}
        />

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h3>
            {!noClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all duration-300"
                aria-label="Close modal"
                data-testid="modal-close-button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
