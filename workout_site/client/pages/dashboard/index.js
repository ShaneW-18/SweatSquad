import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Dashboard() {

    let username = 'user';

    if(typeof window !== 'undefined'){
        username = localStorage.getItem('username');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {username}</p>
            <Link href="/logout">Logout</Link>
        </div>
    );
}