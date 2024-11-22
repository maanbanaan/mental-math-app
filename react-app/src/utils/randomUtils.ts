
export function randomInt(min: number, max: number): number {
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
}

export function randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}