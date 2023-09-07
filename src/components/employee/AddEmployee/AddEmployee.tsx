import React, { FC } from 'react'
import ReusableCard from '../../common/ResuableCard/ReusableCard'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AddEmployee: FC = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <ReusableCard style={{ textAlign: "center", padding: 40 }}>
            <FormControl>
                <TextField label="Name" /> <br /><br />
                <TextField label="Salary" /> <br /><br />

                <FormControl>
                    <InputLabel id="department">Select a department</InputLabel>
                    <Select
                        labelId="department"
                        label="Age"
                    >
                        <MenuItem>Select a department</MenuItem>
                        <MenuItem>HR</MenuItem>
                        <MenuItem>PS</MenuItem>
                    </Select>
                </FormControl>

                <br /><br />
                <Button variant="contained" color="success">Add</Button>
                <br /><br />
                <Button variant="contained" color="primary" onClick={() => handleBack()}>Back</Button>
            </FormControl>
        </ReusableCard>
    )
}

export default AddEmployee