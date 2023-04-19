import React, { useState } from 'react';
import {GET_USERDATA_BY_USERNAME} from '../../GraphQL/Queries.js'
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import {useRouter } from 'next/router.js';
import Content from "../../components/Content";

export default function User({userData}: any){
    const router = useRouter();
    const { username } = router.query;



    async function followUser(){

    }

    async function unfollowUser(){

    }

    return (
        <Content>
            <h1>username</h1>
        </Content>
    );
}

export async function getServerSideProps(context: any) {
    const { username } = context.query;

    let userData = {};

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
        userData = data.get_user_username;
    }
    catch(e){
        console.error(e);
    }

    return {
        props: {
            userData: userData
        }
    }

}