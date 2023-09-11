import { createStore, AnyAction, Reducer, Store } from 'redux';
import { CONSTANTS } from '../constants';

export interface EmployeeCardInterface {
    id?: number;
    name: string;
    salary: number;
    department: string;
}

export interface InitialEmployeesState {
    employees: EmployeeCardInterface[];
}

const initialState: InitialEmployeesState = {
    employees: [],
};

const employeeReducer: Reducer<InitialEmployeesState, AnyAction> = (
    state = initialState,
    action
) => {
    if (action.type === CONSTANTS.SET_ALL) {
        return {
            employees: action.payload
        };
    }

    return state;
};

const store: Store<InitialEmployeesState, AnyAction> = createStore(employeeReducer);

export default store;
