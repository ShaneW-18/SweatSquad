import React from 'react';
import Content from '../../components/Content';

export default function Schedule({scheduleData}) {
    return (
        <Content></Content>
    );
}

export async function getServerSideProps(context){
    const { scheduleId } = context.query;

    return {
        props: {
            scheduleData: []
        }
    }
}