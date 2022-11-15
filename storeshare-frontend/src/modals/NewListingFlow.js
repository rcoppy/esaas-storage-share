import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Modal, Typography, Stack, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

function SquareFeetForm() {
    return (
        <Stack component="form" sx={{ mt: 1 }} >
            <Stack sx={{ width: '100%', display: "flex", gap: 1 }}>
                <Typography variant="p"><TextField
                    label="Square footage"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: "50%" }}
                /> square feet</Typography>

                <Typography variant="p"><TextField
                    label="Ceiling height"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: "50%" }}
                /> feet</Typography>

            </Stack>

        </Stack>
    );
}

function MonthlyRateForm() {
    return (
        <Stack component="form" sx={{ mt: 1 }} >
            <Stack sx={{ width: '100%', display: "flex", gap: 1 }}>
                <Typography variant="p"><TextField
                    label="Cost per square foot"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: "50%" }}
                /> per square foot</Typography>

                <Typography variant="p">Total monthly rate: (TODO: mulitply footage by rate)</Typography>

            </Stack>

        </Stack>
    );
}

function DescriptionForm() {
    return (
        <Stack component="form" sx={{ mt: 1 }} >
            <Stack sx={{ width: '100%', display: "flex", gap: 1 }}>
                <TextField
                    multiline
                    minRows={2}
                    maxRows={4}
                    label="Space description"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{ width: "90%" }}
                />
            </Stack>

        </Stack>
    );
}

export default function NewListingFlow({ open, handleClose }) {

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                {/* <Typography id="modal-modal-description" variant="p" >

                </Typography> */}

                {/* <Stack sx={{ width: '100%', maxHeight: '90vh', overflowY: 'scroll' }}> */}

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header">
                            <Typography variant="p">Where is your space located?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AddressForm />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header">
                            <Typography variant="p">How big is your space?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SquareFeetForm />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header">
                            <Typography variant="p">What rate do you want to charge?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MonthlyRateForm />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header">
                            <Typography variant="p">Briefly describe your space.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <DescriptionForm />
                        </AccordionDetails>
                    </Accordion>

                {/* </Stack> */}

                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 1 }}>
                    <Button variant="outlined">Back</Button>
                    <Button sx={{ maxWidth: '50%', alignSelf: 'end' }} variant="contained" >Next</Button>
                </Stack>

            </Box>
        </Modal>
    );
}
