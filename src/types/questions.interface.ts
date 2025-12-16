import { Exam } from "./exams.interface"

export interface Root {
  message: string
  questions: Question[]
}

export interface Question {
  answers: Answer[]
  type: string
  _id: string
  question: string
  correct: string
  subject: string
  exam: Exam
  createdAt: string
}

export interface Answer {
  answer: string
  key: string
}