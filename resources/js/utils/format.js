export function formatEuro(value) {
    if (typeof value !== "number") value = Number(value);
    return value.toLocaleString("fr-FR", {
        style: "currency",
        currency: "EUR",
    });
}

export function formatPercent(value) {
    if (typeof value !== "number") value = Number(value);
    return value.toFixed(2) + " %";
}

export function formatNumber(value) {
    if (typeof value !== "number") value = Number(value);
    return value.toLocaleString("fr-FR");
}
