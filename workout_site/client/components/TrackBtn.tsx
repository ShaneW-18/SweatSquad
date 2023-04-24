import React, { useState,useEffect } from 'react';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { ADD_ACTIVE_TRACK, REMOVE_ACTIVE_TRACK } from '../GraphQL/Mutations';
import { useMutation, gql } from '@apollo/client';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

export default function TrackBtn({trackData, isActive=false, showText=true,
    callback=null}: any){
    const [addTrack] = useMutation(ADD_ACTIVE_TRACK);
    const [removeTrack] = useMutation(REMOVE_ACTIVE_TRACK);

    const [active, setActive] = useState(isActive);

    const handleClick = async () => {

        setActive(!active);
        return;

        let statusCode = 0;
        let res = undefined;

        let key = 'add_active_track';
        if(!active){
            res=await addTrack({
                variables: {
                    userId: trackData.userId,
                    trackId:trackData.trackId
                }
            })
                .then(({data})=>{return data});
        } else {
            res=await removeTrack({
                variables: {
                    userTrackId:trackData.userTrackId
                }
            })
                .then(({data})=>{return data});
                key='remove_active_track';
        }

        console.log(key);
        console.log(res);

        if (!(key in res)){
            return;
        }
        
        statusCode=res[key].code;
        if(statusCode !== 200){
            return;
        }

        let data={
            userId:trackData.userId,
            trackId:trackData.trackId
        }
        if (active){
            //data['userTrackId'] =  res.add_active_track.userTrackId
        }

        setActive(!active);

        if(callback===null){
            return;
        }
        callback(!active);
    }

    if (!active){
        return (
            <button className='border-2 border-primary text-primary font-semibold px-2 py-1 flex items-center gap-2 rounded-md' onClick={handleClick}>
                <AiOutlinePlusCircle />
                {showText && 'Join Track'}      
            </button>
        );
    }

    return (
        <button className='border-2 border-primary --bg bg-primary hover:border-primary-h hover:bg-primary-h text-white font-semibold px-2 py-1 flex items-center gap-2 rounded-md' onClick={handleClick}>
            <AiOutlineMinusCircle />
            {showText && 'Leave Track'}
        </button>
    );
}