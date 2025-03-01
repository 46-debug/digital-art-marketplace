"use client"
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const Header = () => {

  const [show, setShow] = useState("none");
  const [sidebar, setSidebar] = useState("0%");

  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const { user } = useUser();
  const userId = user?.id;

  return (
    <>
      <header className="flex justify-between items-start py-3 px-5 mb-5 w-full">
        <Link href="/market">
          <img src="/Assets/meta.svg" alt="logo" width="60px" />
        </Link>

        <div className="flex gap-2 items-center">
          <div className="sm:flex hidden gap-4 items-center bg-gray-200 py-1 px-2 pr-1 rounded-full">
            <Link className={`${isActive("/market") ? " bg-black text-gray-200 py-1 px-4" : "bg-transparent"} rounded-full transition-all px-2`} href="/market">Home</Link>
            <Link className={`${isActive("/about") ? "bg-black text-gray-200 py-1 px-4" : "bg-transparent"} rounded-full transition-all`} href="/about">About</Link>
            <Link className={`${isActive("/contact") ? " bg-black text-gray-200 py-1 px-4" : "bg-transparent"} rounded-full transition-all`} href="/contact">Contact</Link>
            <Link className={`${isActive("/saved") ? " bg-black text-gray-200 py-1 px-4" : "bg-transparent"} rounded-full transition-all`} href="/saved">Saved</Link>
            <Link href={`/user_profile/${userId}`} className={`hidden ${isActive(`/user_profile/${userId}`) ? " border-black" : ""} sm:block bg-white border-2 ${user ? "p-4" : "p-3"} sm:gray-200 hover:shadow-lg cursor-pointer rounded-full`}
              style={{ backgroundImage: user ? `url(${user.imageUrl})` : "none", backgroundSize: "cover" }}>
              <img className={`${user ? "hidden" : "block"}`} src="/Assets/Vector-3.svg" alt="profile icon" />
            </Link>
          </div>

          <div className="flex gap-2 items-center">
            <button className="hidden sm:block hover:shadow-lg p-2.5 border bg-white rounded-full cursor-pointer">
              <img src="/Assets/Vector-1.svg" alt="dark/light icon" />
            </button>
            <Link className="sm:hidden py-1.5 px-3 rounded-full text-white bg-[#408052]" href="/submit_image">Upload</Link>
            <button onClick={() => { setSidebar("100%") }} className="flex items-center bg-gray-100 border justify-center block sm:hidden w-10 h-10 hover:shadow-lg cursor-pointer rounded-full">
              <img src="/Assets/menu.svg" alt="menu icon" />
            </button>
            <Link className={`${user ? "hidden" : "block"} px-3 py-1.5 bg-black rounded-full text-white`} href="https://epic-alien-70.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F">
              Login
            </Link>
          </div>
        </div>

        <Link className="hidden sm:block py-1.5 px-3 rounded-full text-white bg-[#408052]" href="/submit_image">Upload</Link>
      </header>

      <div style={{ height: sidebar }} className="bg-black/20 flex overflow-hidden transition-all z-10 absolute w-full">
        <div className="bg-stone-100 gap-2 flex flex-col w-full h-screen px-5 py-24 relative items-center justify-start">
          <button onClick={() => { setSidebar("0%") }} className=" flex items-center justify-center absolute right-5 top-3 w-10 h-10 hover:shadow-lg cursor-pointer bg-white rounded-full">
            <img src="/Assets/close.svg" alt="close icon" />
          </button>

          <SignOutButton>
            <button className={`list-none ${user ? "block" : "hidden"} absolute top-3 left-5 text-center px-2 py-2 rounded-xl text-red-500`}>
              Logout
            </button>
          </SignOutButton>

          {/* home */}
          <Link className={`pt-2.5 flex gap-2 items-center pb-2.5 pl-5 pr-5 ${isActive("/market") ? "border-x-2 border-black" : "bg-transparent"} rounded-full w-full`} href="/market">
            <span>Home</span>
          </Link>

          {/* profile */}
          <Link className={`pt-2.5 flex items-center justify-between gap-2 pb-2 pl-5 pr-5 ${isActive(`/user_profile/${userId}`) ? "border-x-2 border-black" : "bg-transparent"} rounded-full w-full`} href={`/user_profile/${userId}`}>
            <span>Profile</span>
            <img className="h-8 rounded-full" src={user ? user.imageUrl : "/Assets/Vector-3.svg"} alt="user image" />
          </Link>

          {/* others */}
          <Link className={`pt-2.5 flex items-center gap-2 pb-2.5 pl-5 pr-5 ${isActive("/user_profil") ? " bg-white border" : "bg-transparent"} rounded-full w-full`} href="/saved">
            <span>Saved</span>
          </Link>

          <span className={`pt-2.5 pb-2.5 pl-5 pr-5 ${isActive("/about") ? " bg-white border" : "bg-transparent"} rounded-full w-full`}>About</span>
          <span className={`pt-2.5 pb-2.5 pl-5 pr-5 ${isActive("/contact") ? " bg-white border" : "bg-transparent"} rounded-full w-full`}>Contact</span>

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