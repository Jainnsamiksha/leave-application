import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className='bg-white p-4 flex'>
                <div className='flex items-center justify-between w-full'>
                    <Image
                        src="/logo_indira.png"
                        width={100}
                        height={50} // Adjust the height as needed
                        alt="Indira logo"
                    />
                    <ul className='text-black  flex items-center'>
                        <li className='mr-4 text-xl'>
                            <Link href='/signup'><button className='bg-green-400 text-black py-2 rounded-md w-[112px]'> Signup</button>
                               
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
