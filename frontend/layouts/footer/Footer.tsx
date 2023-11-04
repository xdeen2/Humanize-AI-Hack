import PrimaryButton from '@/components/PrimaryButton'
import { Email, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsFacebook, BsTwitter } from 'react-icons/bs'
import { HiX } from 'react-icons/hi'
import { RiDiscordFill } from 'react-icons/ri'

const poppins = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

function Footer(props: {invertColor?: boolean}) {
  return (
    <div className={`flex flex-col px-8 pl-4 md:pl-0 gap-6 lg:gap-14 items-center lg:items-start lg:flex-row z-20 justify-evenly py-8 lg:py-14 ${props.invertColor ? "bg-neutral-100 text-black" : "bg-white text-bg-900"}`}>
      
      {/* ShortAbout */}
      <div className="w-full grow px-4 lg:px-20">
        <div className="flex flex-col md:px-0 w-full md:w-96">
          {/* <Image src="/assets/logo2.svg" alt="Logo" width={100} height={100} className='fill-black text-black' /> */}
          <img src={props.invertColor ? "/longlogoblack.svg" : "/hblack.png.png"} alt="" className="w-fit h-20 mb-2 md:mb-0 md:h-20 md:min-w-[550px] md:-ml-36 object-cover" />
          {/* <span className={`${poppins.className} font-semibold text-base pt-4 pb-5`}>HumanizeAI <span className={`${poppins.className} font-normal`}>is a platform that lets you create your own bot that learns your preferences and skills. And then helps others on your behalf!!</span></span> */}
          <span className={`text-bg-900 ${poppins.className}`}>
            HumanizeAI is a platform that lets you create your own AI ChatBot that learns your preferences and skills. And then helps others on your behalf!!
          </span>
          <div className="socials w-fit flex-row grid grid-cols-5 gap-3.5 mt-5">
            <Twitter className="cursor-pointer hover:fill-blue-500" />
            <LinkedIn className="cursor-pointer hover:fill-blue-500" />
            <RiDiscordFill className="cursor-pointer w-6 h-6 hover:fill-blue-950" />
            <Email className="cursor-pointer hover:fill-amber-700" />
            <Instagram className="cursor-pointer hover:fill-gradient-pink" />
          </div>
          {/* <div className="flex flex-row mt-5">
            <Link href="/info/terms-and-conditions" className="font-semibold text-sm">Terms and Conditions</Link>
            <Link href="/info/privacy-policy" className={`font-semibold text-sm border-l-[1px] ml-3 pl-3 ${props.invertColor ? "border-l-bg-white" : "border-l-bg-900"}`}>Privacy Policy</Link>
          </div> */}
        </div>
      </div>

      {/* Common Links */}
      <div className={`flex flex-col ${poppins.className} self-start text-sm min-w-max font-medium`}>
        <span className={`${poppins.className} font-semibold text-2xl py-5 mt-3`}>Navigate</span>
        <Link href="/" className='my-1'>Home</Link>
        <Link href="/about-us" className='my-1'>About Us</Link>
        <Link href="/about-us" className='my-1'>API & Embeddings</Link>
        <Link href="/#use-cases" className='my-1'>All Bots</Link>
        <Link href="/blogs" className='my-1'>Blogs</Link>
      </div>

      {/* Contact */}
      <div className="flex flex-col self-start min-w-max lg:mr-10">
      <div className={`flex flex-col ${poppins.className} text-sm font-medium`}>
        <span className={`${poppins.className} font-semibold text-2xl py-5 mt-3`}>Connect</span>
        <span className='my-1'>E-Mail</span>
        <span className='my-1'>Twitter</span>
        <span className='my-1'>Discord</span>
        <span className='my-1'>LinkedIn</span>
        {/* <span className='my-1'>+</span> */}
        {/* <span className='my-1'>Web Interface Team</span> */}
      </div>
        
      {/* Newsletter */}
      {/* <div className={`flex flex-col ${poppins.className} text-sm`}>
        <span className={`${poppins.className} font-semibold text-2xl py-5 mt-3`}>Subscribe to Newsletter</span>
        <div className='flex flex-col md:flex-row gap-3'>
          <input type="email" className='py-2 px-3 bg-[#fff] text-white border-[1px] border-neutral-500 rounded outline-none font-medium' placeholder='Email Id' />
          <PrimaryButton title='Subscribe' />
        </div>
      </div> */}
      </div>

    </div>
  )
}

export default Footer