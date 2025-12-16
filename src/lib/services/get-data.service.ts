'use server'
import { getUserToken } from "@/lib/utils/server-utils";




export default async function getData(endPoint:string){ {
 
  
     const token = await getUserToken();
  try{
     

    const res = await fetch(
      `${process.env.NEXTAUTH_API_BASE_URL}${endPoint}`,
      {
        method: "GET",
        headers: {
          token: token as string,
        },
      }
    );
    const data = await res.json();
    if(!res.ok){
      throw new Error(data?.message ||'something went wrong')
    }
    return data;

  }
  catch(error){
    console.log(error)
    throw new Error ((error as Error).message || 'something wrong')
  }
  

  
}

}