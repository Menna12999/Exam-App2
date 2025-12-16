// 'use client'
// import { getUserToken } from "@/lib/utils/server-utils";
// import { ApiError } from "@/types/exams.interface";
// import { useQuery } from "@tanstack/react-query";


// export default function UseFetch(queryKey: string[], endPoint: string) {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: queryKey,
//     queryFn: getData,
//   });
//   async function getData() {
//      const token = await getUserToken();
//   try{
     

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_NEXTAUTH_API_BASE_URL}${endPoint}`,
//       {
//         method: "GET",
//         headers: {
//           token: token as string,
//         },
//       }
//     );
//     const data = await res.json();
//     if(!res.ok){
//       throw new Error((data as ApiError)?.message ||'something went wrong')
//     }
//     return data;

//   }
//   catch(error){
//     console.log(error)
//     throw new Error ((error as Error).message || 'something wrong')yar
//   }
//   }
//   return { data, isLoading, isError, error };
// }
