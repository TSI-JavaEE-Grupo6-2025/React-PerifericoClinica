import React from 'react';
import { GlobalStyles } from '../../styles/styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = GlobalStyles.components.button.base;
  
  const variants = {
    default: GlobalStyles.components.button.primary,
    secondary: GlobalStyles.components.button.secondary,
    outline: GlobalStyles.components.button.outline,
    ghost: GlobalStyles.components.button.ghost
  };
  
  const sizes = {
    default: GlobalStyles.components.button.sizes.default,
    sm: GlobalStyles.components.button.sizes.sm,
    lg: GlobalStyles.components.button.sizes.lg
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
