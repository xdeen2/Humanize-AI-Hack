import Image from 'next/image'
import React from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { FiMessageSquare } from 'react-icons/fi'
import { BiMessageSquare, BiSolidHeart, BiSolidMessageAltDetail } from 'react-icons/bi'
import { FcSettings } from 'react-icons/fc'
import { HiChatAlt } from 'react-icons/hi'
import { RiSettings2Fill, RiShareFill } from 'react-icons/ri'
import { Tooltip } from '@mui/material'
import Button from './Button'
import toast from 'react-hot-toast'

function MyBotCard(props: MyBotCardProps) {

  const onCardClick = (e: any)=>{
    // only on click of card, not on click of settings, training, share
    if (e && typeof e.target.className == "string"){
      if (!e.target.className.includes("bg-bg-300")){
        if (!props.onCardClick) return null;
        props.onCardClick()
      }
    }
  }

  return (
    <div className={`bg-bg-lighter-black hover:bg-[#ffffff0f] ${props?.selected ? "!bg-[#ffffff1f]" : ""} cursor-pointer rounded-xl p-4 w-full h-fit flex flex-col gap-3 items-start`} onClick={(e: any)=>{
      onCardClick(e)
    }}>

      <div className="flex flex-row w-full justify-between items-center">
        <Image src={props.image} alt="Bot Image" width={40} height={40} className="rounded-full h-[40px] w-40px] object-cover object-center" />
        <div className="flex flex-col mr-auto ml-2 items-start">
          <span className="text-white font-semibold mr-auto ml-2">
            {props.name}
          </span>
          <span className="text-neutral-800 text-xs mr-auto ml-2">
            @{props.username}
          </span>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <span className="text-bg-50 text-xs flex gap-1 flex-row items-center">
            <BiSolidMessageAltDetail className="w-4 h-4" />
            {props.interactions}
          </span>
          <span className="text-bg-50 text-xs flex gap-1 flex-row items-center">
            <BiSolidHeart className="w-4 h-4" />
            {props.likes}
          </span>
        </div>
      </div>

      <span className="text-neutral-800 text-xs">
        {props.description ? props.description : "Complete the Bot's setup first"}
      </span>

      {/* <div className="flex flex-col items-end gap-2 self-end"> */}

        <div className="flex flex-row gap-2 w-full items-center self-end">
        {
          props.personal ? (
            <Tooltip title="This is the default bot for your Username & replicates You" className=''>
              <span className="text-xs min-w-max font-medium border border-teal-500 text-teal-500 px-2 py-1 rounded-lg">Primary Bot</span>
            </Tooltip>
          ) : null
        }
          {
            props.onSettingsClick ?
            <button className="bg-bg-300 ml-auto hover:bg-bg-200 rounded-lg px-3 py-1.5 text-xs text-neutral-50 font-semibold" onClick={()=>{
              props.onSettingsClick ? props.onSettingsClick() : null
            }}>
              <RiSettings2Fill className="w-4 h-4" />
            </button>
            :
            null
          }
          {/* <Tooltip title="Train your Bot while Chatting with it">
            <button className="bg-bg-300 hover:bg-bg-200 rounded-lg px-3 py-1.5 text-xs text-neutral-50 font-semibold" onClick={()=>{
              props.onTrainingClick()
            }}>
              <HiChatAlt className="w-4 h-4" />
            </button>
          </Tooltip> */}
          <Tooltip title="Share your Bot Link">
            <button className="bg-bg-300 hover:bg-bg-200 rounded-lg px-3 py-1.5 text-xs text-neutral-50 font-semibold" onClick={async()=>{
              await navigator.clipboard.writeText(`https://humanizeai.in/${props.username}`)
              toast.success("Copied Bot Link to Clipboard")
            }}>
              <RiShareFill className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>
      {/* </div> */}

    </div>
  )
}

interface MyBotCardProps {
    personal?: boolean,
    selected?: boolean,
    name: string,
    username: string,
    description: string,
    image: string,
    interactions: number,
    likes: number,
    onCardClick?: () => void,
    onSettingsClick?: () => void,
    onTrainingClick: () => void,
}

MyBotCard.defaultProps = {
    name: "Bot Name",
    username: "Vishal2",
    description: "This is a Cool Bot that does cool things and is very cool such that it is cool & curios to know more about it.",
    image: "/assets/avatar4.png",
    interactions: 0,
    likes: 0,
    onTrainingClick: () => {},
}

export default MyBotCard