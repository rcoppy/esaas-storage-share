import * as React from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/system';

function MyProfile() {

    const theme = useTheme(); 

    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile }) => <>
                    <Container color={theme.palette.grey[600]} maxWidth="lg" sx={{ textAlign: 'left', pt: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography variant="h4">Hi, {myProfile.firstName} {myProfile.lastName}</Typography>
                        <Typography variant="p">{myProfile.contactInfo.email}</Typography>
                        
                        <Typography sx={{pt: '1rem'}} component={Link} to="/listings/mine/renting" variant="h5">See your active storage space</Typography>
                        <Typography component={Link} to="/listings/mine/leasing" variant="h5">Manage your active storage listings</Typography>
                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default MyProfile; 