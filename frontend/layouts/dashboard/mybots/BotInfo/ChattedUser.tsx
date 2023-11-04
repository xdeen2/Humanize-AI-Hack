import React from 'react'
import { BiMessageSquareDots, BiSolidMessageAltDetail, BiSolidMessageSquareDetail } from 'react-icons/bi'
import { RiMessage2Fill } from 'react-icons/ri'

function ChattedUser(props: ChattedUserProps) {

  return (
    <div className="p-4 py-3 w-full flex flex-row items-center justify-start bg-transparent rounded-lg hover:bg-bg-lighter-black cursor-pointer" onClick={()=>props.onMessageClick()}>
        <img src={props.image ? props.image.startsWith('https') ? props.image : `http://localhost:5000${props.image}` : `http://localhost:5000${props.image}`} alt="" className="w-12 h-12 rounded-full object-cover object-center" />
        <div className="flex flex-col ml-3">
            <span className="text-neutral-700 font-medium text-base flex flex-row items-center gap-2">
                {props.name}
                <span className="text-neutral-800 font-normal ml-2 text-sm flex items-center">
                    {props.messages/2}
                    <BiSolidMessageAltDetail className="w-4 h-4 ml-1" />
                </span>
            </span>
            {/* last Message only limit to one line and ... after that */}
            <span className="text-neutral-700 font-normal text-xs flex items-center">
                {
                    window ? 
                    window.innerWidth > 468 ?
                    props.lastMessage.length > 80 ? props.lastMessage.slice(0, 80) + "..." : props.lastMessage
                    :
                    props.lastMessage.length > 25 ? props.lastMessage.slice(0, 25) + "..." : props.lastMessage
                    :
                    null
                }
            </span>
        </div>
        <div className="flex flex-col ml-auto items-end grow">
            {/* <span className="text-neutral-800 font-semibold text-sm">{props.messages}</span>
            <span className="text-neutral-700 font-medium text-xs">Interactions</span> */}
        </div>

        <button className="bg-bg-lighter-black hover:bg-bg-200 rounded-lg p-3 aspect-square flex flex-row items-center justify-center ml-4 text-xs text-neutral-50 font-semibold" onClick={()=>{
            props.onMessageClick()
        }}>
            <BiSolidMessageSquareDetail className="w-6 h-6" />
        </button>
    </div>
  )
}

interface ChattedUserProps {
    image: string,
    name: string,
    lastMessage: string,
    messages: number,
    onMessageClick: Function
}

export default ChattedUser