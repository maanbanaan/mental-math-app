import React from "react";
import "../styles/QuestionContainer.css";
import ProgressBar from "./ProgressBar";

interface QuestionContainerProps {
    question: any;
    userAnswer: string;
    isWrong: boolean;
    isCorrect: boolean;
    timedMode: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSkip: (e: React.MouseEvent | KeyboardEvent) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const Header: React.FC<QuestionContainerProps> = ({ question, userAnswer, isWrong, isCorrect, timedMode, inputRef, handleInputChange, handleSkip, handleSubmit }) => {
    return (
        <div className="question-container">
            {timedMode && <ProgressBar remainingTime={0} totalTime={10} />}
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
