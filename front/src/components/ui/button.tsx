// src/components/ui/button.tsx

'use client';  // This marks the component as a Client Component

import React from 'react';

const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
