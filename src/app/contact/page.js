"use client"

import { useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const About = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");

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
            tl.from("#contactForm", {
                opacity: 0,
                duration: .7,
                stagger: .2,
                ease: "power3.out",
            })
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (email.length === 0 && fullName.length === 0 && message.length === 0) {
            setError("Please fill all details");
            return;
        } else {
            setShow(true);
            setEmail("");
            setFullName("");
            setMessage("");
        }
    };

    return (
        <div className='overflow-hidden'>

            <div id='contactForm' className='px-5 relative sm:px-40 h-[90vh] flex flex-col items-center justify-center'>

                {show && <div className="absolute flex-col gap-5 h-[500px] sm:w-96 w-[90%] flex items-center justify-center rounded-xl bg-white/70">
                    <button onClick={() => setShow(false)} className="absolute top-5 right-5 bg-black rounded-full text-white w-7 h-7">X</button>
                    <h3 className="bg-black py-2 px-4 rounded-lg shadow-lg text-white ">Message Sent</h3>
                    <p className="text-lg">We reply you shortly</p>
                </div>}
                <div className="flex my-5 sm:w-96 w-[95%] justify-between rounded-lg items-center">
                    <a href="mailto:sumit8t6t@gmail.com" className="text-blue-600">sumit8t6t@gmail</a>
                    <div className='flex gap-5'>
                        <a href="https://github.com/46-debug" target='#'><span><img src="/Assets/github.svg" alt="" /></span></a>
                        <a href="https://github.com/46-debug" target='#'><span><img src="/Assets/linkedin.svg" alt="" /></span></a>
                    </div>
                </div>
                <form className="sm:w-96 w-[95%] flex flex-col gap-3">
                    <label className="flex flex-col gap-1">Full name
                        <input required="true" onChange={(e) => setFullName(e.target.value)} className="border font-[Poppins] rounded-lg py-1 px-2 w-full focus:outline-black" type="text" />
                    </label>
                    <label className="flex flex-col gap-1">Email
                        <input required="true" onChange={(e) => setEmail(e.target.value)} className="border font-[Poppins] rounded-lg py-1 px-2 w-full focus:outline-black" type="text" />
                    </label>
                    <label className="flex flex-col gap-1">Message
                        <textarea required="true" onChange={(e) => setMessage(e.target.value)} className="border font-[Poppins] rounded-lg py-1 px-2 h-28 w-full resize-none focus:outline-black" type="text" />
                    </label>
                    <button onClick={onSubmit} className="sm:bg-black/80 bg-black hover:bg-black p-1.5 rounded-lg text-white">Send</button>
                    <p className="w-full text-center text-red-500">{error}</p>
                </form>
            </div>

            <div id='font' className='absolute py-4 text-7xl sm:text-9xl bottom-0 text-center w-full'>
                <span id='texts'>C</span>
                <span id='texts'>o</span>
                <span id='texts'>n</span>
                <span id='texts'>t</span>
                <span id='texts'>a</span>
                <span id='texts'>c</span>
                <span id='texts'>t</span>
            </div>
        </div>
    )
}

export default About;