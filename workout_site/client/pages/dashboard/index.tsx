import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";

export default function Dashboard() {

  let username: any = "user";

  return (
    <>
      <Navbar></Navbar>
    </>
  );
}
export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  console.log(session);
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
