import { UserContext } from '@/pages/_app'
import { CheckCircleOutline } from '@mui/icons-material'
import Image from 'next/image'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiSolidHeart, BiSolidMessageAltDetail } from 'react-icons/bi'
import { HiChatAlt } from 'react-icons/hi'
import { RiSettings2Fill } from 'react-icons/ri'
import { GoVerified } from 'react-icons/go'
import {MdVerified} from 'react-icons/md'
import { Tooltip } from '@mui/material'

function BotCard(props: BotCardProps) {

  const { userDetails, setUserDetails } = React.useContext<any>(UserContext)

  const [likedBots, setLikedBots] = React.useState<string[]>([])

  const likeBot = async () => {
    const response = await fetch(`http://localhost:5000/like-bot/${props.username}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")!,
      }
    })

    const data = await response.json()
    console.log(data)

    if (data.success) {
      setUserDetails({
        ...userDetails,
        favBots: JSON.stringify([...likedBots, props.username])
      })
      setLikedBots([...likedBots, props.username])
    } else {
      console.log(data)
      toast.error("Failed to like bot")
    }
  }

  const unlikeBot = async () => {
    const response = await fetch(`http://localhost:5000/unlike-bot/${props.username}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")!,
      }
    })

    const data = await response.json()
    console.log(data)

    if (data.success) {
      setUserDetails({
        ...userDetails,
        favBots: JSON.stringify(likedBots.filter((bot: string) => bot != props.username))
      })
      setLikedBots(likedBots.filter((bot: string) => bot != props.username))
    } else {
      console.log(data)
      toast.error("Failed to unlike bot")
    }
  }

  useEffect(()=>{
    if (userDetails?.favBots) {
      setLikedBots(JSON.parse(userDetails.favBots))
    }
  }, [])

  return (
    <div
        className={`bg-bg-lighter-black hover:bg-[#ffffff1f] cursor-pointer rounded-xl p-4 w-full h-full flex flex-col gap-3 items-start ${props?.className}`}
        onClick={props?.onClick}>
      
      <div className="flex flex-row w-full justify-between items-center">
        <Image src={props.image} alt="Bot Image" width={40} height={40} className="rounded-full w-[40px] h-[40px] object-cover" />
        <div className="flex flex-col mr-auto ml-2 items-start">
          <span className={`text-white flex flex-row gap-2 items-center font-semibold mr-auto ml-2 ${props.titleClassName}`}>
            {props.name}
            {props.verified ? 
            <Tooltip title="Verified User" placement="top">
              <MdVerified className="w-5 min-w-[20px] h-5 min-h-[20px] text-sky-500" />
            </Tooltip>
              :
              null
            }
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
          <span className={`${likedBots?.includes(props.username) ? "text-red-500" : "text-bg-50"} text-xs flex gap-1 flex-row items-center`} onClick={likedBots?.includes(props.username) ? unlikeBot : likeBot}>
            <BiSolidHeart className="w-4 h-4" />
            {props.likes}
          </span>
        </div>
      </div>
      

      <span className="text-neutral-800 text-xs">
        {props.description}
      </span>

      {/* <div className="flex flex-row self-end gap-3 items-center">
        <button className="bg-bg-300 hover:bg-bg-200 rounded-lg px-3 py-1.5 text-xs text-neutral-50 font-semibold">
          <RiSettings2Fill className="w-4 h-4" />
        </button>
        <button className="bg-bg-300 hover:bg-bg-200 rounded-lg px-3 py-1.5 text-xs text-neutral-50 font-semibold">
          <HiChatAlt className="w-4 h-4" />
        </button>
      </div> */}

    </div>
  )
}

interface BotCardProps {
    className?: string,
    titleClassName?: string,
    name: string,
    username: string,
    description: string,
    image: string,
    interactions: number,
    likes: number,
    verified?: boolean,
    onClick?: () => void,
    onSettingsClick: () => void,
    onTrainingClick: () => void,
}

BotCard.defaultProps = {
    name: "Bot Name",
    username: "username",
    description: "This is a Helpful Bot that does helpful things and is very cool such that it is cool & curios to know more about it.",
    image: "/assets/avatar.jpg",
    interactions: 0,
    likes: 0,
    verified: false,
    onSettingsClick: () => {},
    onTrainingClick: () => {},
}

export default BotCard