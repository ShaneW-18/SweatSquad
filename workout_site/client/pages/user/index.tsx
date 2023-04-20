import React from 'react';
import { GetSessionParams, getSession } from 'next-auth/react';

export default function User() {
    return (
        <div></div>
    );
}

export async function getServerSideProps(context: GetSessionParams) {
    const session = await getSession(context);
    const username = session.user['username'];

    if (session) {
        return {
          redirect: {
            destination: `/user/${username}`,
          },
        };
      }

}