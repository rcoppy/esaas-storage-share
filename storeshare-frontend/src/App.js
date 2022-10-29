import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from './widgets/AppBar';
import Container from '@mui/material/Container';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import * as React from 'react';

import { GlobalContext } from './lib/GlobalContext';
import MediaQueryHelper from './utils/MediaQueryHelper';
import { createTheme, ThemeProvider } from '@mui/material';
import UiInfo from './lib/UiInfo';
import Home from './views/Home';
import LessorProfile from './views/LessorProfile';
import Messages from './views/Messages';
import MessageThread from './views/MessageThread';
import MyProfile from './views/MyProfile';
import Onboarding from './views/Onboarding';
import RenterProfile from './views/RenterProfile';
import UserProfileModel from './lib/UserProfileModel';
import ListingGallery from './views/ListingGallery';
import Listing from './views/Listing';

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

    this.state = {
      uiInfo: new UiInfo(),
      updateUiInfo: this.updateUiInfo,

      myProfile: new UserProfileModel(),
      updateMyProfile: this.updateMyProfile,

      store: {},
    };

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    
  }

  render() {
    return (
      <>
        <CssBaseline />
        <div className="App">
          <GlobalContext.Provider value={this.state}>
            <Router>
              <AppBar />
              <MediaQueryHelper uiInfo={this.state.uiInfo} updateUiInfo={this.state.updateUiInfo} />
              <Container maxWidth={this.state.uiInfo.containerWidth} sx={{ mt: 1, overflowX: 'hidden' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile/me" element={<MyProfile />} />
                  <Route path="/profile/renters/:id" element={<RenterProfile />} />
                  <Route path="/profile/lessors/:id" element={<LessorProfile />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/messages/:id" element={<MessageThread />} />
                  <Route path="/listings" element={<ListingGallery />} />
                  <Route path="/listings/:id" element={<Listing />} />
                  <Route path="/welcome" element={<Onboarding />} />
                </Routes>
              </Container>
            </Router>
          </GlobalContext.Provider>
        </div>
      </>
    );
  }
}

export default App;
