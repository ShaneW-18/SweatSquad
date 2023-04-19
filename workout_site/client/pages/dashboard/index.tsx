import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Content from "../../components/Content";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  let username: any = "user";

  return (
    <Content>
      <h1>Dashboard</h1>
      <p>Welcome, {username}</p>
      <Link href="/logout">Logout</Link>
    </Content>
  );
}
export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: { session },
  };
}
