import pg from "pg";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import {User} from "./interfaces";
import bcrypt from "bcrypt";
import { knexInstance } from "./interfaces.js";

dotenv.config();

export class Database_lookup {
  private dbConnection;

  constructor() {
    this.initializeDBConnection();
  }

  //method to initialize the database connection
  async initializeDBConnection() {
    try {
      const pool = new pg.Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: parseInt(process.env.PG_PORT),
      });

      await pool.connect();
      this.dbConnection = pool;
      console.log("server init success");
    } catch {
      console.log("server init unsuccessful");
    }
  }

  //method to create a user from a request
  async getUser(id: uuidv4) {
    if (id != null) {

      const result: User = await knexInstance("users").where( "userId", id).first();
      return result;
    }
    return;
  }

  //method to add user to database
  async addUser(user_temp) {
    const id = user_temp.userId;
    const existingUser = await knexInstance("users")
      .where("email", user_temp.email )
      .first();
  
    if (existingUser) {
      return {
        code: 409,
        success: false,
        message: "Email already in use",
        user: null,
      };
    }
  
    try {
      await knexInstance("users").insert(user_temp);
    } catch {
      return {
        code: 500,
        success: false,
        message: "Internal server error",
        user: null,
      };
    }
  
    const newUser = await knexInstance("users")
      .where( "userId", id)
      .first();
  
    return {
      code: 200,
      success: true,
      message: "User added",
      user: newUser
    };
  }
  

  async login(email, password) {
    console.log("login");
    const response = {
      code: 0,
      success: false,
      message: "Unknown error",
      user: null,
    };
  
    const user = await knexInstance("users")
      .where("email", email)
      .first();
  
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        response.code = 200;
        response.success = true;
        response.message = "Login successful";
        response.user = user
      } else {
        response.code = 401;
        response.message = "Incorrect password";
      }
    } else {
      response.code = 404;
      response.message = "User not found";
    }
  
    return response;
  }
  
  async getUserSchedules(id) {
    if (id != null) {
      const result = await knexInstance("schedules")
        .where("uid", id)
        .select("*");
      return result;
    }
  
    return [];
  }
}  


