import React from "react";
import "../styles/QuestionContainer.css";

interface QuestionContainerProps {
    question: any;
    userAnswer: string;
    isWrong: boolean;
    isCorrect: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSkip: (e: React.MouseEvent | KeyboardEvent) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const Header: React.FC<QuestionContainerProps> = ({ question, userAnswer, isWrong, isCorrect, inputRef, handleInputChange, handleSkip, handleSubmit }) => {
    return (
        <div className="question-container">
            <div className="progress-container">
                <progress value={0.5} />
            </div>
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
