import * as React from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext';
import { Link } from 'react-router-dom';

function Onboarding() {
    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile }) => <>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="p">Welcome! Let's get you onboarded.</Typography>
                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default Onboarding; 