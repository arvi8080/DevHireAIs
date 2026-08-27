export interface QuizQuestionDto {
    id: number;
    questionText: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
    category: string;
}

export interface ScreeningQuizRequest {
    jobTitle: string;
    jobDescription: string;
    skills: string[];
}

export interface ScreeningQuizResponse {
    quizId: string;
    jobTitle: string;
    questions: QuizQuestionDto[];
}

export interface QuizAnswerDto {
    questionId: number;
    selectedOptionIndex: number;
}

export interface GradeQuizRequest {
    jobTitle: string;
    answers: QuizAnswerDto[];
}

export interface QuestionResultDto {
    questionId: number;
    questionText: string;
    selectedOptionIndex: number;
    correctOptionIndex: number;
    isCorrect: boolean;
    explanation: string;
}

export interface GradeQuizResponse {
    score: number;
    totalQuestions: number;
    percentage: number;
    feedback: string;
    results: QuestionResultDto[];
}
