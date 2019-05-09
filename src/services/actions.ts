import {SET_USER_ID, SET_USERNAME} from "./actionTypes";

export const setUserId = (userId: number | null) =>
    ({
        type: SET_USER_ID,
        payload: {
            userId
        }
    });


export const setUsername = (username: string) =>
    ({
        type: SET_USERNAME,
        payload: {
            username
        }
    });