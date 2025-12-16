import { PageHeader } from '@/components/shared/page-header'
import {  BookOpenCheckIcon } from 'lucide-react'
import React from 'react'
import Exams from './_components/exams'
import { CustomBreadcrumb } from '@/components/shared/custom-breadcrumb'

export default function ExamPage() {
  return (
   <>
   <CustomBreadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Exams", href: "/exams" },
  ]}
/>
   <PageHeader>
     <div className="flex items-center gap-2">
          <BookOpenCheckIcon className="w-10 h-10" />
          <span className='text-3xl'>Exams</span>
        </div>
    </PageHeader>
    <div className="p-6">
        <Exams/>
    </div>
   </>
  )
}
