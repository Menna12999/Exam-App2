'use client'
import AuthButton from '@/components/shared/auth-button'
import InputField from '@/components/shared/auth-input'
import { ArrowRight} from 'lucide-react';
import React, { useState } from 'react'
import {  useForm } from 'react-hook-form';
import {Form} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthFeedback from '@/components/shared/auth-feedback';
import { toast } from 'sonner';
import Link from 'next/link';

import { forgetPasswordFormPayload, forgetPasswordFormSchema } from '@/lib/schemes/auth.schema';
import { handleForgetPassword } from './_actions/forget-password';
import { useRouter } from 'next/navigation';


export default function ForgetPasswordPage() {
const router = useRouter();
   
const [forgetPasswordError, setForgetPasswordError] = useState<string | null>(null);
  
    const form = useForm({
      defaultValues: {
   
    email: "",
   
      },
      resolver:zodResolver(forgetPasswordFormSchema),
    });
    async function onSubmit(values: forgetPasswordFormPayload) {
    console.log(values);
    try{
    const savedEndTime = localStorage.getItem("otpEndTime");
    if (savedEndTime) {
      const diff = Math.floor((Number(savedEndTime) - Date.now()) / 1000);
      if (diff > 0) {
        toast.error(`Please wait ${diff}s before requesting a new code.`);
        router.push(`/verify-otp`);
        return;
      }
    }
      const response = await handleForgetPassword(values);
      if(response.message == 'success'){
        toast.success('OTP sent to your email')
        setForgetPasswordError(null)
        router.push(`/verify-otp`);
      }
    }
    catch(err){
      console.log(err)
      toast.error((err as Error)?.message||'something wrong')
      setForgetPasswordError((err as Error)?.message)
    }
   
  }
  return (
   <div className='flex  justify-center min-h-screen'>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[33rem] mx-auto my-36 flex flex-col gap-4 justify-center min-h-screen">
<h1 className='text-2xl font-bold text-gray-800'>Forgot Password</h1>
<p className='text-gray-400 font-mono'>Don’t worry, we will help you recover your account.</p>


<InputField
  control={form.control}
  name="email"
  label="Email"
  placeholder="userEmail@gmail.com"
/>




 
   {forgetPasswordError&&<AuthFeedback key={crypto.randomUUID()}>{forgetPasswordError}</AuthFeedback>}
      
        <AuthButton>Continue <ArrowRight/></AuthButton>
        <p className='text-sm font-mono text-center font-semibold'><span className='text-gray-400 '>Don’t have an account?</span> <Link href={'/register'} className='text-blue-600 hover:text-blue-800'>Create yours</Link></p>
     </form>
     </Form>
     </div>
   
  )
}
