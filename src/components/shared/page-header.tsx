"use client";

import { usePathname, useRouter } from "next/navigation";
import {  ChevronLeft } from "lucide-react";

export function PageHeader({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  return (

  <div className="p-6 flex gap-2">
     {!isHome && (
        <button
          onClick={() => router.back()}
          className="p-2 w-9 h-20 border border-blue-600 bg-white"
        >
          <ChevronLeft size={20} className="text-blue-600"/>
        </button>
      )}
      <div className="w-full bg-blue-600 text-white flex items-center gap-3 p-4">
      
   
     

      <h1 className="text-xl font-semibold">{children}</h1>
    </div>
  </div>
  );
}
