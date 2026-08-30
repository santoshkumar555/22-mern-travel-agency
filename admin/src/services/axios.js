import axios from "axios";

function clearAdminAuth() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRefreshToken");
    localStorage.removeItem("adminUser");
}

function redirectToLogin() {
    if (window.location.pathname !== "/") {
        window.location.href = "/";
    }
}

function isAuthError(error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message?.toLowerCase?.() || "";

    return (
        status === 401 ||
        status === 403 ||
        message.includes("invalid token") ||
        message.includes("jwt expired") ||
        message.includes("unauthorized") ||
        message.includes("forbidden") ||
        message.includes("token expired")
    );
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

function getRefreshToken() {
    return localStorage.getItem("adminRefreshToken");
}

async function fetchNewToken() {
    const refreshToken = getRefreshToken();
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
        { refreshToken }
    );
    return res.data?.data?.accessToken;
}

function applyNewToken(request, newToken) {
    localStorage.setItem("adminToken", newToken);
    request.headers.Authorization = `Bearer ${newToken}`;
}

function retryRequest(request) {
    return axiosInstance(request);
}

function handleRefreshFailure() {
    clearAdminAuth();
    redirectToLogin();
}

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers["X-client-Source"] = "admin";

        return config;
    },
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const failedRequest = error.config;

        if (isAuthError(error) && !failedRequest._retry) {
            failedRequest._retry = true;

            try {
                const newToken = await fetchNewToken();
                applyNewToken(failedRequest, newToken);
                return retryRequest(failedRequest);
            } catch {
                handleRefreshFailure();
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;