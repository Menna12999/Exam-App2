'use client'
import AuthButton from '@/components/shared/auth-button'
import InputField from '@/components/shared/auth-input'
import { Eye, EyeOff} from 'lucide-react';
import React, { useState } from 'react'
import {  useForm } from 'react-hook-form';
import {Form} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthFeedback from '@/components/shared/auth-feedback';
import { toast } from 'sonner';
import Link from 'next/link';
import { ResetPasswordFormSchema, ResetPasswordFormType } from '@/lib/schemes/auth.schema';
import { handleResetPassword } from './_action/reset-password';
import { useSession } from 'next-auth/react';

export default function ForgetPasswordPage() {
const { data: session } = useSession()
 const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);
const email = session?.user?.email;
 
    const form = useForm({
      defaultValues: {
   
    newPassword: "",
    confirmPassword: ""
   
      },
      resolver:zodResolver(ResetPasswordFormSchema),
    });
    async function onSubmit(values: ResetPasswordFormType) {
    console.log(values);
    try{
     if (!email) {
      toast.error("Email missing!");
      return;
    }
      const response = await handleResetPassword({email,newPassword:values.newPassword});
      if(response.message == 'success'){
        toast.success('Password updated Successfully')
        setResetPasswordError(null)
      }
    }
    catch(err){
      console.log(err)
      toast.error((err as Error)?.message||'something wrong')
      setResetPasswordError((err as Error)?.message)
    }
   
  }
  return (
   <div className='flex  justify-center min-h-screen'>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[33rem] mx-auto my-36 flex flex-col gap-4 justify-center min-h-screen">
<h1 className='text-2xl font-bold text-gray-800'>Create a New Password</h1>
<p className='text-gray-400 font-mono'>Create a new strong password for your account.</p>


<div className="relative">
   <InputField control={form.control} name="newPassword" label='New Password'  placeholder="***********" type={showPassword ? "text" : "password"} />
   <button type='button' className="absolute right-3 top-11  text-gray-400" onClick={() => setShowPassword(!showPassword)}>
    {showPassword?<Eye size={20} />:<EyeOff size={20} />}
   </button>
   </div>
 <div className="relative">
   <InputField control={form.control} name="confirmPassword" label='Confirm Password'  placeholder="***********" type={showRePassword ? "text" : "password"} />
   <button type='button' className="absolute right-3 top-11  text-gray-400" onClick={() => setShowRePassword(!showRePassword)}>
    {showRePassword?<Eye size={20} />:<EyeOff size={20} />}
   </button>
   </div>




 
   {resetPasswordError&&<AuthFeedback key={crypto.randomUUID()}>{resetPasswordError}</AuthFeedback>}
      
        <AuthButton>Reset Password</AuthButton>
        <p className='text-sm font-mono text-center font-semibold'><span className='text-gray-400 '>Don’t have an account?</span> <Link href={'/register'} className='text-blue-600 hover:text-blue-800'>Create yours</Link></p>
     </form>
     </Form>
     </div>
   
  )
}
