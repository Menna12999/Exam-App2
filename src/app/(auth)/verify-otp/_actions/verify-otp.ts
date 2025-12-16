'use server'

import { VerifyOtpType } from "@/lib/schemes/auth.schema";


export async function handleVerifyOtp(values:VerifyOtpType){
 try{
    const res = await fetch(`${process.env.NEXTAUTH_API_BASE_URL}auth/verifyResetCode`,{
      method:'POST',
      body:JSON.stringify(values),
      headers:{
        'Content-Type':'application/json'
      }
      
  })
  const finalRes = await res.json(); 
  console.log(finalRes)
  if(!res.ok){
  throw new Error (finalRes?.message||'something wrong')
  }
 
return finalRes;
   }
   catch(error){
    console.log(error)
    throw new Error ((error as Error).message || 'something wrong')
   }
}