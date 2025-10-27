"use client";
import React from "react";
import Image from "next/image";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import type { StaticImageData } from "next/image";

export type Slide = { img: StaticImageData; title: string; text: string };

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
    const [index, setIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(0);

    function paginate(newDirection: number) {
        setDirection(newDirection);
        setIndex((i) => (i + newDirection + slides.length) % slides.length);
    }

    // Swipe handling
    const swipeConfidenceThreshold = 6000;
    const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

    return (
        <div className="hero-image" style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 3",
            borderRadius: "clamp(8px, 2vw, 16px)",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,.25)",
            minHeight: "clamp(200px, 40vw, 300px)"
        }}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={index}
                    custom={direction}
                    initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    style={{ position: "absolute", inset: 0 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) paginate(1);
                        else if (swipe > swipeConfidenceThreshold) paginate(-1);
                    }}
                >
                    <Image src={slides[index].img} alt={slides[index].title} fill style={{ objectFit: "cover" }} />
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            position: "absolute",
                            left: "clamp(8px, 2vw, 16px)",
                            right: "clamp(8px, 2vw, 16px)",
                            bottom: "clamp(8px, 2vw, 16px)",
                            background: "linear-gradient(180deg, #0000, #0006)",
                            color: "#fff",
                            padding: "clamp(8px, 2vw, 16px)",
                            borderRadius: "clamp(6px, 1.5vw, 12px)"
                        }}
                    >
                        <div style={{
                            fontSize: "clamp(16px, 4vw, 22px)",
                            fontWeight: 900,
                            lineHeight: 1.2,
                            marginBottom: "clamp(4px, 1vw, 8px)"
                        }}>
                            {slides[index].title}
                        </div>
                        <div style={{
                            opacity: 0.9,
                            fontSize: "clamp(12px, 2.5vw, 14px)",
                            lineHeight: 1.4
                        }}>
                            {slides[index].text}
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            <IconButton
                onClick={() => paginate(-1)}
                sx={{
                    position: "absolute",
                    left: "clamp(4px, 1vw, 8px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "#ffffff88",
                    display: { xs: "none", sm: "flex" },
                    p: "clamp(4px, 1vw, 8px)"
                }}
                aria-label="prev"
            >
                <ArrowBackIosNewIcon sx={{ fontSize: "clamp(16px, 3vw, 20px)" }} />
            </IconButton>
            <IconButton
                onClick={() => paginate(1)}
                sx={{
                    position: "absolute",
                    right: "clamp(4px, 1vw, 8px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "#ffffff88",
                    display: { xs: "none", sm: "flex" },
                    p: "clamp(4px, 1vw, 8px)"
                }}
                aria-label="next"
            >
                <ArrowForwardIosIcon sx={{ fontSize: "clamp(16px, 3vw, 20px)" }} />
            </IconButton>
            <div style={{
                position: "absolute",
                bottom: "clamp(4px, 1vw, 8px)",
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: "clamp(4px, 1vw, 6px)"
            }}>
                {slides.map((_, i) => (
                    <span
                        key={i}
                        style={{
                            width: "clamp(6px, 1.5vw, 8px)",
                            height: "clamp(6px, 1.5vw, 8px)",
                            borderRadius: 9999,
                            background: i === index ? "#fff" : "#ffffff66",
                            cursor: "pointer"
                        }}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
}


