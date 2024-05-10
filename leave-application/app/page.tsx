'use client'
import React, { useEffect } from 'react'
import Signup from './signup/page'
import { useRouter } from 'next/navigation';
import Login from './login/page';
import Link from 'next/link';

const Page = () => {

    // const router = useRouter();
    // useEffect(() => {
    //     router.push('/login');
    // }, []);

    return (
        <div className="text-center mt-8 bg-cover py-12 ">
            <div className="text">
                <h1 className="text-3xl font-bold mb-4">Welcome!!</h1>
                <p className="text-lg mb-4">Welcome to this page!</p> <br></br>
                <Link href='/signup'><button className='bg-green-400 text-black py-2 rounded-md w-[112px]'> Signup</button></Link>
                <Link href='/login'><button className='bg-green-400 text-black py-2 rounded-md w-[112px]  ml-4'> Log in</button></Link>
                <div className="flex justify-center">
                </div>
            </div>
        </div>
    )
}

export default Page
