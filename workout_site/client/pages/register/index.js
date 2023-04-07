import React, { useState } from 'react';
import Btn from '@/components/Btn';
import { AiOutlineUser, AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { MdOutlineLogin } from 'react-icons/md';
import Link from 'next/link';
import { BiChevronRight } from 'react-icons/bi';

export default function Register() {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    });

    const updateForm = (e) => {
        const t = e.target;
        if ((t.name in form) === false){
            return;
        }

        const tempForm = Object.assign({}, form);
        tempForm[t.name] = t.value;
        setForm(tempForm);
    }

    async function register() {
        return new Promise((res, rej) => {
            const g = setTimeout(() => {
                clearTimeout(g);
                res();
            }, 1000);
        });
    }

    return (
        <div className='gym-bg'>
            <div className='centered-box [&>*]:mb-[16px] bg-transparent md:bg-dg-100 rounded-3xl p-20 --bg fade-in'>
                <h1 className='text-[3rem] font-semibold text-center'>Gym<span className="text-primary">Social</span></h1>
                <div>
                    <p className='uppercase font-semibold text-sm flex items-center gap-1'><AiOutlineMail /> email</p>
                    <input type="text" onChange={updateForm} value={form.username} name="username" className='outline-none text-black px-2 py-1 rounded-md font-medium w-full'/>
                </div>
                <div>
                    <p className='uppercase font-semibold text-sm flex items-center gap-1'><AiOutlineUser /> username</p>
                    <input type="text" onChange={updateForm} value={form.username} name="username" className='outline-none text-black px-2 py-1 rounded-md font-medium w-full'/>
                </div>
                <div>
                    <p className='uppercase font-semibold text-sm flex items-center gap-1'><AiFillLock /> password</p>
                    <input type="text" onChange={updateForm} value={form.password} name="password" className='outline-none text-black px-2 py-1 rounded-md font-medium w-full' />
                </div>

                <Btn onClick={register} className='w-full'><MdOutlineLogin />Register</Btn>
                <Link href="/login" className='flex justify-center font-medium items-center gap-1'>Click here to login<BiChevronRight /></Link>
            </div>
        </div>
    );
}