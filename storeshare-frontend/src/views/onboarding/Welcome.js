import * as React from 'react';
import { Alert, Snackbar, Box, Fade, Paper, Button, Container, Divider, Typography, TextField, FormControl, InputLabel, Stack, Switch, CircularProgress, Popper, useTheme } from '@mui/material';
import { GlobalContext } from '../../lib/GlobalContext.mjs';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchBearerToken, registerAccount } from '../../utils/ApiCaller';


// TODO: extract error message as a widget
function ErrorMessage({ open, handleClose, error }) {
    return (

        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Error: {error}
            </Alert>
        </Snackbar>


    );
}

function Welcome() {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const [registerMode, setRegisterMode] = React.useState(false);

    const [showPending, setShowPending] = React.useState(false);
    const [isErrorOpen, setIsErrorOpen] = React.useState(false);
    const [errorStatus, setErrorStatus] = React.useState('');

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsErrorOpen(false);
    };

    const theme = useTheme();

    let timer = null;

    React.useEffect(() => {
        return () => clearTimeout(timer);
    }, []);

    const callSignIn = (tokenContext, updateIsLoggedIn) => {
        tokenContext.doLogin(email, password, () => {
            updateIsLoggedIn(true);
            navigate("/");
        }, (status) => {
            setIsErrorOpen(true);
            setShowPending(false);
            setErrorStatus(status)
            timer = setTimeout(() => setIsErrorOpen(false), 3000);
        });
    };

    const callSignUp = (tokenContext, updateIsLoggedIn) => {
        registerAccount(email, password, name, () => {
            callSignIn(tokenContext, updateIsLoggedIn);
        });
    }


    return (
        <>
            <GlobalContext.Consumer>
                {({ updateIsLoggedIn, tokenContext }) => <>
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

                                {!showPending && <Button aria-label="login-submit-button" variant="contained" onClick={() => {
                                    if (!registerMode) {
                                        callSignIn(tokenContext, updateIsLoggedIn);
                                    } else {
                                        callSignUp(tokenContext, updateIsLoggedIn);
                                    }

                                    setShowPending(true);
                                }}>
                                    {registerMode ? "Sign up" : "Login"}
                                </Button>}

                                {!showPending &&
                                    <Typography variant="p">Need to register? <Switch aria-label="toggle register mode" onChange={() => setRegisterMode(!registerMode)} /></Typography>
                                }

                                {showPending && <CircularProgress sx={{ alignSelf: 'center' }} />}

                                <ErrorMessage open={isErrorOpen} handleClose={handleErrorClose} error={errorStatus} />

                            </Stack>
                        </FormControl>
                    </Container>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default Welcome; 