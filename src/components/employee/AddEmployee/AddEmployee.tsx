import React, { FC, useEffect, useRef, useState } from 'react';
import ReusableCard from '../../common/ResuableCard/ReusableCard';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateEmployee } from '../../utilities/validation';
import { addEmployee, editEmployeeById, fetchAllDepartment, fetchAllEmployee } from '../../actions';
import { EmployeeCardInterface } from '../../../store/model';
import { useDispatch } from 'react-redux';
import { employeeActions } from "../../../store/store"

const AddEmployee: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const nameRef = useRef<HTMLInputElement | null>(null);
    const salaryRef = useRef<HTMLInputElement | null>(null);
    const [snackbar, setSnackbar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>("");
    const [editState, setEditState] = useState<EmployeeCardInterface>({ name: "", salary: "", department: "" });
    const [name, setName] = useState(editState?.name || '');
    const [salary, setSalary] = useState(editState?.salary || '');
    const [departmentObj, setDepartmentObj] = useState<any[]>([]);
    const [departmentValue, setDepartmentValue] = useState<number>(-1);

    useEffect(() => {
        if (location.state) {
            setEditState(location.state)
            setDepartmentValue(location.state.departmentId)
            setName(location.state.name)
            setSalary(location.state.salary)
        }
        handleFetchDepartments();
    }, [])

    const handleBack = () => {
        navigate(-1);
    }

    const handleFetchDepartments = async () => {
        const response = await fetchAllDepartment().then(res => res.data);
        console.log(response.departments)
        setDepartmentObj(response.departments);
    }

    const onSubmit = () => {
        const name: string = nameRef.current!.value;
        const salary: string = salaryRef.current!.value;

        validateEmployee(name, salary, departmentValue).then(async () => {
            console.log(departmentValue)
            const convertedSalary: number = Number(salary);
            const employeeObj: EmployeeCardInterface = { name, salary: convertedSalary, departmentId: departmentValue }

            if (!location.state) {
                await addEmployee(employeeObj).then(() => navigate("/"));
                return;
            }

            editEmployeeById(location.state.id, employeeObj)
                .then(async () => {
                    const response = await fetchAllEmployee();
                    const employees = response.data;
                    dispatch(employeeActions.setEmployee(employees));
                    navigate("/")
                })
                .catch(err => {
                    setSnackbar(true)
                    setSnackMessage(err)
                })

        }).catch(err => {
            handleOpenSnackbar()
            setSnackMessage(err);
        })
    }

    const handleDepartmentChange = (event: SelectChangeEvent<number>) => {
        setDepartmentValue(event.target.value as number);
    }

    const handleOpenSnackbar = () => {
        setSnackbar(true)
    }


    const handleCloseSnackbar = () => {
        setSnackbar(false)
    }

    return (<>
        <ReusableCard style={{ textAlign: "center", padding: 40 }}>
            <FormControl>
                <TextField label="Name" inputRef={nameRef} value={name} onChange={(e) => setName(e.target.value)}
                /> <br /><br />
                <TextField label="Salary" inputRef={salaryRef} value={salary} onChange={(e) => setSalary(e.target.value)}
                /> <br /><br />

                <FormControl>
                    <InputLabel id="department">Select a department</InputLabel>
                    <Select
                        labelId="department"
                        label="Age"
                        value={departmentValue}
                        onChange={handleDepartmentChange}
                    >
                        <MenuItem value={-1}>Select a department</MenuItem>
                        {departmentObj.map(department => (<MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>))}
                    </Select>
                </FormControl>

                <br /><br />
                <Button variant="contained" color="success" onClick={() => onSubmit()}>{location.state ? 'Edit' : 'Add'}</Button>
                <br /><br />
                <Button variant="contained" color="primary" onClick={() => handleBack()}>Back</Button>
            </FormControl>
        </ReusableCard>
        <Snackbar open={snackbar} anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert severity="info">{snackMessage}</Alert>
        </Snackbar>
    </>
    );
}

export default AddEmployee;
