'use client';

import ProgressBar from "./progressbar";


interface ExamProgressProps {
  currentIndex: number;
  totalQuestions: number;
  examTitle: string;
}

export default function ExamProgress({
  currentIndex,
  totalQuestions,
  examTitle,
}: ExamProgressProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between font-mono text-sm text-gray-500">
        <span>Frontend Development - {examTitle}</span>
        <span>
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </div>
      <ProgressBar
        current={currentIndex}
        total={totalQuestions - 1}
      />
    </div>
  );
}