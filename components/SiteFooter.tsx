"use client";
import React from "react";
import { Box, Typography, Link, IconButton, Button, Checkbox, FormControlLabel } from "@mui/material";
import { Facebook, Instagram, YouTube, Twitter } from "@mui/icons-material";

export default function SiteFooter() {
    return (
        <footer style={{ background: "#000", color: "#fff", padding: "40px 0 20px" }}>
            <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 } }}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 4, mb: 4 }}>
                    <Box>
                        <Typography variant="body2" sx={{ mb: 2, mt: 2, color: "#fff", lineHeight: 1.6 }}>
                            Your Companion for Essentials.
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton sx={{ color: "#fff", "&:hover": { color: "#00bcd4" } }}>
                                <Facebook />
                            </IconButton>
                            <IconButton sx={{ color: "#fff", "&:hover": { color: "#00bcd4" } }}>
                                <Instagram />
                            </IconButton>
                            <IconButton sx={{ color: "#fff", "&:hover": { color: "#00bcd4" } }}>
                                <YouTube />
                            </IconButton>
                            <IconButton sx={{ color: "#fff", "&:hover": { color: "#00bcd4" } }}>
                                <Twitter />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Menu Section */}
                    <Box>
                        <Typography variant="h4" fontWeight={900} sx={{ mb: 2, color: "#fff" }}>
                            Menu
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link href="/" sx={{ color: "#fff", textDecoration: "none", "&:hover": { color: "#00bcd4" } }}>
                                Home
                            </Link>
                            <Link href="/apartments" sx={{ color: "#fff", textDecoration: "none", "&:hover": { color: "#00bcd4" } }}>
                                Browse Apartments
                            </Link>
                        </Box>
                    </Box>
                    <Box></Box>
                </Box>

                {/* Bottom Bar */}
                <Box sx={{ borderTop: "1px solid #333", pt: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                    <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                        © 2025. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </footer>
    );
}