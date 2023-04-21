import * as types from "./main.js";
export type scheduleResponce = {
  code: Number;
  success: Boolean;
  message: String;
  schedule: types.Schedule;
};
export type trackResponce = {
  code: Number;
  success: Boolean;
  message: String;
  track: types.Track;
};
export type workoutResponce = {
  code: Number;
  success: Boolean;
  message: String;
  workout: types.Workout;
}
export type exerciseResponce = {
  code: Number;
  success: Boolean;
  message: String;
  exercise: types.Exercise;
}
export type getUserResponce = {
  code: Number;
  success: Boolean;
  message: String;
  user: types.User;
};
export type genericResponce = {
  code: Number;
  success: Boolean;
  message: String;
};
export type getAllScheduleResponce = {
  code: Number;
  success: Boolean;
  message: String;
  schedules: types.Schedule[]
}
export type getAllTrackResponce = {
  code: Number;
  success: Boolean;
  message: String;
  tracks: types.Track[]
}
export type getAllWorkoutResponce = {
  code: Number;
  success: Boolean;
  message: String;
  workouts: types.Workout[]
}
export type getAllExerciseResponce = {
  code: Number;
  success: Boolean;
  message: String;
  exercises: types.Exercise[]
}