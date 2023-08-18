import React from 'react';
import RootLayout from '@/Layouts/RootLayout';
export default function PowerSupply() {
    return (
        <div>power-supply</div>
    );
}
PowerSupply.getLayout = function getLayout(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
};