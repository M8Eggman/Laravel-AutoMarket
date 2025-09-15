export const formatEuro = (value) => {
    if (typeof value !== "number") value = Number(value);
    return value.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
    });
};

export const formatPercent = (value) => {
    if (typeof value !== "number") value = Number(value);
    return value.toFixed(2) + " %";
};

export const formatNumber = (value) => {
    if (typeof value !== "number") value = Number(value);
    return value.toLocaleString("fr-FR");
};
