import { knexInstance, User } from "../../interfaces.js";
import * as responces from "../../Types/responces.js";
import * as types from "../../Types/main.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

let response: responces.getUserResponce = {
    code: 500,
    success: false,
    message: "sever error",
    user: null,
};
export async function register_user( username: String, password: String, email: String, description: String ): Promise<responces.getUserResponce> {
    password = bcrypt.hashSync(password, 15);
    const user:types.UserDB = {
        userId: uuidv4(),
        username: username.toLowerCase(),
        password: password,
        email: email,
        description: description == undefined ? null : description,
        image: null,
    };
    const id = user.userId;
    const existingUser = await knexInstance("users")
      .where("email", user.email)
      .first();

    const existingUsername = await knexInstance("users")
      .where("username", user.username)
      .first();

    if (existingUser || existingUsername) {
      return response ={
        code: 409,
        success: false,
        message: "Email or Username already in use",
        user: null,
      };
    }

    try {
      await knexInstance("users").insert(user);
    } catch {
      return response
    }

    const newUser = await knexInstance("users").where("userId", id).first();

    return response ={
      code: 200,
      success: true,
      message: "User added",
      user: newUser,
    };
}

export async function login(email:String, password:String){
    console.log("login");

    const user = await knexInstance("users").where("email", email).first();

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        response.code = 200;
        response.success = true;
        response.message = "Login successful";
        response.user = user;
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




