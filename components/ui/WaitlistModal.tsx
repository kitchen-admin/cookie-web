"use client";

import React from "react";

// Success modal that appears after a successful waitlist signup.
// Controlled by isOpen/onClose props from the parent (app/page.tsx).

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  // Close when clicking the dark backdrop (outside the modal box)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`modal-overlay fixed inset-0 w-screen h-screen bg-black/50 flex items-center justify-center z-9999 backdrop-blur-xs ${
        isOpen ? "modal-overlay--active" : ""
      }`}
      aria-hidden={!isOpen}
      onClick={handleBackdropClick}
    >
      <div className="modal-box relative bg-white px-6 py-16 rounded-4xl max-w-[400px] w-[90%] text-center shadow-[0_20px_48px_rgba(0,0,0,0.2)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-[2rem] leading-none bg-transparent border-0 cursor-pointer text-text-secondary transition-colors duration-200 ease-out hover:text-text-primary"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Content */}
        <div className="text-[3.5rem] mb-4 leading-none">🎉</div>
        <h3 className="text-2xl font-extrabold text-orange-900 mb-2 tracking-tight">
          You&apos;re on the waitlist!
        </h3>
        <p className="text-base font-normal text-text-secondary leading-normal">
          Keep an eye on your inbox. We&apos;ll be in touch soon.
        </p>
      </div>
    </div>
  );
}
