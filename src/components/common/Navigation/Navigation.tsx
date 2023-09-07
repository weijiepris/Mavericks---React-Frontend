import React, { FC } from 'react'
import { Button, Typography } from '@mui/material';
import './Navigation.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useNavigate } from 'react-router-dom';


const Navigation: FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigateHome = () => {
        if (location.pathname.toLowerCase() !== '/')
            navigate("/")
    }

    const handleNavigateAddEmployee = () => {
        if (location.pathname.toLowerCase() !== '/add')
            navigate("/Add")
    }

    return (
        <div className="nav-bar primary-bg-col">
            <Typography variant="h4" className="cursor-pointer" onClick={() => handleNavigateHome()}>Employees</Typography>

            <div className='add-employee-div'>
                <Button variant="contained" onClick={() => handleNavigateAddEmployee()} color="success" className="add-employee-btn hide-on-mobile-view">
                    <AddCircleOutlineIcon sx={{ paddingRight: 2 }} />
                    <span>Add Employee</span>
                </Button>
                <div className="add-employee-btn">
                    <Button className="add-employee-btn show-on-mobile-view" onClick={() => handleNavigateAddEmployee()} >
                        <AddCircleIcon sx={{ fontSize: 40 }} style={{ color: '#E0E0E0' }}
                            className='show-on-mobile-view' />
                    </Button>

                </div>
            </div >
        </div >
    )
}

export default Navigation