"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

const HomePage = () => {

  const [images, setImages] = useState([]);
  const [grid, setGrid] = useState(false);
  const [filter, setFilter] = useState("description");
  const [searchQuery, setSearchQuery] = useState("");
  const [massage, setMassage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/getImage`);
        if (!response.ok) {
          throw new Error("Failed to fetch image")
        }

        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  const { user } = useUser();
  const userId = user?.id;

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
      setImages((prevImages) =>
        prevImages.map((img) => (img._id === updatedImage._id ? updatedImage : img))
      );
    } catch (error) {
      console.error("Error updating save:", error);
    }
  };
  // ---------------------- end -----------------------

  const filtered = images
    ? images.filter((img) =>
      img[filter]?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  useEffect(() => {
    if (filter === "description") {
      setMassage(filtered.length === 0 ? `No image found of ${searchQuery}` : "")
    } else {
      setMassage(filtered.length === 0 ? "No artist found" : "")
    };
  }, [filtered]);

  return (
    <div className="flex flex-col items-center">

      {/* ------------------- search ----------------------- */}
      <div className="w-full flex flex-col items-center gap-7">
        <div className='flex rounded-full border-2 p-1.5 items-center pl-3 justify-between w-[92%]
         bg-white hover:border-2 sm:w-3/5 hover:border-[#408052]'>
          <input className='border-none text-sm w-[45vw] outline-none' value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value) }}
            type="text" placeholder='Search images' />
          <div className='flex items-center gap-2'>
            {/* <div className='text-sm'>
              <select className='outline-none bg-transparent' onChange={(e) => setFilter(e.target.value)}>
                <option value="description">Images</option>
                <option value="userName">Artist</option>
              </select>
            </div> */}

            <span className='bg-[#408052] p-2.5 rounded-full'>
              <img src="/Assets/Vector.svg" alt="search icon" />
            </span>
          </div>
        </div>

        <div className='flex gap-3 overflow-x-scroll scrollbar-hidden sm:overflow-hidden w-full items-start sm:justify-center px-3'>
          <button onClick={(e) => { setSearchQuery(e.target.value) }}
            value="mountain"
            className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Mountains
          </button>
          <button onClick={(e) => { setSearchQuery(e.target.value) }}
            value="flower"
            className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Flowers
          </button>
          <button onClick={(e) => { setSearchQuery(e.target.value) }}
            value="wallpaper"
            className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Wallpapers
          </button>
          <button onClick={(e) => { setSearchQuery(e.target.value) }}
            value="sky"
            className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Skys
          </button>
          <button onClick={(e) => { setSearchQuery(e.target.value) }}
            value="nature"
            className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Nature
          </button>
          <button onClick={(e) => { setSearchQuery(e.target.value) }}
            value="garden"
            className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Garden
          </button>
          <button onClick={(e) => { setSearchQuery(e.target.value) }}
            value="butterflies"
            className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Butterflies
          </button>
          <button onClick={(e) => { setSearchQuery(e.target.value) }}
            value="game"
            className='py-1 px-2 bg-white hover:bg-green-700 hover:text-white border-gray-300 border rounded-full text-sm'>Games
          </button>
        </div>
      </div>
      {/* --------------------------------------- End ---------------------------- */}

      {filtered.length !== 0 && <p id="para" className="text-md mt-7 text-center mx-2 font-light">
        Browse through a curated collection of masterpieces.
      </p>}

      {/* --------------------------- Art Gallery -------------------------- */}
      {filter === "description" && <section className="py-5 px-2 sm:px-8">
        <h2 className="text-2xl text-gray-700 sm:mb-10">
          {`${filtered.length === 0 ? "" : "Canvas"}`}
        </h2>

        {loading && <div className="w-full flex justify-center">
          <h4 className="text-xl text-gray-600 p-2 border-b-2 border-black/50 w-24 text-center">Loading</h4>
        </div>}

        {filtered.length !== 0 && <span className="w-full sm:hidden flex items-center justify-end px-2 py-3">
          <img onClick={() => setGrid(grid => grid ? false : true)} className={`${grid ? "bg-black" : "bg-white"} p-2 border rounded-lg `} src="/Assets/grid.svg" alt="" />
        </span>}

        {!loading && <p className="text-center text-lg">{massage}</p>}

        {massage !== "" && !loading && (<div className="flex px-4 text-center flex-col items-center justify-center">
          <p className="my-5 text-gray-500">Upload stunning {searchQuery} images, and watch your earnings soar!
            The more you <span>upload</span>, the more you <span>sell!</span>"✨</p>
          <Link className="p-2 rounded-xl bg-[#408052] text-white hover:bg-[#2c663d]" href="/submit_image">Start Uploading</Link>
        </div>)}

        <div className={`${grid ? "columns-2" : "columns-1"} sm:columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4`}>
          {/* Art pieces */}
          {filtered.map((image) => (

            <div className="group sm:hover:shadow-lg relative rounded-xl mb-5 overflow-hidden w-full transition-all cursor-zoom-in">
              {!grid && <Link
                className="sm:hidden flex sm:group-hover:flex sm:absolute sm:text-white px-2 items-center w-full gap-2 cursor-pointer sm:bg-[linear-gradient(180deg,_rgba(50,_50,_50,_0.50)_0%,_rgba(128,_128,_128,_0.00)_100%)]"
                href={`/user_profile/${image.userId}`}>
                <img className="w-7 my-2 rounded-lg" src={image.userImage} alt="user image" />
                <h5>{image.userName}</h5>
              </Link>}
              <Link href={`/image_details/${image._id}`} key={image._id}>
                <Image
                  src={image.imageUrl}
                  width={500}
                  height={0}
                  alt="Artwork"
                  className="object-cover rounded-xl w-full sm:w-[300px] h-auto"
                />
              </Link>
              {!grid && <div className="sm:hidden flex sm:group-hover:flex items-center justify-between p-2 sm:absolute sm:text-white w-full bottom-0 sm:bg-[linear-gradient(180deg,_rgba(128,_128,_128,_0.00)_0%,_rgba(50,_50,_50,_0.50)_100%)]">

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
              </div>}
            </div>
          ))}
        </div>
      </section>}
      {/* --------------------------------- End --------------------------------- */}


      {/* ------------------------ User Profiles --------------------------*/}
      {/* {filter === "userName" && <div className="w-full px-2 sm:px-8 flex flex-col gap-5">
        {filtered.map((image) => (
          <div className="flex gap-2 flex-col">
            <Link className="flex gap-2 items-center" href={`/user_profile/${image.userId}`} key={image.userId}>
              <span>
                <img className="w-20 rounded-xl" src={image.userImage} alt="user profile" />
              </span>
              <div>
                <p>{image.userName}</p>
                <p>{image.userId}</p>
              </div>
            </Link>

            <div className="w-full overflow-x-auto">
              <Link href={`/image_details/${image._id}`}>
                <img className="rounded-xl h-40" src={image.imageUrl} alt="imeges" />
              </Link>
            </div>
          </div>
        ))}
      </div>} */}
      {/* ---------------------------- End ------------------------- */}

    </div>
  );
};

export default HomePage;
