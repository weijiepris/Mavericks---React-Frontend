import axios from "axios"
import { EmployeeCardInterface } from "../../store/model";

const url = "http://localhost:3001"

export const fetchAllEmployee = () => {
    const token: string = localStorage.getItem('token') || '';
    return axios.get(`${url}/employee`, { headers: { Authorization: `${token}` } });
}

export const addEmployee = (employeeObj: EmployeeCardInterface) => {
    const { name, salary, departmentId } = employeeObj;
    console.log({ name, salary, departmentId })
    return axios.post(`${url}/employee`, employeeObj);
}

export const deleteEmployeeById = (id: number) => {
    return axios.delete(`${url}/employee/${id}`)
}

export const editEmployeeById = (id: number, employeeObj: EmployeeCardInterface) => {
    console.log(id, employeeObj)
    return axios.put(`${url}/employee/${id}`, employeeObj)
}

export const login = (username: string, password: string) => {
    return axios.post(`${url}/login`, { username, password })
}

export const register = (username: string, password: string, departmentId: number) => {
    return axios.post(`${url}/register`, { username, password, departmentId })
}

export const verify = (token: string) => {
    return axios.get(`${url}/verify`, { headers: { Authorization: `${token}` } })
}

export const fetchAllDepartment = () => {
    const token: string = localStorage.getItem('token') || '';
    return axios.get(`${url}/department`, { headers: { Authorization: `${token}` } })
}