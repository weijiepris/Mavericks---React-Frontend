import axios from "axios"
import { EmployeeCardInterface } from "../../store"

const url = "http://localhost:3001"

export const fetchAllEmployee = () => {
    return axios.get(`${url}/employee`);
}

export const addEmployee = (employeeObj: EmployeeCardInterface) => {
    const { name, salary, department } = employeeObj;
    console.log(name, salary, department)
    return axios.post(`${url}/employee`, employeeObj);
}

export const deleteEmployeeById = (id: number) => {
    return axios.delete(`${url}/employee/${id}`)
}