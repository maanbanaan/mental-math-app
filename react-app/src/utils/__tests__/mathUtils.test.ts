import { decimalToFraction, parseUserAnswer, isFractionInLowestTerms } from "../mathUtils";
import { Fraction } from "fractional";

describe("parseUserAnswer", () => {
    it("parses fractional input with whitespace", () => {
        const result = parseUserAnswer(" 3 / 4 ");

        expect(result).not.toBeNull();
        expect(result?.kind).toBe("fraction");
        expect(result?.fraction?.equals(new Fraction(3, 4))).toBe(true);
        expect(result?.numeric).toBeCloseTo(0.75, 10);
        expect(result?.rawNumerator).toBe(3);
        expect(result?.rawDenominator).toBe(4);
    });

    it("parses decimal input", () => {
        const result = parseUserAnswer("-0.2");

        expect(result).not.toBeNull();
        expect(result?.kind).toBe("decimal");
        expect(result?.fraction).toBeUndefined();
        expect(result?.numeric).toBeCloseTo(-0.2, 10);
        expect(result?.rawNumerator).toBeUndefined();
        expect(result?.rawDenominator).toBeUndefined();
    });

    it("rejects invalid input", () => {
        const result = parseUserAnswer("not a number");

        expect(result).toBeNull();
    });
});

describe("decimalToFraction", () => {
    it("converts finite decimals to reduced fractions", () => {
        const fraction = decimalToFraction(-0.2);

        expect(fraction.equals(new Fraction(-1, 5))).toBe(true);
    });

    it("returns whole numbers as fractions with denominator 1", () => {
        const fraction = decimalToFraction(6);

        expect(fraction.equals(new Fraction(6, 1))).toBe(true);
    });
});

describe("isFractionInLowestTerms", () => {
    it("detects reduced fractions", () => {
        expect(isFractionInLowestTerms(3, 2)).toBe(true);
    });

    it("rejects non-reduced fractions", () => {
        expect(isFractionInLowestTerms(6, 4)).toBe(false);
    });

    it("treats zero numerator as reduced", () => {
        expect(isFractionInLowestTerms(0, 5)).toBe(true);
    });
});
