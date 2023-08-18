import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
export default function Motherboard() {
  return (
    <div>motherboard</div>
  );
}
Motherboard.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  );
};