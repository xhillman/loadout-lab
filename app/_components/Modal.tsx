"use client";

import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  width?: "sm" | "md" | "lg";
};

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children,
  width = "sm" 
}: ModalProps) {
  if (!isOpen) return null;

  const widthClasses = {
    sm: "min-w-[340px]",
    md: "min-w-[360px] max-w-[400px]",
    lg: "min-w-[400px] max-w-[500px]",
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${widthClasses[width]} rounded-xl p-6 bg-card-base border border-border-soft shadow-2xl`}>
        <h1 className="text-xl font-bold text-text-primary mb-1">{title}</h1>
        {description && (
          <p className="text-text-secondary text-sm mb-5">{description}</p>
        )}
        {children}
      </div>
    </>
  );
}
