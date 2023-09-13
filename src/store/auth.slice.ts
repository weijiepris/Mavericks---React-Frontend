import { createSlice } from "@reduxjs/toolkit";
import { InitialAuthState } from "./model";

const initialState: InitialAuthState = {
    isAuthenticated: false,
    token: ""
};

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        }
    }
});



// // This is for Redux (without toolkit)  
// const employeeReducer: Reducer<InitialEmployeesState, AnyAction> = (
//     state = initialState,
//     action
// ) => {
//     if (action.type === CONSTANTS.SET_ALL) {
//         return {
//             employees: action.payload
//         };
//     }

//     return state;
// };

// const store: Store<InitialEmployeesState, AnyAction> = createStore(employeeReducer);