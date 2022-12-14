import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Stack from '@mui/material/Stack';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import BlockIcon from '@mui/icons-material/Block';
import GroupIcon from '@mui/icons-material/Group';
import Alert from '@mui/material/Alert';
import { GlobalContext } from '../lib/GlobalContext.mjs';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useTheme } from '@mui/system';
import AvatarPhoto from '../static/placeholders/avatar.jpg'; 
import { Chip, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function AppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme(); 

    const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
    const searchBubbleText = isMobile ? "Explore" : "Explore storage options"; 

    return (
        <>
            <GlobalContext.Consumer>
                {({ myProfile, doTotalLogout }) => <>
                    <MuiAppBar color="grey" position='sticky'>
                        <Container maxWidth="xl">
                            <Toolbar color={theme.palette.primary.dark} disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Stack aria-label="see homepage" component={Link} to="/" direction="row" spacing={1} color={theme.palette.primary.dark} sx={{ textDecoration: 'none', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                    <ArchiveIcon fontSize="large" />                                    
                                    {!isMobile && <Typography variant="h6" pt={0.5}>
                                        StoreShare
                                    </Typography>}
                                </Stack>

                                <Stack>
                                    <Chip icon={<SearchIcon />} clickable component={Link} to="/" size="large" label={searchBubbleText} color="primary" />
                                </Stack>

                                <Stack direction="row" color={theme.palette.primary.contrastText} spacing={1} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                    {/* <Link to="/">
                                        <IconButton aria-label="see homepage" component="label">
                                            <HomeIcon color="primary[50]" />
                                        </IconButton>
                                    </Link> */}
                                    {/* <Link to="/messages"> */}
                                        <IconButton aria-label="see messages" component={Link} to="/messages">
                                            <Badge badgeContent={14} color="warning">
                                                <MailIcon htmlColor={theme.palette.primary.dark} />
                                            </Badge>
                                        </IconButton>
                                    {/* </Link> */}

                                    {/* <Link to="/notifications">
                                        <IconButton aria-label="see notifications" component="label">
                                            <Badge badgeContent={14} color="warning">
                                                <NotificationsIcon htmlColor={theme.palette.primary.contrastText} />
                                            </Badge>
                                        </IconButton>
                                    </Link> */}

                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 23,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                                    >
                                        {/* <MenuItem component={Link} to="/profile/me">
                                            <Avatar />Profile
                                        </MenuItem> */}
                                        <MenuItem component={Link} to="/listings/mine/renting">
                                            My storage
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem component={Link} to="/listings/mine/leasing">
                                            Manage listings
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem component={Link} to="/profile/me">
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            Account
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemIcon>
                                                <PrivacyTipIcon fontSize="small" />
                                            </ListItemIcon>
                                            Privacy
                                        </MenuItem>
                                        <MenuItem component={Link} to="/" onClick={() => doTotalLogout()}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ mr: 2 }}
                                            aria-label="account avatar"
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 32, height: 32 }} alt={myProfile.firstName + " " + myProfile.lastName} src={AvatarPhoto} />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Toolbar>
                        </Container>
                    </MuiAppBar>
                </>}
            </GlobalContext.Consumer>
            {/* <Alert severity="info">This is an info alert ??? check it out!</Alert> */}
        </>);
}

export default AppBar; 