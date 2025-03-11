"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";
import Image from 'next/image';
import { SignOutButton } from "@clerk/nextjs";

const UserProfile = ({ params }) => {

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
        
            <div className='flex flex-wrap items-center justify-start gap-5 w-full p-5 px-2 sm:px-8'>
                <img className='w-32 h-32 rounded-[25px]' src={`${len === 0 ? user.imageUrl : client.userImage}`} alt="profile picture" />
                <h1 className='font-semibold text-2xl'>{`${len === 0 ? user.fullName : client.userName}`}</h1>
            </div>

            <div>
                <div className='flex justify-between w-full px-2 sm:px-8'>
                    <span className='px-2.5 py-2 bg-white border text-sm gap-1.5 items-center flex shadow-sm hover:bg-gray-100 rounded-full cursor-pointer'>
                        <img src="/Assets/photos.svg" alt="photo icon" />
                        Images {len}
                    </span>

                    <SignOutButton>
                        <button className={`text-center px-3 rounded-xl hover:bg-red-100 text-red-600`}>
                            Logout
                        </button>
                    </SignOutButton>
                </div>

                <section className="py-5 px-2 sm:px-8">

                    <span className="w-full sm:hidden flex items-center justify-end px-2 py-3">
                        <img onClick={() => setGrid(grid => grid ? false : true)} className={`${grid ? "bg-black" : "bg-white"} p-2 border rounded-lg `} src="/Assets/grid.svg" alt="" />
                    </span>

                    <div className={`${grid ? "columns-2" : "columns-1"} sm:columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4`}>
                        {/* Art pieces */}
                        {images.map((image) => (

                            <div className="group sm:hover:shadow-lg relative rounded-xl mb-5 overflow-hidden w-full transition-all cursor-zoom-in">
                                <Link
                                    className="sm:hidden flex sm:group-hover:flex sm:absolute sm:text-white px-2 items-center w-full gap-2 cursor-pointer sm:bg-[linear-gradient(180deg,_rgba(50,_50,_50,_0.50)_0%,_rgba(128,_128,_128,_0.00)_100%)]"
                                    href={`/user_profile/${image.userId}`}>
                                    <img className="w-7 my-2 rounded-lg" src={image.userImage} alt="user image" />
                                    <h5>{image.userName}</h5>
                                </Link>
                                <Link href={`/image_details/${image._id}`} key={image._id}>
                                    <Image
                                        src={image.imageUrl}
                                        width={500}
                                        height={0}
                                        alt="Artwork"
                                        className="object-cover rounded-xl w-full sm:w-[300px] h-auto"
                                    />
                                </Link>
                                <div className="sm:hidden flex sm:group-hover:flex items-center justify-end p-2 sm:absolute sm:text-white w-full bottom-0 sm:bg-[linear-gradient(180deg,_rgba(128,_128,_128,_0.00)_0%,_rgba(50,_50,_50,_0.50)_100%)]">
                                    <p className="text-2xl">₹ {image.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
};

export default UserProfile;