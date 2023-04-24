import Link from 'next/link';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import Router from 'next/router';

export default function ConvoSideBar({conversations, currentId=null}){

    const getPreviewMsg = (convoId) => {
        const index = conversations.map(e=>e.conversationId).indexOf(convoId);
        const msgs=conversations[index].messages;
        if(convoId===-1||msgs.length<=0){
            return '[No messages]';
        }
        return msgs[msgs.length-1].message;
    }

    const routerReplace = (convoId) => {
        Router.replace(`/messages/${convoId}`);
    }

    return (
            <div className=''>
                <div className='px-4 py-2'>
                    <h1 className='text-xl font-semibold'>Conversations</h1>
                </div>
                {conversations.map((e,index) => {
                    const convoId = e.conversationId;
                    const bgColor = currentId === convoId ? 'bg-dg-200 block' : '';
                    return(
                        <div onClick={()=>{routerReplace(e.conversationId)}} key={e.conversationId} className={`${bgColor}`}>
                            <div className='relative --bg hover:bg-dg-200 px-2 cursor-pointer'>
                                {index>0 && <div className='h-[1px] mx-auto bg-dg-200'></div>}
                                <div className='flex p-2 items-center'>
                                    <span className='flex flex-col'>
                                        <span className='font-semibold'>{e.name}</span>
                                        <span className='text-white/70'>{getPreviewMsg(convoId)}</span>
                                    </span>
                                    <span className='ml-auto'>
                                        <BiChevronRight />
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
    );
}