"use client";
import { authClient, useSession } from '@/utils/auth-client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

const IndexPage = () => {

    const {data,error,isPending} = useSession()
    const router = useRouter()
    const logoutHandler = async()=>{
      await authClient.signOut();
      toast.success("Logout Success");
      router.push("/login");
    }

    
    if(isPending) {
      return <div>Loading...</div>
    }

    if(error){
      router.push("/login");
      return <div>Error: {error.message}</div>
    }



  return (
    <>
          <div className="w-full min-h-screen bg-teal-500 flex items-center justify-center">
            <div className="bg-white px-10 py-10 rounded-md border text-black min-w-[40%] xl:max-w-[70%] flex justify-center items-start flex-col ">
              <p className='px-10'>
              {JSON.stringify(data.user)}
              </p>

              <button
              onClick={logoutHandler}
                  className='px-10 bg-purple-800 py-2 my-2 text-white rounded-md border border-teal-500'
              >Logout</button>

            </div>
          </div>
    </>
  )
}

export default IndexPage