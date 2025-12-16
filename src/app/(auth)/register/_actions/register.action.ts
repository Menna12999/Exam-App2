'use server'

import { RegisterFormType } from "@/lib/schemes/auth.schema";


export async function handleRegister(values:RegisterFormType){
 try{
    const res = await fetch(`${process.env.NEXTAUTH_API_BASE_URL}auth/signup`,{
      method:'POST',
      body:JSON.stringify({...values,phone:values.phone.replace(/^\+2/,'')}),
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