import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
export default function Others() {
    return (
        <div>others</div>
    );
}
Others.getLayout = function getLayout(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
};