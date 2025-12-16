'use client'
import AuthButton from '@/components/shared/auth-button'
import InputField from '@/components/shared/auth-input'
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import {  useForm } from 'react-hook-form';
import {Form} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/react';
import AuthFeedback from '@/components/shared/auth-feedback';
import { toast } from 'sonner';

import { ChangePasswordFormSchema, ChangePasswordFormType } from '@/lib/schemes/auth.schema';
import { handleChangePassword } from '../_actions/change-password.action';


export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState({
  current: false,
  new: false,
  confirm: false,
})
    const [changePasswordError, setchangePasswordError] = useState<string | null>(null);
  
    const form = useForm({
      defaultValues: {
     oldPassword:"",
    password:"",
    rePassword:""
      },
      resolver:zodResolver(ChangePasswordFormSchema),
    });
    const togglePassword = (key: keyof typeof showPassword) => {
  setShowPassword(prev => ({
    ...prev,
    [key]: !prev[key],
  }))
}
    async function onSubmit(values: ChangePasswordFormType) {
    console.log(values);
    try{
      const isRegistered = await handleChangePassword(values);
      if(isRegistered.message == 'success'){
        toast.success('password updated Successfully')
        signOut({callbackUrl: '/login'});
        setchangePasswordError(null)
      }
    }
    catch(err){
      console.log(err)
      toast.error((err as Error)?.message||'something wrong')
      setchangePasswordError((err as Error)?.message)
    }
   
  }
  return (
   <div className='flex p-6 justify-center'>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full   flex flex-col gap-4  ">
      <div className="">



 <div className="relative">
   <InputField control={form.control} name="oldPassword" label='Current Password'  placeholder="***********" type={showPassword.current ? "text" : "password"} />
   <button type='button' className="absolute right-3 top-11  text-gray-400" onClick={() => togglePassword("current")}>
    {showPassword.current?<Eye size={20} />:<EyeOff size={20} />}
   </button>
   </div>

 <div className="relative">
   <InputField control={form.control} name="password" label='New Password'  placeholder="***********" type={showPassword.new ? "text" : "password"} />
   <button type='button' className="absolute right-3 top-11  text-gray-400" onClick={() => togglePassword("new")}>
    {showPassword.new?<Eye size={20} />:<EyeOff size={20} />}
   </button>
   </div>
 <div className="relative">
   <InputField control={form.control} name="rePassword" label='Confirm New Password'  placeholder="***********" type={showPassword.confirm ? "text" : "password"} />
   <button type='button' className="absolute right-3 top-11  text-gray-400" onClick={() => togglePassword("confirm")}>
    {showPassword.confirm?<Eye size={20} />:<EyeOff size={20} />}
   </button>
   </div>


</div>
 
   {changePasswordError&&<AuthFeedback key={crypto.randomUUID()}>{changePasswordError}</AuthFeedback>}
      
        <AuthButton>Update Password</AuthButton>
     </form>
     </Form>
     </div>
   
  )
}
