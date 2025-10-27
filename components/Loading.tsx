"use client";
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
    message?: string;
    size?: number;
}

export default function Loading({ message = "Loading...", size = 40 }: LoadingProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
                gap: 2,
            }}
        >
            <CircularProgress
                size={size}
                sx={{
                    color: "#1f3fb0",
                }}
            />
            <Typography variant="body1" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
}

