import * as React from 'react';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link } from 'react-router-dom';
import LeaseCard from '../widgets/LeaseCard.js';
import { ContractDataHelper, ListingDataHelper } from '../utils/DataHelpers.js';

function MyRenterListings() {
    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile, store }) => <>
                    <ListingDataHelper store={store} />
                    <ContractDataHelper store={store} />
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4">My active storage</Typography>
                        {myProfile.renterData && <p>You are a renter!</p>}
                        {myProfile.renterData && 
                        <Box sx={{ width: '100%', my: 2, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center'}}>
                            {Array.from(store.contractsList.values())
                                .filter(c => c.renterId === myProfile.renterData.id)
                                .map((c, index) => {
                                    const l = store.globalListings.get(c.listingId); 
                                    return (
                                        <LeaseCard listing={l} contract={c} />
                                    );
                                })}
                        </Box>}
                    </Container>

                    
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default MyRenterListings; 