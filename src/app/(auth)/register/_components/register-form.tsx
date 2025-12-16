'use client'
import AuthButton from '@/components/shared/auth-button'
import InputField from '@/components/shared/auth-input'
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import {  useForm } from 'react-hook-form';
import {Form, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthFeedback from '@/components/shared/auth-feedback';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PhoneInput } from './phone-input';
import { RegisterFormSchema, RegisterFormType } from '@/lib/schemes/auth.schema';
import { handleRegister } from '../_actions/register.action';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
    const [registerError, setRegisterError] = useState<string | null>(null);
    const router = useRouter();
  
    const form = useForm({
      defaultValues: {
    username:"",
    firstName:"",
    lastName:"",
    email: "",
    password:"",
    rePassword:"",
    phone:""
      },
      resolver:zodResolver(RegisterFormSchema),
    });
    async function onSubmit(values: RegisterFormType) {
    console.log(values);
    try{
      const isRegistered = await handleRegister(values);
      if(isRegistered.message == 'success'){
        toast.success('Account created Successfully')
        router.push('/');
        setRegisterError(null)
      }
    }
    catch(err){
      console.log(err)
      toast.error((err as Error)?.message||'something wrong')
      setRegisterError((err as Error)?.message)
    }
   
  }
  return (
   <div className='flex  justify-center min-h-screen'>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[33rem] mx-auto my-36 flex flex-col gap-4 justify-center min-h-screen">
<h1 className='text-2xl font-bold text-gray-800'>Create Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<InputField
  control={form.control}
  name="firstName"
  label="First Name"
  placeholder="Ahmed"
/>

<InputField
  control={form.control}
  name="lastName"
  label="Last Name"
  placeholder="Abdullah"
/>

</div>
<InputField
  control={form.control}
  name="username"
  label="User Name"
  placeholder="User123"
/>
<InputField
  control={form.control}
  name="email"
  label="Email"
  placeholder="userEmail@gmail.com"
/>
<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Phone Number</FormLabel>

      <PhoneInput
        {...field}
        defaultCountry="EG"
        placeholder="101 234 5678"
      />

      <FormMessage />
    </FormItem>
  )}
/>


 <div className="relative">
   <InputField control={form.control} name="password" label='Password'  placeholder="***********" type={showPassword ? "text" : "password"} />
   <button type='button' className="absolute right-3 top-11  text-gray-400" onClick={() => setShowPassword(!showPassword)}>
    {showPassword?<Eye size={20} />:<EyeOff size={20} />}
   </button>
   </div>
 <div className="relative">
   <InputField control={form.control} name="rePassword" label='Password'  placeholder="***********" type={showRePassword ? "text" : "password"} />
   <button type='button' className="absolute right-3 top-11  text-gray-400" onClick={() => setShowRePassword(!showRePassword)}>
    {showRePassword?<Eye size={20} />:<EyeOff size={20} />}
   </button>
   </div>



 
   {registerError&&<AuthFeedback key={crypto.randomUUID()}>{registerError}</AuthFeedback>}
      
        <AuthButton>Create Account</AuthButton>
        <p className='text-sm font-mono text-center font-semibold'><span className='text-gray-400 '>Already have an account? </span> <Link href={'/login'} className='text-blue-600 hover:text-blue-800'>Login</Link></p>
     </form>
     </Form>
     </div>
   
  )
}
