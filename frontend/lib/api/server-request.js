import axios from "axios";
import { cookies } from "next/headers";

export const serverRequest = async ({
    endpoint,
    method = "GET",
    data,
    params,
    extraHeaders = {},
}) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await axios({
        baseURL: process.env.API_BASE_URL,
        url: endpoint,
        method,
        data,
        params,
        proxy: false,
        withCredentials: true,
        headers: {
            ...extraHeaders,
            "x-client-source": "frontend",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    return response?.data?.data;
};
