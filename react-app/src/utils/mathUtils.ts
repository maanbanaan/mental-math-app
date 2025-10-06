import { Fraction } from "fractional";

export function gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

export function lcm(a: number, b: number): number {
    return Math.abs(a * b) / gcd(a, b);
}

export function decimalToFraction(decimal: number): Fraction {
    if (!Number.isFinite(decimal)) {
        throw new Error("Cannot convert non-finite number to fraction");
    }

    if (Number.isInteger(decimal)) {
        return new Fraction(decimal, 1);
    }

    const sign = Math.sign(decimal) || 1;
    const absolute = Math.abs(decimal);
    const decimalString = absolute.toString();
    const decimalIndex = decimalString.indexOf(".");

    if (decimalIndex === -1) {
        return new Fraction(sign * absolute, 1);
    }

    const scale = Math.pow(10, decimalString.length - decimalIndex - 1);
    const numerator = Math.round(absolute * scale) * sign;
    const denominator = scale;

    return new Fraction(numerator, denominator);
}

export interface ParsedAnswer {
    kind: 'fraction' | 'decimal';
    fraction?: Fraction;
    numeric?: number;
    rawNumerator?: number;
    rawDenominator?: number;
}

const FRACTION_PATTERN = /^\s*(-?\d+)\s*\/\s*(-?\d+)\s*$/;
const DECIMAL_PATTERN = /^\s*(-?(?:\d+(?:\.\d*)?|\.\d+))\s*$/;

export function parseUserAnswer(input: string): ParsedAnswer | null {
    if (!input) {
        return null;
    }

    const fractionMatch = input.match(FRACTION_PATTERN);
    if (fractionMatch) {
        let numerator = parseInt(fractionMatch[1], 10);
        let denominator = parseInt(fractionMatch[2], 10);

        if (denominator === 0) {
            return null;
        }

        if (denominator < 0) {
            numerator *= -1;
            denominator *= -1;
        }

        const fraction = new Fraction(numerator, denominator);

        return {
            kind: 'fraction',
            fraction,
            numeric: fraction.valueOf(),
            rawNumerator: numerator,
            rawDenominator: denominator,
        };
    }

    const decimalMatch = input.match(DECIMAL_PATTERN);
    if (decimalMatch) {
        const numericValue = Number(decimalMatch[1]);

        if (Number.isFinite(numericValue)) {
            return {
                kind: 'decimal',
                numeric: numericValue,
            };
        }
    }

    return null;
}

export function isFractionInLowestTerms(numerator: number, denominator: number): boolean {
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) {
        return false;
    }

    if (denominator === 0) {
        return false;
    }

    if (numerator === 0) {
        return true;
    }

    return gcd(numerator, denominator) === 1;
}