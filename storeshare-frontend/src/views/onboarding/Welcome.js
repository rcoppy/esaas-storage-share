import * as React from 'react';
import { Button, Container, Divider, Typography, TextField, FormControl, InputLabel, Stack, Switch } from '@mui/material';
import { GlobalContext } from '../../lib/GlobalContext.mjs';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchBearerToken, registerAccount } from '../../utils/ApiCaller';


const callSignIn = (tokenContext, email, password, updateShouldHideAppBar, navigate) => {
    tokenContext.doLogin(email, password, () => {
        updateShouldHideAppBar(false);
        navigate("/"); 
    });
};

const callSignUp = (tokenContext, email, password, name, updateShouldHideAppBar, navigate) => {
    registerAccount(email, password, name, () => {
        callSignIn(tokenContext, email, password, updateShouldHideAppBar, navigate);
    });
}

function Welcome() {
    const navigate = useNavigate();  

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState(''); 

    const [registerMode, setRegisterMode] = React.useState(false); 

    return (
        <>
            <GlobalContext.Consumer>
                {({ updateShouldHideAppBar, tokenContext }) => <>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', height: '80vh', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography mb={2} variant="h4">Let's store your stuff.</Typography>

                        <FormControl>
                            <Stack spacing={1} direction="column">
                                
                                {registerMode && <TextField
                                    id="name-input"
                                    aria-label="name field"
                                    label="Your name"
                                    defaultValue=""
                                    onChange={(event) => setName(event.target.value)}
                                />}
                                
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
                                    !registerMode ? 
                                        callSignIn(tokenContext, email, password, updateShouldHideAppBar, navigate) : 
                                        callSignUp(tokenContext, email, password, name, updateShouldHideAppBar, navigate)}
                                >
                                    {registerMode ? "Sign up" : "Login"}
                                </Button>

                                <Typography variant="p">Need to register? <Switch aria-label="toggle register mode" onChange={() => setRegisterMode(!registerMode)} /></Typography>
                                

                            </Stack>
                        </FormControl>

                        

                        


                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default Welcome; 