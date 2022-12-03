import * as React from 'react';
import { Button, Chip, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import ListingCard from '../widgets/ListingCard.js';

function ListingGallery() {
    return (
        <>
            <GlobalContext.Consumer>
                {({ store, myProfile, tokenContext }) => <>
                    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography gutterBottom variant="h4">Explore storage options</Typography>

                        <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center'}}>
                        {Array.from(store.globalListings.values()).map((listing, index) => {
                            return <ListingCard key={index} listing={listing} />
                        })};
                        </Box>

                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default ListingGallery; 