import React from 'react';
import Content from "../../components/Content";
import Image from 'next/image';
import Link from 'next/link';
import client from '../../db';
import { SEARCH_USERS } from '../../GraphQL/Queries';

export default function Explore({users}){

    return (
        <Content>
            <div className='h-f px-6 py-4'>
                <h1 className='mb-2 text-xl font-semibold'>Explore</h1>
                <div className="grid grid-cols-1">
                    <div className='border border-dg-200 rounded-md p-4'>
                        <h2>Find Users</h2>
                        <div className='h-[1px] w-full bg-dg-200 my-2'>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                            {users.map(e=>{
                                return(
                                    <Link href={`/user/${e.username}`} className='--bg hover:bg-dg-200' key={e.username}>
                                        <div className='px-4 py-2 flex items-center gap-2 border border-dg-300 rounded-md'>
                                            <Image src="https://api.tecesports.com/images/general/user.png" width="30"
                                                height="30" alt="" className='rounded-full' />
                                            <span className='font-semibold'>{e.username}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

 function Post({postData}){

    const imageSrc='https://api.tecesports.com/images/general/user.png';
    const w = 40;
    const h = 40;

    return (
        <div>
            
        </div>
    );
}

export async function getServerSideProps(context){
    let users = [];

    const res = await client.query({
        query: SEARCH_USERS,
        variables: { username: ''}
    });

    const user = res.data.search_all_users.users;

    const temp=user.filter(e => {
        return (!e.username.includes('nig') && e.username);
    });

    return {
        props: {
            users: temp
        }
    }
}