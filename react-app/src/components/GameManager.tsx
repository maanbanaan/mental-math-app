import React, { useState, useEffect } from 'react';
import QuestionContainer from './QuestionContainer';

type GameState = 'pre' | 'active' | 'post' | 'untimed';

interface GameManagerProps {
    settings: any;
    question: any;
    userAnswer: string;
    isWrong: boolean;
    isCorrect: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSkip: (e: React.MouseEvent | KeyboardEvent) => void;
    handleSubmit: (e: React.FormEvent) => void;
    score: number;
    generateNewQuestion: () => void;
    resetScore: () => void;
}

const GameManager: React.FC<GameManagerProps> = ({ settings, resetScore, generateNewQuestion, ...props }) => {
    const [gameState, setGameState] = useState<GameState>(
        settings.gameMode === 'timed' ? 'pre' : 'untimed'
    );
    const [timeRemaining, setTimeRemaining] = useState(settings.timeLimit);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'active' && settings.gameMode === 'timed') {
            timer = setInterval(() => {
                setTimeRemaining((prev: number) => {
                    if (prev <= 1) {
                        setGameState('post');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState, settings.gameMode]);

    useEffect(() => {
        if (settings.gameMode === 'timed') {
            setGameState('pre');
            setTimeRemaining(settings.timeLimit);
            resetScore();
        } else {
            setGameState('untimed');
        }
    }, [settings.gameMode, settings.timeLimit]);

    useEffect(() => {
        if (gameState === 'pre' || gameState === 'post') {
            generateNewQuestion();
        }
    }, [gameState, settings.gameMode, generateNewQuestion]);

    const startGame = () => {
        resetScore();
        setGameState('active');
        setTimeRemaining(settings.timeLimit);
    };

    return (
        <QuestionContainer
            {...props}
            gameState={gameState}
            startGame={startGame}
            timeRemaining={timeRemaining}
            timedMode={settings.gameMode === 'timed'}
            timeLimit={settings.timeLimit}
            answerMode={settings.answerMode}
        />
    );
};

export default GameManager;