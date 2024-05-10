'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Signup = () => {
    const router = useRouter();

    interface DetailData {
        username: string;
        email: string;
        password: string;
    }

    const [detailData, setDetailData] = useState<DetailData>({ username: "", email: "", password: "" });

    const Userdata = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/register', detailData);
            console.log('Response:', response.data);

            // Save user's details in local storage
            localStorage.setItem('username', detailData.username);
            localStorage.setItem('email', detailData.email);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetailData({ ...detailData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            router.replace('/login');
            await Userdata();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center h-screen bg-gray-200">
                <div className="h-[31rem] w-[45rem] max-w-md bg-white rounded-lg overflow-hidden shadow-lg p-6">
                    <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
                    <div className="mb-4">
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                            value={detailData.username}
                        />
                    </div>
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
                            placeholder='Password'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            onChange={handleChange}
                            value={detailData.password}
                        />
                    </div>
                    <button
                        className="w-full mb-4 bg-green-400 text-black py-2 rounded-md transition duration-300"
                    >
                        Sign Up
                    </button>
                    <p className='text-lg'>Already have an account? <Link href='/login' className='text-lg'>Login</Link></p>
                </div>
            </div>
        </form>
    );
}

export default Signup;
