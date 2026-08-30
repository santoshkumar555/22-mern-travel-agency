import axiosInstance from "../axios";

export const getHotels = async (params = {}) => {
    try {
        const res = await axiosInstance.get("/user/hotels", { params });
        return res?.data?.data || { hotels: [], pagination: {} };
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getHotelById = async (id) => {
    try {
        const res = await axiosInstance.get(`/user/hotels/${id}`);
        return res?.data?.data || null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
