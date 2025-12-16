'use client'
import { X} from 'lucide-react';
import React, { useState } from 'react'

export default function AuthFeedback({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  const [visible, setVisible] = useState(true);

        
if(!visible){
    return null;
}
  return (
    <div className='bg-red-50 text-red-600 px-3 py-2 relative font-mono text-center'>
        <div onClick={() => setVisible(false)}
        className='cursor-pointer absolute -top-2 left-1/2 -translate-x-1/2 rounded-full p-1 border border-red-600 bg-white'>
           <X size={12}/>
        </div>
      
      <span className='mt-2 inline-block'> {children} </span>
    </div>
  )
}
