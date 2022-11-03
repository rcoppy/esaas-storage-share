import * as React from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import { GlobalContext } from '../../lib/GlobalContext.mjs';
import { Link } from 'react-router-dom';
import { fetchBearerToken, registerAccount } from '../../utils/ApiCaller';


const callSignIn = () => {
    registerAccount("alex@alex.com", "alexander");
};

function Welcome() {
    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile }) => <>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h3">Hello, {myProfile.firstName}!</Typography>

                        <Button onClick={callSignIn}>
                            Call to api
                        </Button>
                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default Welcome; 