"use client"
import React from 'react'
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const Home = () => {

  const router = useRouter();

  gsap.registerPlugin(useGSAP);
  const tl = gsap.timeline();

  useGSAP(() => {
    tl.to("#background", {
      background: "white",
      height: "90px",
      duration: 1,
      delay: 2.9,
      position: "relative"
    })
    tl.from(".text", {
      opacity: 0,
      y: 30,
      duration: .5,
      stagger: .1
    })
    tl.from(".images", {
      opacity: 0,
      y: -40,
      duration: .3,
      stagger: .2
    })
    tl.from("#paragraph", {
      opacity: 0,
      duration: 1
    })
    tl.from("#btns", {
      opacity: 0,
      x: -50
    })
    tl.to("#aero", {
      strokeDashoffset: 0,
      duration: 1
    })
  })

  const { isSignedIn } = useUser();

  const onLogin = () => {
    router.push("https://epic-alien-70.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F")
  };

  if (isSignedIn) {
    router.push("/market");
  }

  return (
    <>
      <div id='main' className='min-h-screen flex flex-col overflow-x-hidden justify-center items-center bg-white'>
        {/* <div>
        <Header />
        </div> */}
        <div id='background' className='flex items-center justify-center z-10 top-0 h-screen w-full absolute sm:pb-16
         bg-white'>
          <svg id='logo' viewBox="0 0 654 81" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M137.03 4C137.03 4 230.03 15.5 183.53 12.5C137.03 9.5 167.03 81.5 156.03 73.5M235.03 37C195.551 35.1137 196.093 53.2349 201.53 68.5C206.967 83.765 232.107 58.7926 235.03 53.5C237.952 48.2074 244.819 76.6381 250.53 68.5M301.03 7.5C274.03 -7 235.263 64.1034 274.03 73.5C312.796 82.8966 309.932 68.0695 311.03 68.5M358.03 37C332.984 34.3658 325.196 39.0698 321.03 57C322.298 69.8745 322.652 77.5607 340.53 68.5C349.864 62.0987 354.263 58.6889 358.03 53.5C362.503 65.2978 364.681 69.8369 367.03 68.5C376.923 81.3819 391.856 55.0308 396.53 46C401.203 36.9692 408.144 76.6937 411.53 73.5C417.182 66.3967 420.516 50.5914 431.03 53.5C439.621 55.8767 434.03 73.5 442.03 73.5C450.03 73.5 452.03 68.5 452.03 68.5M465.53 37C468.257 62.4194 472.743 70.8799 487.03 73.5C503.324 65.8924 508.728 56.8805 512.03 33M560.53 37C523.53 33 534.53 68.5 534.53 68.5C538.807 71.1357 561.765 74.2023 566.53 53.5C569.61 65.9614 571.955 71.1649 578.53 73.5C605.38 73.1068 608.088 48.9924 625.03 42C635.554 37.6562 642.565 45.5583 650.03 57C643.342 69.8982 636.736 72.9913 621.53 73.5M5.02959 73.5C3.01 51.1415 3.52983 29 10.5296 7.5C17.5293 -14 30.0298 73.5 39.5296 68.5C49.0294 63.4999 43.5296 2.49999 55.5296 7.5C67.5296 12.5 58.0294 67.5 67.5296 73.5C77.0298 79.5 113.376 40.1253 113.53 46C113.683 51.8747 118.931 31.4253 98.0296 33C83.5568 34.0904 78.8047 56.5416 87.0296 68.5C95.6606 81.0488 126.03 68.5 126.03 68.5"
              stroke="#ff00db" stroke-width="7" stroke-linejoin="round" />
          </svg>
        </div>
        <div className='flex items-center flex-col gap-10'>
          <h3 id='h3' className='text-[#408052] text-4xl text-center'>
            <span className='text'>A</span> <span className='text'>place</span> <span className='text'>to</span> <span className='text'>dispaly</span> <span className='text'>&</span> <span className='text'>sell</span> <span className='text'>your</span> <span className='text'>masterpiece</span>
          </h3>
          <div className='scroll-container'>
            <div id='img_main' className='flex px-2 py-5 gap-4 justify-start overflow-none'>
              <img className='images' src="https://images.unsplash.com/photo-1498081959737-f3ba1af08103?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sb3JmdWx8ZW58MHx8MHx8fDA%3D" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1538291323976-37dcaafccb12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1541661538396-53ba2d051eed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1548858819-650032a07cf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />

              <img className='images' src="https://images.unsplash.com/photo-1498081959737-f3ba1af08103?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sb3JmdWx8ZW58MHx8MHx8fDA%3D" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1538291323976-37dcaafccb12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1541661538396-53ba2d051eed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1548858819-650032a07cf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />

              <img className='images' src="https://images.unsplash.com/photo-1498081959737-f3ba1af08103?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sb3JmdWx8ZW58MHx8MHx8fDA%3D" alt="" />
              <img className='images' src="https://images.unsplash.com/photo-1538291323976-37dcaafccb12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbG9yZnVsfGVufDB8fDB8fHww" alt="" />
            </div>
          </div>
          <p id='paragraph'>Artists can display their masterpieces, and buyer can discover and
            Purchase works that resonate with them.
          </p>
          <div id='btns' className='flex gap-5 relative'>
            <img className='absolute top-6 right-3 w-12' src="/Assets/space.svg" alt="" />
            <svg id='aero' className='absolute top-9 left-16' width="210" height="55" viewBox="0 0 410 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 14.5C40.5678 63.7513 324.662 73.0076 409 1" stroke="black" stroke-width="2" />
              <path d="M1 14.5C40.5678 63.7513 324.662 73.0076 409 1" stroke="black" stroke-width="2" />
              <path d="M385 3C393.839 7.86403 399.033 6.63421 408.5 1.5" stroke="black" stroke-width="2" />
              <path d="M409 1C402.716 7.80439 400.384 12.0216 403.5 22" stroke="black" stroke-width="2" />
              <path d="M409 1C402.716 7.80439 400.384 12.0216 403.5 22" stroke="black" stroke-width="2" />
            </svg>

            <button onClick={onLogin} id='login' className='px-4 py-2 bg-[#ff0000] cursor-pointer rounded-full'>Login</button>
            <Link href='/market'>
              <button className='px-4 py-2 border border-[#1e1e1e] cursor-pointer rounded-full'>Continue without <span className='text-transparent'>_________</span></button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;