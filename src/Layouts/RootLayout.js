import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function RootLayout({ children }) {
    return (
        <>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </>
    );
}
