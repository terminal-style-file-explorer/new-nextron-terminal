import { createContext, useEffect, useRef, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { useTheme } from "../hooks/useTheme";
import GlobalStyle from "../components/styles/GlobalStyle";
import { themeContext } from './home';
import { useRouter } from "next/router";
import { Wrapper } from "../components/styles/terminal.styled";




function Loading() {
    const { theme, themeLoaded, setMode } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);
    const router = useRouter();
    const wrapperRef = useRef(null);
   
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        console.log('key', e.key);
        window.ipc.invoke('loaded', '')
        router.push('/home');
    }

    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.focus();
        }
    }, []);


    return (
        <>
            {themeLoaded && (
                <ThemeProvider theme={selectedTheme}>
                    <GlobalStyle theme={selectedTheme} />
                    <themeContext.Provider value={themeSwitcher}>
                        <Wrapper onKeyDown={handleKeyDown} tabIndex={0} className="h-screen grid place-items-center"  ref={wrapperRef} >
                            <h1>press any key to load</h1>
                        </Wrapper>
                    </themeContext.Provider>
                </ThemeProvider>
            )}
        </>
    );
}

export default Loading;