'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { Apartment } from '@/types/apartment';
import {
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    TextField,
    Skeleton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
} from '@mui/material';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useAddApartmentMutation, useGetApartments } from '@/hooks/custom-hooks';
import { brandColors } from '../providers';

const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
`;

interface NewApartmentForm {
    title: string;
    description: string;
    price: string;
    location: string;
    bedrooms: string;
    bathrooms: string;
    project: string;
    image: File | null;
}

export default function ApartmentsPage() {
    const [apartments, setApartments] = useState<Apartment[]>([]);
    // const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [formData, setFormData] = useState<NewApartmentForm>({
        title: '',
        description: '',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        project: '',
        image: null
    });

    const {
        data: apartmentsData,
        refetch: refetchApartments,
        isLoading: apartmentsLoading
    } = useGetApartments({ key: 'GetApartments_API' });

    const { mutate: AddNewApartmentMutation } = useAddApartmentMutation({
        setOpen: setOpenDialog,
        refetch: refetchApartments,
    });

    useEffect(() => {
        setApartments(apartmentsData?.data)
    }, [apartmentsData?.data])

    useEffect(() => {
        const filtered = apartmentsData?.data?.filter((apartment: any) =>
            apartment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apartment.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            apartment.project.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredApartments(filtered);
    }, [searchQuery, apartments]);

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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null) {
                    formDataToSend.append(key, value);
                }
            });
            AddNewApartmentMutation(formDataToSend)
        } catch (error) {
            console.error('Error adding apartment:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            price: '',
            location: '',
            bedrooms: '',
            bathrooms: '',
            project: '',
            image: null
        });
        setSelectedImage(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Available Apartments
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                    sx={{
                        background: `linear-gradient(135deg, ${brandColors.darkBlue} 0%, ${brandColors.lightDarkBlue} 100%)`,
                        "&:hover": {
                            background: `linear-gradient(135deg, ${brandColors.darkBlue} 0%, ${brandColors.lightDarkBlue} 100%)`,
                        },
                        color: "#fff",
                        fontWeight: 600,
                        textTransform: "uppercase",
                    }}
                >
                    Add New Apartment
                </Button>
            </Box>
            <TextField
                fullWidth
                placeholder="Search by unit name, number, or project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
            />

            {apartmentsLoading && <LoadingSkeleton />}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                {filteredApartments?.map((apartment: any) => (
                    <Link key={apartment.id} href={`/apartments/${apartment.id}`} style={{ textDecoration: 'none' }}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 3,
                                transition: 'all 0.2s ease-in-out'
                            }
                        }}>
                            <CardMedia
                                component="div"
                                sx={{
                                    height: 200,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${apartment.image_url}` || '/images/placeholder.jpg'}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {apartment.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {apartment.location}
                                </Typography>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    ${apartment.price.toLocaleString()}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
                                    <Typography variant="body2">
                                        {apartment.bedrooms} beds
                                    </Typography>
                                    <Typography variant="body2">
                                        {apartment.bathrooms} baths
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </Box>

            <Dialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                    resetForm();
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Add New Apartment</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Bedrooms"
                                name="bedrooms"
                                type="number"
                                value={formData.bedrooms}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                label="Bathrooms"
                                name="bathrooms"
                                type="number"
                                value={formData.bathrooms}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            label="project"
                            name="project"
                            type="text"
                            value={formData.project}
                            onChange={handleInputChange}
                        />
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                background: `linear-gradient(135deg, ${brandColors.success} 0%, ${brandColors.success} 100%)`,
                                "&:hover": {
                                    background: `linear-gradient(135deg, ${brandColors.success} 0%, ${brandColors.success} 100%)`,
                                },
                                color: "#fff",
                                fontWeight: 600,
                                textTransform: "uppercase",
                            }}
                        >
                            Upload Image
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>
                        {selectedImage && (
                            <Box sx={{ mt: 2, position: 'relative' }}>
                                <img
                                    src={selectedImage || ''}
                                    alt="Preview"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenDialog(false);
                        resetForm();
                    }}
                        sx={{ color: "#ff0000", fontWeight: 400 }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleSubmit}
                        sx={{
                            background: `linear-gradient(135deg, ${brandColors.success} 0%, ${brandColors.success} 100%)`,
                            "&:hover": {
                                background: `linear-gradient(135deg, ${brandColors.success} 0%, ${brandColors.success} 100%)`,
                            },
                            "&:disabled": {
                                background: `light-dark(rgba(239, 239, 239, 0.3), rgba(19, 1, 1, 0.3))`,
                                color: `light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3))`,
                                borderColor: `light-dark(rgba(118, 118, 118, 0.3), rgba(195, 195, 195, 0.3))`,
                            },
                            color: "#fff",
                            fontWeight: 400,
                        }}
                        disabled={!formData.title || !formData.price || !formData.image}
                    >
                        Add Apartment
                    </Button>
                </DialogActions>
            </Dialog>
        </Container >
    );
}