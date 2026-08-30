import axiosInstance from "../axios";

export const getAllPackagesSearchData = async () => {
    try {
        const res = await axiosInstance.get("/user/packages/search_data");
        return res?.data?.data?.packages || res?.data?.data || [];
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const getPackages = async (params = {}) => {
    try {
        const res = await axiosInstance.get("/user/packages", { params });
        return res?.data?.data || { packages: [], pagination: {} };
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const getFeaturedPackages = async () => {
    try {
        const res = await axiosInstance.get("/user/packages/featured");
        return res?.data?.data || [];
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const getPackageById = async (id) => {
    try {
        const res = await axiosInstance.get(`/user/packages/${id}`);
        return res?.data?.data || null;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
