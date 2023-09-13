import React, { FC } from 'react'
import { Button, Typography } from '@mui/material';
import './Navigation.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, employeeActions } from '../../../store/store';

const Navigation: FC = () => {

    const navigate = useNavigate();
    const authenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated)
    const location = useLocation();
    const dispatch = useDispatch();

    const handleNavigateHome = () => {
        if (location.pathname.toLowerCase() !== '/')
            navigate("/")
    }

    const handleNavigateAddEmployee = () => {
        if (location.pathname.toLowerCase() !== '/add')
            navigate("/Employee")
    }

    const handleNavigateLogin = () => {
        navigate("/Login")
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(employeeActions.setEmployee([]))
        dispatch(authActions.setAuthenticated(false))
    }

    return (
        <div className="nav-bar primary-bg-col">
            <Typography variant="h4" className="cursor-pointer" onClick={() => handleNavigateHome()}>Employees</Typography>

            {authenticated &&
                <div className='add-employee-div'>
                    <Button variant="contained" onClick={() => handleNavigateAddEmployee()} color="success" className="add-employee-btn hide-on-mobile-view">
                        <AddCircleOutlineIcon sx={{ paddingRight: 2 }} />
                        <span>Add Employee</span>
                    </Button>

                    <Button variant="contained" onClick={() => { handleLogout() }} color="success" className="logout-btn">
                        <span>Logout</span>
                    </Button>
                    <div className="add-employee-btn">
                        <Button className="add-employee-btn show-on-mobile-view" onClick={() => handleNavigateAddEmployee()} >
                            <AddCircleIcon sx={{ fontSize: 40 }} style={{ color: '#E0E0E0' }}
                                className='show-on-mobile-view' />
                        </Button>

                    </div>
                </div >}
            {!authenticated && <div className='login-btn'>
                <Button variant="contained" onClick={() => handleNavigateLogin()} color="success" >
                    <span>Login</span>
                </Button>
            </div >}
        </div >
    )
}

export default Navigation