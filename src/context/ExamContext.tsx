"use client";

import { AnswerResponse } from "@/types/answers.interface";
import { createContext, useContext, useState } from "react";


interface ExamContextType {
  results: AnswerResponse|null;
  setResults: (answers: AnswerResponse) => void; 
  setExamTitle: (title: string) => void;
  examTitle:string|null
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider = ({ children }: { children: React.ReactNode }) => {
  const [results, setResults] = useState<AnswerResponse|null>(null);
    const [examTitle, setExamTitle] = useState<string | null>(null);


  return (
    <ExamContext.Provider value={{ results, setResults , setExamTitle , examTitle }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) throw new Error("useExam must be used within ExamProvider");
  return context;
};