import { getSession } from 'next-auth/react';
import React from 'react';

export default function Auth({emptyProps, children}){
    return (
        <>
            {children}
        </>
    );
}

export async function getServerSideProps(context){
    const session = await getSession(context);

    if (!session){
        return {
            redirect: {
                destination: '/login'
            }
        }
    }

    return {
        props: {
            emptyProps:[]
        }
    }
}