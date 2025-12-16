'use client'
import AuthButton from '@/components/shared/auth-button'
import InputField from '@/components/shared/auth-input'
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import {  useForm } from 'react-hook-form';
import {Form} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormPayload, loginFormSchema } from '@/lib/schemes/auth.schema';
import { signIn } from 'next-auth/react';
import AuthFeedback from '@/components/shared/auth-feedback';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function LoginForm() {
  const router = useRouter();
  const id =crypto.randomUUID();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver:zodResolver(loginFormSchema),
  });
  async function onSubmit(values: LoginFormPayload) {
  console.log(values);
  try{
    const res = await signIn('credentials',{ ...values ,redirect:false,callbackUrl:'/' });
     console.log(res)
      if(res?.ok){
 toast.success("Login successfully",{
      position:'top-center',
    });
  router.push('/');
  }
  else{
    toast.error(res?.error||"Something went wrong",{
      position:'top-center',
    });
     setLoginError(res?.error || "Something went wrong");
  }
  }catch(err){
      console.log(err);
  }
 
}
  return (
    <div className='flex  justify-center min-h-screen'>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[33rem]  flex flex-col gap-4 justify-center min-h-screen">
<h1 className='text-2xl font-bold text-gray-800'>Login</h1>
<InputField 
  control={form.control}
  name="email"
  label="Email"
  placeholder="userEmail@gmail.com"
/>

 <div className="relative">
   <InputField control={form.control} name="password" label='Password'  placeholder="***********" type={showPassword ? "text" : "password"} />
   <button type='button' className="absolute right-3 top-11  text-gray-400" onClick={() => setShowPassword(!showPassword)}>
    {showPassword?<Eye size={20} />:<EyeOff size={20} />}
   </button>


 </div>
         <Link href={'/forget-password'} className='text-sm font-mono text-blue-600 hover:text-blue-800 ms-auto font-semibold'>Forget Your Password?</Link>
          {loginError&&<AuthFeedback key={id}>{loginError}</AuthFeedback>}

        <AuthButton>Login</AuthButton>
        <p className='text-sm font-mono text-center font-semibold'><span className='text-gray-400 '>Don’t have an account?</span> <Link href={'/register'} className='text-blue-600 hover:text-blue-800'>Create yours</Link></p>
     </form>
     </Form>
     </div>
   
  )
}
