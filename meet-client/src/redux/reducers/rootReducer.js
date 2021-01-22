import { SET_USER } from '../actionTypes';

export const initialState = {
    user: null
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}