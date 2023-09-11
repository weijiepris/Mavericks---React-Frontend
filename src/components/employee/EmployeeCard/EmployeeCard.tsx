import { FC, useState } from 'react'
import ReuseableCard from '../../common/ResuableCard/ReusableCard'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Typography } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import "./EmployeeCard.css"
import { useNavigate } from 'react-router-dom';

export interface EmployeeCardProps {
    id: number,
    name: string,
    salary: number,
    department: 'HR' | 'PS'
}

const EmployeeCard: FC<{ card: EmployeeCardProps, onDelete: Function }> = ({ card, onDelete }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [dialogMessage, setDialogMessage] = useState<string>("");
    const [snackbar, setSnackbar] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    const handleOnDelete = () => {
        setDialogMessage("You will lose your information")
        handleOpenDialog();
    }

    const onEdit = () => {
        navigate("/Add")
    }

    const onConfirmDelete = () => {
        onDelete(card)
        handleCloseDialog()
        handleOpenSnackbar();
    }

    const handleOpenSnackbar = () => {
        setSnackbar(true);
    }
    const handleCloseSnackbar = () => {
        setSnackbar(false);
    }

    return (<>
        <ReuseableCard className="secondary-bg-col flex-item" style={{ padding: '10px' }}>
            <Typography variant="h4" className="primary-text-col">{card.name}</Typography>
            <Typography variant="h6" className="primary-text-col">{card.department}</Typography>
            <Typography variant="h6" className="primary-text-col">${card.salary}</Typography>

            <ReuseableCard className="card-icons">
                <ModeEditOutlineIcon sx={{ color: 'orange', padding: '10px' }}
                    className="cursor-pointer" onClick={() => onEdit()} />
                <DeleteIcon sx={{ color: 'red', padding: '10px' }}
                    className="cursor-pointer" onClick={() => handleOnDelete()} />
            </ReuseableCard>
        </ReuseableCard>

        <Dialog open={open} onClose={handleCloseDialog} PaperProps={{ style: { minWidth: '400px' } }}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogMessage}</DialogContentText>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirmDelete}>Yes</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
        <Snackbar open={snackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}
            message="Employee Deleted" />
    </>
    )
}

export default EmployeeCard