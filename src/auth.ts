import CredentialsProvider  from 'next-auth/providers/credentials';
import { NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { },
          password: {  },
        },
    
      authorize:async(credentials)=>{
        console.log(credentials);
        try{
          const response = await fetch (`${process.env.NEXTAUTH_API_BASE_URL}auth/signin`,{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email:credentials?.email,
              password:credentials?.password
            }),
          });

          const data = await response.json();
          console.log(data)
          if(!response.ok){
            throw new Error(data.message||'something went wrong');
          }
          const decoded = JSON.parse(atob(data.token.split('.')[1]));
          return {
            id:decoded.id,
            user:data.user,
            token:data.token
          }

        }
        catch(error){
          console.log(error)
          throw new Error((error as Error).message||'something went wrong');
        }
      },
    }),
    ],
    pages:{
      signIn:'/login'
    },
    callbacks: {
      jwt: ({ token, user }) => {
        if (user) {
          token.user = user.user;
          token.token = user.token;
        }
        return token;
      },
      session: ({ session, token }) => {
        if (token) {
          session.user = token.user;
        }
        return session;
      },
    },


};