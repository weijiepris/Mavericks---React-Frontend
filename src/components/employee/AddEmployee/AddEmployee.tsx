import React, { FC, useRef, useState } from 'react';
import ReusableCard from '../../common/ResuableCard/ReusableCard';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { validateEmployee } from '../../utilities/validation';
import { EmployeeCardInterface } from '../../../store';
import { addEmployee } from '../../actions';

const AddEmployee: FC = () => {
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement | null>(null);
    const salaryRef = useRef<HTMLInputElement | null>(null);
    const [departmentValue, setDepartmentValue] = useState<string>('');
    const [snackbar, setSnackbar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>("");

    const handleBack = () => {
        navigate(-1);
    }

    const onSubmit = () => {
        const name: string = nameRef.current!.value;
        const salary: string = salaryRef.current!.value;


        validateEmployee(name, salary, departmentValue).then(async () => {
            const convertedSalary: number = Number(salary);
            const employeeObj: EmployeeCardInterface = { name, salary: convertedSalary, department: departmentValue }

            const result = await addEmployee(employeeObj).then(res => navigate("/"));
        }).catch(err => {
            handleOpenSnackbar()
            setSnackMessage(err);
        })
    }

    const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
        setDepartmentValue(event.target.value as string);
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
                <TextField label="Name" inputRef={nameRef} defaultValue="" /> <br /><br />
                <TextField label="Salary" inputRef={salaryRef} defaultValue="" /> <br /><br />

                <FormControl>
                    <InputLabel id="department">Select a department</InputLabel>
                    <Select
                        labelId="department"
                        label="Age"
                        value={departmentValue}
                        onChange={handleDepartmentChange}
                    >
                        <MenuItem value="">Select a department</MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="PS">PS</MenuItem>
                    </Select>
                </FormControl>

                <br /><br />
                <Button variant="contained" color="success" onClick={() => onSubmit()}>Add</Button>
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
