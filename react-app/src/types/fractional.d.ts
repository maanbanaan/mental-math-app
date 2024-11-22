declare module 'fractional' {
    export class Fraction {
        constructor(numerator: number, denominator: number);
        numerator: number;
        denominator: number;
        add(other: Fraction): Fraction;
        subtract(other: Fraction): Fraction;
        multiply(other: Fraction): Fraction;
        divide(other: Fraction): Fraction;
        equals(other: Fraction): boolean;
        toString(): string;
        valueOf(): number;
    }
}