import AuthSidebar from '@/components/shared/auth-sidebar'
import React from 'react'

export default function AuthLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
       
        <AuthSidebar/>
       <div>
        
         {children}
       </div>
        </div>
  )
}
