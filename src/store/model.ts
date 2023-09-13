export interface EmployeeCardInterface extends BaseEntity {
    id?: number;
    name: string;
    salary: number | string;
    department?: string;
    departmentId?: number;
}

export interface InitialEmployeesState {
    data: EmployeeCardInterface[];
}

export interface InitialAuthState {
    isAuthenticated: boolean;
    token: string;
}

export interface BaseEntity {
    createdAt?: Date;
    updatedAt?: Date;
}