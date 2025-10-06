import React, { createContext, useState, ReactNode } from 'react';
import { Settings } from '../types/settings';

export const defaultSettings: Settings = {
    difficulty: 'medium',
    answerMode: 'input',
    gameMode: 'untimed',
    timeLimit: 60,
    requireReducedFractions: false
};

interface SettingsContextType {
    settings: Settings;
    setSettings: (settings: Partial<Settings>) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    setSettings: () => {}
});

interface SettingsProviderProps {
    children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [settings, updateSettings] = useState<Settings>(defaultSettings);

    const setSettings = (newSettings: Partial<Settings>) => {
        updateSettings(prev => ({
            ...prev,
            ...newSettings
        }));
    };

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};