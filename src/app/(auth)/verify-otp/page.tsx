'use client'
import AuthButton from '@/components/shared/auth-button'
import React, { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form';
import {Form, FormControl, FormField, FormItem,  FormMessage} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthFeedback from '@/components/shared/auth-feedback';
import { toast } from 'sonner';
import Link from 'next/link';
import { otpFormSchema, VerifyOtpType } from '@/lib/schemes/auth.schema';
import { handleVerifyOtp } from './_actions/verify-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useRouter, useSearchParams} from 'next/navigation';
import { handleForgetPassword } from '../forget-password/_actions/forget-password';
import { MoveLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';


export default function VerifyOtpPage() {

     const [verifyCodeError, setVerifyCodeError] = useState<string | null>(null);
      const { data: session } = useSession()
      const searchParams = useSearchParams();
     console.log(session);
     const router = useRouter();
     const [timer, setTimer] = useState<number>(() => {
  if (typeof window !== "undefined") {
    const savedEndTime = localStorage.getItem("otpEndTime");
    return savedEndTime ? Math.floor((Number(savedEndTime) - Date.now()) / 1000) : 60;
  }
  return 60; 
});
   
     const [isResendDisabled, setIsResendDisabled] = useState(false);
     const email = searchParams.get("email")
   
   
   
useEffect(() => {
    if (!email) {
    router.push("/forget-password");
    return;
    }
    const savedEndTime = localStorage.getItem("otpEndTime");

    if (savedEndTime) {
      const diff = Math.floor((Number(savedEndTime) - Date.now()) / 1000);
      setTimer(diff > 0 ? diff : 0);
      if (diff <= 0) localStorage.removeItem("otpEndTime");
    } else {
     const initialEndTime = Date.now() + 60 * 1000;
      localStorage.setItem("otpEndTime", JSON.stringify(initialEndTime));
      setTimer(60);
    }
  }, [email, router]);
 
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          localStorage.removeItem("otpEndTime");
          setIsResendDisabled(false); 
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

    const form = useForm({
      defaultValues: {
   
    resetCode: "",
   
      },
      resolver:zodResolver(otpFormSchema),
    });
    async function onSubmit(values: VerifyOtpType) {
    console.log(values);
    try{
      const response = await handleVerifyOtp(values);
      if(response.status == 'Success'){
        console.log(response)
        toast.success('OTP verified successfully')
        setVerifyCodeError(null)
        router.push(`/reset-password`);
      }
    }
    catch(err){
      console.log(err)
      toast.error((err as Error)?.message||'something wrong')
      setVerifyCodeError((err as Error)?.message)
    }
   
  }
    const handleResend = async () => {
        if (timer > 0) return;
          setIsResendDisabled(true);
    if (!email) {
    toast.error("Email is missing");
    return;
  }

  try {
   await handleForgetPassword({ email }); 
    toast.success("New code sent!");
   const newEndTime = Date.now() + 60 * 1000; 
      localStorage.setItem("otpEndTime", JSON.stringify(newEndTime));
      
      const diff = Math.floor((newEndTime - Date.now()) / 1000);
      setTimer(diff);

  } catch (error) {
    toast.error((error as Error)?.message||'something wrong')
  }
  };
  return (
   <div className='flex  justify-center min-h-screen'>
    
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[33rem] mx-auto my-36 flex flex-col gap-4 justify-center min-h-screen">
        <Link href={'/forget-password'} className='border-2 h-10 border-gray-200 w-10 flex justify-center items-center text-gray-800'><MoveLeft size={20}/></Link>
<h1 className='text-2xl font-bold text-gray-800'>Verify OTP</h1>
<p className='text-gray-400 font-mono'>Please enter the 6-digits code we have sent to:
      <span className="font-semibold ml-1 text-gray-800">{email}</span>
      <Link href={'/forget-password'} className='text-blue-600 ml-1 underline hover:text-blue-800'>Edit</Link>
      
</p>


   <FormField
  control={form.control}
  name="resetCode"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <InputOTP
          maxLength={6}
          value={field.value}
          onChange={field.onChange}
          
        >
          <InputOTPGroup className="w-full gap-3 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>




 <div className="text-center text-sm mt-2">
     <p className='text-gray-500 inline-block'>
                You can request another code in:</p>
            {timer > 0 ? (
              <span className="text-gray-500 font-bold ml-1">{timer}s</span>
            ) : (
            <button
  onClick={handleResend}
  type="button"
  disabled={isResendDisabled}
  className={`font-semibold ml-1 ${
    isResendDisabled
      ? "text-gray-400 cursor-not-allowed"
      : "text-blue-600 hover:text-blue-800"
  }`}
>
  Resend Code
</button>
            )}
          </div>

    {verifyCodeError&&<AuthFeedback key={crypto.randomUUID()}>{verifyCodeError}</AuthFeedback>}
 
      
        <AuthButton>Verify Code</AuthButton>
        <p className='text-sm font-mono text-center font-semibold'><span className='text-gray-400 '>Don’t have an account?</span> <Link href={'/register'} className='text-blue-600 hover:text-blue-800'>Create yours</Link></p>
     </form>
     </Form>
     </div>
   
  )
}
