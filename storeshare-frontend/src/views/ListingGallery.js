import * as React from 'react';
import { Button, Chip, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

function ListingGallery() {
    return (
        <>
            <GlobalContext.Consumer>
                {({ store, myProfile, tokenContext }) => <>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4">Explore storage options</Typography>

                        <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
                        {Array.from(store.globalListings.values()).map((listing, index) => {
                            return <Chip key={index} label={listing.address} size="large" />
                        })};
                        </Box>

                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default ListingGallery; 