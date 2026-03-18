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
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          aria-hidden="true"
          onClick={noClose ? undefined : onClose}
        />

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {!noClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Close modal"
                data-testid="modal-close-button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
