import { serverRequest } from "./server-request";

export const getMyBookingsServer = async () => {
    try {
        return await serverRequest({
            endpoint: "/user/bookings",
        });
    } catch (error) {
        throw error?.response?.data || error.message;
    }
};

export const getBookingByIdServer = async (bookingId) => {
    try {
        return await serverRequest({
            endpoint: `/user/bookings/${bookingId}`,
        });
    } catch (error) {
        throw error?.response?.data || error.message;
    }
};
