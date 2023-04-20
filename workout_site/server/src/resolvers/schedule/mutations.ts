import { knexInstance, User } from "../../interfaces.js";
import * as responces from "../../Types/responces.js";
import * as types from "../../Types/main.js";
import { v4 as uuidv4 } from "uuid";
import { scheduler } from "timers/promises";

export async function create_schedule(
  name: String,
  description: String,
  image: String,
  userId: String
) {
  let responce:responces.scheduleResponce = {
    code: 500,
    success: false,
    message: "sever error",
    schedule: null,
  };
    let schedule: types.ScheduleDB = {
        scheduleId: uuidv4(),
        name: name,
        userId: userId,
        description: description,
        image: image
    }
    try {
        await knexInstance("schedules").insert(schedule);
        responce.code = 200;
        responce.success = true;
        responce.message = "schedule created";
        responce.schedule =  await knexInstance("schedules").where("scheduleId", schedule.scheduleId).first();
    }   
    catch (err) {
        console.log(err);
    }   
    return responce;
}

export async function create_track(userId, name, description){
  let responce:responces.trackResponce = {
    code: 500,
    success: false,
    message: "sever error",
    track: null,
  };
  const track: types.TrackDB = {
    trackId: uuidv4(),
    name: name,
    description: description,
    userId: userId,
  }
  console.log(track);
  try{
    await knexInstance("tracks").insert(track);
    responce.code = 200;
    responce.success = true;
    responce.message = "track created";
    responce.track = await knexInstance("tracks").where("trackId", track.trackId).first();
  }
  catch(err){
    console.log(err);
  }
  return responce;
}
export async function create_workout(name, isRestDay, description, userId ){
  let responce:responces.workoutResponce = {
    code: 500,
    success: false,
    message: "sever error",
    workout: null,
  };
  const workout: types.WorkoutDB = {
    workoutId: uuidv4(),
    name: name,
    description: description,
    isRestDay: isRestDay,
    userId: userId,
  }
  try{
    await knexInstance("workouts").insert(workout);
    responce.code = 200;
    responce.success = true;
    responce.message = "workout created";
    responce.workout = await knexInstance("workouts").where("workoutId", workout.workoutId).first();
  }
  catch(err){
    console.log(err);
  }
  return responce;
}
export async function create_exercise(name, description){
  let responce:responces.exerciseResponce = {
    code: 500,
    success: false,
    message: "sever error",
    exercise: null,
  };
  const exercise: types.ExerciseDB = {
    exerciseId: uuidv4(),
    name: name,
    description: description,
  }
  try{
    await knexInstance("exercises").insert(exercise);
    responce.code = 200;
    responce.success = true;
    responce.message = "exercise created";
    responce.exercise = await knexInstance("exercises").where("exerciseId", exercise.exerciseId).first();
  }
  catch(err){
    console.log(err);
  }
  return responce;
}


