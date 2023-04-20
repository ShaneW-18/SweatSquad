import { Scheduler } from "timers/promises";
import { v4 as uuidv4 } from "uuid";

export type User = {
  username: String;
  password: String;
  userId: String;
  email: String;
  description?: String;
  following?: [User];
  image?: String;
};
export type UserDB = {
  userId: uuidv4;
  username: String;
  email: String;
  description: String;
  password: String;
  image: String;
};
export type Schedule = {
  scheduleId: uuidv4;
  name: String;
  description?: String;
  image?: String;
  user: User;
  tracks?: [Track];
};

export type ScheduleDB = {
  scheduleId: String;
  name: String;
  description?: String;
  image?: String;
  userId: uuidv4;
};
export type Track = {
  name: String;
  trackId: uuidv4;
  description?: String;
  user: User;
  workouts?: [Workout];
};
export type TrackDB = {
  name: String;
  description?: String;
  trackId: uuidv4;
  userId: uuidv4;
};
export type WorkoutDB = {
  workoutId: String;
  description?: String;
  isRestDay: Boolean;
  name: String;
  userId: uuidv4;
};
export type Workout = {
  workoutId: String;
  description?: String;
  isRestDay: Boolean;
  name: String;
  days: Number;
  User: User;
  exercises?: [Exercise];
};
export type ExerciseDB = {
  name: String;
  description?: String;
  exerciseId: String;
};
export type Exercise = {
  name: String;
  description?: String;
  exersiceId: String;
};
