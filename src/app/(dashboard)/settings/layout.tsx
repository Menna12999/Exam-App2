import { CustomBreadcrumb } from '@/components/shared/custom-breadcrumb'
import { PageHeader } from '@/components/shared/page-header'
import { User } from 'lucide-react'
import React from 'react'
import SettingsSidebar from './_components/settings-sidebar'

export default function layout({children}:{children:React.ReactNode}) {
  return (
   <>
   <CustomBreadcrumb
           items={[
             { label: "Home", href: "/" },
             { label: "Account", href: "/settings" },
            
           ]}
         />
     <PageHeader>
        <div className="flex items-center gap-2">
          <User className="w-10 h-10" />
          <span className="text-3xl">Account</span>
        </div>
      </PageHeader>

     <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-3'>
       <SettingsSidebar/> 
        <div className='bg-white  col-span-2'>
            {children}
        </div>
       
     </div>

   </>
  )
}
