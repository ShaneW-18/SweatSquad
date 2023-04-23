import React from 'react';
import Navbar from './navbar';

export default function Content({children}: any) {
    return (
        <div className="flex h-screen">
        <Navbar />
            <div className="flex-1 bg-gray-100">
                {children}
            </div>
        </div>
    );
}