import React from 'react';
import Content from '../../components/Content';
import { getSession } from 'next-auth/react';

export default function Schedule({trackData}) {
    return (
        <Content>

        </Content>
    );
}

export async function getServerSideProps(context){
    const session = await getSession(context);

    return {
        props: {
            trackData: []
        }
    }
}