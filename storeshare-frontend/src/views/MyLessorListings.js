import * as React from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link } from 'react-router-dom';
import ConfirmStateChangeDialog from '../modals/ConfirmStateChangeDialog.js';
import NewListingFlow from '../modals/NewListingFlow.js';

function MyLessorListings() {

    const [isNewListingFlowOpen, setIsNewListingFlowOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile }) => <>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4">Manage my listings</Typography>
                        <Button onClick={handleOpen} size="large" sx={{ mt: 2 }} variant="contained">Create a new listing</Button>
                    </Container>
                    <NewListingFlow open={open} handleClose={handleClose} />
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default MyLessorListings; 