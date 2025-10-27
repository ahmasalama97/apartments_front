import axios from "axios";

export const GetHeroSectionSlides_API = () => {
    const axiosfetch = axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/heros`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true,
    })
    return axiosfetch
};

export const GetCategories_API = () => {
    const axiosfetch = axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true,
    })
    return axiosfetch
};

export const GetCategorySpecialists_API = (category_id: number) => {
    const axiosfetch = axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/specialists/${category_id}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true,
    })
    return axiosfetch
};

export const GetProducts_API = () => {
    const axiosfetch = axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true,
    })
    return axiosfetch
};

export const GetApartments_API = () => {
    const axiosfetch = axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/apartments`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true,
    })
    return axiosfetch
};

export const GetApartmentDetails_API = (id: any) => {
    const axiosfetch = axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/apartments/${id}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        withCredentials: true,
    })
    return axiosfetch
};


export const AddApartment_API = (axiosdata: any) => {
    const axiosfetch = axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/apartments`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: axiosdata,
    })
    return axiosfetch
}
