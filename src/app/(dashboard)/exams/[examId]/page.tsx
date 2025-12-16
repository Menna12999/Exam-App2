
import getData from '@/lib/services/get-data.service';
import React from 'react'
import Quiz from '../_components/quiz';

export default async function QuestionsPage({ params }: { params: { examId: string } }) {
  const examId =  params.examId;
  console.log(examId)
  const questions = await getData(`questions?exam=${examId}`);
  return (
    <>
   
     <div className='p-6 h-screen'>
      <Quiz questions={questions?.questions} />
     </div>
    </>
  )
}
