
export interface AnswerResponse {
  message: string
  correct: number
  wrong: number
  total: string
  WrongQuestions: inCorrectQuestion[]
  correctQuestions: CorrectQuestion[]
}

export interface CorrectQuestion {
  QID: string
  Question: string
  answers: Answer[]
  correctAnswer: string
  selectedAnswer: string
}
export interface inCorrectQuestion {
  QID: string
  Question: string
  answers: Answer[]
  correctAnswer: string
  incorrectAnswer: string
  selectedAnswer: string
}


export interface Answer {
  _id?: string
  answer: string
}


