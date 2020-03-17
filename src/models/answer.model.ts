export interface Answer {
  type?: string;
  value: string;
  isCorrect: boolean;
  id: number;
  questionId: number;
  quizId: number;
}
