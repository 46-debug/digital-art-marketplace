"use client"
import React, { useState } from 'react'

const Search = () => {

    const [filter, setFilter] = useState("Images");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <div className='flex flex-col items-center w-full gap-7'>
                <div className='flex rounded-full border-2 border-transparent p-1.5 items-center pl-3 justify-between w-[92%]
         bg-white shadow hover:border-2 sm:w-3/5 hover:border-[#408052]'>
                    <input className='border-none text-sm w-[45vw] outline-none' value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                        type="text" placeholder={`Search for ${filter}`} />
                    <div className='flex items-center gap-2'>
                        <div className='text-sm'>
                            <select className='outline-none bg-transparent' onChange={(e) => setFilter(e.target.value)}>
                                <option value="Images">Images</option>
                                <option value="Artist">Artist</option>
                            </select>
                        </div>

                        <span className='bg-[#408052] p-2.5 rounded-full'>
                            <img src="/Assets/Vector.svg" alt="search icon" />
                        </span>
                    </div>
                </div>
                <div className='flex gap-3 overflow-x-scroll sm:overflow-hidden w-full items-start sm:justify-center px-3'>
                    <button onClick={(e) => { setSearchQuery(e.target.value) }}
                        value="mountain"
                        className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Mountains
                    </button>
                    <button onClick={(e) => { setSearchQuery(e.target.value) }}
                        value="mountain"
                        className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Flowers
                    </button>
                    <button onClick={(e) => { setSearchQuery(e.target.value) }}
                        value="mountain"
                        className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Wallpapers
                    </button>
                    <button onClick={(e) => { setSearchQuery(e.target.value) }}
                        value="mountain"
                        className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Skys
                    </button>
                    <button onClick={(e) => { setSearchQuery(e.target.value) }}
                        value="mountain"
                        className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Nature
                    </button>
                    <button onClick={(e) => { setSearchQuery(e.target.value) }}
                        value="mountain"
                        className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Garden
                    </button>
                    <button onClick={(e) => { setSearchQuery(e.target.value) }}
                        value="mountain"
                        className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Butterflys
                    </button>
                    <button onClick={(e) => { setSearchQuery(e.target.value) }}
                        value="mountain"
                        className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Games
                    </button>
                </div>
            </div>
        </>
    )
};

export default Search; 