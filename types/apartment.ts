export interface Apartment {
    id: string;
    unitName: string;
    unitNumber: string;
    project: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    description: string;
    amenities: string[];
    images: string[];
    location: {
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    status: 'available' | 'rented' | 'sold';
}

export interface ApartmentFilters {
    unitName?: string;
    unitNumber?: string;
    project?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
}