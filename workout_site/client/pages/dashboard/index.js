import React, { useState, useEffect } from 'react';

export default function Dashboard() {

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {localStorage.getItem('username')}</p>
        </div>
    );
}