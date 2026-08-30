export const randomPastDate = (monthsBack = 12) => {
    const now = new Date();
    const past = new Date();
    past.setMonth(past.getMonth() - monthsBack);
    return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
};

export const randomFutureDate = (minDays = 7, maxDays = 90) => {
    const d = new Date();
    d.setDate(d.getDate() + randomInt(minDays, maxDays));
    return d;
};

export const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;


export const randomItem = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];


export const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};
