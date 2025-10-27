"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";

export type HeroSlideResponse = {
    id: number;
    title: string;
    subtitle?: string;
    cta_label?: string;
    cta_link?: string;
    side_image: string;
    background_image: string;
    position?: number;
    align?: "left" | "center" | "right";
};

export default function HeroBannerCarousel({
    slides,
    brand,
}: {
    slides: HeroSlideResponse[];
    brand: { darkBlue: string };
}) {
    const [index, setIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(0);

    function paginate(newDirection: number) {
        setDirection(newDirection);
        setIndex((i) => (i + newDirection + slides.length) % slides.length);
    }

    // autoplay disabled: keep slides static on home page unless user navigates manually
    // If you want to re-enable autoplay later, restore the interval logic below.
    /*
    React.useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setIndex((i) => (i + 1) % slides?.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [index, slides?.length]);
    */

    if (!slides || slides.length === 0) {
        return <div>No slides available</div>;
    }
    const slide = slides[index];
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
    const resolveSrc = (path?: string) => {
        if (!path) return '';
        // If absolute URL or root-relative path, return as-is; otherwise prefix with API base
        if (path.startsWith('http') || path.startsWith('/')) return path;
        return `${apiBase}${path}`;
    };
    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                minHeight: "clamp(300px, 42vw, 520px)",
                color: "#fff",
            }}
        >
            {/* Background image with overlay */}
            {slide.background_image && (
                <>
                    <Image
                        src={resolveSrc(slide.background_image)}
                        alt={slide.title}
                        fill
                        style={{ objectFit: "cover", zIndex: 0 }}
                        priority
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(0,0,0,0.8)",
                            zIndex: 0,
                        }}
                    />
                </>
            )}

            <div style={{ margin: "0 auto", padding: "0 clamp(16px, 4vw, 20px)" }}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            maxWidth: 1200,
                            margin: "0 auto",
                            padding: "clamp(24px, 6vw, 40px)",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {(() => {
                            const slide = slides[index];
                            const align = (slide.align ?? "left") as
                                | "left"
                                | "center"
                                | "right";
                            const textAlign: "left" | "center" | "right" =
                                align === "center"
                                    ? "center"
                                    : align === "right"
                                        ? "right"
                                        : "left";
                            const isRight = align === "right";
                            const justify: "flex-start" | "center" | "flex-end" =
                                align === "center"
                                    ? "center"
                                    : align === "right"
                                        ? "flex-end"
                                        : "flex-start";

                            return (
                                <div
                                    className="hero-grid"
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1.1fr 1fr",
                                        gap: 24,
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    {/* Text Left */}
                                    {!isRight ? (
                                        <div style={{ textAlign }}>
                                            <div
                                                style={{
                                                    color: "#d1d5db",
                                                    fontWeight: 600,
                                                    marginBottom: 8,
                                                }}
                                            >
                                                #Big Fashion Sale
                                            </div>
                                            <h1
                                                style={{
                                                    fontSize: "clamp(28px, 6vw, 44px)",
                                                    fontWeight: 900,
                                                    lineHeight: 1.15,
                                                    margin: 0,
                                                    color: slide.background_image && "#fff"
                                                }}
                                            >
                                                {slide.title}
                                            </h1>
                                            {slide.subtitle && (
                                                <p style={{ marginTop: 10, color: slide.background_image ? "#fff" : "#e5e7eb" }}>
                                                    {slide.subtitle}
                                                </p>
                                            )}
                                            {slide.cta_label && slide.cta_link && (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 10,
                                                        marginTop: 18,
                                                        flexWrap: "wrap",
                                                        justifyContent: justify,
                                                    }}
                                                >
                                                    <Link
                                                        href={slide.cta_link}
                                                        style={{
                                                            background: brand.darkBlue,
                                                            color: "#fff",
                                                            padding: "12px 16px",
                                                            borderRadius: 9999,
                                                            textDecoration: "none",
                                                            fontWeight: 800,
                                                        }}
                                                    >
                                                        {slide.cta_label} →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ) : null}

                                    {/* Side Image (optional) */}
                                    {slide.side_image && (
                                        <div>
                                            <div
                                                className="hero-image"
                                                style={{
                                                    position: "relative",
                                                    width: "100%",
                                                    aspectRatio: "4 / 3",
                                                    borderRadius: 16,
                                                    overflow: "hidden",
                                                    background: "#fff",
                                                }}
                                            >
                                                <Image
                                                    src={resolveSrc(slide.side_image)}
                                                    alt={slide.title}
                                                    fill
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Text Right */}
                                    {isRight ? (
                                        <div style={{ textAlign }}>
                                            <div
                                                style={{
                                                    color: "#d1d5db",
                                                    fontWeight: 600,
                                                    marginBottom: 8,
                                                }}
                                            >
                                                #Big Fashion Sale
                                            </div>
                                            <h1
                                                style={{
                                                    fontSize: "clamp(28px, 6vw, 44px)",
                                                    fontWeight: 900,
                                                    lineHeight: 1.15,
                                                    margin: 0,
                                                }}
                                            >
                                                {slide.title}
                                            </h1>
                                            {slide.subtitle && (
                                                <p style={{ marginTop: 10, color: "#e5e7eb" }}>
                                                    {slide.subtitle}
                                                </p>
                                            )}
                                            {slide.cta_label && slide.cta_link && (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 10,
                                                        marginTop: 18,
                                                        flexWrap: "wrap",
                                                        justifyContent: justify,
                                                    }}
                                                >
                                                    <Link
                                                        href={slide.cta_link}
                                                        style={{
                                                            background: brand.darkBlue,
                                                            color: "#fff",
                                                            padding: "12px 16px",
                                                            borderRadius: 9999,
                                                            textDecoration: "none",
                                                            fontWeight: 800,
                                                        }}
                                                    >
                                                        {slide.cta_label} →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })()}
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <IconButton
                    onClick={() => paginate(-1)}
                    sx={{
                        position: "absolute",
                        left: 80,
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "#ffffff88",
                        display: { xs: "none", sm: "inline-flex" },
                    }}
                    aria-label="prev"
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton
                    onClick={() => paginate(1)}
                    sx={{
                        position: "absolute",
                        right: 80,
                        top: "50%",
                        transform: "translate(50%, -50%)",
                        bgcolor: "#ffffff88",
                        display: { xs: "none", sm: "inline-flex" },
                    }}
                    aria-label="next"
                >
                    <ArrowForwardIosIcon />
                </IconButton>

                {/* Dots */}
                <div
                    style={{
                        display: "flex",
                        gap: 6,
                        marginTop: 16,
                        position: "absolute",
                        bottom: 10,
                        left: 0,
                        right: 0,
                        justifyContent: "center",
                    }}
                    aria-label="carousel dots"
                >
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 9999,
                                border: 0,
                                background: i === index ? "#fff" : "#9ca3af",
                                cursor: "pointer",
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
