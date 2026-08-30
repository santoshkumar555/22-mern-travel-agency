import axiosInstance from "../axios";

export const getAllLocations = async () => {
    try {
        const res = await axiosInstance.get("/user/locations");
        return res?.data?.data || [];
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getLocationById = async (id) => {
    try {
        const res = await axiosInstance.get(`/user/locations/${id}`);
        return res?.data?.data || null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export default getAllLocations;
