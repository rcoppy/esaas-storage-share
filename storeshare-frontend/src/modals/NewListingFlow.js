import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Modal, Typography, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



// this.title = title;
// this.description = description;
// this.price = price;
// this.address = address;
// this.city = city;
// this.state = state;
// this.zipCode = zipCode;
// this.squareFeet = squareFeet;

function AddressForm() {
    return (
        <Stack component="form" sx={{ mt: 1 }} >
            <Stack sx={{ width: '100%', display: "flex", gap: 1 }}>
                <TextField
                    label="Street address"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: "100%" }}
                />
                <TextField
                    label="City"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: "70%" }}
                />
                <TextField
                    label="State"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: "20%" }}
                />
                <TextField
                    label="ZIP"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: "50%" }}
                />

            </Stack>

        </Stack>
    );
}



export default function NewListingFlow({ open, handleClose }) {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <Typography id="modal-modal-title" variant="h6" sx={{ mb: 2 }}>
                    Have extra space? Let's rent it out.
                </Typography>
                <Typography id="modal-modal-description" variant="p" >
                    Where is your space located?
                </Typography>

                <AddressForm />

                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 1 }}>
                    <Button variant="outlined">Back</Button>
                    <Button sx={{ maxWidth: '50%', alignSelf: 'end' }} variant="contained" >Next</Button>
                </Stack>

            </Box>
        </Modal>
    );
}
