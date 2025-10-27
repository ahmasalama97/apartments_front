"use client";
import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { ErrorOutline, Refresh } from "@mui/icons-material";

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
            }

            return (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "50vh",
                        p: 3,
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            textAlign: "center",
                            border: "1px solid #eee",
                            borderRadius: 2,
                        }}
                    >
                        <ErrorOutline
                            sx={{
                                fontSize: 64,
                                color: "#ef4444",
                                mb: 2,
                            }}
                        />
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: "#1d242d" }}>
                            Something went wrong
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            We're sorry, but something unexpected happened. Please try refreshing the page.
                        </Typography>
                        {process.env.NODE_ENV === "development" && this.state.error && (
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: "#fef2f2",
                                    border: "1px solid #fecaca",
                                    borderRadius: 1,
                                    mb: 3,
                                    textAlign: "left",
                                }}
                            >
                                <Typography variant="caption" color="error" sx={{ fontFamily: "monospace" }}>
                                    {this.state.error.message}
                                </Typography>
                            </Box>
                        )}
                        <Button
                            variant="contained"
                            startIcon={<Refresh />}
                            onClick={this.resetError}
                            sx={{
                                bgcolor: "#1f3fb0",
                                "&:hover": { bgcolor: "#3c62ff" },
                            }}
                        >
                            Try Again
                        </Button>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
