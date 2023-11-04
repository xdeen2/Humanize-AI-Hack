import Image from 'next/image'
import React from 'react'

function TestimonialCard({name, image, text, username}: TestimonialCardProps) {
  return (
    <div className="bg-neutral-100 text-black rounded-2xl shadow-sm shadow-whitegray p-10 px-3 flex flex-col items-center gap-5">
        <div className="flex gap-3 items-center self-start ml-8">
            <Image src={image} alt={name} width={55} height={55} className='rounded-full' />
            <div className="flex flex-col items-start">
                <span className="text-xl text-bg-900 font-semibold">{name}</span>
                <span className="text-gray-500 text-sm">@{username ? username : "User412"}</span>
            </div>
        </div>
        <span className="text-lg text-bg-500 font-light text-justify px-8">{text}</span>
    </div>
  )
}

interface TestimonialCardProps {
    name: string
    username: string
    image: string
    text: string
}

export default TestimonialCard