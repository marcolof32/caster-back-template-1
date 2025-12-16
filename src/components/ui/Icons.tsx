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
      <path
        d="M10 2a1 1 0 0 0-1 1v1H5a1 1 0 0 0 0 2h1v13a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V6h1a1 1 0 1 0 0-2h-4V3a1 1 0 0 0-1-1h-4Zm4 4v13a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6h6Z"
        fill="currentColor"
      />
      <path
        d="M10 9a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1ZM14 9a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"
        fill="currentColor"
      />
    </svg>
  );
};

