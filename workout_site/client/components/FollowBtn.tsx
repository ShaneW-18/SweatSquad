import React, { useState,useEffect } from 'react';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { FOLLOW_USER, UNFOLLOW_USER } from '../GraphQL/Mutations';
import { useMutation, gql } from '@apollo/client';

export default function FollowBtn({userId, targetUserId, isFollowing=false, showText=true,
    callback=null}: any){
    const [followUser] = useMutation(FOLLOW_USER);
    const [unfollowUser] = useMutation(UNFOLLOW_USER);

    const [following, setFollowing] = useState(isFollowing);

    const handleClick = async () => {
        let statusCode = 0;
        let res = undefined;
        const vars = {
            variables: {
                followingId: userId,
                followedId: targetUserId
            }
        }

        let key = 'follow_user';
        if(!following){
            res=await followUser(vars)
                .then(({data})=>{return data});
        } else {
            res=await unfollowUser(vars)
                .then(({data})=>{return data});
                key='unfollow_user';
        }

        if (!(key in res)){
            return;
        }
        
        statusCode=res[key].code;
        if(statusCode !== 200){
            return;
        }

        setFollowing(!following);

        if(callback===null){
            return;
        }
        callback(!following);
    }

    if (!following){
        return (
            <button className='border-2 border-primary text-primary font-semibold px-2 py-1 flex items-center gap-2 rounded-md' onClick={handleClick}>
                <AiOutlineUserAdd />
                {showText && 'Follow'}      
            </button>
        );
    }

    return (
        <button className='border-2 border-primary --bg bg-primary hover:border-primary-h hover:bg-primary-h text-white font-semibold px-2 py-1 flex items-center gap-2 rounded-md' onClick={handleClick}>
            <AiOutlineUserDelete />
            {showText && 'Unfollow'}
        </button>
    );
}