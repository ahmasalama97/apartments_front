"use client";

import { useRef } from "react";
import HeroBannerCarousel from "../components/HeroBannerCarousel";
import type { HeroSlideResponse } from "../components/HeroBannerCarousel";
import Link from "next/link";
import { brandColors } from "./providers";
import { useGetApartments } from "@/hooks/custom-hooks";
import { Box, Card, CardContent, Skeleton } from "@mui/material";

export default function Home() {
  const apartmentsRef = useRef<HTMLDivElement>(null);

  const brand = brandColors;

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };


  const slides: HeroSlideResponse[] = [
    {
      id: 1,
      title: 'Discover Our New Collection',
      subtitle: 'Fresh styles for the season — curated picks for you.',
      side_image: '/images/apartments/a1.jpg',
      background_image: '/images/apartments/og.jpg',
      align: 'left',
    },
    {
      id: 2,
      title: 'Upgrade Your Home',
      subtitle: 'Quality furniture and decor to refresh your space.',
      side_image: '/images/apartments/a2.jpg',
      background_image: '/images/apartments/og.jpg',
      align: 'left',
    },
    {
      id: 3,
      title: 'Limited Time Offers',
      subtitle: 'Save big on select categories. While stocks last.',
      side_image: '/images/apartments/a3.jpg',
      background_image: '/images/apartments/og.jpg',
      align: 'left',
    },
  ];

  const {
    data: apartmentsData,
    isLoading: apartmentsLoading
  } = useGetApartments({ key: 'GetFeaturedApartments_API' });

  const LoadingSkeleton = () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
      {[1, 2, 3].map((item) => (
        <Card key={item}>
          <Skeleton variant="rectangular" height={200} />
          <CardContent>
            <Skeleton variant="text" height={32} width="60%" />
            <Skeleton variant="text" height={24} width="40%" />
            <Skeleton variant="text" height={24} width="80%" />
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <main style={{ background: "#fafafa" }}>

      <section>
        <HeroBannerCarousel
          brand={brand}
          slides={slides}
        />

        <div style={{ borderRadius: 0, padding: 12, marginTop: 20 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <strong style={{ fontSize: 20 }}>Our New Latest Release</strong>
              <Link href="/apartments" style={{ color: brand.darkBlue, textDecoration: 'none', fontWeight: 800 }}>View all</Link>
            </header>

            <div style={{ display: 'flex', gap: 6, marginBottom: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={() => scrollLeft(apartmentsRef)}
                style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}
              >
                {'<'}
              </button>
              <button
                onClick={() => scrollRight(apartmentsRef)}
                style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}
              >
                {'>'}
              </button>
            </div>
            {apartmentsLoading && <LoadingSkeleton />}
            <div ref={apartmentsRef} style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridAutoColumns: '280px',
              gap: 16,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: 8,
            }}>
              {
                apartmentsData?.data?.map((apt: any) => (
                  <div key={apt.id} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 14, padding: 12, scrollSnapAlign: 'start' }}>
                    <Link href={`/apartments/${apt.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ width: '100%', height: 160, overflow: 'hidden', borderRadius: 8 }}>
                        <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${apt?.image_url}` || '/images/placeholder.jpg'} alt={apt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ paddingTop: 8 }}>
                        <div style={{ fontWeight: 800 }}>{apt.title}</div>
                        <div style={{ color: '#666', fontSize: 13 }}>{apt?.location}</div>
                        <div style={{ color: brand.darkBlue, fontWeight: 900, marginTop: 6 }}>${Number(apt.price).toLocaleString()}</div>
                      </div>
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
