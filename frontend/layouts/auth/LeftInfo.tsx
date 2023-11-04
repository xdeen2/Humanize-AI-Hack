import Link from 'next/link'
import React from 'react'

function LeftInfo(props: { robotIcon?: string, style?: string }) {
    return (
        <div className={`flex select-none flex-col px-5 md:px-20 relative mb-8 md:mb-0 text-white ${props.style}`}>
            <div className="absolute w-[90%] h-full overflow-y-clip left-0">
                <img src="/assets/bg-ai-bars.svg" alt="" className='w-full' />
                <img src="/assets/bg-ai-bars.svg" alt="" className='w-full mt-12' />
                <img src="/assets/bg-ai-bars.svg" alt="" className='w-full mt-12' />
                <img src="/assets/bg-ai-bars.svg" alt="" className='w-full mt-12' />
            </div>
            <Link href="/" className='z-10 relative w-fit'>
                <img src="/hwhiite.png" alt="" className="fill-white w-32 h-32 md:mt-10 z-10" />
                <span className="absolute bottom-4 right-3 text-white font-bold text-[0.6rem] p-0.5 px-1 rounded-md bg-warning-500">BETA</span>
            </Link>
            <span className="text-2xl text-white mt-10 z-10">HumanizeAI</span>
            <span className="font-semibold text-4xl z-10">Your personal bot!</span>
            <span className='mt-5 z-10'>HumanizeAI is a platform that lets you create your own bot that learns your preferences and skills.</span>
            <img src={props.robotIcon ? props.robotIcon : "/assets/robot-1.svg"} alt="" className="hidden md:block h-48 md:h-80 mt-6 md:mt-20 z-10" />
        </div>
    )
}

export default LeftInfo