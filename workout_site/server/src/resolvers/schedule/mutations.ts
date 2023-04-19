import { knexInstance, User } from "../../interfaces.js";
import * as responces from "../../Types/responces.js";
// import * as types from "../../Types/main.js";
import { v4 as uuidv4 } from "uuid";
import { scheduler } from "timers/promises";

let responce: responces.scheduleResponce = {
    code: 500,
    success: false,
    message: "sever error",

};
// export async function create_schedule(name: String, description: String, image: String, userId: String){
//     const schedule: types.Schedule = {
//         scheduleId: uuidv4(),
        
//     } 
// }