"use client"
import Header from "../Components/Header";
import Search from "../Components/Search";
import Link from "next/link";
import { useState, useEffect } from "react";

const HomePage = () => {

  const [images, setImages] = useState([]);
  const [accentColor, setAccentColor] = useState(null);
  const [grid, setGrid] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/getImage`);
        if (!response.ok) throw new Error("Failed to fetch image");

        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-50">
      <Header />
      <Search />

      {/* Hero Section */}
      <section className="text-black text-center items-center flex flex-col mt-7">
        <p id="para" className="text-md mx-2 font-light">
          Browse through a curated collection of masterpieces.
        </p>
      </section>

      {/* Art Gallery */}
      <section id="gallery" className="py-5 px-2 sm:px-8">
        <h2 className="text-2xl text-gray-700 sm:mb-10">
          Featured Artworks
        </h2>

        <span onClick={() => setGrid(grid => grid ? false : true)} className="w-full sm:hidden flex items-center justify-end px-2 py-3">
          <img className={`${grid ? "bg-black" : "bg-white"} p-2 border rounded-lg `} src="/Assets/grid.svg" alt="" />
        </span>

        <div className={`${grid ? "columns-2" : "columns-1"} sm:columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4`}>
          {/* Example art pieces */}
          {images.map((image) => (
            <Link href={`/image_details/${image._id}`} key={image._id}>
              <div className="hover:shadow-lg border border-transparent mb-5 rounded-md overflow-hidden w-full transition-all cursor-zoom-in">
                <img
                  src={image.imageUrl}
                  alt="Artwork"
                  className="object-cover w-full h-auto sm:w-[300px]"
                />
                <div className="flex items-center justify-between p-2">
                  <p className="text-2xl">₹ {image.amount}</p>
                  <button className="px-3 py-2 rounded-md border bg-stone-200 hover:bg-stone-300">Purchase</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 w-full">
        <div className="text-center">
          <p>&copy; 2025 MetaCanvas. All rights reserved.</p>
          <p className="mt-2">Follow us on social media!</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
