import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  let username: any = "user";

  return (
    <>
      <Navbar></Navbar>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {username}</p>
        <Link href="/logout">Logout</Link>
      </div>
    </>
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
