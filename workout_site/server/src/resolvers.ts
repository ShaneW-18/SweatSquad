import { Database_lookup } from "./userdata.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as schedule_Types from "./Types/schedule.js";
import { knexInstance, User } from "./interfaces.js";
import knex from "knex";

dotenv.config();

const connection = new Database_lookup();
export const resolvers = {
  Query: {
    //get user by id
    User: (parent, { id }, context, info) => {
      console.log(typeof id);
      return connection.getUser(id);
    },
    get_user_username: async (parent, { username }, context, info) => {
      return await knexInstance("users")
        .where("username", username.toLowerCase())
        .first();
    },
  },
  Mutation: {
    //register user
    register_user: (
      parent,
      { username, password, email, description, age },
      context,
      info
    ) => {
      password = bcrypt.hashSync(password, 15);
      const temp_user = {
        userId: uuidv4(),
        username: username.toLowerCase(),
        password: password,
        email: email,
        description: description,
      };
      return connection.addUser(temp_user);
    },
    //login user
    login: (parent, { email, password }, context, info) => {
      return connection.login(email, password);
    },

    //start a new schedule
    add_schedule: async (
      parent,
      { name, description, image, userId },
      context,
      info
    ) => {
      let responce: schedule_Types.scheduleResponce = {
        code: 500,
        success: false,
        message: "sever error",
      };
      const uuid = uuidv4();
      const temp_schedule: schedule_Types.ScheduleDB = {
        scheduleId: uuid,
        name: name,
        description: description == undefined ? null : description,
        image: image == undefined ? null : image,
        userId: userId,
      };
      try {
        await knexInstance("schedules").insert(temp_schedule);
        await knexInstance("schedules").where("scheduleId", uuid).first();
        return (responce = {
          code: 200,
          success: true,
          message: "schedule created",
        });
      } catch (err) {
        console.log(err);
        return responce;
      }
    },

    //create a new track
    add_track: async (
      parent,
      { name, scheduleId, startDate, endDate },
      context,
      info
    ) => {
      const track: schedule_Types.TrackDB = {
        trackId: uuidv4(),
        name: name,
        scheduleId: scheduleId,
        startDate: startDate,
        endDate: endDate == undefined ? null : endDate,
      };

      let responce: schedule_Types.scheduleResponce = {
        code: 500,
        success: false,
        message: "sever error",
      };
      try {
        await knexInstance("tracks").insert(track);
        await knexInstance("tracks").where("trackId", track.trackId).first();
        return (responce = {
          code: 200,
          success: true,
          message: "track created",
        });
      } catch (err) {
        console.log(err);
        return responce;
      }
    },

    //create a new workout
    add_workout: async (
      parent,
      { name, order, isRestDay, trackId },
      context,
      info
    ) => {
      const workout: schedule_Types.WorkoutDB = {
        workoutId: uuidv4(),
        name: name,
        order: order,
        isRestDay: isRestDay,
        trackId: trackId,
      };
      let responce: schedule_Types.scheduleResponce = {
        code: 500,
        success: false,
        message: "sever error",
      };
      try {
        await knexInstance("workouts").insert(workout);
        await knexInstance("workouts")
          .where("workoutId", workout.workoutId)
          .first();
        return (responce = {
          code: 200,
          success: true,
          message: "workout created",
        });
      } catch (err) {
        console.log(err);
        return responce;
      }
    },
    //add exercise
    add_exercise: async (
      parent,
      { name, description, workoutId, sets, reps },
      context,
      info
    ) => {
      const exercise: schedule_Types.ExerciseDB = {
        exerciseId: uuidv4(),
        name: name,
        description: description == undefined ? null : description,
        workoutId: workoutId,
        sets: sets == undefined ? null : sets,
        reps: reps == undefined ? null : reps,
      };
      let responce: schedule_Types.scheduleResponce = {
        code: 500,
        success: false,
        message: "sever error",
      };
      try {
        await knexInstance("exercises").insert(exercise);
        await knexInstance("exercises")
          .where("exerciseId", exercise.exerciseId)
          .first();
        return (responce = {
          code: 200,
          success: true,
          message: "exercise created",
        });
      } catch (err) {
        console.log(err);
        return responce;
      }
    },
  },

  User: {
    following: async (parent) => {
      console.log("here1");
      const following: User[] = await knexInstance("follows as f")
        .join("users as u", "u.userId", "f.followedUserId")
        .select("u.* as following") // select all columns from `u` and alias as `following`
        .where("f.followingUserId", parent.userId);
      return following;
    },
  },
};
