'use client'
import { useEffect, useState } from 'react';
import LeaveApplicationForm from '../leave-form/page';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [leaveReason, setLeaveReason] = useState('');
    const [currentSection, setCurrentSection] = useState('');

    const handleLeaveRequest = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log('Leave request submitted:', leaveReason);
        setLeaveReason('');
    };
    const notify = () => toast("Wow so easy!");

    const handleLogout = () => {
        console.log('User logged out');
    };
    useEffect(() => {
        // Load user's name and email from local storage when component mounts
        const storedName = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');

        if (storedName) {
            setName(storedName);
        }

        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-gray-100">
                <ul className="mt-6">
                    <li className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${currentSection === 'Profile' ? 'bg-gray-700' : ''}`} onClick={() => setCurrentSection('Profile')}>
                        Profile
                    </li>
                    <li className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${currentSection === 'LeaveaRequest' ? 'bg-gray-700' : ''}`} onClick={() => setCurrentSection('LeaveaRequest')}>
                        Request a Leave
                    </li>
                    {/* <li className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${currentSection === 'PreviousLeaves' ? 'bg-gray-700' : ''}`} onClick={() => setCurrentSection('PreviousLeaves')}>
                        Previous Leave's
                    </li> */}
                    <li className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${currentSection === 'Logout' ? 'bg-gray-700' : ''}`} onClick={() => setCurrentSection('Logout')}>
                        Logout
                    </li>
                </ul>
            </div>
            {/* Main Content */}
            <div className=" ">
                {/* Main content */}
                {currentSection === 'Profile' && (
                    <div className="">
                        <h2 className="text-3xl font-bold mb-4">Profile</h2>
                        <div className="mb-4">
                            <label htmlFor="name" className="font-bold mb-2">Name:</label>
                            <span id="name">{name}</span>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="font-bold mb-2">Email:</label>
                            <span id="email">{email}</span>
                        </div>
                        
                    
                    </div>
                )}
                {/* Other sections */}
            
                {currentSection === 'LeaveaRequest' && (
                    <div className="">
                        {/* <h2 className="text-3xl font-bold mb-4">Request a Leave</h2> */}
                        <LeaveApplicationForm />
                    </div>
                )}
                
                {currentSection === 'Logout' && (
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-3xl font-bold mb-4">Logout</h2>
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
