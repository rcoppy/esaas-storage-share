import * as React from 'react'; 
import TokenContext from './TokenContext.js';
import UiInfo from './UiInfo.mjs';
import UserProfileModel from './UserProfileModel.mjs';

export const GlobalContext = React.createContext({
    myProfile: new UserProfileModel(),
    updateMyProfile: () => {},

    uiInfo: new UiInfo(), 
    updateUiInfo: () => {},

    store: {},

    tokenContext: new TokenContext(), 

    isLoggedIn: false,
    updateIsLoggedIn: () => {},
});