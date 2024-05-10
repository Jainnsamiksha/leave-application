'use client'
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
    fromDate: string;
    toDate: string;
    leaveType: string;
}

const LeaveApplicationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fromDate: '',
        toDate: '',
        leaveType: ''
    });

    useEffect(() => {
        // Fetch data from backend and set it to form data
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/leaveapplication');
            const responseData = response.data;

            // Convert backend date format to the format compatible with input type date
            const fromDate = formatDate(responseData.fromDate);
            const toDate = formatDate(responseData.toDate);

            setFormData({
                ...formData,
                fromDate: fromDate,
                toDate: toDate
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formatDate = (date: string) => {
        // Convert date format from YYYY-MM-DD to MM/DD/YYYY
        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`;
    };
    const notify = () => toast("Wow so easy!");
    

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to backend
        console.log('Form submitted:', formData);
    };

    return (
        <div className="flex justify-center items-center w-[50rem]">
    <div className="container mx-auto py-8 h-[39rem] shadow-lg rounded-lg">
        <div className='flex justify-center'>
            <h1 className="text-2xl font-semibold mb-4">Leave Application Form</h1>
        </div>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto px-8">
            <div className="mb-6">
                <label htmlFor="fromDate" className="block text-gray-700 font-bold mb-2">From Date</label>
                <input
                    type="date"
                    id="fromDate"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    className="form-input h-12 border-2 border-current rounded-lg w-full"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="toDate" className="block text-gray-700 font-bold mb-2">To Date</label>
                <input
                    type="date"
                    id="toDate"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    className="form-input h-12 border-2 border-current rounded-lg w-full"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="leaveType" className="block text-gray-700 font-bold mb-2">Leave Type</label>
                <select
                    id="leaveType"
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    className="form-select h-12 border-2 border-current rounded-lg w-full"
                    required
                >
                    <option value="">Select leave type</option>
                    <option value="Sick">Sick</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Personal">Personal</option>
                </select>
            </div>
            <div className="flex justify-center">
                <button  onClick={notify} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
        </form>
    </div>
</div>

    
    );
};

export default LeaveApplicationForm;
