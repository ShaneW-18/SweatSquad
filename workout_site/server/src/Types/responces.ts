import * as types from "./main.js";
export type scheduleResponce = {
    code: Number;
    success: Boolean;
    message: String;
  };
export type getUserResponce = {
    code: Number;
    success: Boolean;
    message: String;
    user: types.User;
};
