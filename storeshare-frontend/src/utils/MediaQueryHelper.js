import { useTheme } from '@emotion/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GlobalContext } from '../lib/GlobalContext';
import { createTheme } from '@mui/material';
import UiInfo from '../lib/UiInfo';
import { useEffect } from 'react';

/*

    Put the screensize into current state.

    https://mui.com/material-ui/customization/breakpoints/
    xs, extra-small: 0px
    sm, small: 600px
    md, medium: 900px
    lg, large: 1200px
    xl, extra-large: 1536px
 */

// get the string name for the breakpoint width applicable to the current screen size
const getSizeFromMediaQuery = (theme) => {
    const sizes = ['sm', 'md', 'lg', 'xl'];

    let match = 'xs';

    if (!theme.breakpoints) {
        theme = createTheme(theme, {
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 600,
                    md: 900,
                    lg: 1200,
                    xl: 1536,
                },
            },
        });
    }

    sizes.forEach((s) => {
        if (!useMediaQuery(theme.breakpoints.up(s))) {
            return match;
        }

        match = s;
    });

    return match;
}

const getContainerMaxWidth = (theme) => {
    const screenWidth = getSizeFromMediaQuery(theme);

    // smaller screens--container should match full screen
    if (screenWidth === "xs" | screenWidth === "sm") {
        return "xl";
    }

    // larger screens--container should be smaller
    return "sm";
}

export default function MediaQueryHelper({ uiInfo, updateUiInfo }) {
    const theme = useTheme();
    const containerWidth = getContainerMaxWidth(theme);

    const setWidth = () => {
        if (containerWidth !== uiInfo.containerWidth) {
            uiInfo.containerWidth = containerWidth;
            updateUiInfo(uiInfo);
        }
    }

    useEffect(() => setWidth());

    return <></>;
}


