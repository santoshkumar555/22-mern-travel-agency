import axiosInstance from "../axios";

export const createBooking = async (payload) => {
    try {
        const res = await axiosInstance.post("/user/bookings", payload);
        return res?.data?.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// export const getMyBookings = async () => {
//   try {
//     const res = await axiosInstance.get("/bookings");
//     return res?.data?.data || [];
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// export const getBookingById = async (bookingId) => {
//   try {
//     const res = await axiosInstance.get(`/bookings/${bookingId}`);
//     // console.log(res);
//     return res?.data?.data || [];
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

export const cancelBookingById = async (id) => {
    try {
        const res = await axiosInstance.patch(`/user/bookings/${id}/cancel`);
        return res?.data?.data || [];
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
