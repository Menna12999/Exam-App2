import React from 'react'
import NextAuthProvider from './components/next-auth.provider'
import ReactQueryProviders from './components/react-query-provider'
import { ExamProvider } from '@/context/ExamContext'

export default function Providers({children}:{children:React.ReactNode}) {
  return (
   <NextAuthProvider>
    <ReactQueryProviders>
    <ExamProvider>
          {children}
    </ExamProvider>
        </ReactQueryProviders>
        </NextAuthProvider>
  )
}
