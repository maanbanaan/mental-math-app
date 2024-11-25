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
    gameState: 'pre' | 'active' | 'post' | 'untimed';
    startGame: () => void;
    timeRemaining: number;
    score: number;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSkip: (e: React.MouseEvent | KeyboardEvent) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({ 
    question, userAnswer, isWrong, isCorrect, timedMode, 
    timeRemaining, gameState, startGame, score, ...props 
}) => {
    const renderQuestion = () => (
        <>
            <h2 className={`question ${isWrong ? "wrong" : ""} ${isCorrect ? "correct" : ""}`}>
                {question.toJSX()}
            </h2>
            <form onSubmit={props.handleSubmit}>
                <input
                    ref={props.inputRef}
                    autoFocus
                    type="number"
                    step="0.001"
                    inputMode="decimal"
                    value={userAnswer}
                    onChange={props.handleInputChange}
                    placeholder="Answer"
                />
                <div className="action-buttons">
                    <button type="submit">Submit (enter)</button>
                    <button type="button" onClick={props.handleSkip}>
                        Skip (space)
                    </button>
                </div>
            </form>
        </>
    );

    return (
        <div className="question-container">
            {timedMode && <ProgressBar remainingTime={timeRemaining} totalTime={props.timeLimit} />}
            
            {timedMode && gameState === 'pre' && (
                <div className="game-controls">
                    <button onClick={startGame}>Start Game</button>
                </div>
            )}

            {(gameState === 'active' || gameState === 'untimed') && renderQuestion()}

            {timedMode && gameState === 'post' && (
                <div className="game-over">
                    <h2>Time's Up!</h2>
                    <p>Final Score: {score}</p>
                    <button onClick={startGame}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default QuestionContainer;