'use client'
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter()
    interface DetailData {
       
        email: string;
        password: string;
    }
    const [detailData, setDetailData] = useState<DetailData>({ email: "", password: "" });
    const [detail, setDetail] = useState<DetailData[]>([]);

    const Userdata = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/login', detailData);
    
            // Handle response data here
            console.log('Response:', response.data);
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        Userdata();
    }, []);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetailData({ ...detailData, [name]: value });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            router.replace('/user-info');
            await Userdata();
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };
    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center h-screen bg-gray-200">
                <div className=" h-[31rem] w-[45rem] max-w-md bg-white rounded-lg overflow-hidden shadow-lg p-6">

                    <h1 className="text-2xl font-semibold mb-4">Log In</h1>
                   
                    <div className="mb-4">
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                            value={detailData.email}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type='password'
                            name='password'
                            placeholder='password'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                            value={detailData.password}
                        />
                    </div>
                    
                    <button
                        className=" w-full mb-4 bg-green-400 text-black py-2 rounded-md  transition duration-300"

                    >
                       Log In
                    </button>
                    <p className='text-lg'>Don't have an account?<Link href='/login' className='ml-4 text-lg '>Sign up</Link></p>
                </div>
            </div>
        </form>
    )
}

export default Login
