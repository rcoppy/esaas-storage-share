import * as React from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link, useParams } from 'react-router-dom';

function Listing() {

    const { id } = useParams(); 

    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile }) => <>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="p">Listing page</Typography>
                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default Listing; 