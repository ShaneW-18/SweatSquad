import React, { useState, useRef } from 'react';
import Content from '../../components/Content';
import { useSession } from 'next-auth/react';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { IoMdRemoveCircle } from 'react-icons/io';
import { IoAddCircle } from 'react-icons/io5';
import Btn from '../../components/Btn';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';
import { SEARCH_EXERCISES } from '../../GraphQL/Queries';
import { useLazyQuery, gql } from '@apollo/client';
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../components/toasts";
import { ToastContainer } from "react-toastify";

const MIN_QUERY_LEN = 2;
const D_WKTS: Exercise[] = [
    {name: 'hi', description: 'hi452',sets:3,reps:12},
    {name: 'hi2', description: 'hi243',sets:3,reps:12},
    {name: 'hi3', description: 'hi62352',sets:3,reps:12},
    {name: 'hi4', description: 'hi223523',sets:3,reps:12},
    {name: 'hi1', description: 'hi152352',sets:3,reps:12},
];

type Exercise = {
    name:String;
    description:String;
    sets:Number;
    reps:Number;
}

export default function Schedule() {
    const dragItem = useRef();
    const dragOver = useRef();

    const [searchExercise, {data}] = useLazyQuery(SEARCH_EXERCISES);

    const [dragging, setDragging] = useState(false);

    const [eform, seteForm] = useState({
        name: '',
        desc:''
    });

    const [wform, setwForm] = useState({
        name: '',
        desc:''
    });

    const [suggestions, setSuggestions] = useState([]);
    const [exercises, setExercises] = useState(D_WKTS);
    const { data: session, status } = useSession();

    const dragStart = (e, pos) => {
        dragItem.current=pos;
        dragItem['key'] = pos;
        e.target.classList.add('grabbing');
        setDragging(true);
    }
    const dragEnter = (e, pos) => {
        dragOver.current=pos;
    }
    
    const drop = (e) => {
        const di: number = dragItem.current;
        const dov: number = dragOver.current;

        const temp = [...exercises];
        const dragitem = temp[di];
        temp.splice(dragItem.current, 1);
        temp.splice(dov, 0, dragitem);
        dragItem.current = null;
        dragOver.current = null;
        setExercises(temp);

        e.target.classList.remove('grabbing');
        setDragging(false);
    };

    const onSpacerEnter =(e) => {
        if(dragging){
            e.target.style.height='50px';
            e.target.style.border='2px dashed #222';
            e.target.style.marginBottom ='4px';
        }
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onSpacerLeave = (e) => {
        e.target.style.height='5px';
        e.target.style.border='none';
        e.target.style.marginBottom ='0px';
    }

    const updateEForm = async (e) => {
        const { target } = e;

        if (!(target.name in eform)){
            return;
        }

        const tempForm = Object.assign({}, eform);
        tempForm[target.name] = target.value;
        seteForm(tempForm);

        if(target.value < MIN_QUERY_LEN){
            setSuggestions([]);
            return;
        }

        const res = await searchExercise({
            variables: {
                name: eform.name
            }
        })
        .then(({ data }) => {
            return data;
        });

        if (!('search_exercises' in res)){
            errorToast('Error');
            return;
        }

        setSuggestions(res.search_exercises.exercises);

        /*

        const res = ;
        setSuggestions(res);
        */
    }

    const updateWForm = async (e) => {
        const {target} = e;
        if (!(target.name in wform)){
            return;
        }

        const tempForm = Object.assign({}, wform);
        wform[target.name] = target.value;
        setwForm(tempForm);
    }

    const createWorkout = async() => {
        if (!('user' in session) || status !== 'authenticated'){
            return;
        }


        console.log(wform);
        console.log(exercises);
        //api
    }

    const clearWorkout = () => {
        setExercises([]);
    }

    const addExercise = (exercise) => {
        setExercises([...exercises, exercise]);
    }

    const removeExercise = (index) => {
        const temp = Object.assign([], exercises);
        temp.splice(index, 1);
        setExercises(temp);
    }


    return (
        <>
        <ToastContainer />
        <Content>
            <div className='h-f w-full flex sm:grid sm:grid-cols-1 md:grid-cols-2 relative'>
                <div className='p-4 absolute left-0 top-0'>
                    <Link href="/create" className='flex items-center gap-2'>
                        <AiOutlineLeft />
                        Back
                    </Link>
                </div>
                <div className='bg-dg-100 flex flex-col justify-center items-center'>
                    <h1 className='text-2xl font-semibold'>Create Workout</h1>
                    <input type='text' name='name' onChange={updateEForm} value={eform.name}
                        className='px-2 py-1 bg-dg-100 border border-dg-200 rounded-md color-white outline-none' />
                    <div className='mt-8'>
                        <div className='flex flex-col mb-4'>
                            <span className='text-sm uppercase font-semibold'>
                                Name
                            </span>
                            <input type="text" onChange={updateWForm} name="wname"
                                className='px-2 py-1 bg-dg-100 border border-dg-200 rounded-md color-white outline-none' />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm uppercase font-semibold'>
                                Description
                            </span>
                            <textarea onChange={updateWForm} name="wdesc" className='px-2 py-1 bg-dg-100 border border-dg-200 rounded-md color-white outline-none resize-none' />
                        </div>
                    </div>
                    <Btn onClick={createWorkout}>Create</Btn>
                </div>
                <div className='bg-dg-100 flex justify-center items-center px-8'>
                    <div className='w-full'>
                        <div className='flex items-center'>
                            <h1 className='text-xl font-medium'>Exercises</h1>
                            <button className='flex items-center gap-2 ml-auto px-2 bg-primary-h --bg hover:bg-primary-h2 text-sm uppercase font-semibold rounded-md'>
                                <IoAddCircle />
                                Add Exercise
                            </button>
                        </div>
                        <div className='border border-dg-200 rounded-md px-4 py-2 w-full flex'>
                            {exercises===undefined || (typeof exercises ==='object' && exercises.length===0)?(
                                <span className='font-medium text-lg text-white/60 mx-auto w-fit'>No exercises added!</span>
                            ):(
                                <div className='flex flex-col gap-1 w-full'>
                                    {exercises.map((e,index) => {
                                        return (
                                            <div key={`ex-${index}`}>
                                                <div className='h-[5px] rounded-md' onDragEnter={onSpacerEnter} onDragLeave={onSpacerLeave} key={`sp-${index}`}></div>
                                                <div className='flex items-center gap-3 bg-dg-200 rounded-md px-3 py-1 w-full hover:cursor-grab' draggable
                                                    onDragStart={(e) => dragStart(e, index)}
                                                    onDragEnter={(e) => dragEnter(e, index)}
                                                    onDragEnd={drop}>
                                                    <span className='cursor-pointer text-2xl'>
                                                        <RxDragHandleDots2 />
                                                    </span>
                                                    <span className='flex flex-col'>
                                                        <span>{e.name}</span>
                                                        <span className='text-sm text-white/60'>{e.description}</span>
                                                    </span>
                                                    <span className='text-red hover:text-red-h transition-colors duration-150 text-xl cursor-pointer ml-auto'>
                                                        <IoMdRemoveCircle 
                                                            onClick={()=>{removeExercise(index)}}/>
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Content>
        </>
    );
}