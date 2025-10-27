'use client';

import { useState, useEffect } from 'react';
import { Apartment } from '@/types/apartment';
import { Container, Typography, Box, Chip, Skeleton } from '@mui/material';
import Image from 'next/image';
import { useGetApartmentDetails } from '@/hooks/custom-hooks';
import { useParams } from 'next/navigation';

export default function ApartmentDetailsPage() {
    const params = useParams()
    const apartmentId = params?.id
    const {
        data: apartmentDetails,
        isLoading: loading
    } = useGetApartmentDetails({ key: 'GetApartmentDetails_API', id: apartmentId });

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'grid', gap: 4 }}>
                    <Skeleton variant="rectangular" height={400} />
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
                        {[1, 2, 3, 4].map((index) => (
                            <Skeleton key={index} variant="rectangular" height={100} />
                        ))}
                    </Box>
                </Box>
            </Container>
        );
    }

    if (!apartmentDetails) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4">Apartment not found</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
                <Box>
                    <Box sx={{ position: 'relative', height: 400, mb: 2, borderRadius: 2, overflow: 'hidden' }}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${apartmentDetails?.data?.image_url}` || '/images/placeholder.jpg'}
                            alt={apartmentDetails?.data?.title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </Box>
                    {/* 
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
                        {apartment.images.slice(1).map((image: string, index: number) => (
                            <Box key={index} sx={{ position: 'relative', height: 100, borderRadius: 1, overflow: 'hidden' }}>
                                <Image
                                    src={image}
                                    alt={`${apartment.unitName} - ${index + 2}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </Box>
                        ))}
                    </Box> */}
                </Box>

                <Box>
                    <Typography variant="h4" gutterBottom>
                        {apartmentDetails?.data?.title}
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                        ${apartmentDetails?.data?.price.toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {apartmentDetails?.data?.location}
                    </Typography>

                    <Box sx={{ my: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            Property Details
                        </Typography>
                        <Box sx={{ display: 'grid', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Bedrooms</Typography>
                                <Typography variant="body2" fontWeight="medium">{apartmentDetails?.data?.bedrooms}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Bathrooms</Typography>
                                <Typography variant="body2" fontWeight="medium">{apartmentDetails?.data?.bathrooms}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Description
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {apartmentDetails?.data?.description}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Location
                        </Typography>
                        <Typography variant="body1">
                            {apartmentDetails?.data?.location}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}