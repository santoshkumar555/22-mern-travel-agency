export const getApiErrorMessage = (
    error,
    fallback = "Something went wrong",
) => {
    const data = error?.response?.data;

    if (Array.isArray(data?.errors) && data.errors.length > 0) {
        return data.errors.map((e) => e.message || e.msg).filter(Boolean).join(", ");
    }

    return (
        data?.message ||
        data?.error ||
        error?.message ||
        fallback
    );
};