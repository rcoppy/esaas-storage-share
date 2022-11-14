import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from './widgets/AppBar.js';
import Container from '@mui/material/Container';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import * as React from 'react';

import { GlobalContext } from './lib/GlobalContext.mjs';
import MediaQueryHelper from './utils/MediaQueryHelper.js';
import { createTheme, ThemeProvider } from '@mui/material';
import UiInfo from './lib/UiInfo.mjs';
import Home from './views/Home.js';
import LessorProfile from './views/LessorProfile.js';
import Messages from './views/Messages.js';
import MessageThread from './views/MessageThread.js';
import MyProfile from './views/MyProfile.js';
import Welcome from './views/onboarding/Welcome';
import RenterProfile from './views/RenterProfile.js';
import UserProfileModel from './lib/UserProfileModel.mjs';
import ListingGallery from './views/ListingGallery.js';
import Listing from './views/Listing.js';
import TokenContext from './lib/TokenContext';
import MyRenterListings from './views/MyRenterListings';
import MyLessorListings from './views/MyLessorListings';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.updateUiInfo = (newUiInfo) => {
      this.setState(state => ({
        uiInfo: newUiInfo,
      }));
    };

    this.updateMyProfile = (newProfile) => {
      this.setState(state => ({
        myProfile: newProfile,
      }));
    };

    this.updateIsLoggedIn = (flag) => {
      this.setState(state => ({
        isLoggedIn: flag,
      }));
    }

    this.tokenContextLoginCallback = (data) => {
      const names = data.name.split(" ");
      const profile = new UserProfileModel({ firstName: names[0], lastName: names[1], email: data.email });

      this.updateMyProfile(profile);
    }

    this.state = {
      uiInfo: new UiInfo(),
      updateUiInfo: this.updateUiInfo,

      myProfile: new UserProfileModel(),
      updateMyProfile: this.updateMyProfile,

      tokenContext: new TokenContext(this.tokenContextLoginCallback,
        () => this.updateIsLoggedIn(false)),

      store: {},

      isLoggedIn: false,
      updateIsLoggedIn: this.updateIsLoggedIn,
    };
  }

  componentDidMount() {
    this.state.tokenContext.tryAutoLogin(() => {
      this.state.isLoggedIn = true;
      // navigate("/"); 
    });
  }

  render() {

    const customTheme = createTheme({
      palette: {
        primary: {
          light: '#ffff89',
          main: '#d4e157',
          dark: '#a0af22',
          contrastText: '#000000',
        },
        secondary: {
          main: '#e65100',
          light: '#ff833a',
          dark: '#ac1900',
          contrastText: '#ffea00',
        }
      }
    });

    const theme = createTheme({
      palette: {
        primary: {
          light: '#ffff89',
          main: '#d4e157',
          dark: '#a0af22',
          contrastText: '#000000',
        },
        secondary: {
          light: '#ff7961',
          main: '#f44336',
          dark: '#ba000d',
          contrastText: '#000',
        },
      },
    });

    return (
      <>
        <CssBaseline />
        <div className="App" style={{ minHeight: '100vh', backgroundColor: customTheme.palette.grey[200]}}>
          <GlobalContext.Provider value={this.state}>
            <ThemeProvider theme={customTheme}>
              {this.state.isLoggedIn && <AppBar />}
              <MediaQueryHelper uiInfo={this.state.uiInfo} updateUiInfo={this.state.updateUiInfo} />
              <Container maxWidth={this.state.uiInfo.containerWidth} sx={{ mt: 1, overflowX: 'hidden' }}>

                {!this.state.isLoggedIn && <Welcome />}

                {this.state.isLoggedIn &&
                  <Routes>
                    <Route path="/" element={<ListingGallery />} />
                    <Route path="/profile/me" element={<MyProfile />} />
                    <Route path="/profile/renters/:id" element={<RenterProfile />} />
                    <Route path="/profile/lessors/:id" element={<LessorProfile />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/messages/:id" element={<MessageThread />} />
                    <Route path="/listings" element={<ListingGallery />} />
                    <Route path="/listings/mine/renting" element={< MyRenterListings />} />
                    <Route path="/listings/mine/leasing" element={< MyLessorListings />} />
                    <Route path="/listings/:id" element={<Listing />} />
                  </Routes>}
              </Container>
            </ThemeProvider>
          </GlobalContext.Provider>
        </div>
      </>
    );
  }
}

export default App;
