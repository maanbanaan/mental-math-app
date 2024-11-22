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

                <div className="setting-group">
                    <label>Difficulty</label>
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
                </div>

                <div className="setting-group">
                    <label>Answer Mode</label>
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
                </div>

                <div className="setting-group">
                    <label>Game Mode</label>
                    <select
                        value={settings.gameMode}
                        onChange={(e) =>
                            setSettings({
                                gameMode: e.target
                                    .value as Settings["gameMode"],
                            })
                        }
                    >
                        <option value="untimed">Untimed</option>
                        <option value="timed">Timed</option>
                    </select>
                </div>

                {settings.gameMode === "timed" && (
                    <div className="setting-group">
                        <label>Time Limit (seconds)</label>
                        <input
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
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
