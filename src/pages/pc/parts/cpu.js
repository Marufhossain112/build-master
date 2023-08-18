import RootLayout from '@/Layouts/RootLayout';
import React from 'react';

export default function Cpu() {
  return (
    <div>cpu</div>
  );
}
Cpu.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  );
};
