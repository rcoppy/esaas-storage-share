import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, OutlinedInput, CircularProgress, Box, Modal, Typography, Stack, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { flexbox } from '@mui/system';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import ListingModel from '../lib/ListingModel.js';
import ErrorMessage from '../widgets/ErrorMessage.js';
import ContractModel from '../lib/ContractModel.js';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { dateToMonthDay, dateToMonthDayYear, formattedMoneyStylized } from '../utils/Formatters.js';

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

function DateForm({ startDate, endDate, setStartDate, setEndDate, months, setMonths }) {

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        const newMonths = parseInt(event.target.value);
        setMonths(newMonths);

        // https://stackoverflow.com/questions/2706125/javascript-function-to-add-x-months-to-a-date
        const newDateMoment = moment(startDate); 
        newDateMoment.add(newMonths, 'months'); 

        setEndDate(newDateMoment.valueOf())
    };

    return (
        <Stack component="form" sx={{ mt: 1 }} >
            <Stack sx={{ width: '100%', display: "flex", gap: 1 }}>
                <DatePicker
                    label="Lease start date"
                    value={startDate}
                    onChange={(newValue) => {
                        setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />

                <FormControl fullWidth sx={{ my: 1 }}>
                    <InputLabel htmlFor="outlined-month-amount">How many months?</InputLabel>
                    <OutlinedInput
                        id="outlined-month-amount"
                        value={months}
                        onChange={handleEndDateChange}
                        label="How many months?"
                        type="number"
                    />
                </FormControl>

                <Typography textAlign="right" fontSize="0.92rem" variant="p">{dateToMonthDay(startDate)} to {dateToMonthDay(endDate)}</Typography>

            </Stack>

        </Stack>
    );
}


function SquareFeetForm({ footage, setFootage, monthlyPrice, months }) {

    const totalPrice = formattedMoneyStylized(footage * months * monthlyPrice); 

    return (
        <Stack component="form" sx={{ mt: 1 }} >
            <Stack sx={{ width: '100%', display: "flex", gap: 1 }}>
                <Typography variant="p"><TextField
                    type="number"
                    label="Square footage"
                    id="outlined-size-small"
                    defaultValue={footage}
                    size="small"
                    sx={{ width: "50%" }}
                    onChange={(event) => setFootage(event.target.value)}
                /> square feet</Typography>
                <Typography variant="p">Cost: <strong>{totalPrice}</strong> for {months} {months === 1 ? 'month' : 'months'}</Typography>
            </Stack>
        </Stack>
    );
}

function PaymentDetailsForm({ cost, setCost, footage }) {
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

/*function DescriptionForm({ description, setDescription }) {
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
} */

const step = Object.freeze({
    ENTRY: 0,
    SUMMARY: 1,
    CONFIRMATION: 2,
});

const panel = Object.freeze({
    panel1: 0,
    panel2: 1,
    panel3: 2,
    // panel4: 3,
});

const Switch = (props) => {
    const { test, children } = props;
    // filter out only children with a matching prop
    return children.find(child => child.props.value === test);
}

const FormEntry = ({ myProfile, currentPanel, handleChange, value, startDate, endDate, setStartDate, setEndDate, monthlyPrice, footage, setFootage, months, setMonths
}) => {
    return (<Box>

        <Accordion expanded={currentPanel === panel.panel1} onChange={handleChange(panel.panel1)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <Typography variant="p">When do you want to rent?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <DateForm startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} monthlyPrice={monthlyPrice} months={months} setMonths={setMonths} />
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={currentPanel === panel.panel2} onChange={handleChange(panel.panel2)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header">
                <Typography variant="p">How much space do you need?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <SquareFeetForm footage={footage} setFootage={setFootage} months={months} monthlyPrice={monthlyPrice} />
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={currentPanel === panel.panel3} onChange={handleChange(panel.panel3)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header">
                <Typography variant="p">Payment details</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="p">{myProfile.lastName}, {myProfile.firstName}<br />VISA, **3941</Typography>
                {/* <MonthlyRateForm cost={cost} setCost={setCost} footage={footage} /> */}
            </AccordionDetails>
        </Accordion>

        {/* <Accordion expanded={currentPanel === panel.panel4} onChange={handleChange(panel.panel4)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header">
                <Typography variant="p">Briefly describe your space.</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <DescriptionForm description={description} setDescription={setDescription} />
            </AccordionDetails>
        </Accordion> */}

    </Box>);
};

const FormSummary = ({ value, footage, monthlyPrice, months, startDate, endDate }) => {
    return (<Stack>
        <Typography variant="h6">Does everything look right?</Typography>


        <Typography variant="h6" pt={2} pb={0.5}><strong>{footage}</strong> square feet</Typography>
        <Typography variant="p">{months} {months === 1 ? 'month' : 'months'} for <strong>{formattedMoneyStylized(monthlyPrice * months * footage)}</strong></Typography>
        <Typography variant="p">{dateToMonthDayYear(startDate)} to {dateToMonthDayYear(endDate)}</Typography>
        {/* <Typography variant="p" pl={3} pb={2}>{address["street"]}<br></br>{address["city"]}, {address["state"]} {address["zip"]}</Typography> */}

        {/* <Typography variant="p">${cost} / sq. ft per month (${cost * footage} per month, total) </Typography> */}

        {/* <Typography variant="p" fontSize='0.9rem'><em>{description}</em></Typography> */}
    </Stack>);
}

export default function NewContractFlow({ open, handleClose, listing }) {

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
            // tokenContext.doCreateListing({
            //     address: address["street"],
            //     price: cost,
            //     description: description,
            //     subletter_id: myProfile.subletterData.id,
            //     city: address["city"],
            //     state: address["state"],
            //     zip_code: address["zip"],

            // },
            //     (data) => handleSubmitSuccess(data, store, updateStore),
            //     (status) => handleSubmitError(),
            // );

            setShowPending(true);
        }
        else {
            incrementStep();
        }
    };

    // contract attributes
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [price, setPrice] = React.useState(20);
    const [renterId, setRenterId] = React.useState(1);
    const [subletterId, setSubletterId] = React.useState(1);
    const [listingId, setListingId] = React.useState(1);
    const [footage, setFootage] = React.useState(10); 
    const [months, setMonths] = React.useState(3); 

    // error attributes
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
        setStartDate(new Date());
        setEndDate(new Date());
        setPrice(20);
        setListingId(1);
        setRenterId(1);
        setSubletterId(1);

        setCurrentStep(step.ENTRY);
        setCurrentPanel(panel.panel1);
    }

    const handleSubmitError = () => {
        setShowPending(false);
        setErrorStatus('contract creation failed');
        setIsErrorOpen(true);
        timer = setTimeout(() => setIsErrorOpen(false), 3000);
    }

    const handleSubmitSuccess = (data, store, updateStore) => {
        setShowPending(false);
        const newContract = new ContractModel({
            id: data.id,
            subletterId: data.subletter_id,
            price: data.price,
            renterId: data.renter_id,
            listingId: data.listingId,
            startDate: data.start_date,
            endDate: data.end_date
        });

        const newStore = store;
        newStore.contractsList.set(newContract.id, newContract);
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
                        Let's rent some storage!
                    </Typography>
                    {/* <Typography id="modal-modal-description" variant="p" >

                </Typography> */}

                    <Switch test={currentStep}>
                        <FormEntry handleChange={handlePanelChange} currentPanel={currentPanel} value={step.ENTRY}
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            monthlyPrice={listing.price}
                            footage={footage}
                            setFootage={setFootage}
                            months={months}
                            setMonths={setMonths}
                            myProfile={myProfile}
                        />
                        <FormSummary value={step.SUMMARY}
                            footage={footage}
                            monthlyPrice={listing.price}
                            months={months}
                            startDate={startDate}
                            endDate={endDate}
                        />
                        <Typography value={step.CONFIRMATION} variant="p">You did it!</Typography>
                    </Switch>

                    {!showPending && <Stack direction="row" sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 2 }}>
                        <Button variant="outlined" onClick={handleBack}>Back</Button>
                        <Button variant="contained" onClick={() => handleNext(tokenContext, myProfile, store, updateStore)}>{currentStep === step.SUMMARY ? 'Reserve space' : 'Next'}</Button>
                    </Stack>}

                    {showPending && <CircularProgress sx={{ alignSelf: 'center' }} />}

                    <ErrorMessage open={isErrorOpen} handleClose={handleErrorClose} error={errorStatus} />
                </Box>
            </Modal></>}
        </GlobalContext.Consumer>
    );
}
