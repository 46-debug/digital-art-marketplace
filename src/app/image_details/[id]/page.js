"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const Deatils = ({ params }) => {

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = params; // Get the ID from the dynamic route

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch(`/api/getImage/${id}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch image");
                }

                setImage(data.image);
            } catch (error) {
                console.error("Error fetching image:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [id]);

    if (loading) return <p className="absolute p-5 border-b border-black text-xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">Loading...</p>;

    if (!image) return <p>Image not found.</p>;


    const formattedDate = new Date(image.updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex justify-between px-3 items-center">
                <span className="py-2 flex items-center gap-2">
                    <Link href="/market">
                        <img src="/Assets/back.svg" alt="back icon" />
                    </Link>
                    <Link href="/user_profile">
                        <span className="py-2 flex items-center text-sm sm:text-md gap-2 cursor-pointer">
                            <img className="w-8 h-8 rounded-full" src="/Assets/one.jpg" alt="prifile picture" />
                            <h5 className="">sumit singh</h5>
                        </span>
                    </Link>
                </span>

                <div className="flex">
                    <span className="px-2 flex items-center font-sm text-gray-500 text-sm">Views: <span className="font-medium text-gray-700 px-1 text-lg">22k</span> </span>
                    <span className="px-2 py-1 flex items-center font-sm text-sm text-gray-500">Sell: <span className="font-medium text-gray-700 px-1 text-lg">44</span> </span>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <img className="w-full object-cover sm:w-[55vw]" src={image.imageUrl} alt="xyz" />
            </div>

            <div className="flex p-3 flex-col gap-3 items-center sm:items-end">
                <div className="flex items-center justify-between px-2 w-full">
                    <h1 className="text-3xl font-semibold">₹ {image.amount}</h1>
                    <div className="flex gap-2">
                        <span className="py-2 px-4 bg-white border shadow-sm hover:bg-gray-50 rounded-xl cursor-pointer">
                            <img className="" src="/Assets/like.svg" alt="like icon" />
                        </span>

                        <span className="py-2 px-4 bg-white border shadow-sm flex hover:bg-gray-50 rounded-xl cursor-pointer">
                            <img src="/Assets/save.svg" alt="bag icon" />
                        </span>
                    </div>
                </div>

                <button className="flex items-center justify-center  bg-[#408052]
                px-4 py-4 sm:rounded-xl rounded-full sm:relative w-full m-2 sm:w-44 cursor-pointer hover:bg-[#2a5e39] text-white">
                    Purchase
                </button>
            </div>

            <div className="flex flex-col gap-1.5 items-start">
                <div className="flex items-start p-3 bg-white mx-3 border sm:border-none sm:bg-transparent sm:shadow-none rounded-xl">
                    <p>{image.description}</p>
                </div>
                <h4 className="py-2 px-3 mx-3 mb-2 text-start text-gray-500 text-sm">{image.hashtags}</h4>
                <h4 className="py-2 px-3 mx-3 mb-2 text-start text-gray-500 text-sm">Published on {formattedDate}</h4>
            </div>
        </div>
    )
};

export default Deatils;