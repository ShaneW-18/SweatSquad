import { knexInstance, User } from "../../interfaces.js";
import * as responces from "../../Types/responces.js";
import * as types from "../../Types/main.js";

let responce: responces.getUserResponce = {
  code: 500,
  success: false,
  message: "sever error",
  user: null,
};
export async function get_user_by_id(
  id: number
): Promise<responces.getUserResponce> {
  const User: types.User = (await knexInstance("users")
    .where("userId", id)
    .first()) as unknown as types.User;
  if (User) {
    responce.code = 200;
    responce.success = true;
    responce.message = "User found";
    responce.user = User;
  } else {
    responce.code = 404;
    responce.success = false;
    responce.message = "User not found";
  }
  return responce;
}
export async function get_user_by_username(
  username: string
): Promise<responces.getUserResponce> {
  const User: types.User = (await knexInstance("users")
    .where("username", username)
    .first()) as unknown as types.User;
  if (User) {
    responce.code = 200;
    responce.success = true;
    responce.message = "User found";
    responce.user = User;
  } else {
    responce.code = 404;
    responce.success = false;
    responce.message = "User not found";
  }
  return responce;
}
export async function search_all_users(
  username: String
): Promise<responces.getAllUserResponce> {
  let responce: responces.getAllUserResponce = {
    code: 500,
    success: false,
    message: "sever error",
    users: [],
  };
  const users: types.UserDB[] = await knexInstance("users").whereRaw(
    "Lower(username) LIKE ?",
    [`%${username.toLowerCase()}%`]
  );
  let userList: types.User[] = [];
  try {
    for (let i = 0; i < users.length; i++) {
      let userItem: types.User = {
        username: users[i].username,
        userId: users[i].userId,
        description: users[i].description,
        image: users[i].image,
        password: users[i].password,
        email: users[i].email,
      };
      userList.push(userItem);
    }
    responce.code = 200;
    responce.success = true;
    responce.message = "User found";
    responce.users = userList;
    return responce;

  } catch (err) {
    console.log(err);
  }

  return responce;
}