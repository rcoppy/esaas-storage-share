import * as React from 'react';
import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import { Link } from 'react-router-dom';

function MessageThreadListItem() {
    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile }) => <>
                    <Stack>
                        

                    </Stack>
                </>}
            </GlobalContext.Consumer>
        </>
    );
}

export default MessageThreadListItem; 