import React from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
    const router= useRouter();

    if (typeof window !== 'undefined'){
        localStorage.removeItem('username');
        router.push('/');
    }

    return <></>;
}