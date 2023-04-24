import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Content from '../../components/Content';
import { useSession, getSession } from 'next-auth/react';
import { BiSave } from 'react-icons/bi';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { IoMdRemoveCircle } from 'react-icons/io';
import { IoAddCircle } from 'react-icons/io5';
import Btn from '../../components/Btn';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';
import { GET_USER_WORKOUTS, GET_TRACK_BY_ID, GET_USER_BY_ID} from '../../GraphQL/Queries';
import { ADD_WORKOUT_TO_TRACK, DELETE_WORKOUTS } from '../../GraphQL/Mutations';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../components/toasts";
import { ToastContainer } from "react-toastify";
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Auth from '../../components/Auth';
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { BsPlusCircleFill } from 'react-icons/bs/';
import client from '../../db';
import TrackBtn from '../../components/TrackBtn';

export default function Track({trackData, myWorkouts, activeTracks}) {
    const [addWorkoutToTrack, {data}] = useMutation(ADD_WORKOUT_TO_TRACK);
    const [deleteWorkouts, {ddata}] = useMutation(DELETE_WORKOUTS);
    const [workouts, setWorkouts] = useState(trackData.workouts??[]);
    const [activeState, setActiveState] = useState(false);
    const router = useRouter();
    const { trackId } = router.query;
    const { data: session, status } = getSession();
    const [userId, setUserId] = useState('0');
    const [td, setTd] = useState({
        userId:userId,
        trackId: trackId
    });
    

    useEffect(() => {
        if(status!=='authenticated'){
            return;
        }

        if (!('user' in session)){
            return;
        }

        setUserId(session.user['userId']);
        setActiveState(activeTracks.map(e=>e.trackId).indexOf(trackId)!==-1);
    },[session,status]);

    const addRestDay = async() => {
        setWorkouts([...workouts, {
            workoutId:'781965be-cb55-416b-acb1-6dfdd797190c',
            name:'Rest Day',
            description: 'Day for resting',
            order:workouts.length+1
        }]);
        console.log(workouts);
    }

    useEffect(() => {
        if(status!=='authenticated'){
            return;
        }

        if (!('user' in session)){
            return;
        }

        setUserId(session.user['userId']);
        setFollowingState(followers.map(e=>e.userId).indexOf(session.user['userId']) !== -1);
    },[session,status]);

    const pushWorkout = (index) => {
        setWorkouts([...workouts, myWorkouts[index]]);
    }

    const removeWorkout = (index) => {
        const temp = [...workouts];
        temp.splice(index, 1);
        setWorkouts(temp);
    }

    const moveWorkout = (dragIndex, hoverIndex) => {
        const e = workouts[dragIndex];
        if(!e){
            return;
        }
        setWorkouts((prevState => {
            const ex = [...prevState];
            const prevItem = ex.splice(hoverIndex, 1, e);
            ex.splice(dragIndex, 1, prevItem[0]);
            return ex;
        }));
    }

    const onActiveCallback = (active, data) => {
        if(active){

        }
    }

    const updateTrack = async() => {

        await deleteWorkouts({
            variables: {
                trackId: trackId
            }
        })
        .then(({ data }) => {
            return data;
        });

        workouts.forEach(async (e, index) => {
            const res = await addWorkoutToTrack({
                variables: {
                    workoutId: e.workoutId,
                    trackId: trackId,
                    order:index
                }
            })
            .then(({ data }) => {
                return data;
            });
            console.log(res);
        });

        console.log(workouts);

        successToast(`${trackData.name} has been updated!`);
    }

    return (
        <Auth>
            <ToastContainer />
            <Content>
                <div className='relative p-4 h-f'>
                    <div className='p-4 absolute left-0 bottom-0'>
                        <Link href="/create" className='flex items-center gap-2'>
                            <AiOutlineLeft />
                            Back
                        </Link>
                    </div>
                    <div className='bg-dg-100 flex justify-center items-center px-8'>
                        <div className='w-full min-w-[400px]'>
                            <div className='flex items-center justify-content w-full'>
                                <div className='mb-4'>
                                    <h1 className='text-xl font-medium'>{trackData.name}</h1>
                                    <p className='text-white/70'>{trackData.description}</p>
                                </div>
                                <div className='ml-auto'>
                                    <TrackBtn trackData={td} isActive={activeState} 
                                        callback={onActiveCallback}/>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <h1>Track Workouts</h1>
                                        <button className='flex gap-2 items-center ml-auto rounded-md bg-dg-300 --bg hover:bg-dg-400 px-2 py-1'
                                            onClick={addRestDay}>
                                            <BsPlusCircleFill />
                                            Rest Day
                                        </button>
                                        <button className='flex gap-2 items-center rounded-md bg-primary-h --bg hover:bg-primary-h2 px-2 py-1'
                                            onClick={updateTrack}>
                                            <BiSave />
                                            Save
                                        </button>
                                    </div>
                                    <div className='border border-dg-200 rounded-md px-4 py-2 w-full flex'>
                                        {workouts===undefined || (typeof workouts ==='object' && workouts.length===0)?(
                                            <span className='font-medium text-lg text-white/60 mx-auto w-fit'>No workouts added!</span>
                                        ):(
                                            <DndProvider backend={HTML5Backend}>
                                                <WorkoutList workouts={workouts} moveFunc={moveWorkout} removeFunc={(i)=>{removeWorkout(i)}} />
                                            </DndProvider>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h1>My Workouts</h1>
                                    <div className='border border-dg-200 rounded-md px-4 py-2 w-full flex'>
                                        {myWorkouts===undefined || (typeof myWorkouts ==='object' && myWorkouts.length===0)?(
                                            <span className='font-medium text-lg text-white/60 mx-auto w-fit'>No workouts found!</span>
                                        ):(
                                            <div className='flex flex-col gap-2 w-full'>
                                                {myWorkouts.map((e,index) => {
                                                    return (
                                                        <div onClick={()=>{pushWorkout(index)}}
                                                            key={`wk-${e.workoutId}-${index}`} className='flex gap-3 w-full items-center px-2 py-1 --bg hover:cursor-pointer bg-dg-200 rounded-md hover:bg-dg-300'>
                                                            <span>
                                                                <BsPlusCircleFill />
                                                            </span>
                                                            <span className='flex flex-col'>
                                                                <span>{e.name}</span>
                                                                <span className='text-sm text-white/70'>{e.description}</span>
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </Auth>
    );
}

function WorkoutList({workouts, moveFunc, removeFunc}){
    
    const [{canDrop, isOver}, drop] = useDrop({
        accept:'workout',
        drop: () => ({name: 'some name'}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })

    return (
        <div className='flex flex-col gap-1 w-full' ref={drop}>
            {workouts.map((e,index) => {
                return (
                    <WorkoutListItem moveFunc={moveFunc} index={index} name={e.name} desc={e.description} key={`wk-${index}`} removeFunc={()=>{removeFunc(index)}} />
                );
            })}
        </div>
    );
}

function WorkoutListItem({index, name, desc, removeFunc, moveFunc}) {
    const ref=useRef(null);
    const [, drop] = useDrop(
        {
            accept:'exercise',
            hover(item,monitor){
                if(!ref.current){
                    return;
                }
                const dragIndex = item.index;
                const hoverIndex=index;

                if(dragIndex===hoverIndex){
                    return;
                }

                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                moveFunc(dragIndex, hoverIndex);
                item.index=hoverIndex;
            }
        }
    );

    const [{isDragging}, drag] = useDrag({
        name: 'Any custom name', type: 'exercise',
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
    const opacity = isDragging ? 0.4 : 1;
    drag(drop(ref));

    return (
        <div className='flex items-center gap-3 bg-dg-200 rounded-md px-3 py-1 w-full hover:cursor-grab' ref={ref} style={{opacity:opacity}}>
            <span className='cursor-pointer text-2xl'>
                <RxDragHandleDots2 />
            </span>
            <span className='flex flex-col'>
                <span>{name}</span>
                <span className='text-sm text-white/60'>{desc}</span>
            </span>
            <span className='text-red hover:text-red-h transition-colors duration-150 text-xl cursor-pointer ml-auto'>
                <IoMdRemoveCircle 
                    onClick={removeFunc}/>
            </span>
        </div>
    );
}

export async function getServerSideProps(context){
    const { trackId } = context.query;
    let workouts = [];
    let trackData={};
    const session = await getSession(context);
    if(session===null){
        return {
            redirect:{
                destination:'/login'
            }
        }
    }
    const userId = session.user['userId'];
    let activeTracks=[];

    try {
        const active = await client.query({
            query:GET_USER_BY_ID,
            variables: {userId:userId}
        });

        console.log(active);
        activeTracks = active.data.User.user.activeTracks;
    } catch(e){

    }

    try {
        const myWorkouts = await client.query({
            query: GET_USER_WORKOUTS,
            variables:{userId:userId}
        });
        workouts = myWorkouts.data.get_all_workouts_by_userId.workouts;

        const track = await client.query({
            query:GET_TRACK_BY_ID,
            variables:{trackId:trackId}
        });

        trackData = track.data.get_track_by_id.track;
        console.log(track);
        console.log('--------------------------------');
        console.log(trackData);
    }
    catch(e){
        console.error(e);
    }
    

    console.log(workouts)
client.stop();

    return {
        props: {
            trackData: trackData,
            myWorkouts: workouts,
            activeTracks: activeTracks
        }
    }
}