'use client'

import React from 'react'
import { Button } from '../ui/button'

export default function AuthButton({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) 
    
 {
  return (
    
    <Button type='submit' className='w-full  bg-blue-600 px-4 py-6 text-sm hover:bg-blue-700'>{children}</Button>
  ) 
}