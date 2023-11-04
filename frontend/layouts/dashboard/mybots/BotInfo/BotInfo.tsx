import Button from '@/components/Button'
import { UserContext } from '@/pages/_app'
import { DashboardContext } from '@/pages/dashboard'
import React, { useContext, useEffect } from 'react'
import { BiSolidHeart, BiSolidMessageAltDetail } from 'react-icons/bi'
import { RiDiscordFill, RiInstagramFill, RiLink, RiLinkedinBoxFill, RiLoader4Fill, RiTelegramFill, RiTwitterFill, RiWhatsappFill, RiYoutubeFill } from 'react-icons/ri'
import { TbMessageShare } from 'react-icons/tb'
import ChattedUser from './ChattedUser'
import toast from 'react-hot-toast'

function BotInfo(props: BotInfoProps) {

    const { userDetails, bots } = useContext<any>(UserContext)
    const dashboardContext = useContext<any>(DashboardContext)

    const [bot, setBot] = React.useState<any>(null)

    const [chattedUsers, setChattedUsers] = React.useState<any>([])
    const [loadingUsers, setLoadingUsers] = React.useState<boolean>(false)

    const getChats = async ()=> {
        setLoadingUsers(true)
        try {
            const response = await fetch(`http://localhost:5000/get-bot-chats/${props.botId}`, {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem("token")!
                }
            })
            const data = await response.json()
            console.log("data", data)

            if (data.success) {
                const chats = data.data.filter((chat: any)=>chat.username != userDetails.email_id)
                setChattedUsers(chats)
            } else {
                toast.error(data.message)
            }
        } catch (error: any) {
            console.log(error)
            toast.error("Error Fetching Chats")
        }
        setLoadingUsers(false)
    }

    useEffect(()=>{
        if (props.section == "info"){
            if (bots){
                const bot = bots.find((bot: any)=>bot[1] == props.botId)
                if (bot){
                    setBot(bot)
                }
            } else {
                toast.error("Error Fetching Bot")
            }
            getChats()
        }
    }, [bots, props.botId, props.section])

  return (
    !bot ?
    <div className="flex flex-col items-center justify-center h-full">
        <RiLoader4Fill className="animate-spin w-8 h-8 text-neutral-500 mx-auto self-center justify-self-center" />
    </div>
    : 
    <div className="grow h-full overflow-y-auto flex flex-col p-4">
        
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-12 justify-start items-stretch p-0 lg:p-4 lg:pl-6 pt-8 md:pt-2">
            <img src={bot[20] ? `http://localhost:5000/assets/${bot[20]}` : "/assets/avatar.jpg"} alt="" className="w-[95vw] lg:w-48 aspect-square lg:h-48 object-cover rounded-none lg:rounded-full" />

            <div className="flex flex-col gap-1 py-2 px-1 md:px-0 justify-end">
                <span className="text-4xl font-semibold text-neutral-400 py-1">{bot[18]}</span>
                <span className="text-neutral-900 font-medium">@{bot[1]}</span>
                <span className="text-neutral-700 mt-1 text-sm font-medium flex items-center">
                    <BiSolidMessageAltDetail className="inline w-5 h-5" />&nbsp;
                    {bot[4]?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Chats
                </span>

                <div className="flex flex-row gap-1">
                    <BiSolidHeart className={`text-neutral-700 text-lg self-end cursor-pointer`} />
                    <span className="text-neutral-700 text-sm font-medium flex items-center">
                        {bot[5]?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Likes
                    </span>
                </div>
            

                <Button className=' w-fit !py-1.5 text-base !px-5 mt-2' onClick={()=>{
                    props.setSection("chat")

                }}>
                    <TbMessageShare className="inline w-5 h-5" />
                    Start Training
                </Button>
                {/* <Link href={loggedIn ? `/try-vikram-bots/${userId}` : `/quick-login?userId=${userId}`} className='mt-8 md:mt-auto'> */}
            </div>
        </div>
        
        <span className="mt-5 text-base text-neutral-700 font-normal flex gap-2 items-center">
                    <span className='font-semibold'>Connects: </span>
                    {bot[6] || bot[10] || bot[9] || bot[8] || bot[19] || bot[7] || bot[21] ||bot[24] ?
                    <>
                        {(bot[6] && bot[6].toString() != "null") ? <a target="_blank" href={`https://wa.me/${bot[6]}`}><RiWhatsappFill className="text-green-500 text-xl" /></a> : null}
                        {(bot[10] && bot[10].toString() != "null") ? <a target="_blank" href={bot[10]}><RiTelegramFill className="text-blue-500 text-xl" /></a> : null}
                        {(bot[9] && bot[9].toString() != "null") ? <a target="_blank" href={bot[9]}><RiDiscordFill className="text-[#7289da] text-xl" /></a> : null}
                        {(bot[8] && bot[8].toString() != "null") ? <a target="_blank" href={bot[8]}><RiInstagramFill className="text-pink-500 text-xl" /></a> : null}
                        {(bot[19] && bot[19].toString() != "null") ? <a target="_blank" href={bot[19]}><RiTwitterFill className="text-blue-400 text-xl" /></a> : null}
                        {(bot[7] && bot[7].toString() != "null") ? <a target="_blank" href={bot[7]}><RiYoutubeFill className="text-red-500 text-xl" /></a> : null}
                        {(bot[21] && bot[21].toString() != "null") ? <a target="_blank" href={bot[21]}><RiLinkedinBoxFill className="text-blue-500 text-xl" /></a> : null}
                        {(bot[24] && bot[24].toString() != "null") ? <a target="_blank" href={bot[24]}><RiLink className="text-amber-500 text-xl" /></a> : null}
                    </>
                    : <span className='font-base text-sm text-gray-500'>No Socials to Connect on</span>
                    }
        </span>
        
        <span className="mt-1 text-neutral-700 font-normal text-base md:pr-14">
            {bot[3] ? bot[3] : `This is a HumanizeAI Bot created by for the purpose of helping people like you ! Try out the Bot, if you like, it would be a great time to make your own Free HumanizeAI Bot.`}
        </span>

        <div className="flex flex-col grow py-4 mt-4 border-t border-neutral-900">
            <span className="text-lg font-semibold pl-2 text-neutral-600 mb-3">People Chatted with {bot[18]} Bot :</span>
            <div className="flex flex-col gap-[1px]">
                {
                    loadingUsers ? (
                        <div className="flex flex-col gap-3 items-center justify-center h-full">
                            <RiLoader4Fill className="animate-spin w-8 h-8 text-neutral-500 mx-auto self-center justify-self-center" />
                        </div>
                    ) : (
                        chattedUsers.length == 0 ? (
                            <div className="flex flex-col gap-3 items-center justify-center h-full">
                                {/* <img src="/chatback.svg" alt="" className="h-32 lg:h-52" /> */}
                                <span className="text-neutral-900 font-medium text-left text-base self-start pl-2">No one has chatted with this Bot yet</span>
                            </div>
                        ) : (
                            chattedUsers.map((user: any, index: number)=>{
                                return (
                                    <ChattedUser
                                        key={index}
                                        image={user.image}
                                        name={user.name}
                                        lastMessage={user.lastMessage}
                                        messages={user.count}
                                        onMessageClick={()=>{
                                            props.setSection("chat-history")
                                            props.setChatHistoryWith(user.username)
                                        }}
                                    />
                                )
                            })
                        )
                    )
                }
            </div>
        </div>

    </div>
  )
}

interface BotInfoProps {
    botId: string,
    className?: string,
    section: "info" | "chat" | "setup" | "chat-history",
    setSection: any,
    setChatHistoryWith: any,
}

export default BotInfo