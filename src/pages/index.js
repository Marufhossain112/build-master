// import RootLayout from '@/Layouts/RooqqtLayout';
import RootLayout from '@/Layouts/RootLayout';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function Home() {
  return (
    <div className='h-[100vh]'>Home
    </div>
  );
}
Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};