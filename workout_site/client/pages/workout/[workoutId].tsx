import React from 'react';
import Content from '../../components/Content';

export default function Workout({workoutData}) {
    return (
        <Content></Content>
    );
}

export async function getServerSideProps(context){
    const { workoutId } = context.query;

    return {
        props: {
            workoutData: []
        }
    }
}