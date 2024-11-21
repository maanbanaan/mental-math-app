import React, { useState, useEffect } from 'react';
import { QuestionFactory } from '../utils/generator';
import { Fraction } from 'fractional';

const MainPage: React.FC = () => {
    const [question, setQuestion] = useState<any>(null);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');

    const generateNewQuestion = () => {
        try {
            const newQuestion = QuestionFactory.createQuestion('integer'); // or 'decimal', 'fraction', 'multiplication'
            console.log('Generated question:', newQuestion); // Add this for debugging
            setQuestion(newQuestion);
            setUserAnswer('');
            setFeedback(' ');
        } catch (error) {
            console.error('Error generating question:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!question) return;

        const numericAnswer = parseFloat(userAnswer);
        const isCorrect = question.checkAnswer(numericAnswer);
        setFeedback(isCorrect ? 'Correct!' : 'Try again!');
        if (isCorrect) {
            generateNewQuestion();
        } else {
            setUserAnswer('');
        }
    };

    // Generate first question when component mounts
    useEffect(() => {
        generateNewQuestion();
    }, []);

    if (!question) return <div>Loading...</div>;

    return (
        <div className="main-page">
            <h1>Mental Math Practice</h1>
            <div className="question-container">
                <h2>{question.toString()}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        step="any"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Enter your answer"
                    />
                    <button type="submit">Check Answer</button>
                </form>
                <button onClick={generateNewQuestion}>New Question</button>
                {feedback && <p className={feedback === 'Correct!' ? 'correct' : 'incorrect'}>{feedback}</p>}
            </div>
        </div>
    );
};

export default MainPage;