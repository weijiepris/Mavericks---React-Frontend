import React, { FC, useEffect, useRef, useState } from 'react'
import ReusableCard from '../common/ResuableCard/ReusableCard'
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from '@mui/material'
import "./Login.css"
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { fetchAllDepartment, login, register } from '../actions'
const Register: FC = () => {

    const [snackbar, setSnackbar] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [snackMessage, setSnackMessage] = useState<string>("");
    const [departmentObj, setDepartmentObj] = useState<any[]>([]);
    const [departmentValue, setDepartmentValue] = useState<number>(-1);

    const usernameRef: any = useRef();
    const passwordRef: any = useRef();

    useEffect(() => {
        handleFetchDepartments();
    }, [])

    const handleFetchDepartments = async () => {
        const response = await fetchAllDepartment().then(res => res.data);
        setDepartmentObj(response.departments);
    }

    const handleOpenSnackbar = () => {
        setSnackbar(true);
    }

    const handleCloseSnackbar = () => {
        setSnackbar(false);
    }

    const handleDepartmentChange = (event: SelectChangeEvent<number>) => {
        setDepartmentValue(event.target.value as number);
    }


    const handleRegister = async () => {
        const username = usernameRef.current!.value;
        const password = passwordRef.current!.value;

        const { authenticated, token } = await register(username, password, departmentValue)
            .then(res => res.data)
            .catch(err => {
                handleOpenSnackbar();
                setSnackMessage(err.response.data)
                return false
            });

        if (authenticated) {
            dispatch(authActions.setAuthenticated(authenticated))
            localStorage.setItem('token', token);
            console.log(token)
            navigate("/")
        }
    }

    return (<>
        <ReusableCard className="login-container"><br /><br /><br /><br />
            <Typography variant={'h3'}>Register</Typography><br /><br />
            <FormControl>
                <TextField label="Username" inputRef={usernameRef} /><br /><br />
                <TextField type="password" label="Password" inputRef={passwordRef} /><br /><br />
            </FormControl><br />

            <FormControl>
                <InputLabel id="department">Select a department</InputLabel>
                <Select
                    labelId="department"
                    label="Age"
                    value={departmentValue}
                    onChange={handleDepartmentChange}
                >
                    <MenuItem value={-1}>Select a department</MenuItem>
                    {departmentObj.map(department => (<MenuItem value={department.id}>{department.name}</MenuItem>))}
                </Select>
            </FormControl>
            <br /><br />
            <Button variant="contained" color="primary" onClick={() => { handleRegister() }}>Register</Button>
        </ReusableCard >

        <Snackbar open={snackbar} anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert severity="info">{snackMessage}</Alert>
        </Snackbar>
    </>
    )
}

export default Register