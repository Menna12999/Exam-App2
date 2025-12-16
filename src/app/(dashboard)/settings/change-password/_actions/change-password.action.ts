'use server'

import { ChangePasswordFormType } from "@/lib/schemes/auth.schema";
import { getUserToken } from "@/lib/utils/server-utils";

export async function handleChangePassword(values:ChangePasswordFormType){
    const token = await getUserToken();
 try{
    const res = await fetch(`${process.env.NEXTAUTH_API_BASE_URL}auth/changePassword`,{
      method:'PATCH',
      body:JSON.stringify(values),
      headers:{
        'Content-Type':'application/json',
         token: token as string
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