'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface ClayButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'peach' | 'blue' | 'lavender' | 'mint';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function ClayButton({
  children,
  onClick,
  href,
  variant = 'lavender',
  size = 'md',
  className = '',
  disabled = false,
}: ClayButtonProps) {
  const variantStyles = {
    peach: 'bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] shadow-[8px_8px_16px_rgba(255,162,110,0.3),-6px_-6px_14px_rgba(255,255,255,0.9)]',
    blue: 'bg-gradient-to-br from-[#C8E6F5] to-[#A7D8EA] shadow-[8px_8px_16px_rgba(126,200,227,0.3),-6px_-6px_14px_rgba(255,255,255,0.9)]',
    lavender: 'bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] shadow-[8px_8px_16px_rgba(197,170,255,0.3),-6px_-6px_14px_rgba(255,255,255,0.9)]',
    mint: 'bg-gradient-to-br from-[#B3F5CC] to-[#8DE9B3] shadow-[8px_8px_16px_rgba(102,221,154,0.3),-6px_-6px_14px_rgba(255,255,255,0.9)]',
  };

  const sizeStyles = {
    sm: 'px-6 py-3 text-sm rounded-[20px]',
    md: 'px-8 py-4 text-base rounded-[28px]',
    lg: 'px-12 py-5 text-lg rounded-[32px]',
  };

  const hoverShadows = {
    peach: '10px 10px 20px rgba(255,162,110,0.4), -8px -8px 18px rgba(255,255,255,1)',
    blue: '10px 10px 20px rgba(126,200,227,0.4), -8px -8px 18px rgba(255,255,255,1)',
    lavender: '10px 10px 20px rgba(197,170,255,0.4), -8px -8px 18px rgba(255,255,255,1)',
    mint: '10px 10px 20px rgba(102,221,154,0.4), -8px -8px 18px rgba(255,255,255,1)',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        relative font-bold text-[#6B5B4F]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      whileHover={disabled ? {} : {
        y: -6,
        scale: 1.02,
        boxShadow: hoverShadows[variant],
      }}
      whileTap={disabled ? {} : {
        y: 2,
        scale: 0.98,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
    >
      {children}
    </Component>
  );
}
