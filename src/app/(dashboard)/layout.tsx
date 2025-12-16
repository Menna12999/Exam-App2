import DashboardSidebar from '@/components/shared/dashboard-sidebar'
import React from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
     <>
          
           <DashboardSidebar/>
        
         <div className='ml-96 min-h-screen bg-[#f9fafc] '>

            {children}
         </div>
          </>
          
  )
}
