import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Icono de Editar (Lápiz)
export const EditIcon: React.FC<IconProps> = ({ size = 20, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.862 3.487a2.5 2.5 0 0 1 3.535 3.536l-1.06 1.06-3.536-3.535 1.061-1.06ZM14.094 6.255l-9.668 9.668a1 1 0 0 0-.263.464l-1.137 4.548a.5.5 0 0 0 .606.606l4.548-1.137a1 1 0 0 0 .464-.263l9.668-9.668-3.536-3.536-.682.682Z"
        fill="currentColor"
      />
    </svg>
  );
};

// Icono de Borrar (Papelera)
export const DeleteIcon: React.FC<IconProps> = ({ size = 20, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#deleteClip)" fill="currentColor">
        <path opacity="0.3" d="M8 9h8v10H8z" />
        <path d="m15.5 4-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8z" />
      </g>
      <defs>
        <clipPath id="deleteClip">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

