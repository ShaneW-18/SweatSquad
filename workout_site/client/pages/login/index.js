import React, { useState } from 'react';
import Btn from '@/components/Btn';
import { AiOutlineUser, AiFillLock } from 'react-icons/ai';
import { MdOutlineLogin } from 'react-icons/md';

export default function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
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

    async function login() {
        return new Promise((res, rej) => {
            const g = setTimeout(() => {
                clearTimeout(g);
                res();
            }, 1000);
        });
    }

    return (
        <div className='centered-box [&>*]:mb-[16px]'>
            <h1 className='text-[3rem] font-semibold text-center'>Login</h1>
            <div>
                <p className='uppercase font-semibold text-sm flex items-center gap-1'><AiOutlineUser /> username</p>
                <input type="text" onChange={updateForm} value={form.username} name="username" className='outline-none text-black px-2 py-1 rounded-md font-medium'/>
            </div>
            <div>
                <p className='uppercase font-semibold text-sm flex items-center gap-1'><AiFillLock /> password</p>
                <input type="text" onChange={updateForm} value={form.password} name="password" className='outline-none text-black px-2 py-1 rounded-md font-medium' />
            </div>


            <Btn onClick={login} className='w-full'><MdOutlineLogin />Login</Btn>
        </div>
    );
}