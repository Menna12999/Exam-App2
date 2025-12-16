'use client'
import { CircleUser, Lock, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function SettingsSidebar() {
  const pathName=usePathname()
  return (
    <div className='bg-white p-6 col-span-1 h-screen flex flex-col justify-between font-mono'>
            <ul className="space-y-1 px-4">
        <li className={`cursor-pointer p-2  font-mono text-base font-semibold ${pathName === '/settings' ? "bg-blue-100 border text-blue-500 border-blue-500" : "text-gray-600"}`}>
                  <Link className="flex items-center gap-2" href={'/settings/profile'}> 
                  <CircleUser/>
              Profile
              </Link>
            </li>
        <li className={`cursor-pointer p-2  font-mono text-base font-semibold ${pathName === '/settings/change-password' ? "bg-blue-100 text-blue-500 border border-blue-500" : "text-gray-600"}`}>
            <Link className="flex items-center gap-2" href={'/settings/change-password'}> 
            <Lock/>
              Change Password</Link>
            </li>
          </ul>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex items-center gap-2 text-red-600 bg-red-50  px-4 py-2">
            <LogOut/>
          Logout
        </button>
            </div>
  )
}
