import React, { useState } from 'react';
import {GET_USERDATA_BY_USERNAME} from '../../GraphQL/Queries.js'
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import {useRouter } from 'next/router.js';
import Content from "../../components/Content";

export default function User({userData}: any){
    const router = useRouter();
    const { username } = router.query;


    const profileImage = userData.image ?? 'https://api.tecesports.com/images/general/user.png';

    async function followUser(){

    }

    async function unfollowUser(){

    }

    return (
        <Content>
            <div className='h-full grid grid-cols-1 relative'>
                <div className='gym-bg no-h'>
                    
                </div>
                <div className='bg-dg-100'>

                </div>
                <div className='profile-box rounded-md bg-dg-300 '>
                    <div className='w-full h-full relative px-4 py-2'>
                        <div className='profile-image bg-dg-100 rounded-full' style={{backgroundImage: `url(${profileImage})`}}>

                        </div>
                        <div className='flex items-center gap-2'>
                            <button className=' px-3 bg-primary hover:bg-primary-h rounded-md text-sm font-semibold uppercase'>info</button>
                            <button className=' px-3 bg-primary hover:bg-primary-h rounded-md text-sm font-semibold uppercase'>schedules</button>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export async function getServerSideProps(context: any) {
    const { username } = context.query;

    let userData = {};

    const client = new ApolloClient({
        link: createHttpLink({
          uri: "https://workout-dev.swiles.tech",
        }),
        cache: new InMemoryCache(),
    });

    try {
        const { data } = await client.query({
            query: GET_USERDATA_BY_USERNAME,
            variables:{username: username}
        });
        userData = data.get_user_username;
    }
    catch(e){
        console.error(e);
    }

    return {
        props: {
            userData: userData
        }
    }

}