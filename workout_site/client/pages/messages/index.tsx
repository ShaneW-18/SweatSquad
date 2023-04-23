import React, {useState, useEffect} from 'react';
import Content from '../../components/Content';
import { BiChevronRight } from 'react-icons/bi';

export default function Messages(){

    const [selectedConversation, setSelectedConversation] = useState(-1);

    const conversations=[
        {
            name:'gungas',
            preview:'hello ..'
        },
        {
            name:'guns',
            preview:'helo ..'
        },
        {
            name:'ngas',
            preview:'hllo ..'
        },
    ];

    const updateSelectedConversation = (conversationId) => {
        setSelectedConversation(conversationId);
    }

    useEffect(() => {
        async function updateMessages() {
            //const res = await getMessages()
        }

        updateMessages();
    }, [selectedConversation])

    return (
        <Content>
            <div className='h-f grid grid-cols-13'>
                <div className=''>
                    <div className='px-4 py-2'>
                        <h1 className='text-xl font-semibold'>Conversations</h1>
                    </div>
                    {conversations.map((e,index) => {
                        return(
                            <div className='relative --bg hover:bg-dg-200 px-2 cursor-pointer'
                                onClick={updateSelectedConversation}>
                                {index>0 && <div className='h-[1px] mx-auto bg-dg-200'></div>}
                                <div className='flex p-2 items-center'>
                                    <span className='flex flex-col'>
                                        <span className='font-semibold'>{e.name}</span>
                                        <span className='text-white/70'>{e.preview}</span>
                                    </span>
                                    <span className='ml-auto'>
                                        <BiChevronRight />
                                    </span>
                                </div>

                            </div>
                        );
                    })}
                </div>
                <div className='border-l border-dg-200 h-f'>
                </div>
            </div>
        </Content>
    );
}