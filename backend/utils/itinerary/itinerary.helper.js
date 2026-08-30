export const validateDayNumber = (day, position) => {
    const dayNumber = Number(day.day);

    const isInvalid = isNaN(dayNumber) || dayNumber < 1;

    if (isInvalid) {
        throw new Error(`Day number at position ${position} must be greater than 0`);
    }
};

export const validateDayTitle = (day, position) => {
    const title = day.title;

    const isMissing = !title || typeof title !== "string";
    
    const isTooShort = title?.trim().length < 3;

    if (isMissing || isTooShort) {
        throw new Error(
            `Day title at position ${position} must be at least 3 characters`
        );
    }
};

export const validateDayDescription = (day, position) => {
    const description = day.description;

    const isMissing = !description || typeof description !== "string";

    const isTooShort = description?.trim().length < 10;

    if (isMissing || isTooShort) {
        throw new Error(
            `Day description at position ${position} must be at least 10 characters`
        );
    }
};