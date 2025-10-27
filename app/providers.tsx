"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Theme context for dark/light mode
const ThemeContext = createContext<{
    mode: 'light' | 'dark';
    toggleMode: () => void;
}>({
    mode: 'light',
    toggleMode: () => { },
});

export const useThemeMode = () => useContext(ThemeContext);

// Brand colors from home page
export const brandColors = {
    // Primary colors
    darkBlue: "#1d242d",
    lightDarkBlue: "#5d636a",
    blue: "#1f3fb0",
    blueLight: "#3c62ff",

    // Additional colors
    white: "#ffffff",
    black: "#000000",
    gray: "#fafafa",
    grayLight: "#f5f5f5",
    grayMedium: "#e0e0e0",
    grayDark: "#666666",

    // Accent colors
    teal: "#00bcd4",
    tealLight: "#4dd0e1",
    tealDark: "#0097a7",

    // Status colors
    success: "#4caf50",
    warning: "#ff9800",
    error: "#f44336",
    info: "#2196f3",
};

const createAppTheme = (mode: 'light' | 'dark') => createTheme({
    palette: {
        mode,
        primary: {
            main: brandColors.blue,
            light: brandColors.blueLight,
            dark: "#1a2d8a",
            contrastText: brandColors.white,
        },
        secondary: {
            main: brandColors.darkBlue,
            light: brandColors.lightDarkBlue,
            dark: "#0f1419",
            contrastText: brandColors.white,
        },
        background: {
            default: mode === 'light' ? brandColors.gray : "#121212",
            paper: mode === 'light' ? brandColors.white : "#1e1e1e",
        },
        text: {
            primary: mode === 'light' ? brandColors.darkBlue : brandColors.white,
            secondary: mode === 'light' ? brandColors.lightDarkBlue : "#b0b0b0",
        },
        divider: mode === 'light' ? brandColors.grayMedium : "#333333",
    },
    shape: { borderRadius: 10 },
    typography: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        h1: {
            fontWeight: 900,
            fontSize: "clamp(28px, 6vw, 44px)",
            lineHeight: 1.15,
            color: mode === 'light' ? brandColors.darkBlue : brandColors.white,
        },
        h2: {
            fontWeight: 900,
            fontSize: "clamp(20px, 4vw, 28px)",
            color: mode === 'light' ? brandColors.darkBlue : brandColors.white,
        },
        h3: {
            fontWeight: 700,
            fontSize: "clamp(16px, 3vw, 20px)",
            color: mode === 'light' ? brandColors.darkBlue : brandColors.white,
        },
        h4: {
            fontWeight: 700,
            fontSize: "clamp(14px, 2.5vw, 18px)",
            color: mode === 'light' ? brandColors.darkBlue : brandColors.white,
        },
        h5: {
            fontWeight: 700,
            fontSize: "clamp(12px, 2vw, 16px)",
            color: mode === 'light' ? brandColors.darkBlue : brandColors.white,
        },
        h6: {
            fontWeight: 700,
            fontSize: "clamp(11px, 1.8vw, 14px)",
            color: mode === 'light' ? brandColors.darkBlue : brandColors.white,
        },
        button: {
            textTransform: 'none',
            fontWeight: 800,
            fontSize: "clamp(12px, 2vw, 14px)",
        },
        body1: {
            fontSize: "clamp(12px, 2vw, 14px)",
            lineHeight: 1.5,
            color: mode === 'light' ? brandColors.lightDarkBlue : "#b0b0b0",
        },
        body2: {
            fontSize: "clamp(11px, 1.8vw, 13px)",
            lineHeight: 1.4,
            color: mode === 'light' ? brandColors.lightDarkBlue : "#b0b0b0",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    fontWeight: 800,
                    textTransform: "none",
                    "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(31, 63, 176, 0.15)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 10,
                        backgroundColor: mode === 'light' ? brandColors.white : "#2a2a2a",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: brandColors.blue,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: brandColors.blue,
                            borderWidth: 2,
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: mode === 'light' ? "1px solid #eee" : "1px solid #333",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: mode === 'light' ? "1px solid #eee" : "1px solid #333",
                    "&:hover": {
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    },
                },
            },
        },
    },
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

export default function AppProviders({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Load theme preference from localStorage
        const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    useEffect(() => {
        // Save theme preference to localStorage
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const toggleMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    const theme = createAppTheme(mode);

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}