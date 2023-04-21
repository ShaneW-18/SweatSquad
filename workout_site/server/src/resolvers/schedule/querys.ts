import { knexInstance, User } from "../../interfaces.js";
import * as responces from "../../Types/responces.js";
import * as types from "../../Types/main.js";
import { v4 as uuidv4 } from "uuid";

export async function get_schedule_by_username (userId: String): Promise<responces.getAllScheduleResponce> {
    let responce: responces.getAllScheduleResponce = {
        code: 500,
        success: false,
        message: "sever error",
        schedules: [],
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
        responce.schedules = scheduleList;
    

    } catch (err) {
        console.log(err);
    }
    return responce;

}
export async function get_all_exercises (): Promise<responces.getAllExerciseResponce> {
    let responce: responces.getAllExerciseResponce = {
        code: 500,
        success: false,
        message: "sever error",
        exercises: [],
    };
    try {
        let exercises: types.ExerciseDB[] = await knexInstance("exercises");    
        let exerciseList: types.Exercise[] = [];
        for (let i = 0; i < exercises.length; i++) {
            let exerciseItem: types.Exercise = {
                name: exercises[i].name,
                description: exercises[i].description,
                exerciseId: exercises[i].exerciseId,
            }
            exerciseList.push(exerciseItem);
        }

        responce.code = 200;
        responce.success = true;
        responce.message = "exercise found";
        responce.exercises = exerciseList;

    } catch (err) {
        console.log(err);
    }
    return responce;

}
    

export async function get_all_tracks_by_userId(userId: String): Promise<responces.getAllTrackResponce> {
    let responce: responces.getAllTrackResponce = {
        code: 500,
        success: false,
        message: "sever error",
        tracks: [],
    };
    try{
        let tracks: types.TrackDB[] = await knexInstance("tracks").where("userId", userId);
        let trackList: types.Track[] = [];
        for (let i = 0; i < tracks.length; i++) {
            let trackItem: types.Track = {
                name: tracks[i].name,
                trackId: tracks[i].trackId,
                user: null,
                description: tracks[i].description,
                
            }
            trackList.push(trackItem);
        }
        responce.code = 200;
        responce.success = true;
        responce.message = "track found";
        responce.tracks = trackList;
    } catch (err) {
        console.log(err);
    }
    return responce;
}
export async function get_all_workouts_by_userId(userId: String): Promise<responces.getAllWorkoutResponce> {
    let responce: responces.getAllWorkoutResponce = {
        code: 500,
        success: false,
        message: "sever error",
        workouts: [],
    };
    try{
        let workouts: types.WorkoutDB[] = await knexInstance("workouts").where("userId", userId);
        let workoutList: types.Workout[] = [];
        for (let i = 0; i < workouts.length; i++) {
            let workoutItem: types.Workout = {
                name: workouts[i].name,
                workoutId: workouts[i].workoutId,
                user: null,
                description: workouts[i].description,
                isRestDay: workouts[i].isRestDay,
            }
            workoutList.push(workoutItem);
        }
        responce.code = 200;
        responce.success = true;
        responce.message = "workout found";
        responce.workouts = workoutList;
    } catch (err) {
        console.log(err);
    }
    return responce;
}

  
