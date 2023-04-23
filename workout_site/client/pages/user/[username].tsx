import React, { useState,useEffect } from 'react';
import {GET_USERDATA_BY_USERNAME, GET_USER_SCHEDULES, GET_USER_TRACKS, GET_USER_WORKOUTS, GET_USER_ID,
    GET_FOLLOWERS, GET_FOLLOWING } from '../../GraphQL/Queries.js'
import { ApolloClient, createHttpLink, InMemoryCache, useLazyQuery } from "@apollo/client";
import {useRouter } from 'next/router.js';
import Content from "../../components/Content";
import { exercises as e, workouts as w, tracks as t, schedules as s } from '../../sample/data';
import FollowBtn from '../../components/FollowBtn';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { AiOutlineOrderedList, AiOutlineCalendar } from 'react-icons/ai';
import LinkBox from '../../components/LinkBox';
import { useSession } from 'next-auth/react';

export default function User({userData, userErrorCode, initFollowers, initFollowing}: any){
    const router = useRouter();
    const { username } = router.query;
    const profileImage = userData.image ?? 'https://api.tecesports.com/images/general/user.png';
    const description = userData.description ?? 'GymSocial user';
    const [getUserId] = useLazyQuery(GET_USER_ID);
    const [followingState, setFollowingState] = useState(false);

    const schedules = userData.schedules;
    const tracks = userData.tracks;
    const workouts = userData.workouts;
    const { data:session, status } = useSession();
    const [userId, setUserId] = useState('0');
    const [targetUserId, setTargetUserId] = useState('0');
    const [following, setFollowing] = useState(initFollowing);
    const [followers, setFollowers] = useState(initFollowers);

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

    const onFollowCallback = (following) => {
        if(following){
            setFollowers([...followers, {
                userId: userId,
                name: 'Me'
            }]);
            return;
        }
        setFollowers((prevState)=>{
            return followers.filter(e=>{
                return e.userId!==userId;
            });
        });
    }

    return (
        <Content>
            <div className='h-[100vh] bg-dg-100 flex items-center justify-center'>
                <div className='xs:h-full xs:w-full rounded-md bg-dg-100 '>
                    <div className='w-full h-full relative'>
                        <div className='gym-bg no-h px-8 py-4'>
                            <div className='flex items-center gap-6'>
                                <div className='profile-image bg-dg-100 rounded-full' style={{backgroundImage: `url(${profileImage})`}}></div>
                                <div>
                                    <h3 className='text-2xl font-bold'>{username}</h3>
                                    <p className='text-white/70'>{description}</p>
                                </div>
                                <div className='flex gap-4 ml-auto mr-6'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <span className='text-lg font-bold'>{followers.length}</span>
                                        <span className='text-sm text-white/70'>Followers</span>
                                    </div>
                                    <div className='flex flex-col items-center justify-center'>
                                        <span className='text-lg font-bold'>{following.length}</span>
                                        <span className='text-sm text-white/70'>Following</span>
                                    </div>
                                </div>
                                <div className=''>
                                    {userId !== targetUserId && <FollowBtn userId={userId} targetUserId={userData.userId} isFollowing={followingState}
                                        callback={onFollowCallback} />}
                                </div>
                            </div>
                        </div>
                        <div className='gap-2 grid grid-cols-1 md:grid-cols-3 px-8 py-4'>
                            <div className='border border-dg-400 rounded-md px-4 py-2'>
                                <div className='flex items-center gap-2'>
                                    <span>Schedules</span>
                                    <AiOutlineCalendar className='ml-auto' />
                                </div>
                                {schedules === undefined || (typeof schedules ==='object' && schedules.length===0) ? (
                                    <span className='text-white/60 font-medium'>No schedules!</span>
                                ) : (
                                    <div className='flex flex-col gap-2 mt-2'>
                                        {schedules.map(e => {
                                            return (
                                                <LinkBox title={e.name} desc={e.description} href={`/schedule/${e.scheduleId}`} key={`s-${e.scheduleId}`} />
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                            <div className='border border-dg-400 rounded-md px-4 py-2'>
                                <div className='flex items-center gap-2'>
                                    <span>Tracks</span>
                                    <AiOutlineOrderedList className='ml-auto' />
                                </div>
                                {tracks === undefined || (typeof tracks ==='object' && tracks.length===0) ? (
                                    <span className='text-white/60 font-medium'>No tracks!</span>
                                ) : (
                                    <div className='flex flex-col gap-2 mt-2'>
                                        {tracks.map(e => {
                                            return (
                                                <LinkBox title={e.name} desc={e.description} href={`/track/${e.trackId}`} key={`t-${e.trackId}`} />
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                            <div className='border border-dg-400 rounded-md px-4 py-2'>
                                <div className='flex items-center gap-2'>
                                    <span>Workouts</span>
                                    <GiWeightLiftingUp className='ml-auto' />
                                </div>
                                {workouts === undefined || (typeof workouts ==='object' && workouts.length===0) ? (
                                    <span className='text-white/60 font-medium'>No workouts!</span>
                                ) : (
                                    <div className='flex flex-col gap-2 mt-2'>
                                        {workouts.map(e => {
                                            if (!e.isRestDay){
                                                return (
                                                    <LinkBox title={e.name} desc={e.description} href={`/workout/${e.workoutId}`} key={`w-${e.workoutId}`} />
                                                )
                                            }
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

type UserData = {
    username:String;
    description:String;
    schedules:any;
    tracks:any;
    workouts:any;
}

export async function getServerSideProps(context: any) {
    const { username } = context.query;

    let userData: any = {};
    let followers: any = {};
    let following: any = {};

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
        userData.data = data.get_user_username;
        userData.userId = data.get_user_username.user.userId;

        if (userData.data.code !== 200){
            return {
                props: {
                    userData: [],
                    userErrorCode: userData.data.code
                }
            };
        }

        const { userId } = userData.data.user;

        const schedules = await client.query({
            query: GET_USER_SCHEDULES,
            variables:{userId:userId}
        });
        userData.schedules = schedules.data.get_all_schedules_by_userId.schedules;

        const tracks = await client.query({
            query: GET_USER_TRACKS,
            variables:{userId:userId}
        });
        userData.tracks = tracks.data.get_all_tracks_by_userId.tracks;

        const workouts = await client.query({
            query: GET_USER_WORKOUTS,
            variables:{userId:userId}
        });
        userData.workouts = workouts.data.get_all_workouts_by_userId.workouts;

        const getFollowers = await client.query({
            query: GET_FOLLOWERS,
            variables:{userId: userId}
        });
        followers=getFollowers.data.get_all_users_followers.users;

        const getFollowing = await client.query({
            query: GET_FOLLOWING,
            variables:{userId:userId}
        });
        following=getFollowing.data.get_all_users_following.users;
    }
    catch(e){
        console.error(e);
    }

    return {
        props: {
            userData: userData,
            initFollowers:followers,
            initFollowing:following
        }
    }
}