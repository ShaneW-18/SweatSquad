import React from 'react';
import Content from '../../components/Content';
import Link from 'next/link';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { AiOutlineOrderedList, AiOutlineCalendar } from 'react-icons/ai';
import { BsClipboard } from 'react-icons/bs';

export default function Create() {
    return (
        <Content>
            <div className='h-[100vh] flex items-center justify-center flex-col gap-8'>
                <span className='text-2xl font-semibold'>Select an item to create</span>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                    <Link href="/create/track" className='flex flex-col gap-2 items-center border border-dg-400 rounded-md py-4 px-8 hover:bg-dg-200 --bg'>
                        <div className='flex items-center justify-center'>
                            <AiOutlineOrderedList />
                        </div>
                        <div className='flex items-center justify-center font-medium'>
                            <span>Track</span>
                        </div>
                    </Link>
                    <Link href="/create/workout" className='flex flex-col gap-2 items-center border border-dg-400 rounded-md py-4 px-8 hover:bg-dg-200 --bg'>
                        <div className='flex items-center justify-center'>
                            <BsClipboard />
                        </div>
                        <div className='flex items-center justify-center font-medium'>
                            <span>Workout</span>
                        </div>
                    </Link>
                    <Link href="/create/exercise" className='flex flex-col gap-2 items-center border border-dg-400 rounded-md py-4 px-8 hover:bg-dg-200 --bg'>
                        <div className='flex items-center justify-center'>
                            <GiWeightLiftingUp />
                        </div>
                        <div className='flex items-center justify-center font-medium'>
                            <span>Exercise</span>
                        </div>
                    </Link>
                </div>
            </div>
        </Content>
    );
}