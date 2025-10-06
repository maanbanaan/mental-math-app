import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { Settings } from "../types/settings";
import "../styles/SettingsModal.css";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { settings, setSettings } = useContext(SettingsContext);

    return (
        <div className={`settings-modal ${isOpen ? "open" : ""}`}>
            <div className="settings-overlay" onClick={onClose} />
            <div className="settings-container">
                <div className="settings-close-container">
                    <button onClick={onClose}>Close</button>
                </div>
                <div className="settings-content">
                <h2>Settings</h2>

                {/* <div className="setting-group">
                    <label>Difficulty (not functional yet)</label>
                    <select
                        value={settings.difficulty}
                        onChange={(e) =>
                            setSettings({
                                difficulty: e.target
                                    .value as Settings["difficulty"],
                            })
                        }
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div> */}

                {/* <div className="setting-group">
                    <label>Answer Mode (not functional yet)</label>
                    <select
                        value={settings.answerMode}
                        onChange={(e) =>
                            setSettings({
                                answerMode: e.target
                                    .value as Settings["answerMode"],
                            })
                        }
                    >
                        <option value="input">Input</option>
                        <option value="multiple-choice">Multiple Choice</option>
                    </select>
                </div> */}

                <div className="setting-group">
                    <label htmlFor="game-mode">Game Mode</label>
                    <select
                        id="game-mode"
                        value={settings.gameMode}
                        onChange={(e) =>
                            setSettings({
                                gameMode: e.target.value as Settings["gameMode"],
                            })
                        }
                    >
                        <option value="untimed">Untimed</option>
                        <option value="timed">Timed</option>
                    </select>
                </div>

                {settings.gameMode === "timed" && (
                    <div className="setting-group">
                        <label htmlFor="time-limit">Time Limit (seconds)</label>
                        <input
                            id="time-limit"
                            type="number"
                            value={settings.timeLimit}
                            onChange={(e) =>
                                setSettings({
                                    timeLimit: parseInt(e.target.value),
                                })
                            }
                            min={10}
                            max={300}
                        />
                    </div>
                )}

                <div className="setting-group checkbox-setting">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={settings.requireReducedFractions}
                            onChange={(e) =>
                                setSettings({
                                    requireReducedFractions: e.target.checked,
                                })
                            }
                        />
                        Require simplest fraction answers
                    </label>
                    <p className="setting-description">
                        When enabled, fraction responses must be reduced to lowest terms (e.g., 3/2 instead of 6/4).
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
