import { randomInt, randomFloat } from "./randomUtils";
import { Fraction } from "fractional";
import { lcm } from "./mathUtils";
import React from 'react';
import FractionDisplay from '../components/FractionDisplay';

enum Operator {
    ADD = "+",
    SUBTRACT = "-",
    MULTIPLY = "×",
    DIVIDE = "÷",
}

interface OperatorFunction {
    (a: number | Fraction, b: number | Fraction): number | Fraction;
}

function isNumber(value: any): value is number {
    return typeof value === "number";
}

function decimalToFraction(decimal: number): Fraction {
    const str = decimal.toString();
    let denominator = 1;

    const decimalIndex = str.indexOf(".");
    if (decimalIndex !== -1) {
        denominator = Math.pow(10, str.length - decimalIndex - 1);
        const numerator = parseInt(str.replace(".", ""));
        return new Fraction(numerator, denominator);
    }

    return new Fraction(decimal, 1);
}

const operatorFunctions: Record<Operator, OperatorFunction> = {
    [Operator.ADD]: (a, b) => {
        if (a instanceof Fraction && b instanceof Fraction) {
            return a.add(b);
        }
        if (isNumber(a) && isNumber(b)) {
            return a + b;
        }
        throw new Error("Invalid operand types");
    },
    [Operator.SUBTRACT]: (a, b) => {
        if (a instanceof Fraction && b instanceof Fraction) {
            return a.subtract(b);
        }
        if (isNumber(a) && isNumber(b)) {
            return a - b;
        }
        throw new Error("Invalid operand types");
    },
    [Operator.MULTIPLY]: (a, b) => {
        if (a instanceof Fraction && b instanceof Fraction) {
            return a.multiply(b);
        }
        if (isNumber(a) && isNumber(b)) {
            return a * b;
        }
        throw new Error("Invalid operand types");
    },
    [Operator.DIVIDE]: (a, b) => {
        if (a instanceof Fraction && b instanceof Fraction) {
            return a.divide(b);
        }
        if (isNumber(a) && isNumber(b)) {
            return a / b;
        }
        throw new Error("Invalid operand types");
    },
};

abstract class MathQuestion {
    difficulty: string;
    operand1: number | Fraction;
    operand2: number | Fraction;
    operator: Operator;
    answer: number | Fraction;

    constructor(difficulty: string = "medium") {
        this.difficulty = difficulty;
        this.operand1 = 0;
        this.operand2 = 0;
        this.operator = Operator.ADD;
        this.answer = 0;
    }

    abstract generate(): void;

    checkAnswer(userAnswer: number | Fraction): boolean {
        if (this.answer instanceof Fraction) {
            if (isNumber(userAnswer)) {
                const userFraction = decimalToFraction(userAnswer);
                return this.answer.equals(userFraction);
            }
            return (
                userAnswer instanceof Fraction && this.answer.equals(userAnswer)
            );
        }
        if (isNumber(this.answer) && isNumber(userAnswer)) {
            return Math.abs(userAnswer - this.answer) < 1e-6;
        }
        return false;
    }

    toJSX(): React.ReactNode {
        if (
            this.operand1 === undefined ||
            this.operand2 === undefined ||
            this.operator === undefined
        ) {
            return "Invalid Question";
        }

        return (
            <>
                {this.operand1 instanceof Fraction ? (
                    <FractionDisplay value={this.operand1} />
                ) : (
                    this.operand1
                )}{' '}
                {this.operator}{' '}
                {this.operand2 instanceof Fraction ? (
                    <FractionDisplay value={this.operand2} />
                ) : (
                    this.operand2
                )}{' = ?'}
            </>
        );
    }

    toString(): string {
        if (
            this.operand1 === undefined ||
            this.operand2 === undefined ||
            this.operator === undefined
        ) {
            return "Invalid Question";
        }
        return `${this.operand1} ${this.operator} ${this.operand2} = ?`;
    }
}

class IntegerAddition extends MathQuestion {
    rangeMax: number;
    negativeAnswerProb: number;

    constructor(
        difficulty: string = "medium",
        rangeMax: number = 100,
        negativeAnswerProb: number = 0.2
    ) {
        super(difficulty);
        this.rangeMax = rangeMax;
        this.negativeAnswerProb = negativeAnswerProb;
    }

    generate(): void {
        this.operand1 = randomInt(1, this.rangeMax);
        this.operand2 = randomInt(1, this.rangeMax);
        this.operator = Math.random() > 0.5 ? Operator.ADD : Operator.SUBTRACT;
        if (
            this.operator === Operator.SUBTRACT &&
            Math.random() > this.negativeAnswerProb
        ) {
            [this.operand1, this.operand2] = [
                Math.max(this.operand1, this.operand2),
                Math.min(this.operand1, this.operand2),
            ];
        }
        this.answer = operatorFunctions[this.operator](
            this.operand1,
            this.operand2
        ) as number;
    }
}

class DecimalAddition extends MathQuestion {
    negativeAnswerProb: number;

    constructor(
        difficulty: string = "medium",
        negativeAnswerProb: number = 0.2
    ) {
        super(difficulty);
        this.negativeAnswerProb = negativeAnswerProb;
    }

    generate(): void {
        const decimals1 = randomInt(1, 2);
        const decimals2 = randomInt(1, 3);
        const firstOperand = parseFloat(randomFloat(0, 10).toFixed(decimals1));
        const secondOperand = parseFloat(randomFloat(0, 5).toFixed(decimals2));

        // Randomly assign operands
        [this.operand1, this.operand2] =
            Math.random() > 0.5
                ? [firstOperand, secondOperand]
                : [secondOperand, firstOperand];

        this.operator = Math.random() > 0.5 ? Operator.ADD : Operator.SUBTRACT;
        if (
            this.operator === Operator.SUBTRACT &&
            Math.random() > this.negativeAnswerProb
        ) {
            [this.operand1, this.operand2] = [
                Math.max(this.operand1, this.operand2),
                Math.min(this.operand1, this.operand2),
            ];
        }
        this.answer = operatorFunctions[this.operator](
            this.operand1,
            this.operand2
        ) as number;
    }
}

class FractionAddition extends MathQuestion {
    hardProbability: number;

    constructor(difficulty: string = "medium", hardProbability: number = 0.2) {
        super(difficulty);
        this.hardProbability = hardProbability;
    }

    private generateFriendlyDenominators(): [number, number] {
        const baseNumbers = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15];
        let den1: number, den2: number;

        if (Math.random() < this.hardProbability) {
            den1 = randomInt(2, 10);
            den2 = randomInt(2, 10);
        } else {
            den1 = baseNumbers[randomInt(0, baseNumbers.length - 1)];
            const possibleDen2 = baseNumbers.filter(
                (n) => lcm(den1, n) < den1 * n
            );
            den2 = possibleDen2.length
                ? possibleDen2[randomInt(0, possibleDen2.length - 1)]
                : baseNumbers[randomInt(0, baseNumbers.length - 1)];
        }

        return [den1, den2];
    }

    generate(): void {
        const [den1, den2] = this.generateFriendlyDenominators();
        const num1 = randomInt(1, den1);
        const num2 = randomInt(1, den2);

        this.operand1 = new Fraction(1, 2);
        this.operand2 = new Fraction(1, 2);
        this.operator = Math.random() > 0.5 ? Operator.ADD : Operator.SUBTRACT;
        this.answer = operatorFunctions[this.operator](
            this.operand1,
            this.operand2
        ) as Fraction;
        if (this.answer.numerator == 0) {
            this.answer = 0;
        }
    }
}

class IntegerMultiplication extends MathQuestion {
    generate(): void {
        // Randomly decide which operand will be bigger
        const max = randomInt(2, 100);
        const min = randomInt(2, 12);
        [this.operand1, this.operand2] =
            Math.random() > 0.5 ? [max, min] : [min, max];
        this.operator =
            Math.random() > 0.5 ? Operator.MULTIPLY : Operator.DIVIDE;
        this.answer = operatorFunctions[Operator.MULTIPLY](
            this.operand1,
            this.operand2
        ) as number;
        if (this.operator === Operator.DIVIDE) {
            [this.operand1, this.answer] = [this.answer, this.operand1];
        }
    }
}

export class QuestionFactory {
    static readonly questionTypes: Record<
        string,
        new (difficulty: string, ...args: any[]) => MathQuestion
    > = {
        integer: IntegerAddition,
        decimal: DecimalAddition,
        fraction: FractionAddition,
        multiplication: IntegerMultiplication,
    };

    static createQuestion(
        questionType: string,
        difficulty: string = "medium",
        ...args: any[]
    ): MathQuestion {
        if (!(questionType in QuestionFactory.questionTypes)) {
            throw new Error(`Unknown question type: ${questionType}`);
        }

        const question = new QuestionFactory.questionTypes[questionType](
            difficulty,
            ...args
        );
        question.generate();
        return question;
    }

    static createRandomQuestion(
        difficulty: string = "medium",
        activeTypes?: Set<string>
    ): MathQuestion {
        const types = activeTypes 
            ? Array.from(activeTypes)
            : Object.keys(this.questionTypes);
        
        if (types.length === 0) {
            throw new Error("No question types active");
        }
        
        const randomType = types[Math.floor(Math.random() * types.length)];
        return this.createQuestion(randomType, difficulty);
    }
}
