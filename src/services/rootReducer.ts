import {AnyAction, combineReducers} from "redux";

import {Beverage, BeverageType} from "../types";
import {SET_USER_ID, SET_USERNAME} from "./actionTypes";

export interface ReduxState {
    userId?: number,
    username: string,
    myBeverages: Beverage[],
    beverageTypes: BeverageType[]
}

export const initialState = {
    userId: undefined,
    username: "",
    myBeverages: [],
    beverageTypes: []
} as ReduxState;

const rootReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload.userId
            };
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload.username
            };
    }

    return state;
};

export default combineReducers({
    root: rootReducer
});