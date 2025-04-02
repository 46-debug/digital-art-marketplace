"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const About = () => {

  gsap.registerPlugin(useGSAP);
  const tl = gsap.timeline();

  useGSAP(() => {
    tl.from("#font #texts", {
      opacity: 0,
      x: 100,
      duration: .8,
      delay: .3,
      stagger: .1,
      ease: "power3.out",
    }),
      tl.from("#aboutText span", {
        opacity: 0,
        duration: .7,
        stagger: .2,
        ease: "power3.out",
      })
  })

  return (
    <div className='overflow-hidden'>

      <p id='aboutText' className='px-5 sm:px-40 z-10 sm:text-3xl text-xl h-[90vh] flex flex-col items-center justify-center'>
        <span> Welcome to <span className='text-green-600'>metaCanvas</span>, the ultimate platform for artists and collectors to buy, sell, and showcase digital art. </span>
        <span> Our mission is to empower creators by providing a seamless, secure, and inspiring space where digital artworks find their true value. </span>
        <span> Whether you're an emerging artist looking to share your vision or a collector searching for unique pieces, we bring together a global community that celebrates creativity. </span>
        <span> Start uploading images—the more you upload, the more you earn! If you want to sell your image for free, simply leave the price field set to zero. </span>
        <span> After choosing an image, make sure to write a good description and add relevant hashtags to help others easily find your artwork. </span>
        <span> Join us in redefining the future of digital art! </span>
      </p>

      <div id='font' className='absolute py-4 text-7xl sm:text-9xl bottom-0 text-center w-full'>
        <span id='texts'>A</span>
        <span id='texts'>b</span>
        <span id='texts'>o</span>
        <span id='texts'>u</span>
        <span id='texts'>t</span>
        <span id='texts'> U</span>
        <span id='texts'>s</span>
      </div>
    </div>
  )
}

export default About;