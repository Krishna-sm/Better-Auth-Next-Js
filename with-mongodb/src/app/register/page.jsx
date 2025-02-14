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
const RegisterPage = () => {

    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required')
    });
    const initialValues = {
        name: '',
        email: '',
        password: ''
    }

    const onSubmitHandler = async(values,helpers)=>{
        try {
            

            await authClient.signUp.email({
                email: values.email,
                password: values.password,
                name: values.name,
                callback:"/"
                
            },{
               
                onRequest: (ctx) => {
                    //show loading
                    setIsLoading(true)
                },
                onSuccess: (ctx) => {
                    //redirect to the dashboard or sign in page
                    router.push("/")
                    toast.success("Registration Successful");
                    setIsLoading(false)
                },
                onError: (ctx) => {
                    // display the error message
                    toast.error(ctx.error.message);
                    setIsLoading(false)
                },

            })
                console.log("Success registering...")

            

        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <>
       
                <div className="w-full flex items-center min-h-screen bg-teal-800 justify-center">
                        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler} >
                        <Form className=" w-[90%] xl:w-1/2 bg-white rounded-sm shadow-sm border py-10 px-5">
                            <div className="mb-3">
                                    <Field name='name' type="text" className="w-full border outline-none text-black rounded-md  caret-purple-700 py-3 px-4" placeholder='Enter Your Name '  />
                                    <ErrorMessage name='name' component={'p'} className='text-xs text-red-500' />
                            </div>
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
                        <span>Register</span>
                                 {
                                    !isLoading?   <FaArrowRight/>:
                                    <CgSpinner className='animate-spin text-2xl' />
                                 }
                                </button>
                            </div>
                            <div className="mb-3">
                            <p className="text-end text-black text-xs">
                                 Already Have An Account ?  <Link href='/login' className='text-purple-800 text-lg'>Login</Link>
                                </p>
                            </div>

                        </Form>
                        </Formik>

                </div>

    </>
  )
}

export default RegisterPage