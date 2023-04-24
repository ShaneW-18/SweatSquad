import { v4 as uuidv4 } from "uuid";
import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

export const knexInstance = knex({
  client: "pg",
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: parseInt(process.env.PG_PORT),
  },
  pool:{min: 0, max: 20}
});

export interface User {
  username: string;
  password: string;
  "UID of account";
  userId: string;
  "an about me created by user";
  description: string;
  "other users that are followed by current user";
  following: [User];
}
export interface schedule {
  scheduleid: uuidv4;
  name: string;
  description: string;
  image: string;
  workouts: workout[];
}
export interface workout {
  workoutId: uuidv4;
  exercise: exercise[];
  sets: number;
  reps: number;
}
export interface exercise {
  name: string;
  description: string;
  id: uuidv4;
}

export interface authUser {
  username: string;
  userId: string;
  token: string;
}
