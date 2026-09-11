import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white border border-cyan-500/50 shadow-sm shadow-cyan-900/30',
    secondary:
      'bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-200 border border-slate-700',
    danger:
      'bg-red-600 hover:bg-red-500 active:bg-red-700 text-white border border-red-500/50 shadow-sm shadow-red-900/30',
    outline:
      'bg-transparent hover:bg-slate-800 active:bg-slate-850 text-cyan-400 border border-cyan-600/60',
    ghost:
      'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white border border-transparent',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center font-medium rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};
