import React from 'react';
import Content from "../../components/Content";
import Image from 'next/image';
import Link from 'next/link';

export default function Explore(){
    return (
        <Content>
            <div className='h-f px-6 py-4'>
                <h1 className='mb-2 text-xl font-semibold'>Explore</h1>
                <div className="grid grid-cols-1 md:grid-cols-23 gap-2">
                    <div className='border border-dg-200 rounded-md p-4'>
                        <h2>Feed</h2>
                        <div className='h-[1px] w-full bg-dg-200 my-2'></div>
                    </div>
                    <div className='border border-dg-200 rounded-md p-4'>
                        <h2>Users</h2>
                        <div className='h-[1px] w-full bg-dg-200 my-2'></div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export function Post({postData}){

    const imageSrc='https://api.tecesports.com/images/general/user.png';
    const w = 40;
    const h = 40;

    return (
        <div>
            
        </div>
    );
}