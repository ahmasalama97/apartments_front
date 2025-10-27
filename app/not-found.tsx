import Link from "next/link";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Home, Search } from "@mui/icons-material";

export default function NotFound() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                p: 3,
                background: "#fafafa",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 6,
                    textAlign: "center",
                    border: "1px solid #eee",
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: "clamp(72px, 15vw, 120px)",
                        fontWeight: 900,
                        color: "#1f3fb0",
                        mb: 2,
                    }}
                >
                    404
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 2, color: "#1d242d" }}>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
                </Typography>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                    <Button
                        variant="contained"
                        startIcon={<Home />}
                        component={Link}
                        href="/"
                        sx={{
                            bgcolor: "#1f3fb0",
                            "&:hover": { bgcolor: "#3c62ff" },
                        }}
                    >
                        Go Home
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Search />}
                        component={Link}
                        href="/products"
                        sx={{
                            borderColor: "#1f3fb0",
                            color: "#1f3fb0",
                            "&:hover": {
                                borderColor: "#3c62ff",
                                bgcolor: "rgba(31, 63, 176, 0.04)",
                            },
                        }}
                    >
                        Browse Products
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
