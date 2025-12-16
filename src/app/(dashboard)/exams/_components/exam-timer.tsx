"use client";

import { useEffect } from "react";
import { useTimer } from "@/hooks/shared/use-timer";
import CircularProgress from "./circular-progress";

interface ExamTimerProps {
  duration: number;
  onFinish: (spentSeconds: number) => void;
}

export default function ExamTimer({ duration, onFinish }: ExamTimerProps) {
  const totalSeconds = duration * 60;

  const { seconds, minutes, remainingSeconds, isFinished } =
    useTimer(totalSeconds);

 useEffect(() => {
  if (isFinished) {
    onFinish(totalSeconds - seconds);
  }
}, [isFinished, onFinish, seconds, totalSeconds]);

  return (
    <CircularProgress
      current={totalSeconds - seconds}
      total={totalSeconds}
      minutes={minutes}
      seconds={remainingSeconds}
    />
  );
}