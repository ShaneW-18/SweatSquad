import React, {useState, useEffect} from 'react';
import Content from '../../components/Content';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GET_CONVERSATIONS } from '../../GraphQL/Queries.js'
import { SEND_MESSAGE } from '../../GraphQL/Mutations'
import { getSession } from 'next-auth/react';
import client from '../../db';
import { useMutation } from '@apollo/client';
import ConvoSideBar from '../../components/ConvoSideBar';
import { BiLinkExternal } from 'react-icons/bi';
import { ImSad } from 'react-icons/im';
import { errorToast } from '../../components/toasts';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Messages({initconversations}) {
    const router = useRouter();
    const { conversationId } = router.query;
    const [sendMessage] = useMutation(SEND_MESSAGE);

    const [conversations,setConversations]=useState([]);
    const hasConvos = conversations.length>0;
    const index = conversations.map(e=>e.conversationId).indexOf(conversationId);
    const convo = conversations[index];
    const [messages, setMessages] = useState([]);
    const { data:session, status } = useSession();
    const userId = session?.user['userId'];
    const [c, setC] = useState(0);

    const [form, setForm] = useState({
        message: ''
    });

    const updateMsg = (e) =>{
        if(e.target.name!=='msg'){
            return;
        }

        setForm({
            message:e.target.value
        });
    }

    const createMessage = async() => {
        if(!form.message.trim()){
            return;
        }

        const userId = session.user['userId'];

        const res = await sendMessage({
            variables: {
                conversationId:conversationId,
                userId:userId,
                message:form.message
            }
        })
        .then(({data})=>{
            return data;
        });

        console.log(res);

        if(!('create_message' in res)){
            return;
        }

        setForm({
            message:''
        });

        /*
        const { message } = res.create_message;

        const temp = Object.assign([], messages);
        temp.push({
            message:message.message,
            messageId:message.messageId,
            sender:{
                userId:userId
            }
        });
        setMessages(temp);*/
    }

    useEffect(() => {

        const ev = new EventSource('/api/messages');
        function callEvent (callback) {
            ev.onmessage = (event) =>{
                const data = JSON.parse(event.data);
                let msg = [];
                data.forEach(e => {
                    setC( c + 1 );
                    const messageId = e.messageId;
                    const message = e.message;
                    const sender = e.sender.userId;
        
                    if(messages.map(e=>e.messageId).indexOf(messageId) > -1){
                        return;
                    }

                    callback({
                        message:message,
                        messageId:messageId,
                        sender:{
                            userId:sender
                        }
                    });

                });

                if(!msg.length){
                    return;
                }
            }
        }

        callEvent((msg)=>{
            setMessages((prevState) => {
                return [...prevState, msg];
            });
        });

        return () => {
            ev.close();
        }
    }, []);

    useEffect(() => {
        if(status !== 'authenticated'){
            return;
        }
        async function getConvos () {
            let conv=[];

            try {
                const res = await client.query({
                    query:GET_CONVERSATIONS,
                    variables:{userId:userId}
                });
                let t = res.data.User.user.conversations;
                setConversations(t ?? []); 

                const index = t.map(e=>e.conversationId).indexOf(conversationId);
                const convo = t[index];
                setMessages(convo.messages);
            } catch(e){
                console.log('ERROR [/messages/conversationId]', e);
            }

        }

        getConvos();
    }, [status,conversationId]);

    return (
        <>
            <ToastContainer />
            <Content>
                {hasConvos ? (
                    <div className='h-f grid grid-cols-13'>
                        <ConvoSideBar conversations={conversations} currentId={conversationId} />
                        <div className='border-l border-dg-200 h-f relative flex flex-col'>
                            <div className='bg-dg-200 flex flex-col justify-center items-center gap-2 py-6'>
                                <Image src="https://api.tecesports.com/images/general/user.png" width="40" height="40" alt="" 
                                    className='rounded-full'/>
                                <span className='text-lg font-medium'>{convo.name}</span>
                            </div>
                            <div className="chat p-4">
                                {typeof messages !== 'undefined' && messages.map(e => {
                                    return (
                                        <Chat message={e.message} isMine={e.sender.userId===userId} key={e.messageId} />
                                    );
                                })}
                            </div>
                            <div className='chat-bar px-2 py-1 flex justify-center gap-2 mt-auto'>
                                <input type="text" name="msg" id="msg" className='w-full bg-dg-100 border border-dg-300 rounded-md px-2 outline-none'
                                    tabIndex={1} placeholder="Enter a message..." onChange={updateMsg}/>
                                <button className='px-2 bg-primary-h --bg hover:bg-primary-h2 font-semibold rounded-md' tabIndex={2}
                                    onClick={createMessage}>Send</button>
                            </div>
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
        </>
    );
}

function Chat({message, isMine}){
    if(isMine){
        return (
            <div className='w-full mb-1'>
                <div className='bg-msg-mine rounded-md px-2 py-1 max-w-[200px] w-fit ml-auto wrap'>{message}</div>
            </div>
        );
    }

    return (
        <div className='w-full mb-1'>
            <div className='bg-dg-200 rounded-md px-2 py-1 max-w-[200px] w-fit mr-auto wrap'>{message}</div>
        </div>
    );
}

export async function getServerSideProps(context){
    const session = await getSession(context);
    const { conversationId } = context.query;
    let date = new Date().getTime();
    /*
    if(convo.messages.length){
        date = convo.messages[convo.messages.length-1]?.timeSent;
    }*/

    context.res.setHeader('set-cookie', [
        `lastConversation=${conversationId}; path=/; samesite=lax; httponly`,
        `checkSince=${date}; path=/; samesite=lax; httponly`,
    ]);

    return {
        props: {
            conversations:[]
        }
    }
}