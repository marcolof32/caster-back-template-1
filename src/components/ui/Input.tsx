import React, { forwardRef } from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    const wrapperClasses = [
      'input-wrapper',
      fullWidth && 'input-wrapper--full-width',
      className
    ].filter(Boolean).join(' ');

    const containerClasses = [
      'input-container',
      hasError && 'input-container--error',
      leftIcon && 'input-container--with-left-icon',
      rightIcon && 'input-container--with-right-icon',
      props.disabled && 'input-container--disabled'
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}
        <div className={containerClasses}>
          {leftIcon && (
            <span className="input-icon input-icon--left">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className="input"
            {...props}
          />
          {rightIcon && (
            <span className="input-icon input-icon--right">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <span className="input-error">{error}</span>
        )}
        {!error && helperText && (
          <span className="input-helper">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
