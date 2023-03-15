import pg from "pg";
import {v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv';
dotenv.config();


export class Database_lookup {
    private dbConnection;
  
    constructor() {
      this.initializeDBConnection();
    }
  
    async initializeDBConnection() {
        try{
        const pool = new pg.Pool({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            port: parseInt(process.env.PG_PORT),
        });
        await pool.connect();
        this.dbConnection = pool;
        console.log(uuidv4());
        console.log("server init success");
    }
    catch{
        console.log("server init unsuccessful");
    }
    }
  
    async getUser(id: uuidv4) {
      if (id != null) {
        const result = await this.dbConnection.query('SELECT * FROM users WHERE uid=$1',[id] )
        let user = {
            id: result.rows[0].uid,
            username: result.rows[0].username,
            password: result.rows[0].password,
            age: result.rows[0].age,
            email: result.rows[0].email,
            description: result.rows[0].description,
            following: result.rows[0].following
        }
        return user;
      }
      return null;
    }
  
  
  }