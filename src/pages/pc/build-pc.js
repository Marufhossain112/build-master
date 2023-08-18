import RootLayout from '@/Layouts/RootLayout';
import React from 'react';

export default function PcBuild() {
    return (
        <div>Building the PC</div>
    );
}
PcBuild.getLayout = function getLayout(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
};