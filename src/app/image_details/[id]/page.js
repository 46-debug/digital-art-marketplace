"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const Details = () => {

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [description, setDescription] = useState("");
    const [hashtags, setHashtags] = useState("");
    const [amount, setAmount] = useState("");
    const [confirmDelete, setConfirmDelete] = useState("");
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    const { id } = useParams();
    const { user } = useUser();
    const userId = user?.id;
    const router = useRouter();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await fetch(`/api/getImage/${id}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch image");
                }

                setImage(data.image);
                setDescription(data.image.description);
                setHashtags(data.image.hashtags);
                setAmount(data.image.amount);
            } catch (error) {
                console.error("Error fetching image:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [id]);

    useEffect(() => {
        setIsDeleteDisabled(confirmDelete !== "delete");
        if (
            image && // Check if image exists
            (description !== image.description ||
                hashtags !== image.hashtags ||
                amount !== image.amount)
        ) {
            setIsUpdateDisabled(false);
        } else {
            setIsUpdateDisabled(true);
        }
    }, [confirmDelete, description, hashtags, amount, image]);

    if (loading) return <p className="absolute p-5 border-b border-black text-xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">Loading...</p>;

    if (!image) return <p>Image not found.</p>;

    const formattedDate = new Date(image.updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // ----------------- Edit Details function --------------
    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/updateImage/updateData/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description, hashtags, amount }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to update image details.");
            }
            setImage(data.image)
            router.refresh()
            setShow(false);
        } catch (error) {
            console.error("Error updating image:", error);
            alert("Failed to update image details.");
        }
    };
    // ---------------------- end --------------------


    // ----------------- like function ---------------
    const handleLike = async () => {
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
            setImage(updatedImage); // Update the single image state directly
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };
    // ---------------------- end --------------------


    // ----------------- save function ---------------
    const handleSave = async (image) => {
        if (!user) {
            alert("Please log in to save images.");
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
            setImage((prevImages) =>
                prevImages.map((img) => (img._id === updatedImage._id ? updatedImage : img))
            );
        } catch (error) {
            console.error("Error updating save:", error);
        }
    };
    // ---------------------- end -----------------------


    // ----------------- delete function ------------------
    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/deleteImage`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageId: id }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to delete image.");
            }

            router.back();
        } catch (error) {
            console.error("Error deleting image:", error);
            alert("Failed to delete image.");
        }
    };
    // ---------------------- end -------------------------


    // ----------------- download function ------------------
    const handleDownload = async () => {

        if (!user) {
            alert("Please log in to download images.");
            return;
        }

        const response = await fetch(image.imageUrl);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = (image.userName + "_" + image._id + "_" + "MetaCanvas");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        try {
            const res = await fetch("/api/updateImage/updateDownload", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: image._id, userId }),
            });

            if (!res.ok) {
                throw new Error("Failed to update downloads");
            }

            const updatedImage = await res.json();
            setImage(updatedImage);
        } catch (error) {
            console.error("Error updating downloads:", error);
        }
    };
    // ---------------------- end ------------------------


    // ----------------- purchase function ------------------
    const handlePurchase = () => {
        setShowMessage(true);
    };
    // ---------------------- end ------------------------

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex justify-between px-3 items-center">
                <span className="py-2 flex items-center gap-2">
                    <img onClick={() => router.back()} src="/Assets/back.svg" alt="back icon" />
                    <Link href={`/user_profile/${image.userId}`}>
                        <span className="py-2 flex items-center text-sm sm:text-md gap-2 cursor-pointer">
                            <img className="w-8 h-8 rounded-full" src={image.userImage} alt="prifile picture" />
                            <h5 className="">{image.userName}</h5>
                        </span>
                    </Link>
                </span>

                <div className="flex gap-2">
                    <span className="px-2 py-1.5 bg-gray-200 rounded-md flex items-center font-sm text-gray-500 text-sm">Like: <span className="font-medium text-gray-700 px-1">{image.likes}</span> </span>
                    <span className="px-2 py-1.5 bg-gray-200 rounded-md flex items-center font-sm text-sm text-gray-500">Download: <span className="font-medium text-gray-700 px-1">{image.downloads}</span> </span>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <img className="max-h-screen object-cover" src={image.imageUrl} alt="xyz" />
            </div>

            <div className="flex p-3 flex-col gap-3 items-center sm:items-end">
                <div className="flex items-center justify-between px-2 w-full">
                    <h1 className={`${show ? "text-transparent" : ""} text-3xl font-semibold`}>₹ {image.amount}</h1>
                    <div className="flex gap-2 relative">
                        {userId === image.userId && <button onClick={() => setShow(!show)}
                            className={`py-2 px-4 font-semibold bg-white border shadow-sm flex hover:bg-gray-50 rounded-xl cursor-pointer`}>
                            Edit
                        </button>}

                        {!show && <button onClick={() => handleLike(image)} className={`${image.likedBy.includes(user?.id) ? "bg-red-500 border-red-500" : "bg-transparent"} py-2 px-3 flex items-center justify-center border rounded-xl`}>
                            <svg className={`${image.likedBy.includes(user?.id) ? "fill-white" : "fill-transparent"} hover:fill-[#ffff]`} width="25" height="25" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className={`${image.likedBy.includes(user?.id) ? "stroke-white" : ""} stroke-black`} d="M12.7014 6.79442L12.4481 8H13.68H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V11C21 11.1217 20.9784 11.2348 20.9336 11.353L17.9208 18.3862L17.9207 18.3862L17.9169 18.3954C17.7688 18.7508 17.4177 19 17 19H8C7.73478 19 7.48043 18.8946 7.29289 18.7071C7.10536 18.5196 7 18.2652 7 18V8C7 7.72455 7.10794 7.47628 7.29711 7.28711L13.1733 1.41087L13.5229 1.75711C13.5233 1.75751 13.5237 1.75792 13.5241 1.75833C13.6141 1.84896 13.67 1.97724 13.67 2.11C13.67 2.16039 13.6654 2.20275 13.66 2.23069L12.7014 6.79442ZM3 9V19H1V9H3Z"
                                    stroke="black" stroke-width="2" />
                            </svg>
                        </button>}

                        {!show && <button onClick={() => handleSave(image)} className={`${image.savedBy.includes(user?.id) ? "bg-green-500 border-green-500" : "bg-transparent"} py-2 px-3 flex items-center justify-center border rounded-xl`}>
                            <svg className={`${image.savedBy.includes(user?.id) ? "fill-white" : "fill-transparent"} hover:fill-[#ffff]`} width="23" height="22" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className={`${image.savedBy.includes(user?.id) ? "stroke-white" : ""} stroke-black`} d="M1 3.73263C1 2.77621 1 2.298 1.218 1.93251C1.40974 1.61116 1.71569 1.3499 2.092 1.18616C2.52 1 3.08 1 4.2 1H9.8C10.92 1 11.48 1 11.908 1.18616C12.2843 1.3499 12.5903 1.61116 12.782 1.93251C13 2.298 13 2.77621 13 3.73263V15.0944C13 15.5094 13 15.7169 12.899 15.8305C12.8554 15.8799 12.7997 15.9206 12.7358 15.9498C12.6719 15.979 12.6013 15.996 12.529 15.9996C12.362 16.0081 12.16 15.8928 11.756 15.6631L7 12.9552L2.244 15.6622C1.84 15.8928 1.638 16.0081 1.47 15.9996C1.39784 15.9958 1.32748 15.9788 1.26377 15.9496C1.20007 15.9204 1.14453 15.8798 1.101 15.8305C1 15.7169 1 15.5094 1 15.0944V3.73263Z"
                                    stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </button>}
                    </div>
                </div>

                {!show && <div className="flex items-center flex-col
            sm:relative w-full m-2 sm:w-44 cursor-pointer text-white px-2">

                    {image.userId !== user?.id && image.amount !== 0 ? (<button onClick={handlePurchase} className={`flex items-center justify-center  bg-[#408052]
            px-4 py-4 sm:rounded-xl rounded-full sm:relative w-full m-2 sm:w-44 cursor-pointer hover:bg-[#2a5e39]`}>
                        Purchase
                    </button>
                    ) : (
                        <button onClick={handleDownload} className={`flex items-center justify-center bg-[#408052]
            px-4 py-4 sm:rounded-xl rounded-full sm:relative w-full m-2 sm:w-44 cursor-pointer hover:bg-[#2a5e39]`}>
                            Download
                        </button>
                    )}

                    {showMessage && <div className="flex p-3 w-full sm:w-44 rounded-3xl sm:rounded-xl flex-col justify-center bg-red-400 gap-5">
                        <p className="text-red-100 sm:text-sm">Purchase feature is under maintenance <br />
                            you can download it for now.
                        </p>
                        <button className="p-2 rounded-full hover:bg-white hover:text-black bg-red-700 text-white" onClick={handleDownload}>Download</button>
                    </div>}
                </div>}

                {show && <div className={`border mb-20 sm:m-0 bg-stone-100 rounded-xl p-2 flex flex-col gap-2 sm:w-96 w-full`}>
                    <span className="flex gap-2 font-semibold text-gray-600">
                        <button onClick={() => setShow(!show)} className="px-2 bg-black text-white rounded">X</button>
                        <h5>Edit Details</h5>
                    </span>
                    <hr />
                    <label className="text-sm font-semibold text-gray-500">Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="rounded-lg py-1 px-2 outline-none resize-none h-20 max-h-24" />

                    <label className="text-sm font-semibold text-gray-500 my-0.5">Hashtags</label>
                    <textarea onChange={(e) => setHashtags(e.target.value)}
                        value={hashtags}
                        className="rounded-lg py-1 px-2 outline-none h-8 max-h-20" />

                    <label className="text-sm font-semibold text-gray-500 my-0.5">Price</label>
                    <input type="number" onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        className="rounded-lg py-1 px-2 outline-none h-8 resize-none" />

                    <button
                        className={`${isUpdateDisabled ? "bg-black/50 text-white/50" : "bg-black"} my-5 w-full text-white py-1.5 px-3 rounded-lg`}
                        disabled={isUpdateDisabled} onClick={handleUpdate}>Update</button>

                    <button onClick={() => setDelete(!Delete)} className="text-red-500">Delete</button>
                    {Delete && <div className={`${Delete ? "block" : "hidden"} flex flex-col gap-3`}>
                        <p>Write <strong>delete</strong> to confirm</p>
                        <input className="rounded-lg w-full p-1 outline-none" type="text"
                            onChange={(e) => setConfirmDelete(e.target.value)} value={confirmDelete}
                            placeholder="write here" />
                        <button className={`${isDeleteDisabled ? "bg-red-300" : "bg-red-500"} w-ful p-1.5 rounded-xl`} disabled={isDeleteDisabled} onClick={handleDelete}>Delete</button>
                    </div>}
                </div>}
            </div>

            {!show && <div className={`flex flex-col gap-1.5 items-start`}>
                <div className="flex items-start p-3 mx-3 sm:border-none sm:bg-transparent sm:shadow-none rounded-xl">
                    <p>{image.description}</p>
                </div>
                <div className="flex gap-2 py-3 px-6">
                    {image.hashtags?.map((tag, index) => (
                        <span key={index} className="border rounded px-2 text-gray-500 text-sm">
                            {tag}
                        </span>
                    ))}
                </div>
                <h4 className="py-2 px-3 mx-3 mb-2 text-start text-gray-500 text-sm">Published on {formattedDate}</h4>
            </div>}
        </div>
    )
};

export default Details;