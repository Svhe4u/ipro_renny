// src/pages/SomePage.tsx

'use client';  // Ensure this page is a Client Component too

import React from 'react';
import Button from '@/components/ui/button';

const SomePage: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <Button onClick={handleClick}>Click Me</Button>
    </div>
  );
};

export default SomePage;

