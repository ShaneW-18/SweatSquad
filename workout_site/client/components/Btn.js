import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';

export default function Btn({children, onClick, className}) {
    const [loading, setLoading] = useState(false);

    const handleClick = async() => {
        setLoading(true);
        await onClick();
        setLoading(false);
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`bg-primary px-3 py-2 rounded-md font-semibold hover:bg-primary-h flex items-center justify-center gap-2 min-w-[120px] ${className}`}>
            {loading && (
                <Oval
                visible={loading}
                height={20}
                width={20}
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
                color="#fff"
                secondaryColor='#ddd'
                strokeWidth={4}
                strokeWidthSecondary={4}/>
            )}
            {!loading && children}
        </button>
    );
}