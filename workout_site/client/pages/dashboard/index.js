import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';

export default function Dashboard() {

    let username = 'user';

    if(typeof window !== 'undefined'){
        username = localStorage.getItem('username');
    }

    return (
        <>
        <Navbar />
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {username}</p>
            <Link href="/logout">Logout</Link>
        </div>
        </>
    );
}