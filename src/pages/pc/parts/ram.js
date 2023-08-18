import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
export default function Ram() {
  return (
    <div>ram</div>
  );
}
Ram.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  );
};