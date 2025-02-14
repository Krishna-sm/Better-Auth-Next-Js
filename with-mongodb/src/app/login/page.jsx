"use client";
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import * as yup from 'yup'
import {FaArrowRight} from 'react-icons/fa'
import {CgSpinner} from 'react-icons/cg'
import { authClient } from '@/utils/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const LoginPage = () => {

    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const validationSchema = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required')
    });
    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmitHandler = async(values,helpers)=>{
        try {
            setIsLoading(true)

          const {data,error} =  await authClient.signIn.email({
                email: values.email,
                password: values.password,
                callback:"/"
                
            })

            if(error){
                toast.error(error.message);
                return;
            }

               router.push("/");

            

        } catch (error) {
            toast.error(error.message);
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <>
       
                <div className="w-full flex items-center min-h-screen bg-teal-800 justify-center">
                        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler} >
                        <Form className=" w-[90%] xl:w-1/2 bg-white rounded-sm shadow-sm border py-10 px-5">
                    
                            <div className="mb-3">
                                    <Field name='email' type="text" className="w-full border outline-none text-black rounded-md  caret-purple-700 py-3 px-4" placeholder='Enter Your EMail Address '  />
                                    <ErrorMessage name='email' component={'p'} className='text-xs text-red-500' />
                            </div>
                            <div className="mb-3">
                                    <Field name='password' type="password" className="w-full border outline-none text-black rounded-md  caret-purple-700 py-3 px-4" placeholder='Enter Your Password '  />
                                    <ErrorMessage name='password' component={'p'} className='text-xs text-red-500' />
                            </div>
                            <div className="mb-3">
                                <button disabled={isLoading} type='submit' className="w-full bg-purple-700 text-white rounded-md py-3 px-4 hover:bg-purple-800 focus:outline-none flex disabled:bg-purple-950 justify-center  gap-x-2 items-center">
                        <span>Login</span>
                                 {
                                    !isLoading?   <FaArrowRight/>:
                                    <CgSpinner className='animate-spin text-2xl' />
                                 }
                                </button>
                            </div>

                            <div className="mb-3">
                                <p className="text-end text-black text-xs">
                                  Don{"'"}t Have An Account ?  <Link className='text-purple-700 text-lg' href='/register'>Register</Link>
                                </p>
                            </div>

                        </Form>
                        </Formik>

                </div>

    </>
  )
}

export default LoginPage