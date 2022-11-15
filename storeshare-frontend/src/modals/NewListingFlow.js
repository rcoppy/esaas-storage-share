import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Modal, Typography, Stack, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { flexbox } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    minHeight: '80vh',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 2,
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

const step = Object.freeze({
    ENTRY: 0,
    SUMMARY: 1,
    CONFIRMATION: 2,
});

const panel = Object.freeze({
    panel1: 0,
    panel2: 1,
    panel3: 2,
    panel4: 3,
});

const Switch = (props) => {
    const { test, children } = props;
    // filter out only children with a matching prop
    return children.find(child => child.props.value === test);
}

const FormEntry = ({ currentPanel, handleChange, value }) => {
    return (<Box>

        <Accordion expanded={currentPanel === panel.panel1} onChange={handleChange(panel.panel1)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <Typography variant="p">Where is your space located?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <AddressForm />
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={currentPanel === panel.panel2} onChange={handleChange(panel.panel2)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header">
                <Typography variant="p">How big is your space?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <SquareFeetForm />
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={currentPanel === panel.panel3} onChange={handleChange(panel.panel3)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header">
                <Typography variant="p">What rate do you want to charge?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <MonthlyRateForm />
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={currentPanel === panel.panel4} onChange={handleChange(panel.panel4)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header">
                <Typography variant="p">Briefly describe your space.</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <DescriptionForm />
            </AccordionDetails>
        </Accordion>

    </Box>);
};

const FormSummary = ({ value }) => {
    return (<Stack>
        <Typography variant="h6">Summary</Typography>

        <Typography variant="p">Address</Typography>
        <Typography variant="p">Description</Typography>
        <Typography variant="p">Price per square foot, monthly net</Typography>

    </Stack>);
}

export default function NewListingFlow({ open, handleClose }) {

    const [expanded, setExpanded] = React.useState(panel.panel1);

    const handlePanelChange = (panel) => (event, isExpanded) => {
        // setExpanded(isExpanded ? panel : false);
        setCurrentPanel(panel); 
    };

    const [currentStep, setCurrentStep] = React.useState(step.ENTRY);
    const [currentPanel, setCurrentPanel] = React.useState(panel.panel1);

    const incrementStep = () => setCurrentStep(
        Math.min(currentStep + 1, Object.keys(step).length - 1)
    );

    const decrementStep = () => setCurrentStep(
        Math.max(currentStep - 1, 0)
    );

    const handleBack = () => {
        if (currentStep === step.ENTRY) {
            if (currentPanel === 0) return;

            setCurrentPanel(currentPanel - 1);
        } else {
            decrementStep();
        }
    };

    const handleNext = () => {
        if (currentStep === step.ENTRY && currentPanel < Object.keys(panel).length - 1) {
            setCurrentPanel(currentPanel + 1);
        } else {
            incrementStep();
        }
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

                <Switch test={currentStep}>
                    <FormEntry handleChange={handlePanelChange} currentPanel={currentPanel} value={step.ENTRY} />
                    <FormSummary value={step.SUMMARY} />
                    <Typography value={step.CONFIRMATION} variant="p">You did it!</Typography>
                </Switch>

                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 2 }}>
                    <Button variant="outlined" onClick={handleBack}>Back</Button>
                    <Button variant="contained" onClick={handleNext}>Next</Button>
                </Stack>

                {/* <p>{currentStep}</p> */}

            </Box>
        </Modal>
    );
}
