import { knexInstance, User } from "../../interfaces.js";
import * as responces from "../../Types/responces.js";
import * as types from "../../Types/main.js";
import { v4 as uuidv4 } from "uuid";

export async function get_schedule_by_username (userId){
    let responce: responces.getScheduleResponce = {
        code: 500,
        success: false,
        message: "sever error",
        schedule: [],
    };
    try {
        let schedule: types.ScheduleDB[] = await knexInstance("schedules").where("userId", userId);    
        let scheduleList: types.Schedule[] = [];
        for (let i = 0; i < schedule.length; i++) {
            let scheduleItem: types.Schedule = {
                scheduleId: schedule[i].scheduleId,
                name: schedule[i].name,
                description: schedule[i].description,
                image: schedule[i].image,
                user: null,
                userId: userId
            }
            scheduleList.push(scheduleItem);
        }

        responce.code = 200;
        responce.success = true;
        responce.message = "schedule found";
        responce.schedule = scheduleList;
    

    } catch (err) {
        console.log(err);
    }
    return responce;

}