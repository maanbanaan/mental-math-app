import React, { useState, useEffect } from "react";
import { QuestionFactory } from "../utils/generator";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MainPage.css";

const MainPage: React.FC = () => {
    const [question, setQuestion] = useState<any>(null);
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [activeTypes, setActiveTypes] = useState<Set<string>>(
        new Set(["integer", "decimal", "fraction", "multiplication"])
    );
    const [score, setScore] = useState<number>(0);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const toggleQuestionType = (type: string) => {
        setActiveTypes((prev) => {
            const newTypes = new Set(prev);
            if (newTypes.has(type)) {
                if (newTypes.size > 1) {
                    // Prevent deactivating all types
                    newTypes.delete(type);
                }
            } else {
                newTypes.add(type);
            }
            return newTypes;
        });
    };

    // Make generateNewQuestion depend on activeTypes
    const generateNewQuestion = React.useCallback(() => {
        console.log(activeTypes);
        try {
            const newQuestion = QuestionFactory.createRandomQuestion(
                "medium",
                activeTypes
            );
            setQuestion(newQuestion);
            setUserAnswer("");
            inputRef.current?.focus();
        } catch (error) {
            console.error("Error generating question:", error);
        }
    }, [activeTypes]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!question) return;

        const numericAnswer = parseFloat(userAnswer);
        const isCorrect = question.checkAnswer(numericAnswer);
        if (isCorrect) {
            setScore((prev) => prev + 1);
            generateNewQuestion();
            setIsCorrect(true);
            setTimeout(() => setIsCorrect(false), 150);
        } else {
            setScore((prev) => Math.max(0, prev - 1));
            setIsWrong(true);
            setTimeout(() => setIsWrong(false), 150);
            setUserAnswer("");
            inputRef.current?.focus();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(e.target.value);
    };

    // Generate first question when component mounts
    useEffect(() => {
        generateNewQuestion();
    }, []);

    // Update useEffect to include the dependency
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault(); // Prevent space from scrolling page
                generateNewQuestion();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [generateNewQuestion]);

    if (!question) return <div>Loading...</div>;

    return (
        <div className="main-page">
            <Header />
            <div className="main-content">
                <div className="title">
                    <h2>Mental Math Trainer</h2>
                </div>
                <div className="question-container">
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
                            <button onClick={generateNewQuestion}>
                                Skip (space)
                            </button>
                        </div>
                    </form>
                </div>
                <div className="toggle-buttons">
                    {Object.keys(QuestionFactory.questionTypes).map((type) => (
                        <button
                            key={type}
                            className={`type-toggle ${
                                activeTypes.has(type) ? "active" : ""
                            }`}
                            onClick={() => toggleQuestionType(type)}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="score">Score: {score}</div>
            </div>

            <Footer />
        </div>
    );
};

export default MainPage;
