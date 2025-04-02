"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from "next/navigation";
import { useUser } from '@clerk/nextjs';

const SavedImages = () => {

    const [loading, setLoading] = useState(true);
    const [grid, setGrid] = useState(false);
    const [images, setImages] = useState([]);
    const params = useParams();
    const { userId } = params;

    const { user } = useUser();

    useEffect(() => {
        if (!userId) {
            console.warn("No userId found!");
        };

        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/getSavedImages/${userId}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch user");
                }

                setImages(data.images);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <p className="absolute p-5 border-b border-black text-xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">Loading...</p>;

    // ----------------- like function ---------------
    const handleLike = async (image) => {
        if (!user) {
            alert("Please log in to like images.");
            return;
        }

        try {
            const res = await fetch("/api/updateImage/likeImage", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: image._id, userId }),
            });

            if (!res.ok) {
                throw new Error("Failed to update likes");
            }

            const updatedImage = await res.json();
            // Update UI state with new likes and likedBy list
            setImages((prevImages) =>
                prevImages.map((img) => (img._id === updatedImage._id ? updatedImage : img))
            );
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };
    // ---------------------- end -----------------------

    // ----------------- save function ---------------
    const handleSave = async (image) => {
        if (!user) {
            alert("Please log in to like images.");
            return;
        }

        try {
            const res = await fetch("/api/updateImage/saveImage", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: image._id, userId }),
            });

            if (!res.ok) {
                throw new Error("Failed to update save");
            }

            const updatedImage = await res.json();
            // Update UI state with new save and savedBy list
            setImages((prevImages) =>
                prevImages.map((img) => (img._id === updatedImage._id ? updatedImage : img))
            );
        } catch (error) {
            console.error("Error updating save:", error);
        }
    };
    // ---------------------- end -----------------------

    return (
        <div className='flex flex-col items-center bg-gray-50 min-h-screen'>

            <section className="py-5 px-2 sm:px-8">
                <h2 className="text-2xl text-gray-700 sm:mb-10 mb-5">
                    {`${images.length === 0 ? "No Saved Images" : "Saved Images"}`}
                </h2>

                {images.length !== 0 && <span className="w-full sm:hidden flex items-center justify-end px-2 py-3">
                    <img onClick={() => setGrid(grid => grid ? false : true)} className={`${grid ? "bg-black" : "bg-white"} p-2 border rounded-lg `} src="/Assets/grid.svg" alt="" />
                </span>}

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
                            <div className="sm:hidden flex sm:group-hover:flex items-center justify-between p-2 sm:absolute sm:text-white w-full bottom-0 sm:bg-[linear-gradient(180deg,_rgba(128,_128,_128,_0.00)_0%,_rgba(50,_50,_50,_0.50)_100%)]">

                                <div className="flex gap-2">
                                    <button value="like" onClick={() => handleLike(image)} className={`${image.likedBy.includes(user?.id) ? "bg-red-500 border-red-500" : "bg-transparent"} w-11 h-9 flex items-center justify-center border rounded-lg`}>
                                        <svg className={`${image.likedBy.includes(user?.id) ? "fill-white" : "fill-transparent"} hover:fill-[#ffff]`} width="23" height="23" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className={`${image.likedBy.includes(user?.id) ? "stroke-white" : ""} sm:stroke-white stroke-black`} d="M12.7014 6.79442L12.4481 8H13.68H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V11C21 11.1217 20.9784 11.2348 20.9336 11.353L17.9208 18.3862L17.9207 18.3862L17.9169 18.3954C17.7688 18.7508 17.4177 19 17 19H8C7.73478 19 7.48043 18.8946 7.29289 18.7071C7.10536 18.5196 7 18.2652 7 18V8C7 7.72455 7.10794 7.47628 7.29711 7.28711L13.1733 1.41087L13.5229 1.75711C13.5233 1.75751 13.5237 1.75792 13.5241 1.75833C13.6141 1.84896 13.67 1.97724 13.67 2.11C13.67 2.16039 13.6654 2.20275 13.66 2.23069L12.7014 6.79442ZM3 9V19H1V9H3Z"
                                                stroke="black" stroke-width="2" />
                                        </svg>
                                    </button>

                                    <button value="save" onClick={() => handleSave(image)} className={`${image.savedBy.includes(user?.id) ? "bg-green-500 border-green-500" : "bg-transparent"} w-11 h-9 flex items-center justify-center border rounded-lg`}>
                                        <svg className={`${image.savedBy.includes(user?.id) ? "fill-white" : "fill-transparent"} hover:fill-[#ffff]`} width="20" height="20" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className={`${image.savedBy.includes(user?.id) ? "stroke-white" : ""} sm:stroke-white stroke-black`} d="M1 3.73263C1 2.77621 1 2.298 1.218 1.93251C1.40974 1.61116 1.71569 1.3499 2.092 1.18616C2.52 1 3.08 1 4.2 1H9.8C10.92 1 11.48 1 11.908 1.18616C12.2843 1.3499 12.5903 1.61116 12.782 1.93251C13 2.298 13 2.77621 13 3.73263V15.0944C13 15.5094 13 15.7169 12.899 15.8305C12.8554 15.8799 12.7997 15.9206 12.7358 15.9498C12.6719 15.979 12.6013 15.996 12.529 15.9996C12.362 16.0081 12.16 15.8928 11.756 15.6631L7 12.9552L2.244 15.6622C1.84 15.8928 1.638 16.0081 1.47 15.9996C1.39784 15.9958 1.32748 15.9788 1.26377 15.9496C1.20007 15.9204 1.14453 15.8798 1.101 15.8305C1 15.7169 1 15.5094 1 15.0944V3.73263Z"
                                                stroke="#ffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>

                                <p className="text-2xl">₹ {image.amount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
};

export default SavedImages;
