import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";
import React from "react";

export default function AuthSidebar() {
  return (
    <div className="relative  min-h-screen hidden lg:block overflow-hidden">
      {/******************************top circle*********************** */}
      <div className="absolute top-28 left-96 h-96 w-96 rounded-full bg-blue-400 blur-[200px]"></div>
      {/******************************bottom circle*********************** */}
      <div className="absolute -bottom-60 left-4 h-96 w-96 rounded-full bg-blue-400 blur-[200px]"></div>

      {/************************************content***************************** */}
      <div className="relative z-20 py-28 px-32">
        <div className="logo flex items-center gap-3 pb-36">
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
        <h1 className="font-bold text-3xl text-gray-800 pb-14">
          Empower your learning journey with our smart exam platform.
        </h1>
        <ul className="flex flex-col gap-9">
          <li className="flex items-start gap-5 max-w-96">
            <span className="w-9 h-9 border border-1 px-1 border-blue-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </span>
            <div>
              <h2 className="font-semibold text-xl text-blue-600 font-mono">
                Tailored Diplomas
              </h2>
              <p className="text-gray-700 font-medium font-mono">
                Choose from specialized tracks like Frontend, Backend, and
                Mobile Development.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-5 max-w-96">
            <span className="w-9 h-9 border border-1 px-1 border-blue-600 flex items-center justify-center">
              <BookOpenCheck className="w-6 h-6 text-blue-600" />
            </span>
            <div>
              <h2 className="font-semibold text-xl text-blue-600 font-mono">
                Focused Exams
              </h2>
              <p className="text-gray-700 font-medium font-mono">
                Access topic-specific tests including HTML, CSS, JavaScript, and more.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-5 max-w-96">
            <span className="w-9 h-9 border border-1 px-1 border-blue-600 flex items-center justify-center">
              <RectangleEllipsis className="w-6 h-6  text-blue-600" />
            </span>
            <div>
              <h2 className="font-semibold text-xl text-blue-600 font-mono">
                Smart Multi-Step Forms
              </h2>
              <p className="text-gray-700 font-medium font-mono">
              Choose from specialized tracks like Frontend, Backend, and Mobile Development.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
