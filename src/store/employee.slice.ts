import { createSlice } from "@reduxjs/toolkit";
import { InitialEmployeesState } from "./model";

const initialState: InitialEmployeesState = {
    data: [],
};

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployee(state, action) {
            state.data = action.payload
        },
        deleteEmploye(state, action) { },
        editEmployee(state, action) { }
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