"use client"
import React, { useState, useEffect } from 'react'
import Header from '@/app/Components/Header';
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";

const UserProfile = ({ params }) => {

    const [show, setShow] = useState("none");
    const [client, setClient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [grid, setGrid] = useState(false);
    const [len, setLen] = useState(0);
    const [images, setImages] = useState([]);

    const { userId } = params; // Get the ID from the dynamic route
    useEffect(() => {
        if (!userId) return;
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/user/${userId}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch user");
                }

                setImages(data.images);
                setClient(data.images[0]);
                setLen(data.images.length);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const { user } = useUser();

    if (loading) return <p className="absolute p-5 border-b border-black text-xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">Loading...</p>;

    if (!client) return <p >User not found. {userId}</p>;

    return (
        <div className='flex flex-col items-center bg-gray-50 min-h-screen'>
            <Header />

            <div className='flex flex-wrap items-start justify-start gap-5 w-full p-5'>

                <img className='w-32 h-32 rounded-full' src={`${len === 0 ? user.imageUrl : client.userImage}`} alt="profile picture" />
                <div className='min-w-48'>

                    <h1 className='font-semibold text-2xl'>{`${len === 0 ? user.fullName : client.userName}`}</h1>
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
                        Images {len}
                    </span>
                </div>

                <span className={`w-full ${len === 0 ? "hidden" : "block"} sm:hidden flex items-center justify-end px-2 py-3`}>
                    <img onClick={() => setGrid(grid => grid ? false : true)} className={`${grid ? "bg-black" : "bg-white"} p-2 border rounded-lg `} src="/Assets/grid.svg" alt="" />
                </span>

                <div className={`${grid ? "columns-2" : "columns-1"} sm:columns-2 mt-5 md:columns-3 lg:columns-5 gap-4 space-y-4`}>
                    {images.map((image) => (

                        <div key={image._id} className="sm:hover:shadow-lg px-2 border border-transparent mb-5 rounded-md overflow-hidden w-full transition-all cursor-zoom-in">
                            <Link href={`/image_details/${image._id}`} key={image._id}>
                                <img
                                    src={image.imageUrl}
                                    alt="Artwork"
                                    className="object-cover w-full h-auto sm:w-[300px]"
                                />
                            </Link>
                            <div className="flex items-center justify-between p-2">

                                <div className="flex gap-2">
                                    <button className="w-11 h-9 flex items-center justify-center border rounded-lg">
                                        <svg onClick={alert} className="hover:fill-[#3a3a3a]" width="23" height="23" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.7014 6.79442L12.4481 8H13.68H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V11C21 11.1217 20.9784 11.2348 20.9336 11.353L17.9208 18.3862L17.9207 18.3862L17.9169 18.3954C17.7688 18.7508 17.4177 19 17 19H8C7.73478 19 7.48043 18.8946 7.29289 18.7071C7.10536 18.5196 7 18.2652 7 18V8C7 7.72455 7.10794 7.47628 7.29711 7.28711L13.1733 1.41087L13.5229 1.75711C13.5233 1.75751 13.5237 1.75792 13.5241 1.75833C13.6141 1.84896 13.67 1.97724 13.67 2.11C13.67 2.16039 13.6654 2.20275 13.66 2.23069L12.7014 6.79442ZM3 9V19H1V9H3Z"
                                                stroke="#3a3a3a" stroke-width="2" />
                                        </svg>
                                    </button>
                                    <button className="w-11 h-9 flex items-center justify-center border rounded-lg">
                                        <svg className="hover:fill-[#3a3a3a]" width="20" height="20" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 3.73263C1 2.77621 1 2.298 1.218 1.93251C1.40974 1.61116 1.71569 1.3499 2.092 1.18616C2.52 1 3.08 1 4.2 1H9.8C10.92 1 11.48 1 11.908 1.18616C12.2843 1.3499 12.5903 1.61116 12.782 1.93251C13 2.298 13 2.77621 13 3.73263V15.0944C13 15.5094 13 15.7169 12.899 15.8305C12.8554 15.8799 12.7997 15.9206 12.7358 15.9498C12.6719 15.979 12.6013 15.996 12.529 15.9996C12.362 16.0081 12.16 15.8928 11.756 15.6631L7 12.9552L2.244 15.6622C1.84 15.8928 1.638 16.0081 1.47 15.9996C1.39784 15.9958 1.32748 15.9788 1.26377 15.9496C1.20007 15.9204 1.14453 15.8798 1.101 15.8305C1 15.7169 1 15.5094 1 15.0944V3.73263Z"
                                                stroke="#3a3a3a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>

                                <p className="text-2xl">₹ {image.amount}</p>
                            </div>
                        </div>
                    ))}
                    <Link className={`${len === 0 ? "block" : "hidden"} flex mt-20 flex-col text-center gap-4 text-gray-500`} href="/submit_image">
                        No images found
                        <button className='bg-blue-600 p-2 mx-10 rounded-full text-white'>Upload Image</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default UserProfile;