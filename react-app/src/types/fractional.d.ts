declare module 'fractional' {
    export class Fraction {
        constructor(numerator: number, denominator: number);
        add(other: Fraction): Fraction;
        sub(other: Fraction): Fraction;
        mul(other: Fraction): Fraction;
        div(other: Fraction): Fraction;
        equals(other: Fraction): boolean;
        toString(): string;
        valueOf(): number;
    }
}