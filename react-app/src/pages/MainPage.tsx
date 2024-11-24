import React, { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { QuestionFactory } from "../utils/generator";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuestionContainer from "../components/QuestionContainer";
import GameManager from "../components/GameManager";
import settingsIcon from "../images/settings-white.png";
import SettingsModal from "../components/SettingsModal";
import "../styles/MainPage.css";

const MainPage: React.FC = () => {
    const { settings } = useContext(SettingsContext);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
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

    const generateNewQuestion = React.useCallback(() => {
        try {
            const newQuestion = QuestionFactory.createRandomQuestion(
                settings.difficulty,
                activeTypes
            );
            setQuestion(newQuestion);
            setUserAnswer("");
            inputRef.current?.focus();
            console.log(newQuestion.answer)
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

    const resetScore = () => {
        setScore(0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(e.target.value);
    };

    const handleSkip = (e: React.MouseEvent | KeyboardEvent) => {
        e.preventDefault();
        generateNewQuestion();
    };

    // Generate first question when component mounts
    useEffect(() => {
        generateNewQuestion();
    }, []);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                handleSkip(e);
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [generateNewQuestion]);

    if (!question) return <div>Loading...</div>;

    return (
        <div className="main-page" style={{ position: 'relative' }}>
            <Header />
            <div className="main-content">
                <div className="title">
                    <h3></h3>
                </div>

                <GameManager
                    settings={settings}
                    question={question}
                    userAnswer={userAnswer}
                    isWrong={isWrong}
                    isCorrect={isCorrect}
                    inputRef={inputRef}
                    handleInputChange={handleInputChange}
                    handleSkip={handleSkip}
                    handleSubmit={handleSubmit}
                    score={score}
                    resetScore={resetScore}
                />

                <div className="toggle-buttons">
                    <button className="settings-button" onClick={() => setIsSettingsOpen(true)}>
                        <img src={settingsIcon} alt="Settings" />
                    </button>
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
                <div className="score">
                    {settings.gameMode === "timed" && <div>Score: {score}</div>}
                </div>
            </div>
            <Footer />
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    );
};

export default MainPage;
