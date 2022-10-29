import * as React from 'react'; 
import UiInfo from './UiInfo';
import UserProfileModel from './UserProfileModel';

export const GlobalContext = React.createContext({
    myProfile: new UserProfileModel(),
    updateProfile: () => {},

    uiInfo: new UiInfo(), 
    updateUiInfo: () => {},

    store: {}
});