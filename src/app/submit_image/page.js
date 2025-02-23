"use client"
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

const FormPage = () => {
    // For ui
    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [currentHashtag, setCurrentHashtag] = useState('');
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [amount, setAmount] = useState("");
    const [show, setShow] = useState({ "input": "block", "img": "none" });
    const [jpeg, setJpeg] = useState("");
    const [upload, setUpload] = useState();
    const [showUploading, setShowUploading] = useState("hidden");
    const [success, setSuccess] = useState("hidden");

    // hashtags handle
    const handleAddHashtag = () => {
        if (hashtags.length < 5) {
            if (currentHashtag.trim() !== '') {
                setHashtags([...hashtags, currentHashtag.trim()]);
                setCurrentHashtag('');
            }
        }
    };
    const handleRemoveHashtag = (index) => {
        setHashtags(hashtags.filter((_, i) => i !== index));
    };

    const displayImage = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].type === "image/jpeg") {
                setFile(e.target.files[0]);
                setImage(URL.createObjectURL(e.target.files[0]));
                setShow({ input: "none", img: "block" });
                setJpeg("");
            } else {
                setJpeg("Please select (jpeg, jpg) file only");
            }
        }
    };

    const onImageUpload = async (e) => {
        e.preventDefault();

        if (!image) return alert("Please select an image");
        setShowUploading("block");

        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("description", description);
            formData.append("hashtags", hashtags);
            formData.append("amount", amount);

            // Upload image with progress tracking
            const uploadPromise = axios.post("/api/uploadImage", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: ({ loaded, total }) => {
                    const progress = Math.floor((loaded / total) * 100)
                    setUpload(progress);

                    if (progress === 100) {
                        setSuccess("block");
                    }
                },
            });

            await uploadPromise;

        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 sm:bg-white py-2">

            {/* show uploading */}
            <div className={`absolute ${showUploading} z-10 top-0 bg-green-500/80 text-white h-full w-full flex items-center justify-center`}>
                <h1 className='text-6xl p-4 bg-green-700 rounded-xl'>{upload}%</h1>
            </div>

            {/* success page */}
            <div className={`absolute ${success} z-10 top-0 bg-white h-full w-full flex flex-col items-center justify-center`}>
                <p className='mb-20'>Image Uploaded successfully <span className='text-2xl'>🎉</span></p>
                <h1 className='text-2xl/4 text-center text-gray-700'>Congratulations
                    <span className='text-[#408052] text-3xl'> Sumit,</span> <br /> <br /> Welcome to the team.
                </h1>
                <div className='flex gap-5 mt-20 items-center'>
                    <Link href="/user_profile">
                        <button className='p-1.5 pl-3 hover:border-blue-500 border rounded-full flex items-center gap-2'>Visit profile
                            <img className='p-1.5 h-8 bg-blue-600 rounded-full' src="/Assets/aero.svg" alt="" />
                        </button>
                    </Link>
                    <Link href="/market">
                        <h1 className='text-gray-600 hover:text-blue-600 hover:underline'>Home</h1>
                    </Link>
                </div>
                <img src="" alt="" />
            </div>

            <form className="rounded-lg w-[95%] flex flex-col sm:w-[500px]">

                {/* Image Upload */}
                <div className="mb-4">
                    <div>
                        <input
                            id='image'
                            type="file"
                            accept="image/jpeg"
                            onChange={displayImage}
                            required
                            className="hidden w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <label style={{ display: show.input }} onClick={displayImage} htmlFor="image">
                            <div className='flex flex-col items-center justify-center bg-gray-100 p-5 sm:w-[500px] sm:h-[230px] gap-2 rounded-lg'>
                                <img src="/Assets/add_img.svg" alt="add image" />
                                <p className='text-sm text-gray-500'>Drag and drop or <strong className='text-blue-500'>Browse</strong>  from system</p>
                                <p className='text-sm text-gray-500'>File type <strong>JPEG</strong> only</p>
                                <p className='text-sm text-gray-500'>Minimum upload size <strong>4 MB</strong></p>
                                <p className='text-sm text-gray-500'>Maximum upload size <strong>12 MB</strong></p>
                            </div>
                        </label>
                        <div style={{ display: show.img }} className='flex items-center relative justify-center overflow-hidden'>
                            <button type='button' onClick={() => { setShow((prev) => ({ input: "block", img: "none" })), setImage(null) }}
                                className='w-7 h-7 flex items-center justify-center bg-white/50 absolute right-2 top-2 rounded-full'>
                                <img src="/Assets/close.svg" alt="" /></button>
                            <img className='w-[500px] h-[230px] object-cover rounded-lg' src={image} alt="" />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div style={{ display: show.img }} className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <div className='p-[3px] relative transition-all rounded-xl border'>
                        <div className="flex items-end transition-colors bg-white p-2 rounded-lg flex-col gap-2">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add a description..."
                                className="w-full bg-transparent resize-none border-gray-300 rounded outline-none h-28"
                            />
                        </div>
                    </div>
                </div>

                {/* Hashtags */}
                <div style={{ display: show.img }} className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Add Hashtags
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={currentHashtag}
                            onChange={(e) => setCurrentHashtag(e.target.value)}
                            placeholder="#Example"
                            className="w-full p-2 border border-gray-300 rounded-full outline-none"
                        />
                        <button
                            type="button"
                            onClick={handleAddHashtag}
                            className="px-4 py-2 bg-green-100 font-semibold text-green-800 rounded-full hover:bg-green-200">
                            Add
                        </button>
                    </div>
                    <div className="mt-2">
                        {hashtags.map((hashtag, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center bg-gray-200 text-gray-800 text-sm rounded-full px-3 py-1 m-1"
                            >
                                <span>#{hashtag}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveHashtag(index)}
                                    className="ml-2 text-slate-500 hover:text-red-700">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* amount */}
                <div style={{ display: show.img }} className='flex flex-col gap-2 mb-4'>
                    <label className=' text-gray-700 font-medium'>
                        Amount
                    </label>
                    <input className='p-2 border outline-none w-full rounded-full' type="number" placeholder='Enter Amount' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                </div>

                {/* Submit Button */}
                <button style={{ display: show.img }}
                    onClick={onImageUpload}
                    className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-700">
                    Upload
                </button>
                <strong className='text-red-500 font-semibold text-center'>{jpeg}</strong>
                <Link href="./market">
                    <button className="w-full text-slate-400 border border-transparent text-sm mt-3 py-2 rounded-full hover:border-red-200 hover:border">
                        Cancel
                    </button>
                </Link>
            </form>
        </div>
    );
};

export default FormPage;

