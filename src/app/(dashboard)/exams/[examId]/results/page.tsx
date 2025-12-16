"use client";

import { useExam } from "@/context/ExamContext";
import React from "react";
import { PieChart, Pie, Cell } from 'recharts';
import ExamProgress from "../../_components/exam-progress";
import { FolderSearch, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { inCorrectQuestion,Answer } from "@/types/answers.interface";


export default function ExamResults() {
  const { results, examTitle } = useExam();
  const router = useRouter();
  console.log(results);
  const correctCount = results?.correctQuestions?.length || 0;
  const wrongCount = results?.WrongQuestions?.length || 0;
  const total = correctCount + wrongCount;
const data = [
  { name: 'Correct', value: correctCount },
  { name: 'Incorrect', value: wrongCount },
];

const COLORS = ['#10b981', '#EF4444'];
  return (
    <div className="p-6 ">
      <div className="bg-white p-6 flex flex-col gap-4">
        <ExamProgress
          examTitle={examTitle || ""}
          currentIndex={total}
          totalQuestions={total}
        />
        <h1 className="text-xl font-bold text-blue-600 font-mono">Results:</h1>
        <div className="h-[32rem] p-6 overflow-y-scroll flex justify-between">
          {/* Result Summary */}

          <div className="mt-20 flex flex-col justify-center items-center">
               <PieChart width={203} height={203}>
      <Pie
        data={data}
        dataKey="value"
        innerRadius={50}
        outerRadius={80}
        startAngle={90}
        endAngle={-270}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    <div className="">
              <div className="text-sm space-y-1 font-mono ">
                
                <p className="flex items-center gap-1">
                 <span className="inline-block h-4 w-4 bg-emerald-500"></span>
                  Correct: 
                  <span className="font-bold text-green-600">
                    {correctCount}
                  </span>{" "}
                  
                </p>
                <p className="flex items-center gap-1">
                 <span className="inline-block h-4 w-4 bg-red-500"></span>

                   Incorrect: 
                  <span className="font-bold text-red-600">{wrongCount}</span>{" "}
                 
                </p>
              </div>
            </div>
</div>
            
         

          {/* Wrong Questions */}
          <div className=" w-full">
            {results?.WrongQuestions?.map((q:inCorrectQuestion) => {
              const wrongAnswer = q.answers.find(
                (a:Answer) => a.answer === q.selectedAnswer
              );

              const correctAnswer = q.answers.find(
                (a:Answer) => a.answer === q.correctAnswer
              );

              return (
                <div key={q.QID} className="p-4 space-y-3 font-mono text-blue-600">
                  <h2 className="font-semibold">{q.Question}</h2>

                  {/* Wrong Answer */}
                  {wrongAnswer && (
                    <div className="p-2 rounded bg-red-50 flex items-center gap-2">
                     <input type="radio" checked className="accent-red-600" />
                      <label className="font-medium text-red-700 w-full">
                        Your Answer: {wrongAnswer.answer}
                      </label>
                    </div>
                  )}

                  {/* Correct Answer */}
                  {correctAnswer && (
                    <div className="p-2 rounded bg-emerald-50 flex items-center gap-2">
                      <input type="radio" className="accent-green-600" />
                      <label className="font-medium text-green-700">
                        Correct Answer: {correctAnswer.answer}
                      </label>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 w-full p-6">
          <button onClick={()=>router.back()} className="flex gap-2 text-gray-800 justify-center items-center px-4 py-2 w-[483px] font-mono bg-gray-200">
            <RotateCcw className="text-gray-800 w-5 h-5"/>
            Restart</button>
         <button onClick={()=>router.push('/exams')} className="flex gap-2 text-white justify-center items-center px-4 py-2 w-[483px] font-mono bg-blue-600">
            <FolderSearch className=  "w-5 h-5"/>
            Explore</button>
        </div>
      </div>
    </div>
    
  );
}
