import axiosInstance from "./axios";

export const getAllLocations = async () => {
    const res = await axiosInstance.get("/admin/locations");
    return res.data;
};

export const getLocationById = async (locationId) => {
    const res = await axiosInstance.get(`/admin/locations/${locationId}`);
    return res.data;
};

export const createLocation = async (formData) => {
    const res = await axiosInstance.post("/admin/locations", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const updateLocation = async (locationId, formData) => {
    const res = await axiosInstance.put(`/admin/locations/${locationId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const deleteLocation = async (locationId) => {
    const res = await axiosInstance.delete(`/admin/locations/${locationId}`);
    return res.data;
};