import * as React from 'react'; 
import UiInfo from './UiInfo.mjs';
import UserProfileModel from './UserProfileModel.mjs';

export const GlobalContext = React.createContext({
    myProfile: new UserProfileModel(),
    updateProfile: () => {},

    uiInfo: new UiInfo(), 
    updateUiInfo: () => {},

    store: {}
});