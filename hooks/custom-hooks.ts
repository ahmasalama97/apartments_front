import { useMutation, useQuery } from '@tanstack/react-query';
import { AddApartment_API, GetApartmentDetails_API, GetApartments_API, GetCategories_API, GetCategorySpecialists_API, GetHeroSectionSlides_API, GetProducts_API } from '@/apis/api';

export const useGetHeroSectionSlides = ({
    key
}: any) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => GetHeroSectionSlides_API(),
    });
};

export const useGetCategories = ({
    key
}: any) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => GetCategories_API(),
    });
};

export const useGetCategorySpecialists = ({
    key,
    category_id
}: any) => {
    return useQuery({
        queryKey: [key, category_id],
        queryFn: () => GetCategorySpecialists_API(category_id),
        enabled: !!category_id
    });
};

export const useGetProducts = ({
    key
}: any) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => GetProducts_API()
    });
};

export const useGetApartments = ({
    key
}: any) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => GetApartments_API()
    });
};

export const useGetApartmentDetails = ({
    key, id
}: any) => {
    return useQuery({
        queryKey: [key, id],
        queryFn: () => GetApartmentDetails_API(id)
    });
};

export const useAddApartmentMutation = ({
    setOpen,
    refetch
}: {
    setOpen: (val: boolean) => void;
    refetch: () => void;
}) => {
    return useMutation({
        mutationFn: async (axiosData: any) => {
            return AddApartment_API(axiosData);
        },
        onSuccess: () => {
            setOpen(false);
            refetch();
        },
        onError: (error: any) => {
            const errors = error?.response?.data?.errors;

            if (errors) {
                Object.keys(errors).forEach((field) => {
                    console.error(`${field}: ${errors[field].join(', ')}`);
                });
            } else {
                console.error(
                    error?.response?.data?.message || 'An unknown error occurred.'
                );
            }
        },
    });
};