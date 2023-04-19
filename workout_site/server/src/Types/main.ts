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
  userId: uuidv4;
  tracks?: [Track];
}

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
}
export type TrackDB = {
  name: uuidv4;
  scheduleId: uuidv4;
  startDate: Date;
  endDate?: Date;
  trackId: uuidv4;
};
export type WorkoutDB = {
  workoutId: String;
  trackId: String;
  order: Number;
  isRestDay: Boolean;
  name: String;
};
export type Workout = {
  workoutId: String;
  description?: String;
  isRestDay: Boolean;
  name: String;
  days: Number;
  User: User;
  exercises?: [Exercise];
}
export type ExerciseDB = {
  name: String;
  description?: String;
  workoutId: String;
  exerciseId: String;
  sets: Number;
  reps: Number;
};
export type Exercise = {
  name: String;
  description?: String;
  exersiceId: String;
}
