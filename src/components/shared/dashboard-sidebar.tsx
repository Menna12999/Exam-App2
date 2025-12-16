'use client';
import { EllipsisVertical, GraduationCap, LucideLogOut, User } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {  useSession } from "next-auth/react";
import LogOutBtn from "../ui/logout-btn";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default  function DashboardSidebar() {
  const pathName = usePathname();
  const {data:session,status} = useSession();
  return (
    <div className="w-96 h-screen bg-blue-50 border-r flex flex-col p-10 fixed top-0 left-0">
     
    <div className="flex flex-col gap-3">
          <Image src="/assets/images/logo.png" width={192} height={37} alt="logo"/>
       <div className="logo flex items-center gap-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.2 18.5996L14.4 22.0996L17.2 25.5996" fill="#155DFC" />
            <path d="M22.8 18.5996L25.6 22.0996L22.8 25.5996" fill="#155DFC" />
            <path
              d="M31.2 31.8996C31.9426 31.8996 32.6548 31.6046 33.1799 31.0795C33.705 30.5544 34 29.8422 34 29.0996V15.0996C34 14.357 33.705 13.6448 33.1799 13.1197C32.6548 12.5946 31.9426 12.2996 31.2 12.2996H20.14C19.6717 12.3042 19.2098 12.1913 18.7964 11.9711C18.3831 11.751 18.0315 11.4307 17.774 11.0396L16.64 9.35961C16.385 8.97247 16.038 8.65468 15.6299 8.43476C15.2218 8.21485 14.7656 8.09969 14.302 8.09961H8.8C8.05739 8.09961 7.3452 8.39461 6.8201 8.91971C6.295 9.44481 6 10.157 6 10.8996V29.0996C6 29.8422 6.295 30.5544 6.8201 31.0795C7.3452 31.6046 8.05739 31.8996 8.8 31.8996H31.2Z"
              fill="#155DFC"
            />
            <path
              d="M17.2 18.5996L14.4 22.0996L17.2 25.5996M22.8 18.5996L25.6 22.0996L22.8 25.5996M31.2 31.8996C31.9426 31.8996 32.6548 31.6046 33.1799 31.0795C33.705 30.5544 34 29.8422 34 29.0996V15.0996C34 14.357 33.705 13.6448 33.1799 13.1197C32.6548 12.5946 31.9426 12.2996 31.2 12.2996H20.14C19.6717 12.3042 19.2098 12.1913 18.7964 11.9711C18.3831 11.751 18.0315 11.4307 17.774 11.0396L16.64 9.35961C16.385 8.97247 16.038 8.65468 15.6299 8.43476C15.2218 8.21485 14.7656 8.09969 14.302 8.09961H8.8C8.05739 8.09961 7.3452 8.39461 6.8201 8.91971C6.295 9.44481 6 10.157 6 10.8996V29.0996C6 29.8422 6.295 30.5544 6.8201 31.0795C7.3452 31.6046 8.05739 31.8996 8.8 31.8996H31.2Z"
              stroke="white"
              strokeWidth="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span className="font-semibold text-xl text-blue-600 ">Exam App</span>
        </div>
    </div>

      <div className="flex flex-col justify-between h-screen">
        <ul className="mt-5">
        <li className={`cursor-pointer p-2 text-blue-600 font-mono text-base font-semibold ${pathName === '/' || pathName.startsWith('/exams') ? "bg-blue-100 border border-blue-500" : ""}`}>
          <Link href="/" className="flex items-center gap-2"><GraduationCap size={18} /> Diplomas</Link>
        </li>

        <li className={`cursor-pointer p-2 text-blue-600 font-mono text-base font-semibold ${pathName.startsWith( "/settings") ? "bg-blue-100 border border-blue-500" : ""}`}>
          <Link href="/settings" className="flex items-center gap-2"><User size={18} /> Account Settings</Link>
        </li>
      </ul>
 

   {status === "authenticated"?<div className="flex justify-between items-center">
    <div className="user-info flex gap-2">
     <div className="w-[54px] h-[54px] overflow-hidden">
     <Image src="/assets/images/avatar.jpg"  width={54} height={54} alt="logo"className="object-cover border border-blue-500"/>

     </div>
    <div className="flex flex-col">
    <span className="text-base font-mono font-medium text-blue-500">{session?.user?.firstName}</span>
    <span className="text-gray-500 text-base font-normal">{session?.user?.email}</span>
    </div>
    </div>
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <EllipsisVertical cursor={"pointer"}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
        <DropdownMenuItem className="flex gap-2 items-center text-gray-800 text-base font-semibold"> <User size={18} /> Account</DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center text-red-600 text-base font-semibold">
           <LucideLogOut  size={18} className="rotate-180"/> <LogOutBtn/>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
   </div>: <div className="flex items-center justify-between bg-slate-50 p-4 rounded-md animate-pulse">
      
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gray-300 rounded-md" />

        {/* Text */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-300 rounded" />
          <div className="h-3 w-40 bg-gray-200 rounded" />
        </div>
      </div>

      {/* 3 dots */}
      <div className="w-4 h-4 bg-gray-300 rounded-full" />
    </div>}
      </div>
    </div>
  )
}