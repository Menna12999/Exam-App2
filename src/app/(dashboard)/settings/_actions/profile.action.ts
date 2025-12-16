'use server'

import { ProfileFormType} from "@/lib/schemes/auth.schema";
import { getUserToken } from "@/lib/utils/server-utils";


export async function handleEditProfile(values:ProfileFormType){
    const token = await getUserToken();
 try{
    const res = await fetch(`${process.env.NEXTAUTH_API_BASE_URL}auth/editProfile`,{
      method:'PUT',
      body:JSON.stringify({...values,phone:values.phone.replace(/^\+2/,'')}),
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



export async function handleDeleteAccount(){
    const token = await getUserToken();
 try{
    const res = await fetch(`${process.env.NEXTAUTH_API_BASE_URL}auth/deleteMe`,{
      method:'DELETE',
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