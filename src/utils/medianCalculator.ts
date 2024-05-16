export const medianCalculator = (arr: Array<number>) => {
    // Not my code, just wanted a quick median calculator off of stackoverflow
    const middle = (arr.length + 1) / 2;
    const sorted = [...arr].sort((a, b) => a - b);
    const isEven = sorted.length % 2 === 0;

    return isEven ? (sorted[middle - 1.5]
        + sorted[middle - 0.5]) / 2 :
        sorted[middle - 1];
}