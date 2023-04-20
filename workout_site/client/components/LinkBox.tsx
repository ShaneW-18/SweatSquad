import React from 'react';
import Link from 'next/link';
import { BiChevronRight } from 'react-icons/bi';

export default function LinkBox({title, desc, href, image=null}){
    return (
        <Link href={href} className='px-2 py-1 --bg hover:bg-white/10 rounded-md flex items-center gap-2'>
            {image !== null &&
                <div className='rounded-full bg-cover' style={
                    {
                        height: '40px',
                        width:'40px',
                        backgroundImage:`url(${image})`
                    }
                }></div>
            }
            <div className='flex flex-col'>
                <span>{title}</span>
                <span className='text-white/60'>{desc}</span>
            </div>
            <div className='flex items-center ml-auto'>
                <BiChevronRight />
            </div>
        </Link>
    );
}