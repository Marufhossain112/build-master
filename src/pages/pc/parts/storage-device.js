import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
export default function StorageDevice() {
    return (
        <div>storage-device</div>
    );
}
StorageDevice.getLayout = function getLayout(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
};