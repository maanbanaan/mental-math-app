import React from "react";
import "../styles/QuestionContainer.css";
import ProgressBar from "./ProgressBar";

interface QuestionContainerProps {
    answerMode: 'input' | 'multiple-choice';
    question: any;
    userAnswer: string;
    isWrong: boolean;
    isCorrect: boolean;
    timedMode: boolean;
    timeLimit: number;
    inputRef: React.RefObject<HTMLInputElement>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSkip: (e: React.MouseEvent | KeyboardEvent) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const Header: React.FC<QuestionContainerProps> = ({ question, userAnswer, isWrong, isCorrect, timedMode, timeLimit, inputRef, handleInputChange, handleSkip, handleSubmit }) => {
    return (
        <div className="question-container">
            {timedMode && <ProgressBar remainingTime={timeLimit} totalTime={timeLimit} />}
            <h2
                className={`question ${isWrong ? "wrong" : ""} ${
                    isCorrect ? "correct" : ""
                }`}
            >
                {question.toJSX()}
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    autoFocus
                    type="number"
                    step="0.001"
                    inputMode="decimal"
                    value={userAnswer}
                    onChange={handleInputChange}
                    placeholder="Answer"
                />
                <div className="action-buttons">
                    <button type="submit">Submit (enter)</button>
                    <button type="button" onClick={handleSkip}>
                        Skip (space)
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Header;
