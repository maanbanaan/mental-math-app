export interface Settings {
    difficulty: 'easy' | 'medium' | 'hard' | 'insane';
    answerMode: 'input' | 'multiple-choice';
    gameMode: 'timed' | 'untimed' | 'endless';
    timeLimit: number; // in seconds
    requireReducedFractions: boolean;
}