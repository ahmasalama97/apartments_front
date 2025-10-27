import { Apartment } from '@/types/apartment';

class ApartmentsService {
    private apiUrl = '/api/apartments';

    async getAllApartments(): Promise<Apartment[]> {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch apartments');
        }
        return response.json();
    }

    async getApartmentById(id: string): Promise<Apartment> {
        const response = await fetch(`${this.apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch apartment');
        }
        return response.json();
    }

    async searchApartments(query: string): Promise<Apartment[]> {
        const response = await fetch(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to search apartments');
        }
        return response.json();
    }
}

export const apartmentsService = new ApartmentsService();