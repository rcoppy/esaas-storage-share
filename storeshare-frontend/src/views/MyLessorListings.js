import * as React from 'react';
import { Button, Container, Divider, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link } from 'react-router-dom';
import ConfirmStateChangeDialog from '../modals/ConfirmStateChangeDialog.js';
import NewListingFlow from '../modals/NewListingFlow.js';
import SubletterModel from '../lib/SubletterModel.js';

function ErrorMessage({ open, handleClose, error }) {
    return (

        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Error: {error}
            </Alert>
        </Snackbar>


    );
}

function MyLessorListings() {

    const [isNewListingFlowOpen, setIsNewListingFlowOpen] = React.useState(false);
    const handleListingOpen = () => setIsNewListingFlowOpen(true);
    const handleListingClose = () => setIsNewListingFlowOpen(false);

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

    const handleOptInError = () => {
        setShowPending(false); 
        setErrorStatus('opt-in failed');
        setIsErrorOpen(true);
        timer = setTimeout(() => setIsErrorOpen(false), 3000);
    }

    const handleOptInSuccess = (data, myProfile, updateProfile) => {
        setShowPending(false); 
        const subletterData = new SubletterModel({ id: data.id, userId: data.user_id }); 
        const updatedProfile = myProfile; 
        updatedProfile.subletterData = subletterData; 

        updateProfile(updatedProfile); 
    }

    return (
        <>
            <GlobalContext.Consumer>
                {({ tokenContext, myProfile, updateProfile }) => <>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {myProfile.subletterData &&
                            <><Typography variant="h4">Manage my listings</Typography>
                                <Button onClick={handleListingOpen} size="large" sx={{ mt: 2 }} variant="contained">Create a new listing</Button>
                            </>}
                        {!myProfile.subletterData && <>
                            <Typography variant="h4">Register as a lessor today!</Typography>

                            {!showPending && <Button variant="contained" onClick={() => {                               
                                tokenContext.doSublettingOptIn(myProfile.id, (data) => handleOptInSuccess(data, myProfile, updateProfile), (status) => handleOptInError());
                                setShowPending(true);
                            }}>
                                Opt-in to leasing
                            </Button>}

                            {showPending && <CircularProgress sx={{ alignSelf: 'center' }} />}

                            <ErrorMessage open={isErrorOpen} handleClose={handleErrorClose} error={errorStatus} />

                        </>}
                    </Container>
                    {myProfile.subletterData && <NewListingFlow open={isNewListingFlowOpen} handleClose={handleListingClose} />}
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default MyLessorListings; 