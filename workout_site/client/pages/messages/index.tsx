import React from 'react';
import Content from '../../components/Content';
import { GET_CONVERSATIONS } from '../../GraphQL/Queries.js'
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';
import { ImSad } from 'react-icons/im';
import ConvoSideBar from '../../components/ConvoSideBar';
import client from '../../db';

export default function Messages({conversations}){
    const hasConvos = conversations.length>0;

    return (
        <Content>
            {hasConvos ? (
                <div className='h-f grid grid-cols-13'>
                    <ConvoSideBar conversations={conversations} />
                    <div className='border-l border-dg-200 h-f'>
                        <span className='justify-center flex items-center text-xl text-white/70 font-semibold h-f'>Select a conversation</span>
                    </div>
                </div>
            ) : (
                <div className='h-f justify-center flex items-center text-xl text-white/70 font-semibold flex-col gap-4'>
                    <div className='text-[60px]'>
                        <ImSad />
                    </div>
                    <p>No conversations found</p>
                    <Link href='/explore' className='font-normal text-lg flex items-center gap-2 underline'>
                        Click here to find users
                        <BiLinkExternal />
                    </Link>
                </div>
            )}
        </Content>
    );
}

export async function getServerSideProps(context){
    const session = await getSession(context);
    const userId = session.user['userId'];
    let conversations=[];
    
    try {
        const res = await client.query({
            query:GET_CONVERSATIONS,
            variables:{userId:userId}
        });
        conversations=res.data.User.user.conversations ?? [];
    } catch(e){
        console.log('ERROR [/messages]', e);
    }

    return {
        props: {
            conversations:conversations
        }
    }
}