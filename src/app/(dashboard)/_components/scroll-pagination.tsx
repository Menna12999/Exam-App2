"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Subject } from "@/types/subjects.interface";
import Image from "next/image";
import Link from "next/link";

interface ScrollPaginationProps {
  items: Subject[];
  perPage?: number;
}

export default function ScrollPagination({
  items,
  perPage = 4,
}: ScrollPaginationProps) {
  const [visibleCount, setVisibleCount] = useState(perPage);

  const currentItems = items.slice(0, visibleCount);

  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentItems.map((subject) => (
          <Link
            key={subject._id}
            href="/exams"
            className="relative overflow-hidden w-[363px] h-[448px] cursor-pointer"
          >
            <Image
              src={subject.icon}
              alt={subject.name}
              fill
              className="object-cover"
            />

            <div className="absolute w-[316px] h-[76px] bottom-3 left-3 right-3 bg-[#155DFC]/50 backdrop-blur-[6px]" />

            <h3 className="absolute z-40 bottom-8 left-8 text-white font-semibold font-mono">
              {subject.name}
            </h3>
          </Link>
        ))}
      </div>

      <div className="w-full flex justify-center mt-10 text-gray-600">
        <button
          onClick={() =>
            setVisibleCount(
              visibleCount === perPage ? items.length : perPage
            )
          }
          className="flex flex-col items-center gap-2 px-5 py-2 font-mono font-medium"
        >
          Scroll to view more
          <ChevronDown size={18} />
        </button>
      </div>
    </div>
  );
}
