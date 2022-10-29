import * as React from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext';
import { Link } from 'react-router-dom';

function LessorProfile() {
    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile }) => <>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="p">Lessor page</Typography>
                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default LessorProfile; 