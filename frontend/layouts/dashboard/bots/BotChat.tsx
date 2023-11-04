import BotCard from '@/components/BotCard'
import MyBotCard from '@/components/MyBotCard'
import ChatSection from '@/layouts/chat-bot/ChatSection'
import { DashboardContext } from '@/pages/dashboard'
import { Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiLeftArrow, BiLeftArrowAlt, BiMenu } from 'react-icons/bi'
import { BsRobot } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
import { LuPanelRightOpen } from 'react-icons/lu'
import { RiDiscordFill, RiInstagramFill, RiLink, RiLinkedinBoxFill, RiTelegramFill, RiTwitterFill, RiWhatsappFill, RiYoutubeFill } from 'react-icons/ri'

function BotChat() {

    const dashboardContext = React.useContext<any>(DashboardContext)

    const [showOwnerInfo, setShowOwnerInfo] = React.useState<boolean>(false)

    const [chats, setChats] = React.useState<any[]>([])
    const [chatsUpdater, setChatsUpdater] = React.useState<any>(null)
    const [chatsLoading, setChatsLoading] = React.useState<boolean>(false)

    const fetchMessages = async () => {
        setChatsLoading(true)
        const response = await fetch(`http://localhost:5000/get-chats/${dashboardContext.extraInfo.botToChat}`, {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token")!,
          }
        })
    
        const data = await response.json()
        console.log(data)
    
        if (data.success) {
          setChats(data.data.reverse())
          setChatsLoading(false)
        } else {
          console.log(data)
          toast.error("Error fetching chats")
          setChatsLoading(false)
        }
      }

    const sendMessage = async (message: string) => {
        console.log("Sending message", message)
        console.log("Existing chats", chats)
        let tempChats = [...chats]
        tempChats.push({message: message, sender: "user"})
        tempChats.push({message: "Loading...", sender: "bot"})
        console.log("Temp chats", tempChats)
        setChatsUpdater(message)
        const oldLength = tempChats.length
        console.log("New chats", chats)
      }
    
      useEffect(()=>{
        if (chatsUpdater === null) return
        let tempChats = [...chats]
        tempChats.push({message: chatsUpdater, sender: "user"})
        tempChats.push({message: "Loading...", sender: "bot"})
        setChats(tempChats)
      }, [chatsUpdater])
    
      useEffect(() => {
        if (chatsUpdater === null) return
        console.log("Sending msg", chatsUpdater)
        const url = `http://localhost:5000/connect-business/${localStorage.getItem("token")}/${dashboardContext.extraInfo.botToChat}/${chatsUpdater}`
    
        if (chats[chats.length - 1]?.message === "Loading...") {
      if ('EventSource' in window) {
          let source = new EventSource(url, {withCredentials: false})
    
          source.addEventListener("open", (e: any) => {
            console.log("Connection opened")
          })
    
          source.addEventListener("message", (e: any) => {
            console.log("Printing msgs")
            const newData = (e.data);
            let newChats = [...chats]
            if (newChats[newChats.length - 1]?.message === "Loading...") {
              newChats[newChats.length - 1].message = JSON.parse(JSON.stringify(newData))
            } else {
              newChats[newChats.length - 1].message += JSON.parse(JSON.stringify(newData))
              setChats(newChats)
              console.log("New chats", newChats)
              console.log(newData);
            }
          })
    
          source.addEventListener("error", async(e: any) => {
            console.log("Error")
            console.log(e)
            source.close()

            if (chats[chats.length - 1]?.message !== "Loading...") {
              const response = await fetch(`http://localhost:5000/get-last-msg/${dashboardContext.extraInfo.botToChat}`, {
                method: "GET",
                headers: {
                  "x-access-token": localStorage.getItem("token")!,
                }
              })
              const data = await response.json()
              console.log(data)
  
              if (data.success) {
                let newChats = [...chats]
                newChats[newChats.length - 1].message = data.data
                setChats(newChats)
              }
            }
          })
    
        } else {
          console.log("EventSource not supported")
        }
      }
      }, [chats.length])

      const [mobile, setMobile] = React.useState<boolean>(false)

      useEffect(()=>{
        fetchMessages()
        // 768px
        if (window.innerWidth < 768) {
          setMobile(true)
        }
        else {
          setMobile(false)
        }
      }, [dashboardContext.extraInfo.botToChat])

  return (
    <div className="h-full w-full flex flex-row">
        <div className='max-h-full flex flex-col w-full overflow-y-auto'>

            <div className="w-full bg-black rounded-t-xl px-8 pl-6 py-3.5 flex flex-row gap-4 h-fit items-center" id="chat-header">
              <div className="flex flex-col gap-2">
              <BiMenu className="w-8 min-w-[28px] min-h-[28px] h-8 text-indigo-300 cursor-pointer lg:hidden" onClick={()=>{
            document.getElementById("left-bar")?.classList.toggle("hidden")
          }} />
                <BiLeftArrowAlt className="w-8 h-8 hidden lg:block cursor-pointer text-neutral-400 -mr-1" onClick={()=>{
                    dashboardContext.setCurrentSubTab(1);
                }} />
              </div>

            <img src={dashboardContext.extraInfo?.botDetails?.image ? `http://localhost:5000/assets/${dashboardContext.extraInfo?.botDetails?.image}` : "/assets/avatar.jpg"} alt="" className="rounded-full w-12 h-12 object-cover select-none" />
            <div className="flex flex-col items-start gap-0.5">
                <span className="text-neutral-400 text-base md:text-lg font-semibold flex flex-col mb-1 lg:mb-0 md:flex-row md:gap-3">
                {dashboardContext.extraInfo?.botDetails?.name}
                <span className="text-sm font-medium text-neutral-800 self-center hidden lg:block">
                    @{dashboardContext.extraInfo?.botDetails?.botid}
                </span>
                </span>
                <Tooltip title={dashboardContext.extraInfo?.botDetails?.description}>
                <span className="text-neutral-700 text-xs">
                    {/* {dashboardContext.extraInfo?.botDetails?.description} */}
                    {/* at max 10 words, ... after that */}
                    {
                      mobile ?
                      dashboardContext.extraInfo?.botDetails?.description?.split(" ").slice(0, 8).join(" ")
                      :
                      dashboardContext.extraInfo?.botDetails?.description?.split(" ").slice(0, 15).join(" ")
                    }
                    {
                      mobile ?
                      dashboardContext.extraInfo?.botDetails?.description?.split(" ").length > 8 ? "..." : ""
                      :
                      dashboardContext.extraInfo?.botDetails?.description?.split(" ").length > 15 ? "..." : ""
                    }
                </span>
                </Tooltip>
            </div>

            <Tooltip title="Open Bot Owner's Info">
                <LuPanelRightOpen
                    className={`w-8 h-8 cursor-pointer text-neutral-400 ml-auto hover:text-indigo-300 duration-200 ${showOwnerInfo ? "text-indigo-500 rotate-180" : ""}`}
                    onClick={()=>{
                        setShowOwnerInfo(!showOwnerInfo);
                        if (!showOwnerInfo) {
                            document.getElementById("owner-info-box")?.classList.add("w-96");
                            document.getElementById("owner-info-box")?.classList.add("p-4");
                            document.getElementById("owner-info-box")?.classList.remove("w-0");
                            document.getElementById("owner-info-box")?.classList.add("border-l")
                            document.getElementById("owner-info-box")?.childNodes.forEach((e: any)=>{
                                if (e.nodeName === "DIV") {
                                    e?.classList.remove("hidden");
                                }
                            })
                        }
                        else {
                            document.getElementById("owner-info-box")?.classList.remove("w-96");
                            document.getElementById("owner-info-box")?.classList.add("w-0");
                            document.getElementById("owner-info-box")?.classList.remove("p-4")
                            document.getElementById("owner-info-box")?.classList.remove("border-l")
                            document.getElementById("owner-info-box")?.childNodes.forEach((e: any)=>{
                                if (e.nodeName === "DIV") {
                                    e?.classList.add("hidden");
                                }
                            })
                        }

                    }}
                />
            </Tooltip>
            </div>

            <ChatSection
              chatsLoading={chatsLoading}
              chats={chats}
              setChats={setChats}
              sendMessage={sendMessage}
            />
        </div>

        <div className="fixed left-0 top-0 bg-bg-light-black lg:bg-transparent z-[500000] md:relative w-0 h-full border-l-bg-50 overflow-y-auto flex flex-col items-center duration-200 origin-right" id="owner-info-box">
        <ImCancelCircle className="w-5 h-5 absolute top-4 right-4 md:hidden text-neutral-400 self-end cursor-pointer" onClick={(e)=>{
            setShowOwnerInfo(false);
            document.getElementById("owner-info-box")?.classList.remove("w-96");
            document.getElementById("owner-info-box")?.classList.add("w-0");
            document.getElementById("owner-info-box")?.classList.remove("p-4")
            document.getElementById("owner-info-box")?.classList.remove("border-l")
            document.getElementById("owner-info-box")?.childNodes.forEach((e: any)=>{
                if (e.nodeName === "DIV") {
                    e?.classList.add("hidden");
                }
            })
        }} />
            <img src={dashboardContext.extraInfo?.botOwner?.image ? dashboardContext.extraInfo?.botOwner?.image?.startsWith("https") ? dashboardContext.extraInfo?.botOwner?.image : `http://localhost:5000/assets/${dashboardContext.extraInfo?.botOwner?.image}` : "/assets/avatar.jpg"} alt="" className="rounded-full w-20 h-20 aspect-square object-cover mt-3" />
            <div className="flex flex-col items-center mt-3">
                <span className="text-neutral-400 text-lg font-medium gap-3">
                {dashboardContext.extraInfo?.botOwner?.name}
                </span>
                <span className="-mt-1 text-sm font-medium text-neutral-800 self-center">
                    @{dashboardContext.extraInfo?.botOwner?.username}
                </span>
                <span className="mt-1 text-sm font-normal text-bg-50">~ Member since 2022</span>
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
            <div className={`flex flex-col gap-2 mt-3 grow overflow-y-auto w-full ${dashboardContext.extraInfo?.botOwnerBots?.length > 1 ? "pr-2" : "pr-0"}`}>

            {/* <span className="text-bg-100 font-medium">
                Personal Bot
            </span>

            <div className={`bg-bg-lighter-black hover:bg-[#ffffff0f] cursor-pointer p-4 rounded-xl flex flex-col gap-3`} onClick={()=>{
                // setBotSelected("general")
                // setSection("chat")
            }}>
                <div className="flex flex-row gap-3 items-center w-full justify-start">
                    <BsRobot className="w-8 h-8 text-indigo-300" />
                    <span className="text-base font-semibold text-white">General Bot</span>
                </div>
                <span className="text-neutral-800 text-xs">
                    This is just a general ChatGPT bot that can be used for general purposes similar to ChatGPT.
                </span>
            </div> */}

            <span className="text-bg-100 font-medium mt-3">
                Other Bots by the User
            </span>

            {
                dashboardContext.extraInfo?.botOwnerBots?.map((bot: any, index: number)=>{
                    console.log("BB", bot);
                    return (
                        <MyBotCard
                            key={index}
                            name={bot[1]}
                            description={bot[3]}
                            image={bot[2] ? `http://localhost:5000/assets/${bot[2]}` : undefined}
                            interactions={bot[4]}
                            likes={bot[5]}
                            username={bot[0]}
                            personal={bot[0] == dashboardContext.extraInfo?.botOwner?.username}
                            onCardClick={()=>{
                              dashboardContext.setExtraInfo({...dashboardContext.extraInfo, botToChat: bot[0], botDetails: {name: bot[1], description: bot[3], image: bot[2], botid: bot[6]}})
                              dashboardContext.setCurrentSubTab(1);
                          }}
                        />
                    )
                })
            }
        </div>
        </div>
    </div>
  )
}

export default BotChat