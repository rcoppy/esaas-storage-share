import * as React from 'react';
import { Stack, Button, Box, Container, Divider, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link, useParams } from 'react-router-dom';
import StorageImage from '../static/placeholders/storage_locker.webp';
import { formattedMoneyStylized } from '../utils/Formatters.js';

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

    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const imageParams = isMobile
        ? { width: "100%", height: "70vmin" } : { width: "30vmax", height: "20vmax" };

    const headerSize = isMobile ? "1.6rem" : "3rem";



    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile, store }) => {

                    const listing = store.globalListings.get(id);
                    const monthlyCost = listing ? formattedMoneyStylized(listing.price) : '0';

                    return <>
                        <ListingDataHelper store={store} id={id} />
                        {listing && <Container maxWidth="md" sx={{ paddingX: 0, mt: 3, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-end' : 'flex-start' }}>
                            <Typography sx={{ mb: 1, alignSelf: isMobile ? 'flex-end' : 'flex-start', maxWidth: '95%', overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} variant="h4" fontSize={headerSize}>{!isMobile && 'Storage available in'} {listing.city}, {listing.state}</Typography>
                            <Stack maxWidth="100%" padding={2} gap={3} direction={isMobile ? "column" : "row"}>
                                <img style={{ borderRadius: '1rem', width: imageParams.width, height: imageParams.height, objectFit: "cover" }} src={StorageImage} alt="storage image" />
                                <Paper elevation={4} sx={{ px: 2, py: 2, width: imageParams.width, maxHeight: imageParams.height, alignSelf: 'flex-end' }}>
                                    <Typography variant="h5"><strong>${monthlyCost}</strong> per square foot</Typography>
                                </Paper>
                            </Stack>
                            {/* <Typography variant="h4">{listing.address}</Typography> */}
                        </Container>}
                    </>;
                }
                }
            </GlobalContext.Consumer>
        </>
    );
}

export default Listing; 