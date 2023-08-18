import React from 'react';
import RootLayout from '@/Layouts/RootLayout';

export default function Monitor() {
    return (
        <div>monitor</div>
    );
}
Monitor.getLayout = function getLayout(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
};