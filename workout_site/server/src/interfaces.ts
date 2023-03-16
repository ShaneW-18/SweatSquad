import { v4 as uuidv4 } from "uuid";

export interface User {
    username: string;
    password: string;
    id: uuidv4;
    age: number;
    email: string;
    description: string;
    following: string;
  }