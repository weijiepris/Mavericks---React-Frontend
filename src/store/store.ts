import { configureStore } from "@reduxjs/toolkit"
import { employeeSlice } from "./employee.slice";
import { authSlice } from "./auth.slice";

const store = configureStore({
    reducer: { employee: employeeSlice.reducer, auth: authSlice.reducer }
})

// actions contains the action type which maps to the specific methods
export const employeeActions = employeeSlice.actions
export const authActions = authSlice.actions

export default store;
