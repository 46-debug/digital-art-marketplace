"use client"
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {

  const [show, setShow] = useState("none");
  const [sidebar, setSidebar] = useState("0%");

  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <>
      <header className="flex justify-between items-center py-3 px-5 w-full">
        <div className="flex items-center gap-2">
          <Link href="/market">
            <img src="/Assets/meta.svg" alt="logo" width="100px" />
            {/* <h3 className="text-green-800 tracking-widest text-[0px]">Meta Canvas</h3> */}
          </Link>
        </div>
        <div className="flex gap-6 items-center">

          <p className="sm:flex font-medium hidden sm:block cursor-pointer items-center">About Us</p>
          <p className="font-medium hidden sm:block no-point cursor-pointer flex items-center">Contact Us</p>

          <div className="flex flex-col">
            <div className="flex gap-3">
              <button onClick={() => setShow(show => (show === "block" ? "none" : "block"))} className="hidden sm:block bg-white p-3 sm:gray-200 hover:shadow-lg cursor-pointer rounded-full">
                <img src="/Assets/Vector-3.svg" alt="profile icon" />
              </button>

              <button className="hidden sm:block hover:shadow-lg p-3 bg-white rounded-full cursor-pointer">
                <img src="/Assets/Vector-1.svg" alt="dark/light icon" />
              </button>

              <button className="hidden sm:block p-3 bg-white hover:shadow-lg cursor-pointer rounded-full">
                <img src="/Assets/save.svg" alt="save icon" />
              </button>

              <button onClick={() => { setSidebar("100%") }} className="flex items-center justify-center block sm:hidden w-10 h-10 hover:shadow-lg cursor-pointer bg-white rounded-full">
                <img src="/Assets/menu.svg" alt="menu icon" />
              </button>
            </div>

            <div style={{ display: show }} className="bg-white cursor-pointer shadow-xl w-50 rounded-xl p-2 
          absolute translate-x-1 translate-y-12 transition-all">
              <Link href="/user_profile">
                <li className="list-none text-center px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300">View Profile</li>
              </Link>
              <Link href="/submit_image">
                <li className="list-none text-center px-3 py-2 rounded-xl text-white bg-green-600 hover:bg-green-700 mt-2">Submit Art</li>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div style={{ height: sidebar }} className="bg-black/20 flex overflow-hidden transition-all z-10 absolute w-full">
        <div className="bg-stone-100 gap-2 flex flex-col w-full h-screen px-5 py-24 relative items-center justify-start">
          <button onClick={() => { setSidebar("0%") }} className=" flex items-center justify-center absolute right-5 top-3 w-10 h-10 hover:shadow-lg cursor-pointer bg-white rounded-full">
            <img src="/Assets/close.svg" alt="close icon" />
          </button>

          {/* home */}
          <Link className={`pt-2.5 pb-2.5 pl-5 pr-5 ${isActive("/market") ? " bg-white border" : "bg-transparent" } rounded-full w-full`} href="/market">
            <span>Home</span>
          </Link>

          {/* profile */}
          <Link className={`pt-2.5 pb-2.5 pl-5 pr-5 ${isActive("/user_profile") ? " bg-white border" : "bg-transparent" } rounded-full w-full`} href="/user_profile">
            <span>Profile</span>
          </Link>

          {/* others */}
          <span className={`pt-2.5 pb-2.5 pl-5 pr-5 ${isActive("/saved") ? " bg-white border" : "bg-transparent" } rounded-full w-full`}>Saved</span>
          <span className={`pt-2.5 pb-2.5 pl-5 pr-5 ${isActive("/about") ? " bg-white border" : "bg-transparent" } rounded-full w-full`}>About</span>
          <span className={`pt-2.5 pb-2.5 pl-5 pr-5 ${isActive("/contact") ? " bg-white border" : "bg-transparent" } rounded-full w-full`}>Contact</span>

          {/* submit image */}
          <Link className="flex items-center bg-neutral-900 text-white mt-10 gap-3 p-2 pl-4 rounded-full" href="/submit_image">
            <span>Submit image</span>
            <img className="bg-green-600 rounded-full p-2 h-10" src="/Assets/aero.svg" alt="" />
          </Link>

          <span className="flex items-center justify-center absolute right-20 top-3 w-10 h-10 hover:shadow-lg cursor-pointer bg-white rounded-full">
            <img src="/Assets/Vector-1.svg" alt="" />
          </span>
        </div>
      </div>
    </>
  )
};

export default Header;