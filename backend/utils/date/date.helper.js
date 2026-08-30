export const validateTravelDate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        throw new Error("Travel date cannot be in the past");
    }

    return true;
};