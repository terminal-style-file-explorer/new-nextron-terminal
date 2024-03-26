import Terminal from '../components/Terminal';
import { createContext, useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { useTheme } from "../hooks/useTheme";
import GlobalStyle from "../components/styles/GlobalStyle";
import { themeContext } from './home';
import LoginTerminal from '../components/loginComponents/LoginTerminal';

export default function LoginPage() {

    const { theme, themeLoaded, setMode } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);
  
    // Disable browser's default behavior
    // to prevent the page go up when Up Arrow is pressed
    useEffect(() => {
      window.addEventListener(
        "keydown",
        e => {
          ["ArrowUp", "ArrowDown"].indexOf(e.code) > -1 && e.preventDefault();
        },
        false
      );
    }, []);
  
    useEffect(() => {
      setSelectedTheme(theme);
    }, [themeLoaded]);
  
    // Update meta tag colors when switching themes
    useEffect(() => {
      const themeColor = theme.colors?.body;
  
      const metaThemeColor = document.querySelector("meta[name='theme-color']");
      const maskIcon = document.querySelector("link[rel='mask-icon']");
      const metaMsTileColor = document.querySelector(
        "meta[name='msapplication-TileColor']"
      );
  
      metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
      metaMsTileColor && metaMsTileColor.setAttribute("content", themeColor);
      maskIcon && maskIcon.setAttribute("color", themeColor);
    }, [selectedTheme]);
  
    const themeSwitcher = (switchTheme: DefaultTheme) => {
      setSelectedTheme(switchTheme);
      setMode(switchTheme);
    };
  
    return (
      <>
        {themeLoaded && (
          <ThemeProvider theme={selectedTheme}>
            <GlobalStyle theme={selectedTheme} />
            <themeContext.Provider value={themeSwitcher}>
              <LoginTerminal />
            </themeContext.Provider>
          </ThemeProvider>
        )}
      </>
    );
  }

