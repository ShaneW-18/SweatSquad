import React, { useState } from "react";
import Btn from "../../components/Btn";
import { AiOutlineUser, AiFillLock } from "react-icons/ai";
import { MdOutlineLogin } from "react-icons/md";
import { LOGIN } from "../../GraphQL/Mutations.js";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import { useMutation } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../components/toasts";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { getSession, useSession } from "next-auth/react";
import { sign } from "crypto";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const updateForm = (e: any) => {
    const t = e.target;
    if (t.name in form === false) {
      return;
    }

    const tempForm: any = Object.assign({}, form);
    tempForm[t.name] = t.value;
    setForm(tempForm);
  };

  async function login() {

    const res = await signIn("credentials", {
      username: form.username,
      password: form.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    if (res.error) {
      errorToast("Invalid username or password");
      return;
    }
    router.push("/explore");
  }

  return (
    <>
      <ToastContainer />
      <div className="gym-bg">
        <div className="centered-box [&>*]:mb-[16px] bg-transparent md:bg-dg-100 rounded-3xl p-20 --bg fade-in">
          <h1 className="text-[3rem] font-semibold text-center">
            Gym<span className="text-primary">Social</span>
          </h1>
          <div>
            <p className="uppercase font-semibold text-sm flex items-center gap-1">
              <AiOutlineUser /> username
            </p>
            <input
              type="text"
              onChange={updateForm}
              value={form.username}
              name="username"
              className="outline-none text-black px-2 py-1 rounded-md font-medium w-full"
            />
          </div>
          <div>
            <p className="uppercase font-semibold text-sm flex items-center gap-1">
              <AiFillLock /> password
            </p>
            <input
              type="password"
              onChange={updateForm}
              value={form.password}
              name="password"
              className="outline-none text-black px-2 py-1 rounded-md font-medium w-full"
            />
          </div>

          <Btn onClick={login} className="w-full">
            <MdOutlineLogin />
            Login
          </Btn>
          <Link
            href="/register"
            className="flex justify-center font-medium items-center gap-1"
          >
            Click here to register
            <BiChevronRight />
          </Link>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }
  return {
    props: { session },
  };
}