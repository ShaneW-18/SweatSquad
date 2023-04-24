import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Content from '../../components/Content';
import { useSession } from 'next-auth/react';
import { BiSave } from 'react-icons/bi';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { IoMdRemoveCircle } from 'react-icons/io';
import { IoAddCircle } from 'react-icons/io5';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';
import { SEARCH_EXERCISES, GET_WORKOUT_BY_ID } from '../../GraphQL/Queries';
import { ADD_EXERCISE, ADD_EXERCISE_TO_WORKOUT, DELETE_EXERCISES } from '../../GraphQL/Mutations';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../components/toasts";
import { ToastContainer } from "react-toastify";
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import client from '../../db';

const MIN_QUERY_LEN = 2;


export default function Workout({workoutData}) {
    const router = useRouter();
    const [gql_createExercise, {edata}] = useMutation(ADD_EXERCISE);
    const [searchExercise, {data}] = useLazyQuery(SEARCH_EXERCISES);
    const [addExerciseToWorkout, {awdata}] = useMutation(ADD_EXERCISE_TO_WORKOUT);
    const [deleteExercises, {dwdata}] = useMutation(DELETE_EXERCISES);
    const [edesc, setEDesc] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [exercises, setExercises] = useState(workoutData.exercises);
    const { data: session, status } = useSession();

    function moveExercise(dragIndex, hoverIndex) {
        const e = exercises[dragIndex];
        if(!e){
            return;
        }
        setExercises((prevState => {
            const ex = [...prevState];
            const prevItem = ex.splice(hoverIndex, 1, e);
            ex.splice(dragIndex, 1, prevItem[0]);
            return ex;
        }));
    }

    const [eform, seteForm] = useState({
        name: '',
        desc:''
    });

    const [wform, setwForm] = useState({
        name: '',
        desc:''
    });

    const updateEForm = async (e) => {
        const { target } = e;
        if (!(target.name in eform)){
            return;
        }

        const tempForm = Object.assign({}, eform);
        tempForm[target.name] = target.value;
        seteForm(tempForm);

        if(target.value.length < MIN_QUERY_LEN){
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

        /** TODO: implement caching here */

        if (!('search_exercises' in res)){
            errorToast('Error');
            return;
        }

        const arr =  res.search_exercises.exercises.slice(0,5);
        setSuggestions(arr);
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

    const saveWorkout = async() => {
        if (!('user' in session) || status !== 'authenticated'){
            return;
        }

        const { workoutId } = router.query;
        await deleteExercises({
            variables: {
                workoutId: workoutId
            }
        })
        .then(({ data }) => {
            return data;
        });

        exercises.forEach(async (e, index) => {
            const sets=e.sets;
            const reps=e.reps;
            const id=e.exerciseId;

            const res = await addExerciseToWorkout({
                variables: {
                    exerciseId: id,
                    sets:parseInt(sets,10),
                    reps:parseInt(reps,10),
                    order:index,
                    workoutId:workoutId
                }
            })
            .then(({ data }) => {
                return data;
            });

        });
        successToast(`Workout has been updated!`);
    }

    const clearWorkout = () => {
        setExercises([]);
    }

    const addExercise = (exercise) => {
        setExercises([...exercises, {...exercise, sets:0, reps:0}]);
        setSuggestions([]);
        seteForm({...eform, name: ''})
    }

    const removeExercise = (index) => {
        const temp = Object.assign([], exercises);
        temp.splice(index, 1);
        setExercises(temp);
    }

    const createExercise = async () => {
        if (!('user' in session) || status !== 'authenticated'){
            return;
        }

        const res = await gql_createExercise({
            variables: {
                name: eform.name,
                description: eform.desc
            }
        })
        .then(({ data }) => {
            return data;
        });


        if (!('add_exercise' in res)){
            errorToast('Error creating exercise');
            return;
        }

        successToast(`${eform.name} has been added!`);
        addExercise(res.add_exercise.exercise);
        seteForm({
            name:'',
            desc:''
        });
    }

    const updateExerciseDesc = (e) => {
        seteForm((prevState) => {
            return {
                name: prevState.name,
                desc: e.target.value
            }
        });
    }

    const updateCounts = (e) => {
        const {value} = e.target;
        const name = e.target.name.split('-');

        const idx=parseInt(name[1],10);
        const temp = [...exercises];
        temp[idx][name[0]]=value;
        setExercises(temp);
    }


    return (
        <>
        <ToastContainer />
        <Content>
            <div className='relative p-4 h-f'>
                <div className='p-4 absolute left-0 bottom-0'>
                    <Link href="/create" className='flex items-center gap-2'>
                        <AiOutlineLeft />
                        Back
                    </Link>
                </div>
                <div className='bg-dg-100 flex justify-center items-center px-8'>
                    <div className='w-full min-w-[400px]'>
                        <div className=''>
                            <div className='mb-4'>
                                <h1 className='text-xl font-medium'>Workout Name</h1>
                                <p className='text-white/70'>Workout Description</p>
                            </div>

                            <div className=' mb-2 relative flex gap-2'>
                                <input type='text' name='name' onChange={updateEForm} value={eform.name}
                                autoComplete="off"
                                    className={`px-2 py-1 bg-dg-100 border border-dg-200 rounded-md color-white outline-none`}
                                    placeholder='Exercise name...' />
                                
                                <div className={`${suggestions.length ? 'hidden' : 'block'} flex items-center gap-2 w-full`}>
                                    <input type='text' className='px-2 py-1 bg-dg-100 border border-dg-200 rounded-md color-white outline-none'
                                        placeholder='Exercise description...' value={eform.desc} onChange={updateExerciseDesc} />
                                    <button className={`a-mw ${!suggestions.length ? 'max-w-[100px] px-2 py-1' : 'hide-btn p-0'} flex items-center gap-2  bg-primary-h --bg hover:bg-primary-h2 text-sm uppercase font-semibold rounded-md`}
                                        onClick={createExercise}>
                                        <span className={`items-center gap-1 ${!suggestions.length ? 'flex' : 'hidden'}`}>
                                            <IoAddCircle />
                                            Add
                                        </span>
                                    </button>
                                    <button className={`ml-auto px-2 py-1 flex items-center gap-2 bg-primary-h --bg hover:bg-primary-h2 text-sm uppercase font-semibold rounded-md`}
                                        onClick={saveWorkout}>
                                        <span className={`items-center gap-1 ${!suggestions.length ? 'flex' : 'hidden'}`}>
                                            <BiSave />
                                            Save Workout
                                        </span>
                                    </button>
                                </div>

                                <div className='absolute top-full'>
                                    {suggestions.map(e => {
                                        return (
                                            <div key={e.exerciseId} className='px-2 py-1 bg-dg-200 w-full hover:cursor-pointer --bg hover:bg-dg-300'
                                            onClick={()=>{addExercise(e)}}>
                                                {e.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='border border-dg-200 rounded-md px-4 py-2 w-full flex'>
                            {exercises===undefined || (typeof exercises ==='object' && exercises.length===0)?(
                                <span className='font-medium text-lg text-white/60 mx-auto w-fit'>No exercises added!</span>
                            ):(
                                <DndProvider backend={HTML5Backend}>
                                    <ExerciseList exercises={exercises} moveFunc={moveExercise} removeFunc={(i)=>{removeExercise(i)}} updateFunc={updateCounts} />
                                </DndProvider>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Content>
        </>
    );
}

function ExerciseList({exercises, removeFunc, moveFunc,updateFunc}){
    const [{canDrop, isOver}, drop] = useDrop({
        accept:'exercise',
        drop: () => ({name: 'some name'}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })

    return (
        <div className='flex flex-col gap-1 w-full' ref={drop}>
            {exercises.map((e,index) => {
                return (
                    <ExerciseListItem moveFunc={moveFunc} index={index} name={e.name} desc={e.description} key={`ex-${index}`} removeFunc={()=>{removeFunc(index)}} 
                        updateFunc={updateFunc} sets={e.sets} reps={e.reps} />
                );
            })}
        </div>
    );
}

function ExerciseListItem({index, name, desc, removeFunc, moveFunc, updateFunc, sets, reps}) {
    const ref=useRef(null);
    const [, drop] = useDrop(
        {
            accept:'exercise',
            hover(item,monitor){
                if(!ref.current){
                    return;
                }
                const dragIndex = item.index;
                const hoverIndex=index;

                if(dragIndex===hoverIndex){
                    return;
                }

                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                moveFunc(dragIndex, hoverIndex);
                item.index=hoverIndex;
            }
        }
    );

    const [{isDragging}, drag] = useDrag({
        name: 'Any custom name', type: 'exercise',
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
    const opacity = isDragging ? 0.4 : 1;
    drag(drop(ref));

    return (
        <div className='flex items-center gap-3 bg-dg-200 rounded-md px-3 py-1 w-full hover:cursor-grab' ref={ref} style={{opacity:opacity}}>
            <span className='cursor-pointer text-2xl'>
                <RxDragHandleDots2 />
            </span>
            <span className='flex flex-col'>
                <span>{name}</span>
                <span className='text-sm text-white/60'>{desc}</span>
            </span>
            <span className='ml-4'>
                <input type="text" name={`sets-${index}`} value={sets} placeholder='Sets' className='bg-dg-200 border border-dg-300 rounded-md outline-none max-w-[50px] px-1' onChange={updateFunc} />
            </span>
            <span>
                <input type="text" name={`reps-${index}`} value={reps} placeholder='Reps' className='bg-dg-200 border border-dg-300 rounded-md outline-none max-w-[50px] px-1' onChange={updateFunc} />
            </span>
            <span className='text-red hover:text-red-h transition-colors duration-150 text-xl cursor-pointer ml-auto'>
                <IoMdRemoveCircle 
                    onClick={removeFunc}/>
            </span>
        </div>
    );
}

export async function getServerSideProps(context){

    const { workoutId } = context.query;
    let workoutData={};

    try {
        const workout = await client.query({
            query: GET_WORKOUT_BY_ID,
            variables:{workoutId:workoutId}
        });
        workoutData=workout.data.get_workout_by_id.workout;
    }
    catch(e){
        console.error(e);
    }

    return {
        props: {
            workoutData: workoutData,
        }
    }
}