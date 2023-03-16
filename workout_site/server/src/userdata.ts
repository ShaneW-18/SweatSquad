import pg from "pg";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import {User} from "./interfaces"
dotenv.config();

export class Database_lookup {
  private dbConnection;

  constructor() {
    this.initializeDBConnection();
  }

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

  async getUser(id: uuidv4) {
    if (id != null) {
      const result = await this.dbConnection.query(
        "SELECT * FROM users WHERE uid=$1",
        [id]
      );
      return create_user_from_request(result)
    }
    return;
  }
  async addUser(user_temp) {
    let id = user_temp.uuid
    //init a responce to send back
    let responce = {
      code: 0,
      success: false,
      message: "Unknown error",
      user: null,
    };

    //checks for email duplicate
    const email_dup = await this.dbConnection.query(
      "SELECT * FROM users WHERE email=$1",
      [user_temp.email]
    );
    if (email_dup.rows.length > 0) {
      responce.code = 409;
      responce.message = "Email already in use";
      return responce;
    }

    // if no email duplicate then insert user
    else {
      try {
        const result = await this.dbConnection.query(
          "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [
            user_temp.username,
            user_temp.password,
            user_temp.uuid,
            user_temp.age,
            user_temp.email,
            user_temp.description,
            null,
          ]
        );
      }

      //if respnce failed send internal server error
       catch {
        responce.code = 500;
        responce.message = "Internal server error";
        return responce;
      }

      //if all criteria is met return 200 responce
      responce.code = 200;
      responce.success = true;
      responce.message = "User added";
      responce.user = create_user_from_request(await this.dbConnection.query(
        "SELECT * FROM users WHERE uid=$1",
        [id]
      ));
      return responce;
    }
    return responce;
  }
}

//creates a user from format given by database
function create_user_from_request(user){
  const re: User = { 
    id: user.rows[0].uid,
    username: user.rows[0].username,
    password: user.rows[0].password,
    age: user.rows[0].age,
    email: user.rows[0].email,
    description: user.rows[0].description,
    following: user.rows[0].following,
  }
  return re;
}