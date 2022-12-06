import * as React from 'react';
import { Stack, Button, Box, Container, Divider, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link, useParams } from 'react-router-dom';
import StorageImage from '../static/placeholders/storage_locker.webp';
import { formattedMoneyStylized, SquareFeetText } from '../utils/Formatters.js';
import { SubletterDataHelper } from '../utils/DataHelpers.js';
import NewContractFlow from '../modals/NewContractFlow.js';

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

    // purchase modal
    const [isNewContractFlowOpen, setIsNewContractFlowOpen] = React.useState(false);
    const handleContractOpen = () => setIsNewContractFlowOpen(true);
    const handleContractClose = () => setIsNewContractFlowOpen(false);


    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile, store, updateStore, tokenContext }) => {

                    const listing = store.globalListings.get(id);
                    const monthlyCost = listing ? formattedMoneyStylized(listing.price) : '0';

                    const subletter = listing ? store.sublettersList.get(listing.subletterId) : null; 

                    const subletterName = subletter ? subletter.firstName : ''; 

                    return <>
                        <ListingDataHelper store={store} id={id} />
                        {listing && <SubletterDataHelper store={store} updateStore={updateStore} id={listing.subletterId} tokenContext={tokenContext} />}
                        {listing && <Container maxWidth="md" sx={{ paddingX: 0, mt: 3, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-end' : 'flex-start' }}>
                            <Typography sx={{ mb: 1, alignSelf: isMobile ? 'flex-end' : 'flex-start', maxWidth: '95%', overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} variant="h4" fontSize={headerSize}>{!isMobile && 'Storage available in'} {listing.city}, {listing.state}</Typography>
                            <Stack maxWidth="100%" padding={2} gap={3} direction={isMobile ? "column" : "row"}>
                                <img style={{ borderRadius: '1rem', width: imageParams.width, height: imageParams.height, objectFit: "cover" }} src={StorageImage} alt="storage image" />
                                <Paper elevation={4} sx={{ px: 2, pb: 5, pt: 3, width: imageParams.width, maxHeight: imageParams.height, alignSelf: isMobile ? 'flex-end' : 'center' }}>
                                    <Stack direction="row" gap={2} sx={{ justifyContent: "space-evenly" }}>
                                        <Typography variant="h5" fontSize='1.2rem' alignSelf='center'><strong>${monthlyCost}</strong> / <SquareFeetText /></Typography>
                                        <Button onClick={handleContractOpen} variant="contained" color="primary" size="large">Reserve now</Button>
                                    </Stack>
                                    <Typography sx={{ pt: 2 }} variant="h6" fontSize='1rem'><strong>{listing.squareFeet} <SquareFeetText /></strong> immediately available</Typography>
                                    <Typography variant='p' fontSize='0.8rem'><em>{listing.description} Located within {listing.zipCode}.</em></Typography>
                                </Paper>
                            </Stack>
                            <Typography alignSelf='flex-end' variant="h4">Rented out by {subletterName}</Typography>
                        </Container>}
                        {listing && myProfile.renterData && <NewContractFlow open={isNewContractFlowOpen} handleClose={handleContractClose} listing={listing} />}
                    </>;
                }
                }
            </GlobalContext.Consumer>
        </>
    );
}

export default Listing; 