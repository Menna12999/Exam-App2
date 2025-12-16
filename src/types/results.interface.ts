

export interface CorrectQuestion {
  QID: string
  Question: string
  answers: Answer[]
  correctAnswer: string
  selectedAnswer: string
}
export interface WrongQuestion {
  id: string
  question: string
  answers: string[]
  correctAnswer: string
  incorrectAnswer: string
  selectedAnswer: string
}