"use client";

import { Question } from "@/types/questions.interface";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ExamTimer from "./exam-timer";
import { submitExam } from "@/lib/services/submit-exam.service";
import { useExam } from "@/context/ExamContext";
import {
  CorrectQuestion,
  inCorrectQuestion,
} from "@/types/answers.interface";
import ExamProgress from "./exam-progress";


export default function Quiz({ questions }: { questions: Question[] }) {
  console.log(questions);
  const router = useRouter();
  const { setResults,setExamTitle  } = useExam();
 
  setExamTitle(questions[0].exam.title);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [qId: string]: string;
  }>({});
  const [spentTime, setSpentTime] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleAnswerSelect = (questionId: string, answerKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerKey,
    }));
  };

  const handleSubmit = async (time?: number) => {
    const payload = {
      answers: questions.map((q) => ({
        questionId: q._id,
        correct: selectedAnswers[q._id] || "",
      })),
      time: time ?? spentTime,
    };
    try {
      const result = await submitExam(payload);

      const addUserAnswers = (
        arr: (inCorrectQuestion | CorrectQuestion)[],
        originalQuestions: Question[]
      ) =>
        arr.map((q) => {
          const originalQuestion = originalQuestions.find(
            (oq) => oq._id === q.QID
          );
          if (!originalQuestion) return q;

          const selectedKey = selectedAnswers[q.QID] || "";
          const selectedAnswer =
            originalQuestion.answers.find((a) => a.key === selectedKey)
              ?.answer || "";

          return {
            ...q,
            correctAnswer:
              originalQuestion.answers.find((a) => a.key === q.correctAnswer)
                ?.answer || "",
            selectedAnswer: selectedAnswer,
            answers: originalQuestion.answers,
          };
        });

      const modifiedResult = {
        ...result,
        correctQuestions: addUserAnswers(result.correctQuestions, questions),
        WrongQuestions: addUserAnswers(result.WrongQuestions, questions),
      };

      setResults(modifiedResult);
      router.push(`/exams/${questions[0].exam._id}/results`);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const isAnswerSelected =
    selectedAnswers[currentQuestion._id] !== undefined ||
    currentIndex === questions.length - 1;

  return questions.length ? (
    <div className="p-6 bg-white flex flex-col gap-4">
      <ExamProgress
        examTitle={questions[0].exam.title}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
      />

      <h2 className="text-xl font-semibold text-blue-600 font-mono">
        {currentQuestion.question}
      </h2>

      <div className="space-y-3">
        {currentQuestion.answers.map((ans) => (
          <label
            key={ans.key}
            className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-4 cursor-pointer"
          >
            <input
              type="radio"
              name={`answer-${currentQuestion._id}`}
              checked={selectedAnswers[currentQuestion._id] === ans.key}
              onChange={() => handleAnswerSelect(currentQuestion._id, ans.key)}
              className="accent-blue-600 h-3 w-3"
            />
            {ans.answer}
          </label>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
          className="flex gap-2 justify-center items-center px-4 py-2 bg-gray-200 w-[445px] font-mono disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <ExamTimer
          duration={questions[0].exam.duration}
          onFinish={(time) => {
            setSpentTime(time);
            handleSubmit(time);
          }}
        />

        <button
          disabled={!isAnswerSelected}
          onClick={() => {
            if (currentIndex === questions.length - 1) {
              handleSubmit(spentTime);
            } else {
              setCurrentIndex((i) => i + 1);
            }
          }}
          className={`flex gap-2 justify-center items-center px-4 py-2 w-[445px] font-mono disabled:opacity-50 ${
            currentIndex === questions.length - 1
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {currentIndex === questions.length - 1 ? (
            <>Submit Answers</>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  ) : (
    <p>No questions found</p>
  );
}
