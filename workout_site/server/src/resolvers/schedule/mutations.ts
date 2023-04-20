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
  let responce: responces.scheduleResponce = {
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
    image: image,
  };
  try {
    await knexInstance("schedules").insert(schedule);
    responce.code = 200;
    responce.success = true;
    responce.message = "schedule created";
    responce.schedule = await knexInstance("schedules")
      .where("scheduleId", schedule.scheduleId)
      .first();
  } catch (err) {
    console.log(err);
  }
  return responce;
}

export async function create_track(userId, name, description) {
  let responce: responces.trackResponce = {
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
  };
  console.log(track);
  try {
    await knexInstance("tracks").insert(track);
    responce.code = 200;
    responce.success = true;
    responce.message = "track created";
    responce.track = await knexInstance("tracks")
      .where("trackId", track.trackId)
      .first();
  } catch (err) {
    console.log(err);
  }
  return responce;
}
export async function create_workout(name, isRestDay, description, userId) {
  let responce: responces.workoutResponce = {
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
  };
  try {
    await knexInstance("workouts").insert(workout);
    responce.code = 200;
    responce.success = true;
    responce.message = "workout created";
    responce.workout = await knexInstance("workouts")
      .where("workoutId", workout.workoutId)
      .first();
  } catch (err) {
    console.log(err);
  }
  return responce;
}
export async function create_exercise(name, description) {
  let responce: responces.exerciseResponce = {
    code: 500,
    success: false,
    message: "sever error",
    exercise: null,
  };
  const exercise: types.ExerciseDB = {
    exerciseId: uuidv4(),
    name: name,
    description: description,
  };
  try {
    await knexInstance("exercises").insert(exercise);
    responce.code = 200;
    responce.success = true;
    responce.message = "exercise created";
    responce.exercise = await knexInstance("exercises")
      .where("exerciseId", exercise.exerciseId)
      .first();
  } catch (err) {
    console.log(err);
  }
  return responce;
}

export async function add_track_to_schedule(trackId, scheduleId, start, end) {
  let responce: responces.genericResponce = {
    code: 500,
    success: false,
    message: "sever error",
  };
  const scheduleTrack: types.trackSceduleDB = {
    trackScheduleId: uuidv4(),
    trackId: trackId,
    scheduleId: scheduleId,
    start: start,
    end: end,
  };
  try {
    await knexInstance("track_schedules").insert(scheduleTrack);
    responce.code = 200;
    responce.success = true;
    responce.message = "track added to schedule";
  } catch (err) {
    console.log(err);
  }
  return responce;
}
export async function add_workout_to_track(workoutId, trackId, order) {
  let responce: responces.genericResponce = {
    code: 500,
    success: false,
    message: "sever error",
  };
  const trackWorkout: types.workoutTrackDB = {
    workoutTrackId: uuidv4(),
    workoutId: workoutId,
    trackId: trackId,
    order: order,
  };
  try {
    await knexInstance("workout_tracks").insert(trackWorkout);
    responce.code = 200;
    responce.success = true;
    responce.message = "workout added to track";
  } catch (err) {
    console.log(err);
  }
  return responce;
}

export async function add_exercise_to_workout( exerciseId, workoutId, reps, sets, time, order ) {
  let responce: responces.genericResponce = {
    code: 500,
    success: false,
    message: "sever error",
  };
  const workoutExercise: types.exerciseWorkoutDB = {
    exerciseWorkoutId: uuidv4(),
    exerciseId: exerciseId,
    workoutId: workoutId,
    reps: reps,
    sets: sets,
    time: time,
    order: order
  };
  try {
    await knexInstance("exercise_workouts").insert(workoutExercise);
    responce.code = 200;
    responce.success = true;
    responce.message = "exercise added to workout";
  } catch (err) {
    console.log(err);
  }
  return responce;
}