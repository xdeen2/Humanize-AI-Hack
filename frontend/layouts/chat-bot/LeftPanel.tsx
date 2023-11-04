import { BookmarkBorderOutlined, CancelOutlined, DarkModeOutlined, LaunchOutlined, LightModeOutlined, LogoutOutlined, Menu, MenuOpenOutlined, Notifications, NotificationsOutlined, PersonOutlineOutlined, Settings, SettingsApplications, SettingsOutlined, SettingsRounded, SettingsSuggest, UpdateOutlined } from "@mui/icons-material"
import { Tooltip } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BsRobot } from "react-icons/bs"
import { RiChatHistoryLine } from "react-icons/ri"

function LeftPanel(props: {mode: string, setMode: any, showPersonalBotDialog: boolean, setShowPersonalBotDialog: any, showBusinessBotDialog: boolean, setShowBusinessBotDialog: any, changeChatTo: string | null, setChangeChatTo: any, changeChatToNotif: string | null, setChangeChatToNotif: any, showSettingsInMobile: boolean, setShowSettingsInMobile: any}) {

    const router = useRouter()

    const mode = props.mode
    const setMode = props.setMode

    const [notifications, setNotifications] = useState<string[]>([])
    const [notificationsLoading, setNotificationsLoading] = useState<boolean>(false)

    const [userDetails, setUserDetails] = useState<any>({})

    const [showHistory, setShowHistory] = useState<boolean>(false)
    const [historyLoading, setHistoryLoading] = useState<boolean>(false)
    const [history, setHistory] = useState<string[]>([])

    const [personal, setPersonal] = useState<boolean>(false)
    const [business, setBusiness] = useState<boolean>(false)

    const [showSettingsInMobile, setShowSettingsInMobile] = [props.showSettingsInMobile, props.setShowSettingsInMobile]

    const [tempuser, setTempuser] = useState(false)

    async function getChats() {
        setHistoryLoading(true)
        const res = await fetch("http://localhost:5000/history", {
            headers: {
                "x-access-token": localStorage.getItem("token")!
            }
        })
        const data = await res.json()
        setHistoryLoading(false)
        console.log("Data", data)
        if (data.success) {
            setHistory(data.message)
        }
    }

    async function getNotif() {
        setNotificationsLoading(true)
        const response = await fetch("http://localhost:5000/get-connections", {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("token")!
            }
        })

        const data = await response.json()
        console.log(data)
        setNotificationsLoading(false)
        setNotifications(data)
    }

    async function userInfo () {
        const res = await fetch("http://localhost:5000/ginfo", {
            headers: {
                "x-access-token": localStorage.getItem("token")!
            }
        })
        const data = await res.json()
        console.log(data)
        if (data.username != data.username_b){
            localStorage.getItem("token") ? 
            getNotif()
            :
            null
            setShowHistory(true)
            console.log("Set show history to true")
            setPersonal(true)
            getChats()
        } else {
            localStorage.getItem("token") ? 
            getNotif()
            :
            null
            localStorage.getItem("temptoken") ?
            setShowHistory(true)
            :
            setShowHistory(false)
            console.log("Set show history to false")
            setPersonal(false)
        }
        if (data.username_b != "None") {
            setBusiness(true)
        } else {
            setBusiness(false)
        }
        setUserDetails(data)
    }
    // const [showSettingsInMobile, setShowSettingsInMobile] =  [showSettings().showSettingsMenu, showSettings().setShowSettingsMenu]

    useEffect(()=>{
        if (localStorage.getItem("token") || localStorage.getItem("temptoken")) {
            if (localStorage.getItem("temptoken")) {
                setTempuser(true)
            }
            userInfo()
        } else {
            router.replace("/auth/login")
        }  
      }, [])

  return (
    <div className={`flex-col z-[10000] ${showSettingsInMobile ? "" : "hidden"} absolute h-screen md:h-auto md:relative w-screen md:w-64 md:flex justify-between duration-150 md:z-10 pt-2 md:pt-5 py-5 px-6 pr-3 mt-20 md:max-w-[16rem] ${mode === "day" ? "bg-neutral-100 !text-bg-900" : "bg-bg-900"}`}>
        <CancelOutlined className="block md:!hidden text-neutral-50 fill-neutral-50 cursor-pointer absolute top-3 right-5 text-xl" onClick={()=>{setShowSettingsInMobile(false)}} />
        <div className="flex flex-col gap-8 overflow-y-auto overflow-x-clip">

        {
            !tempuser ?
            <div className="flex flex-col gap-4 min-w-max">
                
                <span className={`text-sm font-semibold ${mode === "day" ? "text-bg-900" :"text-white"} flex gap-2.5 flex-row items-center mb-1`}>
                    <RiChatHistoryLine className="text-2xl" />
                    People Talked to Your Bot
                </span>

                {
                    notificationsLoading ? (
                        <img src="/assets/loading-circle.svg" alt="" className="w-6 h-6 animate-spin self-center" />
                    ) : notifications.length === 0 ? (
                        <span className={`text-sm ${mode === "day" ? "text-bg-900" :"text-white"} flex-wrap`}>No new notifications</span>
                    ) : (
                        notifications.map((notification, index) => {
                            return (
                                <span key={index} className={`text-sm ml-2 text-transparent bg-clip-text cursor-pointer ${mode === "day" ? "bg-bg-900" : "bg-gradient-to-r from-white via-white to-[#aaa]"} flex-wrap`} onClick={()=>{props.setChangeChatToNotif(notification); setShowSettingsInMobile(false)}}>
                                    {notification}
                                </span>
                            )
                        })
                    )
                    // :
                    // null
                }
                {/* <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#aaa] flex-wrap">Lorem ipsum or sit amet cohabsckj Right man?</span> */}
                {/* <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#aaa] flex-wrap">Lorem ipsum or sit amet cohabsckj Right man?</span> */}
            </div>
            :
            null
        }

        {
            Object.keys(userDetails).length === 0 ? <img src="/assets/loading-circle.svg" className="w-8 h-8 self-center" /> : showHistory &&
            <div className="flex flex-col gap-4">
                <span className={`text-sm font-semibold ${mode === "day" ? "text-bg-900" :"text-white"} flex gap-2.5 flex-row items-center mb-1`}>
                    <UpdateOutlined />
                    Your Chats History
                </span>
                
                {
                    historyLoading ? (
                        <img src="/assets/loading-circle.svg" alt="" className="w-6 h-6 animate-spin self-center" />
                    ) : (
                        history.length === 0 ? (
                            <span className={`text-sm ${mode === "day" ? "text-bg-900" :"text-neutral-300"} flex-wrap`}>No chats history</span>
                        ) : (
                            history.map((chat, index) => {
                                return (
                                    <span key={index} className={`text-sm ml-2 cursor-pointer text-transparent bg-clip-text ${mode === "day" ? "bg-bg-900" : "bg-gradient-to-r from-white via-white to-[#aaa]"} flex-wrap`} onClick={()=>{props.setChangeChatTo(chat); setShowSettingsInMobile(false)}}>
                                        {chat}
                                    </span>
                                )
                            })
                        )
                    )
                }

                {/* <span className="text-sm text-transparent cursor-default bg-clip-text bg-gradient-to-r from-white via-white to-transparent min-w-max overflow-clip">Can you prepare a writeup for my presentation</span> */}

            </div>
        }
        </div>

        <div className="flex flex-col gap-3 mt-8 pt-4 border-t-2 border-bg-500 pr-2">

        {
            tempuser ?
            <Link href="/auth/create-account" className={`font-medium text-sm ${mode === "day" ? "text-bg-900" :"text-white"} flex items-center gap-2.5`}>
                <BsRobot className="text-xl ml-[0.2rem] my-1" />
                Create your own Bot
            </Link>
            :
            null
        }    
    {
        Object.keys(userDetails).length === 0 ? <img src="/assets/loading-circle.svg" className="w-6 h-6 my-2 self-center" /> : (personal &&
            <span className={`font-medium text-sm select-none ${mode === "day" ? "text-bg-900" :"text-white"} flex items-center gap-2.5 cursor-pointer duration-200`} onClick={()=>{props.setShowPersonalBotDialog(true); setShowSettingsInMobile(false)}}>
                <SettingsSuggest />
                Personal Bot Settings
            </span>)
    }

    {
        (Object.keys(userDetails).length != 0 && business && !tempuser) &&
            <span className={`font-medium text-sm select-none ${mode === "day" ? "text-bg-900" :"text-white"} flex items-center gap-2.5 cursor-pointer duration-200`} onClick={()=>{props.setShowBusinessBotDialog(true); setShowSettingsInMobile(false)}}>
                <SettingsOutlined />
                Business Bot Settings
            </span>
    }

            
            <span className={`font-medium text-sm select-none ${mode === "day" ? "text-bg-900" :"text-white"} flex items-center gap-2.5 cursor-pointer duration-200`} onClick={()=>{setMode(mode === "day" ? "night" : "day")}}>
                {
                    mode === "day" ? ( <DarkModeOutlined /> ) : (<LightModeOutlined />)
                }
                {/* <DarkModeOutlined /> */}
                {
                    mode === "day" ? ( "Day Mode" ) : ("Night Mode")
                }
                {/* Dark Mode */}
            </span>

            <Link href="/#faqs" className={`font-medium text-sm ${mode === "day" ? "text-bg-900" :"text-white"} flex items-center gap-2.5`}>
                <LaunchOutlined />
                FAQs
            </Link>

            <span className={`font-medium text-sm ${mode === "day" ? "text-bg-900" :"text-white"} flex cursor-pointer items-center gap-2.5`} onClick={()=>{localStorage.removeItem("token"); localStorage.removeItem("temptoken"); localStorage.removeItem("user"); window.location.href = "/"}}>
                <LogoutOutlined />
                Logout
            </span>

        </div>

    </div>
  )
}

export default LeftPanel