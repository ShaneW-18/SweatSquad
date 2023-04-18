import { Scheduler } from "timers/promises";
import { v4 as uuidv4 } from "uuid";

export type User = {
  id: String;
  username: String;
  email: String;
  description: String;
  password: String;
};
export type scheduleResponce = {
  code: Number;
  success: Boolean;
  message: String;
};
export type ScheduleDB = {
  scheduleId: String;
  name: String;
  description?: String;
  image?: String;
  userId: uuidv4;
};
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
export type ExerciseDB = {
  name: String;
  description?: String;
  workoutId: String;
  exerciseId: String;
  sets: Number;
  reps: Number;
};
