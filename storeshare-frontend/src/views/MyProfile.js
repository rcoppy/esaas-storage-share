import * as React from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link } from 'react-router-dom';

function MyProfile() {
    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile }) => <>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4">Hi, {myProfile.firstName} {myProfile.lastName}</Typography>
                        <Typography variant="p">Your email: {myProfile.contactInfo.email}</Typography>
                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default MyProfile; 