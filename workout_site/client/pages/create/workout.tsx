import React, { useState} from 'react';
import Content from '../../components/Content';
import { useSession } from 'next-auth/react';
import { IoAddCircle } from 'react-icons/io5';
import Btn from '../../components/Btn';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';
import { ADD_WORKOUT } from '../../GraphQL/Mutations';
import { useMutation, gql } from '@apollo/client';
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../components/toasts";
import { ToastContainer } from "react-toastify";
import { useRouter } from 'next/router';

export default function Workout() {
    const { data: session, status } = useSession();
    const [addWorkout, {data}] = useMutation(ADD_WORKOUT);
    const router = useRouter();

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

    const createWorkout = async() => {
        if (!('user' in session) || status !== 'authenticated'){
            return;
        }

        const userId = session.user['userId'];
        const res = await addWorkout({
            variables: {
                name: form.name,
                description: form.desc,
                isRestDay: false,
                userId: userId
            }
        })
        .then(({ data }) => {
            return data;
        });

        if (!('add_workout' in res)){
            errorToast('Error creating workout');
            return;
        }

        successToast(`${form.name} has been added!`);

        const { workoutId } = res.add_workout.workout;
        router.push(`/workout/${workoutId}`);
    }

    return (
        <>
            <ToastContainer />
            <Content>
                <div className='h-f w-full flex flex-col gap-8 justify-center items-center relative'>
                    <div className='p-4 absolute left-0 top-0'>
                        <Link href="/create" className='flex items-center gap-2'>
                            <AiOutlineLeft />
                            Back
                        </Link>
                    </div>
                    <h1 className='text-2xl font-semibold'>Create Workout</h1>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col'>
                            <span className='text-sm uppercase font-semibold'>
                                Name
                            </span>
                                <input type="text" onChange={updateForm} name="name" value={form.name}
                                    className='px-2 py-1 bg-dg-100 border border-dg-200 rounded-md color-white outline-none' />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm uppercase font-semibold'>
                                Description
                            </span>
                                <input type="text" onChange={updateForm} name="desc" value={form.desc}
                                    className='px-2 py-1 bg-dg-100 border border-dg-200 rounded-md color-white outline-none' />
                        </div>
                    </div>
                    <Btn className="px-0"
                        onClick={createWorkout}>
                        <IoAddCircle />
                        Create
                    </Btn>
                </div>
            </Content>
        </>
    );
}