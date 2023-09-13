import React, { FC, useRef, useState } from 'react'
import ReusableCard from '../common/ResuableCard/ReusableCard'
import { Alert, Button, FormControl, Snackbar, TextField, Typography } from '@mui/material'
import "./Login.css"
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { login } from '../actions'
const Login: FC = () => {

    const [snackbar, setSnackbar] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [snackMessage, setSnackMessage] = useState<string>("");

    const usernameRef: any = useRef();
    const passwordRef: any = useRef();


    const handleOpenSnackbar = () => {
        setSnackbar(true);
    }
    const handleCloseSnackbar = () => {
        setSnackbar(false);
    }


    const handleLogin = async () => {
        const username = usernameRef.current!.value;
        const password = passwordRef.current!.value;

        const { authenticated, token } = await login(username, password)
            .then(res => res.data)
            .catch(err => {
                handleOpenSnackbar();
                setSnackMessage(err.response.data)
                return false
            });

        if (authenticated) {
            dispatch(authActions.setAuthenticated(authenticated))
            localStorage.setItem('token', token);
            dispatch(authActions.setToken(token))
            console.log(token)
            navigate("/")
        }
    }

    const handleRegister = () => {
        navigate("/Register")
        return;
    }

    return (<>
        <ReusableCard className="login-container"><br /><br /><br /><br />
            <Typography variant={'h3'}> Login</Typography><br /><br />
            <FormControl>
                <TextField label="Username" inputRef={usernameRef} /><br /><br />
                <TextField type="password" label="Password" inputRef={passwordRef} /><br /><br />
                <Button variant="contained" color="primary" onClick={() => { handleLogin() }}>Login</Button><br /><br />
                <Button variant="contained" color="primary" onClick={() => { handleRegister() }}>Register</Button>
            </FormControl><br /><br />
        </ReusableCard >

        <Snackbar open={snackbar} anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <Alert severity="info">{snackMessage}</Alert>
        </Snackbar>
    </>
    )
}

export default Login