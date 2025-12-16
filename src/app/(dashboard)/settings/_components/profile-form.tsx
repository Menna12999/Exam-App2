'use client'
import InputField from '@/components/shared/auth-input'
import React, { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form';
import {Form, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {  signOut, useSession } from 'next-auth/react';
import AuthFeedback from '@/components/shared/auth-feedback';
import { toast } from 'sonner';
import { ProfileFormSchema, ProfileFormType } from '@/lib/schemes/auth.schema';
import { PhoneInput } from '@/app/(auth)/register/_components/phone-input';
import { handleDeleteAccount, handleEditProfile } from '../_actions/profile.action';
import { DeleteAccountModal } from './delete-modal';


export default function ProfileForm() {
    const [ProfileError, setProfileError] = useState<string | null>(null);
    const [open, setOpen] = useState(false)
    const {data:session} = useSession();
  
    const form = useForm({
      resolver:zodResolver(ProfileFormSchema),
    });
    useEffect(() => {
  if (session?.user) {
    form.reset({
      firstName: session.user.firstName ?? "",
      lastName: session.user.lastName ?? "",
      username: session.user.username ?? "",
      email: session.user.email ?? "",
      phone: session.user.phone ?? "",
    });
  }
}, [session, form]);
    async function onSubmit(values: ProfileFormType) {
    console.log(values);
    try{
      const response = await handleEditProfile(values);
      if(response.message == 'success'){
        toast.success('Account updated Successfully')
        setProfileError(null)
      }
    }
    catch(err){
      console.log(err)
      toast.error((err as Error)?.message||'something wrong')
      setProfileError((err as Error)?.message)
    }
   
  }
  async function deleteAccount() {
       try{
      const response = await handleDeleteAccount();
      if(response.message == 'success'){
        toast.success('Account Deleted Successfully')
        signOut({callbackUrl: '/login'});
        
      }
    }
    catch(err){
      console.log(err)
      toast.error((err as Error)?.message||'something wrong')
      
    }
  }
  return (
    <>
   <div className='flex  justify-center h-screen'>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-6 flex flex-col gap-4">

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


 



 
   {ProfileError&&<AuthFeedback key={crypto.randomUUID()}>{ProfileError}</AuthFeedback>}
      
        <div className="flex gap-2 font-mono">
            <button type='button'  onClick={() => setOpen(true)} className=" text-red-600 w-[331px] bg-red-50  px-4 py-2">
         
          Delete My Account
        </button>
            <button  type='submit' className="  px-4 py-2 w-[331px] font-mono bg-blue-600 text-white">
           
            Save Changes</button>
             
        </div>
     </form>
     </Form>
     </div>
      <DeleteAccountModal
        open={open}
        onClose={() => setOpen(false)}
        onDelete={() => {
          deleteAccount();
          setOpen(false)
        }}
      />
   </>
  )
}
