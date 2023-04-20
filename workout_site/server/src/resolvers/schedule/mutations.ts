import { knexInstance, User } from "../../interfaces.js";
import * as responces from "../../Types/responces.js";
import * as types from "../../Types/main.js";
import { v4 as uuidv4 } from "uuid";
import { scheduler } from "timers/promises";

export async function create_schedule(
  name: String,
  description: String,
  image: String,
  userId: String
) {
  let responce:responces.scheduleResponce = {
    code: 500,
    success: false,
    message: "sever error",
    schedule: null,
  };
    let schedule: types.ScheduleDB = {
        scheduleId: uuidv4(),
        name: name,
        userId: userId,
        description: description == undefined ? "" : description,
        image: image == undefined ? "" : image,
    }
    try {
        await knexInstance("schedules").insert(schedule);
        responce.code = 200;
        responce.success = true;
        responce.message = "schedule created";
        responce.schedule = await knexInstance("schedules").where("scheduleId", schedule.scheduleId).first();
        console.log(responce);
    }   
    catch (err) {
        console.log(err);
    }   
    return responce;
}

export async function create_track(name, description, userId){
  let responce:responces.scheduleResponce = {
    code: 500,
    success: false,
    message: "sever error",
    schedule: null,
  };
  const track: types.TrackDB = {
    trackId: uuidv4(),
    name: name,
    description: description == undefined ? "" : description,
    userId: userId,
  }
  try{
    await knexInstance("tracks").insert(track);
    const res = await knexInstance("tracks").where("trackId", track.trackId).first();
    responce.code = 200;
    responce.success = true;
    responce.message = "track created";
    responce.schedule = res;
  }
  catch(err){
    console.log(err);
  }

}

