import Button from '@/components/Button'
import { UserContext } from '@/pages/_app'
import { DashboardContext } from '@/pages/dashboard'
import { ArrowLeft, ChatBubble, Mail } from '@mui/icons-material'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiSolidHeart, BiSolidMessageAltDetail } from 'react-icons/bi'
import { RiDiscordFill, RiInstagramFill, RiLink, RiLinkedinBoxFill, RiLoader4Fill, RiTelegramFill, RiTwitterFill, RiWhatsappFill, RiYoutubeFill } from 'react-icons/ri'
import { TbBrandInstagram, TbBrandYoutube, TbMessageShare } from 'react-icons/tb'

function BotProfile() {

    const userContext = useContext<any>(UserContext)
    const dashboardContext = useContext<any>(DashboardContext)
    const loggedIn = userContext.loggedIn
    const userData = userContext.userDetails

    const [fetchingBotData, setFetchingBotData] = React.useState<boolean>(false)

    const [likedBots, setLikedBots] = React.useState<string[]>([])

    const likeBot = async () => {
        const response = await fetch(`http://localhost:5000/like-bot/${dashboardContext.extraInfo?.botToChat}`, {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("token")!,
        }
        })

        const data = await response.json()
        console.log(data)

        if (data.success) {
            // updating the string in the user context
            userContext.setUserDetails({
                ...userContext.userDetails,
                favBots: JSON.stringify([...likedBots, dashboardContext.extraInfo?.botToChat])
            })
            // updating the dashboard context bot like count
            dashboardContext.setExtraInfo({
                ...dashboardContext.extraInfo,
                botDetails: {
                    ...dashboardContext.extraInfo?.botDetails,
                    likes: dashboardContext.extraInfo?.botDetails?.likes + 1
                }
            })
                setLikedBots([...likedBots, dashboardContext.extraInfo?.botToChat])
            } else {
        console.log(data)
        toast.error("Failed to like bot")
        }
    }

    const unlikeBot = async () => {
        const response = await fetch(`http://localhost:5000/unlike-bot/${dashboardContext.extraInfo?.botToChat}`, {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("token")!,
        }
        })

        const data = await response.json()
        console.log(data)

        if (data.success) {
            // updating the string in the user context
            userContext.setUserDetails({
                ...userContext.userDetails,
                favBots: JSON.stringify(likedBots.filter((bot: string) => bot != dashboardContext.extraInfo?.botToChat))
            })
            // updating the dashboard context bot like count
            dashboardContext.setExtraInfo({
                ...dashboardContext.extraInfo,
                botDetails: {
                    ...dashboardContext.extraInfo?.botDetails,
                    likes: dashboardContext.extraInfo?.botDetails?.likes - 1
                }
            })
            setLikedBots(likedBots.filter((bot: string) => bot != dashboardContext.extraInfo?.botToChat))
        } else {
        console.log(data)
        toast.error("Failed to unlike bot")
        }
    }

    useEffect(()=>{
        if (userContext?.userDetails?.favBots) {
            const favs = (JSON.parse(userContext?.userDetails?.favBots))
            console.log(favs)
            setLikedBots(favs)
        }
    }, [userContext])

    const fetchData = async () => {
        setFetchingBotData(true)
        const response = await fetch(`http://localhost:5000/get-bot-data/${dashboardContext.extraInfo?.botToChat}`, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("token")!
            }
        })
        const data = await response.json()
        console.log(data)

        if (data.success) {
            dashboardContext.setExtraInfo({
                ...dashboardContext.extraInfo,
                botDetails: {
                    name: data.data.bot[18],
                    botid: data.data.bot[1],
                    image: data.data.bot[20],
                    interactions: data.data.bot[4],
                    likes: data.data.bot[5],
                    description: data.data.bot[3],
                    youtube: data.data.bot[7],
                    instagram: data.data.bot[8],
                    discord: data.data.bot[9],
                    telegram: data.data.bot[10],
                    twitter: data.data.bot[19],
                    whatsapp: data.data.bot[6],
                    linkedin: data.data.bot[21],
                    website: data.data.bot[24],
                },
                botOwner: {
                    name: data.data.owner[0],
                    image: data.data.owner[1],
                    username: data.data.owner[2],
                    // 3 whatsapp, 4 telegram, 5 discord, 6 instagram, twitter, youtube
                    whatsapp: data.data.owner[3],
                    telegram: data.data.owner[4],
                    discord: data.data.owner[5],
                    instagram: data.data.owner[6],
                    twitter: data.data.owner[7],
                    youtube: data.data.owner[8],
                },
                botOwnerBots: data.data.bots
            })
            console.log("New extra info")
        setFetchingBotData(false)
    } else {
            console.log(data)
            setFetchingBotData(false)
            toast.error("No such Bot found")
            dashboardContext.setCurrentSubTab(0)
    }
        setFetchingBotData(false)
    }

    useEffect(()=>{
        if (dashboardContext.extraInfo?.botToChat) {
            fetchData()
        }
    }, [dashboardContext.extraInfo?.botToChat])
    
  return (
    <div className="flex flex-col gap-8 w-full p-5 overflow-y-auto">

        <span className="py-2 px-5 pl-3 rounded-full flex items-center gap-1 w-fit bg-bg-300 bg-opacity-50 hover:bg-opacity-75 active:opacity-95 text-neutral-50 -mb-4 cursor-pointer" onClick={()=>{
            dashboardContext.setExtraInfo({
                bots: {
                    botid: "",
                }
            });
            dashboardContext.setCurrentSubTab(0)  
        }}>
            <ArrowLeft className="inline-block" />
            Go Back
        </span>

        {
            fetchingBotData ? (
                <RiLoader4Fill className="w-8 h-8 text-neutral-400 animate-spin self-center my-auto" />
            ) : (
                <>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-12 justify-start items-stretch p-0 lg:p-4 lg:pl-6 pt-8 md:pt-2">
                        <img src={dashboardContext.extraInfo?.botDetails?.image ? `http://localhost:5000/assets/${dashboardContext.extraInfo?.botDetails?.image}` : "/assets/avatar.jpg"} alt="" className="w-[95vw] lg:w-48 aspect-square lg:h-48 object-cover rounded-none lg:rounded-full" />

                        <div className="flex flex-col gap-1 py-2 px-1 md:px-0 justify-end">
                            <span className="text-4xl font-semibold text-neutral-400 py-1">{dashboardContext.extraInfo?.botDetails?.name}</span>
                            <span className="text-neutral-900 font-medium">@{dashboardContext.extraInfo?.botDetails?.botid}</span>
                            <span className="text-neutral-700 mt-1 text-sm font-medium flex items-center">
                                <BiSolidMessageAltDetail className="inline w-5 h-5" />&nbsp;
                                {dashboardContext.extraInfo?.botDetails?.interactions?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Chats
                            </span>

                            <div
                                className="flex flex-row gap-1"
                                onClick={()=>{
                                if (likedBots.includes(dashboardContext.extraInfo?.botToChat)) {
                                    unlikeBot()
                                } else {
                                    likeBot()
                                }
                            }}>
                                <BiSolidHeart className={`${likedBots.includes(dashboardContext.extraInfo?.botToChat) ? "text-red-500" : "text-neutral-700"} text-lg self-end cursor-pointer`} />
                                <span className="text-neutral-700 text-sm font-medium flex items-center">
                                    {dashboardContext.extraInfo?.botDetails?.likes?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Likes
                                </span>
                            </div>
                        

                            <Button className=' w-fit !py-1.5 text-base !px-5 mt-2' onClick={()=>{
                                dashboardContext.setCurrentSubTab(2)
                            }}>
                                <TbMessageShare className="inline w-5 h-5" />
                                Start Chatting
                            </Button>
                            {/* <Link href={loggedIn ? `/try-vikram-bots/${userId}` : `/quick-login?userId=${userId}`} className='mt-8 md:mt-auto'> */}
                        </div>
                    </div>
                    
                    <span className="lg:mt-0.5 text-base text-neutral-700 font-normal flex gap-2 items-center">
                                <span className='font-semibold'>Connects: </span>
                                {dashboardContext.extraInfo?.botDetails?.whatsapp || dashboardContext.extraInfo?.botDetails?.telegram || dashboardContext.extraInfo?.botDetails?.discord || dashboardContext.extraInfo?.botDetails?.instagram || dashboardContext.extraInfo?.botDetails?.twitter || dashboardContext.extraInfo?.botDetails?.youtube || dashboardContext.extraInfo?.botDetails?.linkedin ||dashboardContext.extraInfo?.botDetails?.website ?
                                <>
                                    {(dashboardContext.extraInfo?.botDetails?.whatsapp && dashboardContext.extraInfo?.botDetails?.whatsapp.toString() != "null") ? <a target="_blank" href={`https://wa.me/${dashboardContext.extraInfo?.botDetails?.whatsapp}`}><RiWhatsappFill className="text-green-500 text-xl" /></a> : null}
                                    {(dashboardContext.extraInfo?.botDetails?.telegram && dashboardContext.extraInfo?.botDetails?.telegram.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.telegram}><RiTelegramFill className="text-blue-500 text-xl" /></a> : null}
                                    {(dashboardContext.extraInfo?.botDetails?.discord && dashboardContext.extraInfo?.botDetails?.discord.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.discord}><RiDiscordFill className="text-[#7289da] text-xl" /></a> : null}
                                    {(dashboardContext.extraInfo?.botDetails?.instagram && dashboardContext.extraInfo?.botDetails?.instagram.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.instagram}><RiInstagramFill className="text-pink-500 text-xl" /></a> : null}
                                    {(dashboardContext.extraInfo?.botDetails?.twitter && dashboardContext.extraInfo?.botDetails?.twitter.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.twitter}><RiTwitterFill className="text-blue-400 text-xl" /></a> : null}
                                    {(dashboardContext.extraInfo?.botDetails?.youtube && dashboardContext.extraInfo?.botDetails?.youtube.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.youtube}><RiYoutubeFill className="text-red-500 text-xl" /></a> : null}
                                    {(dashboardContext.extraInfo?.botDetails?.linkedin && dashboardContext.extraInfo?.botDetails?.linkedin.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.linkedin}><RiLinkedinBoxFill className="text-blue-500 text-xl" /></a> : null}
                                    {(dashboardContext.extraInfo?.botDetails?.website && dashboardContext.extraInfo?.botDetails?.website.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.website}><RiLink className="text-amber-500 text-xl" /></a> : null}
                                </>
                                : <span className='font-base text-sm text-gray-500'>No Socials to Connect on</span>
                                }
                    </span>
                    
                    <span className="-mt-7 text-neutral-700 font-normal text-base md:pr-14">
                        {dashboardContext.extraInfo?.botDetails?.description ? dashboardContext.extraInfo?.botDetails?.description : `This is a HumanizeAI Bot created by for the purpose of helping people like you ! Try out the Bot, if you like, it would be a great time to make your own Free HumanizeAI Bot.`}
                    </span>

                    <span className="text-xl font-semibold text-neutral-600">About Owner</span>
                    <div className="flex flex-row justify-start items-center p-0 lg:p-4 lg:pl-6 pt-0 gap-2.5 -mt-8">
                        <img src={dashboardContext.extraInfo?.botOwner?.image ? dashboardContext.extraInfo?.botOwner?.image.startsWith("https") ? dashboardContext.extraInfo?.botOwner?.image : `http://localhost:5000/assets/${dashboardContext.extraInfo?.botOwner?.image}` : "/assets/avatar.jpg"} alt="" className="w-20 lg:w-16 lg:h-16 object-cover rounded-full" />

                        <div className="flex flex-col ">
                            <div className="flex flex-col py-2 px-1 md:px-0 justify-end">
                                <span className="text-xl font-semibold text-neutral-400">{dashboardContext.extraInfo?.botOwner?.name ? dashboardContext.extraInfo?.botOwner?.name : "HumanizeAI Singh"}</span>
                                <span className="text-neutral-900 text-sm font-medium">@{dashboardContext.extraInfo?.botOwner?.username ? dashboardContext.extraInfo?.botOwner?.username : "HumanizeAI324"}</span>
                            </div>

                        <div className="flex gap-1.5 items-center self-start">
                            {/* <Mail className="text-neutral-700 text-xl self-end cursor-pointer" /> */}
                            
                        </div>
                        <div className="flex gap-1 items-center">
                            {(dashboardContext.extraInfo?.botDetails?.whatsapp && dashboardContext.extraInfo?.botDetails?.whatsapp.toString() != "null") ? <a target="_blank" href={`https://wa.me/${dashboardContext.extraInfo?.botDetails?.whatsapp}`}><RiWhatsappFill className="text-green-500 text-xl" /></a> : null}
                            {(dashboardContext.extraInfo?.botDetails?.telegram && dashboardContext.extraInfo?.botDetails?.telegram.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.telegram}><RiTelegramFill className="text-blue-500 text-xl" /></a> : null}
                            {(dashboardContext.extraInfo?.botDetails?.discord && dashboardContext.extraInfo?.botDetails?.discord.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.discord}><RiDiscordFill className="text-[#7289da] text-xl" /></a> : null}
                            {(dashboardContext.extraInfo?.botDetails?.instagram && dashboardContext.extraInfo?.botDetails?.instagram.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.instagram}><RiInstagramFill className="text-pink-500 text-xl" /></a> : null}
                            {(dashboardContext.extraInfo?.botDetails?.twitter && dashboardContext.extraInfo?.botDetails?.twitter.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.twitter}><RiTwitterFill className="text-blue-400 text-xl" /></a> : null}
                            {(dashboardContext.extraInfo?.botDetails?.youtube && dashboardContext.extraInfo?.botDetails?.youtube.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.youtube}><RiYoutubeFill className="text-red-500 text-xl" /></a> : null}
                            {(dashboardContext.extraInfo?.botDetails?.linkedin && dashboardContext.extraInfo?.botDetails?.linkedin.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.linkedin}><RiLinkedinBoxFill className="text-blue-500 text-xl" /></a> : null}
                            {(dashboardContext.extraInfo?.botDetails?.website && dashboardContext.extraInfo?.botDetails?.website.toString() != "null") ? <a target="_blank" href={dashboardContext.extraInfo?.botDetails?.website}><RiLink className="text-amber-500 text-xl" /></a> : null}
                        </div>
                        </div>
                    </div>
                </>
            )
        }

    </div>
  )
}

export default BotProfile