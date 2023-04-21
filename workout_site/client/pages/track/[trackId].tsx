import React from 'react';
import Content from '../../components/Content';

export default function Track({trackData}) {
    return (
        <Content></Content>
    );
}

export async function getServerSideProps(context){
    const { trackId } = context.query;

    return {
        props: {
            trackData: []
        }
    }
}