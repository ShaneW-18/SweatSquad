import React, { useState } from 'react';
import Content from '../../components/Content';
import { getSession } from 'next-auth/react';
import { FaWeightHanging } from 'react-icons/fa';
import { BsTextCenter } from 'react-icons/bs';
import Btn from '../../components/Btn';
import { IoAddCircle } from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import { ADD_EXERCISE } from '../../GraphQL/Mutations';
import { useMutation, gql } from '@apollo/client';
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../components/toasts";
import { ToastContainer } from "react-toastify";
import Link from 'next/link';
import {AiOutlineLeft} from 'react-icons/ai';

export default function Exercise({ exerciseData }) {
    const { data: session, status } = useSession();
    const [addExercise, {data}] = useMutation(ADD_EXERCISE);

    const [form, setForm] = useState({
        name: '',
        desc:''
    });

    const updateForm = (e) => {
        const { target } = e;

        if (!(target.name in form)){
            return;
        }

        const tempForm = Object.assign({}, form);
        tempForm[target.name] = target.value;
        setForm(tempForm);
    }

    const createExercise = async() => {
        if (!('user' in session) || status !== 'authenticated'){
            return;
        }

        const res = await addExercise({
            variables: {
                name: form.name,
                description: form.desc
            }
        })
        .then(({ data }) => {
            return data;
        });

        if (!('add_exercise' in res)){
            errorToast('Error creating workout');
            return;
        }

        successToast(`${form.name} has been added!`);
        setForm({
            name:'',
            desc:''
        });
    }

    return (
        <>
            <ToastContainer />
            <Content>
                <div className='h-[100vh] flex items-center justify-center flex-col gap-8 relative'>
                    <div className='p-4 absolute left-0 top-0'>
                        <Link href="/create" className='flex items-center gap-2'>
                            <AiOutlineLeft />
                            Back
                        </Link>
                    </div>
                    <h1 className='text-2xl font-semibold'>Create Exercise</h1>
                    <div>
                        <div className='flex flex-col mb-4'>
                            <span className='text-sm uppercase font-semibold'>
                                Name
                            </span>
                            <div className="w-input-group flex">
                                <div className='w-icon bg-dg-200 flex items-center'>
                                    <FaWeightHanging />
                                </div>
                                <input type="text" onChange={updateForm} name="name" value={form.name}
                                    className='px-2 py-1 bg-dg-100 border border-dg-200 rounded-md color-white outline-none' />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm uppercase font-semibold'>
                                Description
                            </span>
                            <div className="w-input-group flex">
                                <div className='w-icon bg-dg-200 flex items-center'>
                                    <BsTextCenter />
                                </div>
                                <input type="text" onChange={updateForm} name="desc" value={form.desc}
                                    className='px-2 py-1 bg-dg-100 border border-dg-200 rounded-md color-white outline-none' />
                            </div>
                        </div>
                    </div>
                    <Btn className="px-0"
                        onClick={createExercise}>
                        <IoAddCircle />
                        Create
                    </Btn>
                </div>
            </Content>
        </>
    );
}

export async function getServerSideProps(context){
    const session = await getSession();

    return { 
        props: {
            exerciseData: []
        }
    }
}