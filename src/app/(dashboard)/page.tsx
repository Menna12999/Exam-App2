import { PageHeader } from '@/components/shared/page-header'
import {  GraduationCap } from 'lucide-react'
import React from 'react'
import Diplomas from './_components/diplomas'
import { CustomBreadcrumb } from '@/components/shared/custom-breadcrumb'

export default function page() {
  return (
   <>
   <CustomBreadcrumb
  items={[
    { label: "Home", href: "/" },
  ]}
/>
   <PageHeader>
     <div className="flex items-center gap-2">
          <GraduationCap className="w-10 h-10" />
          <span className='text-3xl'>Diplomas</span>
        </div>
    </PageHeader>
    <Diplomas/>
    
   </>
  )
}
