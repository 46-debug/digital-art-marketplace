"use client"
import React, { useState } from 'react'
import Header from '../Components/Header';
import Search from '../Components/Search';

const UserProfile = () => {

    const [show, setShow] = useState("none");

    return (
        <div className='flex flex-col items-center bg-gray-50 min-h-screen'>
            <Header />
            <Search />

            <div className='flex flex-wrap items-start justify-start gap-5 w-full p-5'>

                <img className='w-32 h-32 rounded-full' src="/Assets/one.jpg" alt="profile picture" />
                <div className='min-w-48'>

                    <h1 className='font-semibold text-2xl'>Sumit Singh</h1>
                    <p className='text-gray-500'>Slogan</p>
                    <p className='text-gray-500'>Patna, Bihar</p>
                    <p onClick={() => setShow(show => (show === "none" ? "block" : "none"))} className='text-gray-500 w-24 cursor-pointer'>Connect ▼</p>
                    <span style={{ display: show }} className='text-gray-500 py-2 px-4 bg-white border rounded-xl shadow-sm overflow-hidden absolute'>
                        <p> Instagram</p>
                        <p> Instagram</p>
                        <p> Instagram</p>
                    </span>
                </div>
            </div>

            <div className='bg-green  w-full'>
                <div className='flex  gap-3 w-full px-5'>
                    <span className='px-2.5 py-2 bg-white border text-sm gap-1.5 items-center flex shadow-sm hover:bg-gray-100 rounded-full cursor-pointer'>
                        <img src="/Assets/photos.svg" alt="photo icon" />
                        Photos 17
                    </span>

                    <span className='px-2.5 py-2 bg-white border text-sm gap-1.5 items-center flex shadow-sm hover:bg-gray-100 rounded-full cursor-pointer'>
                        <img src="/Assets/collection.svg" alt="collection icon" />
                        Collections 2
                    </span>

                    <span className='px-2.5 py-2 transition-all bg-white border text-sm gap-2 items-center flex shadow-sm hover:bg-gray-100 rounded-full cursor-pointer'>
                        Follow Sumit
                    </span>
                </div>
                <div className='p-5 bg-white m-5 rounded-2xl'>Photos</div>
            </div>
        </div>
    )
}

export default UserProfile;