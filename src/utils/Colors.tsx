import {Appearance} from 'react-native';

interface Colors {
    [key: string]: string | undefined
}

// COLORS FOR THE DARK THEME
const darkColorScheme: Colors = {
    gold: "#D49621",
    gold_dark: "#B18731",
    chatBackground: "#C78015",
    gold_50: "rgba(157, 112, 29, 0.2)",
    userImageBorder: "#AA822A",
    navbarIcon: "#CD8A1A",
    tabActiveColor: "#DBBE62",
    gold_100: "#F4BB01",
    currDate: "#FFC423",
    textColor: '#FFFFFF',
    textColor_100: 'rgba(255, 255, 255, 0.5)',
    btnText: "#111649",
    inputColor: "#C9C9C9",
    lightText: "#808080",
    inputPlaceholder: "#8279D0",
    otpInputBackground: "#23147A",
    navbarBackground: "#0C0A22",
    modalBackground: "rgba(0, 0, 0, .5)",
    transparent: "rgba(0, 0, 0, 0)",
    lightBorder: 'lightgray',
    logoutText: "#120C31",
    orderBackground: "#0E0A27",
    serviceCheckbox: "#07162E",
};

// COLORS FOR THE LIGHT THEME
const lightColorScheme: Colors = {
    gold: "#D49621",
    gold_dark: "#B18731",
    chatBackground: "#C78015",
    gold_50: "rgba(157, 112, 29, 0.2)",
    userImageBorder: "#AA822A",
    navbarIcon: "#CD8A1A",
    tabActiveColor: "#DBBE62",
    gold_100: "#F4BB01",
    currDate: "#FFC423",
    textColor: '#FFFFFF',
    textColor_100: 'rgba(255, 255, 255, 0.5)',
    btnText: "#111649",
    inputColor: "#C9C9C9",
    lightText: "#808080",
    inputPlaceholder: "#8279D0",
    lightTheme: '#352A7F',
    otpInputBackground: "#23147A",
    cardColor: '#2C2C64',
    navbarBackground: "#0C0A22",
    modalBackground: "rgba(0, 0, 0, .6)",
    transparent: "rgba(0, 0, 0, 0)",
    lightBorder: 'lightgray',
    logoutText: "#120C31",
    orderBackground: "#0E0A27",
    serviceCheckbox: "#07162E",
};

export const Color = (color: string) => {
    // GET USER DEVICE THEME (LIGHT/DARK)
    const colorScheme = Appearance.getColorScheme();

    if (colorScheme === 'dark') {           // IF USER DEVICE THEME IS DARK
        return darkColorScheme[color];
    }else {                                 // IF USER DEVICE THEME IS LIGHT
        return lightColorScheme[color];
    }
}