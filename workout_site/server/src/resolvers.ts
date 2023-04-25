import { Database_lookup } from "./userdata.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as schedule_Types from "./Types/main.js";
import * as responces from "./Types/responces.js";
import { knexInstance, User } from "./interfaces.js";
import * as user_Querys from "./resolvers/User/querys.js";
import * as message_Querys from "./resolvers/messages/querys.js";
import * as user_Mutations from "./resolvers/User/mutations.js";
import * as schedule_Querys from "./resolvers/schedule/querys.js";
import * as message_Mutations from "./resolvers/messages/mutations.js";
import knex from "knex";
import * as types from "./Types/main.js";
import * as schedule_Mutations from "./resolvers/schedule/mutations.js";
dotenv.config();

const connection = new Database_lookup();
export const resolvers = {
  Query: {
    //get user by id
    User: async (parent, { id }, context, info) => {
      return await user_Querys.get_user_by_id(id);
    },
    get_user_username: async (parent, { username }, context, info) => {
      return await user_Querys.get_user_by_username(username);
    },
    get_all_schedules_by_userId: async (parent, { userId }, context, info) => {
      return await schedule_Querys.get_schedule_by_username(userId);
    },
    get_all_tracks_by_userId: async (parent, { userId }, context, info) => {
      return await schedule_Querys.get_all_tracks_by_userId(userId);
    },
    get_all_workouts_by_userId: async (parent, { userId }, context, info) => {
      return await schedule_Querys.get_all_workouts_by_userId(userId);
    },
    get_all_exercises: async (parent, params, context, info) => {
      return await schedule_Querys.get_all_exercises();
    },
    search_exercises: async (parent, { name }, context, info) => {
      return await schedule_Querys.search_exercises(name);
    },
    get_track_by_id: async (parent, { trackId }, context, info) => {
      return await schedule_Querys.get_track_by_id(trackId);
    },
    get_workout_by_id: async (parent, { workoutId }, context, info) => {
      return await schedule_Querys.get_workout_by_id(workoutId);
    },
    search_all_users: async (parent, { username }, context, info) => {
      return await user_Querys.search_all_users(username);
    },
    get_all_users_following:async (parent, {userId}, context, info) => {
      return await user_Querys.get_all_users_following(userId);
    },
    get_all_users_followers:async (parent, {userId}, context, info) => {
      return await user_Querys.get_all_users_followers(userId);
    },
    get_conversation_by_id:async (parent, {conversationId, offset}, context, info) => {
      return await message_Querys.get_conversation_by_id(conversationId, offset);
    }

  },
  Mutation: {
    //register user
    register_user: async (
      parent,
      { username, password, email, description },
      context,
      info
    ) => {
      return await user_Mutations.register_user(
        username,
        password,
        email,
        description
      );
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
      return await schedule_Mutations.create_schedule(
        name,
        description,
        image,
        userId
      );
    },

    //create a new track
    add_track: async (parent, { userId, name, description }, context, info) => {
      return await schedule_Mutations.create_track(userId, name, description);
    },

    //create a new workout
    add_workout: async (
      parent,
      { name, isRestDay, description, userId },
      context,
      info
    ) => {
      return await schedule_Mutations.create_workout(
        name,
        isRestDay,
        description,
        userId
      );
    },
    //add exercise
    add_exercise: async (parent, { name, description }, context, info) => {
      return await schedule_Mutations.create_exercise(name, description);
    },
    add_track_to_schedule: async (
      parent,
      { trackId, scheduleId, start, end },
      context,
      info
    ) => {
      return await schedule_Mutations.add_track_to_schedule(
        trackId,
        scheduleId,
        start,
        end
      );
    },
    add_workout_to_track: async (
      parent,
      { workoutId, trackId, order },
      context,
      info
    ) => {
      return await schedule_Mutations.add_workout_to_track(
        workoutId,
        trackId,
        order
      );
    },
    add_exercise_to_workout: async (
      parent,
      { exerciseId, workoutId, reps, sets, time, order },
      context,
      info
    ) => {
      return await schedule_Mutations.add_exercise_to_workout(
        exerciseId,
        workoutId,
        reps,
        sets,
        time,
        order
      );
    },
    edit_schedule: async (
      parent,
      { name, description, image, scheduleId },
      context,
      info
    ) => {
      return await schedule_Mutations.edit_schedule(
        name,
        description,
        image,
        scheduleId
      );
    },
    edit_track: async (
      parent,
      { trackId, name, description },
      context,
      info
    ) => {
      return await schedule_Mutations.edit_track(trackId, name, description);
    },
    edit_workout: async (
      parent,
      { name, description, isRestDay, workoutId },
      context,
      info
    ) => {
      return await schedule_Mutations.edit_workout(
        name,
        description,
        isRestDay,
        workoutId
      );
    },
    edit_exercise: async (
      parent,
      { exerciseId, name, description },
      context,
      info
    ) => {
      return await schedule_Mutations.edit_exercise(
        exerciseId,
        name,
        description
      );
    },
    remove_track_from_schedule: async (parent, { trackScheduleId }, context, info) => {
      return await schedule_Mutations.remove_track_from_schedule(trackScheduleId);
    },
    remove_workout_from_track: async (parent, { workoutTrackId }, context, info) => {
      return await schedule_Mutations.remove_workout_from_track(workoutTrackId);
    },
    remove_exercise_from_workout: async (parent, { exerciseWorkoutId }, context, info) => {
      return await schedule_Mutations.remove_exercise_from_workout(exerciseWorkoutId);
    },
    remove_all_workouts_from_track: async (parent, { trackId }, context, info) => {
      return await schedule_Mutations.remove_all_workouts_from_track(trackId);
    },
    remove_all_tracks_from_schedule: async (parent, { scheduleId }, context, info) => {
      return await schedule_Mutations.remove_all_tracks_from_schedule(scheduleId);
    },
    remove_all_exercises_from_workout: async (parent, { workoutId }, context, info) => {
      return await schedule_Mutations.remove_all_exercises_from_workout(workoutId);
    },
    delete_track: async (parent, { trackId }, context, info) => {
      return await schedule_Mutations.delete_track(trackId);
    },
    delete_workout: async (parent, { workoutId }, context, info) => {
      return await schedule_Mutations.delete_workout(workoutId);
    },
    follow_user: async (parent, { followingId, followedId }, context, info) => {
      return await user_Mutations.follow_user(followingId, followedId);
    },
    unfollow_user: async (parent, { followingId, followedId }, context, info) => {
      return await user_Mutations.unfollow_user(followingId, followedId);
    },
    add_active_track: async (parent, {userId, trackId}, context, info) => {
      return await user_Mutations.add_active_track(userId, trackId);
    },
    remove_active_track: async (parent, {userTrackId}, context, info) => {
      return await user_Mutations.remove_active_track(userTrackId); 
    },
    create_conversation: async (parent, {userId, name}, context, info) => {
      return await message_Mutations.create_conversation(userId, name);
    },
    create_message: async (parent, {conversationId, userId, message}, context, info) => {
      return await message_Mutations.create_message(conversationId, userId, message);
    },
    edit_conversation: async (parent, {conversationId, name, userId}, context, info) => {
      return await message_Mutations.edit_conversation(conversationId, name, userId);
    },

  },

  User: {
    following: async (parent) => {
      const following: User[] = await knexInstance("follows as f")
        .join("users as u", "u.userId", "f.followedUserId")
        .select("u.* as following") // select all columns from `u` and alias as `following`
        .where("f.followingUserId", parent.userId);
      return following;
    },
    activeTracks: async (parent) => {
      const activeTracks: types.Track[] = await knexInstance("user_tracks as ut")
        .join("tracks as t", "t.trackId", "ut.trackId")
        .select("t.* as activeTracks")
        .where("ut.userId", parent.userId);
      return activeTracks;
    }
  },
  schedule: {
    user: async (parent) => {
      const user: types.User = await knexInstance("users")
        .where("userId", parent.userId)
        .first();
      return user;
    },
    tracks: async (parent) => {
      const tracks: types.Track[] = await knexInstance("tracks as t")
        .join("track_schedules as st", "st.trackId", "t.trackId")
        .select("t.* as track")
        .where("st.scheduleId", parent.scheduleId);

      return tracks;
    },
  },
  track: {
    user: async (parent) => {
      const user: types.User = await knexInstance("users")
        .where("userId", parent.userId)
        .first();
      return user;
    },
    workouts: async (parent) => {
      const workouts: types.Workout[] = await knexInstance("workouts as w")
        .join("workout_tracks as tw", "tw.workoutId", "w.workoutId")
        .select("w.* as workout")
        .where("tw.trackId", parent.trackId);
      return workouts;
    },
  },
  workout: {
    user: async (parent) => {
      const user: types.User = await knexInstance("users")
        .where("userId", parent.userId)
        .first();
      return user;
    },
    exercises: async (parent) => {
      const exercises: types.Exercise[] = await knexInstance("exercises as e")
        .join("exercise_workouts as we", "we.exerciseId", "e.exerciseId")
        .select("e.* as exercise")
        .where("we.workoutId", parent.workoutId);
        for (let i = 0; i < exercises.length; i++) {
          let result = await knexInstance("exercise_workouts as ew")
            .select("ew.sets")
            .where("ew.exerciseId", exercises[i].exerciseId)
            .where("ew.workoutId", parent.workoutId)
            .first()
            const sets = Number(result.sets) ;
            exercises[i].sets = sets; 
          result = await knexInstance("exercise_workouts as ew")
            .select("ew.reps")
            .where("ew.exerciseId", exercises[i].exerciseId)
            .where("ew.workoutId", parent.workoutId)
            .first()
            const reps = Number(result.reps) ;
            exercises[i].reps = reps;
        }
      return exercises;
    },
  },
  conversation: {
    users: async (parent) => {
      const users: types.User[] = await knexInstance("user_Conversations as cu")
        .join("users as u", "u.userId", "cu.userId")
        .select("u.* as user")
        .where("cu.conversationId", parent.conversationId);
      return users;
    },
    messages: async (parent) => {
      let offset = 0
      if(parent.offset){
        offset = parent.offset
      }
      const messages: types.message[] = await knexInstance("messages as m")
        .select("m.* as message")
        .where("m.conversationId", parent.conversationId)
        .offset(offset)
        .limit(10);
      return messages;
    }

  },
  message: {
    sender: async (parent) => {
      const user: types.User = await knexInstance("users")
        .where("userId", parent.userIdFrom)
        .first();
      return user;
    }
  },
};
