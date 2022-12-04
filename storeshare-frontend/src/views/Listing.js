import * as React from 'react';
import { Stack, Button, Box, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link, useParams } from 'react-router-dom';
import StorageImage from '../static/placeholders/storage_locker.webp';

function ListingDataHelper({ store, id }) {
    React.useEffect(() => {
        if (new Date() - store.lastListingSyncTimestamp > 3000) {
            store.fetchSingleListingById(id);
            console.log("refreshed single listing");
        }
    });
}

function Listing() {

    let { id } = useParams();
    id = parseInt(id);

    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile, store }) => {

                    const listing = store.globalListings.get(id);

                    return <>
                        <ListingDataHelper store={store} id={id} />
                        {listing && <Container maxWidth="md" sx={{ mt: 3, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="h4">Storage available in {listing.city}, {listing.state}</Typography>
                            {/* <Box width="290" height="180"> */}
                                <img style={{ width: "290px", height: "180px", objectFit: "cover" }} src={StorageImage} alt="storage image" />
                            {/* </Box> */}
                            <Typography variant="h4">{listing.address}</Typography>
                        </Container>}
                    </>;
                }
                }
            </GlobalContext.Consumer>
        </>
    );
}

export default Listing; 