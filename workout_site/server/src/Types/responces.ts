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
