'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Container, Box, TextField, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';

import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/apartments/search?q=${encodeURIComponent(searchQuery.trim())}`;
    };


    return (
        <AppBar position="sticky" elevation={0} sx={{ background: "#fff", color: "#111", borderBottom: "1px solid #eee" }}>
            <Container maxWidth="lg">
                <Toolbar sx={{ gap: 2, px: 2, justifyContent: 'space-between' }}>
                    <IconButton
                        edge="start"
                        sx={{ display: { xs: "inline-flex", md: "none" } }}
                        onClick={() => setMenuOpen(true)}
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component={Link}
                        href="/"
                        sx={{
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Apartment Listings
                    </Typography>



                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                        <Link href="/apartments" style={{ color: "inherit", textDecoration: "none" }}>
                            Browse Apartments
                        </Link>
                    </Box>
                </Toolbar>
            </Container>

            <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
                <Box sx={{ width: 280, p: 2 }} role="presentation">
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">Menu</Typography>
                        <IconButton onClick={() => setMenuOpen(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List>
                        <ListItem component={Link} href="/apartments" onClick={() => setMenuOpen(false)}>
                            <ListItemText primary="Browse Apartments" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
}


