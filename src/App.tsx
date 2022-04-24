import React, {createContext, FunctionComponent, useEffect, useMemo, useState} from 'react';
import {createTheme, CssBaseline, PaletteMode, ThemeProvider} from "@mui/material";
import NavBar from "./components/NavBar";
import Home from './components/Home';

interface OwnProps {
}

type Props = OwnProps;

const ColorModeContext = createContext({
    toggleColorMode: () => {
    }
});

const App: FunctionComponent<Props> = (props) => {

    const [mode, setMode] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        if (Boolean(localStorage.getItem('theme')))
            setMode(localStorage.getItem('theme') as 'light' | 'dark');

    }, []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        },
    }), [mode]);

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
            setMode((prevMode: PaletteMode) =>
                prevMode === 'light' ? 'dark' : 'light'
            )
        }
    }), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <NavBar colorMode={colorMode} theme={theme}/>
                <Home />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;