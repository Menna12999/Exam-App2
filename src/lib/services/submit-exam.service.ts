'use server'
import { getUserToken } from "../utils/server-utils";

export interface SubmitPayload {
  answers: { questionId: string; correct: string }[];
  time: number;
}



export async function submitExam(payload: SubmitPayload) {
  const token = await getUserToken();
try{
      const response = await fetch(`${process.env.NEXTAUTH_API_BASE_URL}questions/check`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        token: token as string
     },
    body: JSON.stringify(payload),
  });
    const data = await response.json();

  if (!response.ok) {
    throw new Error( data?.message || "Something went wrong");
  }
  return data;
}
catch(error){
  console.log(error);
  throw new Error((error as Error).message || 'something went wrong');
}


}
