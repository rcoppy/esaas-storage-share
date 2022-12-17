import * as React from 'react';
import Button from '@mui/material/Button';
import { CircularProgress, Box, Modal, Typography, Stack, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { flexbox } from '@mui/system';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import ListingModel from '../lib/ListingModel.js';
import ErrorMessage from '../widgets/ErrorMessage.js';

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

function AddressForm({ address, setAddressField }) {

    const handleAddressChange = (event, field) => {
        setAddressField(field, event.target.value);
    };


    return (
        <Stack component="form" sx={{ mt: 1 }} >
            <Stack sx={{ width: '100%', display: "flex", gap: 1 }}>
                <TextField
                    label="Street address"
                    id="outlined-size-small"
                    defaultValue={address["street"]}
                    size="small"
                    sx={{ width: "100%" }}
                    onChange={(event) => handleAddressChange(event, "street")}
                />
                <TextField
                    label="City"
                    id="outlined-size-small"
                    defaultValue={address["city"]}
                    size="small"
                    sx={{ width: "70%" }}
                    onChange={(event) => handleAddressChange(event, "city")}
                />
                <TextField
                    label="State"
                    id="outlined-size-small"
                    defaultValue={address["state"]}
                    size="small"
                    sx={{ width: "20%" }}
                    onChange={(event) => handleAddressChange(event, "state")}
                />
                <TextField
                    label="ZIP"
                    id="outlined-size-small"
                    defaultValue={address["zip"]}
                    size="small"
                    sx={{ width: "50%" }}
                    onChange={(event) => handleAddressChange(event, "zip")}
                />

            </Stack>

        </Stack>
    );
}

function SquareFeetForm({ footage, setFootage, height, setHeight }) {
    return (
        <Stack component="form" sx={{ mt: 1 }} >
            <Stack sx={{ width: '100%', display: "flex", gap: 1 }}>
                <Typography variant="p"><TextField
                    label="Square footage"
                    id="outlined-size-small"
                    defaultValue={footage}
                    size="small"
                    sx={{ width: "50%" }}
                    onChange={(event) => setFootage(event.target.value)}
                /> square feet</Typography>

                <Typography variant="p"><TextField
                    label="Ceiling height"
                    id="outlined-size-small"
                    defaultValue={height}
                    size="small"
                    sx={{ width: "50%" }}
                    onChange={(event) => setHeight(event.target.value)}
                /> feet</Typography>

            </Stack>

        </Stack>
    );
}

function MonthlyRateForm({ cost, setCost, footage }) {
    return (
        <Stack component="form" sx={{ mt: 1 }} >
            <Stack sx={{ width: '100%', display: "flex", gap: 1 }}>
                <Typography variant="p"><TextField
                    label="Cost per square foot"
                    id="outlined-size-small"
                    defaultValue={cost}
                    size="small"
                    sx={{ width: "50%" }}
                    onChange={(event) => setCost(event.target.value)}
                /> per square foot, monthly</Typography>

                <Typography variant="p">${cost * footage} for the whole space</Typography>

            </Stack>

        </Stack>
    );
}

function DescriptionForm({ description, setDescription }) {
    return (
        <Stack component="form" sx={{ mt: 1 }} >
            <Stack sx={{ width: '100%', display: "flex", gap: 1 }}>
                <TextField
                    multiline
                    minRows={2}
                    maxRows={4}
                    label="Space description"
                    id="outlined-size-small"
                    defaultValue={description}
                    size="small"
                    sx={{ width: "90%" }}
                    onChange={(event) => setDescription(event.target.value)}
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

const FormEntry = ({ currentPanel, handleChange, value, address, setAddressField,
    footage, setFootage, height, setHeight, cost, setCost, description, setDescription
}) => {
    return (<Box>

        <Accordion expanded={currentPanel === panel.panel1} onChange={handleChange(panel.panel1)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <Typography variant="p">Where is your space located?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <AddressForm address={address} setAddressField={setAddressField} />
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={currentPanel === panel.panel2} onChange={handleChange(panel.panel2)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header">
                <Typography variant="p">How big is your space?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <SquareFeetForm footage={footage} setFootage={setFootage} height={height} setHeight={setHeight} />
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={currentPanel === panel.panel3} onChange={handleChange(panel.panel3)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header">
                <Typography variant="p">What rate do you want to charge?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <MonthlyRateForm cost={cost} setCost={setCost} footage={footage} />
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={currentPanel === panel.panel4} onChange={handleChange(panel.panel4)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header">
                <Typography variant="p">Briefly describe your space.</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <DescriptionForm description={description} setDescription={setDescription} />
            </AccordionDetails>
        </Accordion>

    </Box>);
};

const FormSummary = ({ value, address, footage, height, cost, description }) => {
    return (<Stack>
        <Typography variant="h6">Does everything look right?</Typography>


        <Typography variant="h6" pt={2} pb={0.5}><strong>{footage}</strong> square feet (<strong>${cost * footage}</strong> per month)</Typography>
        <Typography variant="p" pl={3} pb={2}>{address["street"]}<br></br>{address["city"]}, {address["state"]} {address["zip"]}</Typography>

        {/* <Typography variant="p">${cost} / sq. ft per month (${cost * footage} per month, total) </Typography> */}

        <Typography variant="p" fontSize='0.9rem'><em>{description}</em></Typography>
    </Stack>);
}

export default function NewListingFlow({ open, handleClose }) {

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

    const handleNext = (tokenContext, myProfile, store, updateStore) => {
        if (currentStep === step.ENTRY && currentPanel < Object.keys(panel).length - 1) {
            setCurrentPanel(currentPanel + 1);
        } else if (currentStep === step.SUMMARY) {
            // this should probably be pulled out into its own function
            tokenContext.doCreateListing({
                address: address["street"],
                price: cost,
                description: description,
                subletter_id: myProfile.subletterData.id,
                city: address["city"],
                state: address["state"],
                zip_code: address["zip"],
                square_feet: footage, 
            },
                (data) => handleSubmitSuccess(data, store, updateStore),
                (status) => handleSubmitError(),
            );

            setShowPending(true);
        }
        else {
            incrementStep();
        }
    };

    const [address, setAddress] = React.useState(new Map());

    const setAddressField = (field, value) => {
        const newAddress = address;
        newAddress[field] = value;
        setAddress(newAddress);
    }

    const [footage, setFootage] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [cost, setCost] = React.useState(0);
    const [description, setDescription] = React.useState("");

    const [showPending, setShowPending] = React.useState(false);
    const [isErrorOpen, setIsErrorOpen] = React.useState(false);
    const [errorStatus, setErrorStatus] = React.useState('');

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsErrorOpen(false);
    };

    let timer = null;

    React.useEffect(() => {
        return () => clearTimeout(timer);
    }, []);

    const clearFormData = () => {
        setAddress(new Map());

        setFootage(0);
        setHeight(0);
        setCost(0);
        setDescription("");

        setCurrentStep(step.ENTRY);
        setCurrentPanel(panel.panel1);
    }

    const handleSubmitError = () => {
        setShowPending(false);
        setErrorStatus('listing submission failed');
        setIsErrorOpen(true);
        timer = setTimeout(() => setIsErrorOpen(false), 3000);
    }

    const handleSubmitSuccess = (data, store, updateStore) => {
        setShowPending(false);
        const newListing = new ListingModel({
            id: data.id,
            userId: data.subletter_id,
            title: data.title,
            description: data.description,
            price: data.price,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zip_code,
        });

        const newStore = store;
        newStore.globalListings.set(newListing.id, newListing);
        updateStore(newStore);

        clearFormData(); 

        handleClose(); // close the modal

        // TODO: trigger myListings rerender? maybe we don't need to 
    }

    return (
        <GlobalContext.Consumer>
            {({ tokenContext, myProfile, store, updateStore }) => <><Modal
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
                        <FormEntry handleChange={handlePanelChange} currentPanel={currentPanel} value={step.ENTRY} address={address} setAddressField={setAddressField}
                            footage={footage}
                            height={height}
                            cost={cost}
                            description={description}
                            setFootage={setFootage}
                            setHeight={setHeight}
                            setCost={setCost}
                            setDescription={setDescription}
                        />
                        <FormSummary value={step.SUMMARY} address={address}
                            footage={footage}
                            height={height}
                            cost={cost}
                            description={description}
                        />
                        <Typography value={step.CONFIRMATION} variant="p">You did it!</Typography>
                    </Switch>

                    {!showPending && <Stack direction="row" sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 2 }}>
                        <Button aria-label="listing-back-button" variant="outlined" onClick={handleBack}>Back</Button>
                        <Button aria-label="listing-next-button" variant="contained" onClick={() => handleNext(tokenContext, myProfile, store, updateStore)}>{currentStep === step.SUMMARY ? 'Create listing' : 'Next'}</Button>
                    </Stack>}

                    {showPending && <CircularProgress sx={{ alignSelf: 'center' }} />}

                    <ErrorMessage open={isErrorOpen} handleClose={handleErrorClose} error={errorStatus} />
                </Box>
            </Modal></>}
        </GlobalContext.Consumer>
    );
}
