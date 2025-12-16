
import getData from '@/lib/services/get-data.service';
import { Exam } from '@/types/exams.interface';
import { Timer } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function Exams() {
  const data = await getData('exams');

  return (
   <div className="space-y-4 bg-white h-screen p-6 font-mono">
      {data?.exams?.map((exam: Exam) => (
        <Link 
          href={`/exams/${exam._id}`}
          key={exam._id}
          className="flex items-center cursor-pointer justify-between  bg-blue-50 p-4"
        >
          <div>
            <h3 className="font-semibold text-blue-600">
              {exam.title}
            </h3>
            <p className="text-sm text-gray-500">
              {exam.numberOfQuestions} Questions
            </p>
          </div>

          <div className="text-sm text-gray-600 flex gap-1 items-center">
            <Timer/>
            Duration: {exam.duration} minutes
          </div>
        </Link>
      ))}
    </div>
  )
}
