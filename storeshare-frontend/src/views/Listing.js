import * as React from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link, useParams } from 'react-router-dom';

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
                        {listing &&
                        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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