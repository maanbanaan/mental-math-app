export interface Settings {
    difficulty: 'easy' | 'medium' | 'hard' | 'insane';
    answerMode: 'input' | 'multiple-choice';
    gameMode: 'timed' | 'endless';
    timeLimit: number; // in seconds
}