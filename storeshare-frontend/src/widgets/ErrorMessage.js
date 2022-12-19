import { Snackbar, Alert } from "@mui/material";
import * as React from 'react'; 

export default function ErrorMessage({ open, handleClose, error }) {
    return (

        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Error: {error}
            </Alert>
        </Snackbar>


    );
}