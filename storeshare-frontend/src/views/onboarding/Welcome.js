import * as React from 'react';
import { Button, Container, Divider, Typography, TextField, FormControl, InputLabel, Stack } from '@mui/material';
import { GlobalContext } from '../../lib/GlobalContext.mjs';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchBearerToken, registerAccount } from '../../utils/ApiCaller';


const callSignIn = (tokenContext, email, password, updateShouldHideAppBar, navigate) => {
    tokenContext.doLogin(email, password, () => {
        updateShouldHideAppBar(false);
        navigate("/"); 
    });
};


function Welcome() {
    const navigate = useNavigate();  

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    return (
        <>
            <GlobalContext.Consumer>
                {({ updateShouldHideAppBar, tokenContext }) => <>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography mb={2} variant="h4">Let's store your stuff.</Typography>

                        <FormControl>
                            <Stack spacing={1} direction="column">
                                <TextField
                                    id="email-input"
                                    aria-label="email field"
                                    label="Email"
                                    defaultValue=""
                                    onChange={(event) => setEmail(event.target.value)}
                                />

                                <TextField
                                    id="password-input"
                                    label="Password"
                                    aria-label="password field"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />

                                <Button variant="contained" onClick={() =>
                                    callSignIn(tokenContext, email, password, updateShouldHideAppBar, navigate)}
                                >
                                    Login
                                </Button>

                            </Stack>
                        </FormControl>


                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default Welcome; 