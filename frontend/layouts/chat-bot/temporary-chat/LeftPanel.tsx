import Button from "@/components/SpecialButton"
import { ArrowBack, BookmarkBorderOutlined, CancelOutlined, DarkModeOutlined, LaunchOutlined, LightModeOutlined, LogoutOutlined, Menu, MenuOpenOutlined, Notifications, NotificationsOutlined, PersonOutlineOutlined, Settings, SettingsApplications, SettingsOutlined, SettingsRounded, SettingsSuggest, UpdateOutlined } from "@mui/icons-material"
import { Tooltip } from "@mui/material"
import {BsRobot} from'react-icons/bs'
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RiArrowGoBackFill } from "react-icons/ri"

function LeftPanel(props: {
    mode: string,
    setMode: any,
    showSettingsInMobile: boolean,
    setShowSettingsInMobile: any
}) {

    const router = useRouter()

    const mode = props.mode
    const setMode = props.setMode

    const [notifications, setNotifications] = useState<string[]>([])
    const [notificationsLoading, setNotificationsLoading] = useState<boolean>(false)

    const [userDetails, setUserDetails] = useState<any>({})

    const [showHistory, setShowHistory] = useState<boolean>(false)
    const [historyLoading, setHistoryLoading] = useState<boolean>(false)
    const [history, setHistory] = useState<string[]>()

    const [personal, setPersonal] = useState<boolean>(false)
    const [business, setBusiness] = useState<boolean>(false)
    const [tempuser, setTempuser] = useState<boolean>(false)

    const [showSettingsInMobile, setShowSettingsInMobile] = [props.showSettingsInMobile, props.setShowSettingsInMobile]

    async function getChats() {
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : localStorage.getItem("temptoken")
        console.log("Getting chats history for", token)
        setHistoryLoading(true)
        const res = await fetch("http://localhost:5000/history", {
            headers: {
                "x-access-token": token!
            }
        })
        const data = await res.json()
        console.log("Got data", data)
        setHistoryLoading(data.message)
        setHistoryLoading(false)
        console.log("Data", data)
        console.log("Changed history to", history)
        if (data.success.toString()=="true") {
            setHistory(data.message)
            setHistoryLoading(false)
        } else {
            setHistoryLoading(false)
            console.log("failed")
        }
    }

    async function userInfo () {
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : localStorage.getItem("temptoken")
        console.log("Getting chats history for", token)
        const res = await fetch("http://localhost:5000/ginfo", {
            headers: {
                "x-access-token": token!
            }
        })
        const data = await res.json()
        console.log(data)
        if (data.username != data.username_b){
            setShowHistory(true)
            setPersonal(true)
            getChats()
        } else {
            setShowHistory(false)
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
            } else if (localStorage.getItem("token")) {
                setTempuser(false)
            }
            // userInfo()
            getChats()
        } else {
            router.replace("/auth/login")
        }  
      }, [])

  return (
    <div className={`flex-col z-[10000] ${showSettingsInMobile ? "" : "hidden"} absolute h-screen md:h-auto md:relative w-screen md:w-64 md:flex justify-between md:z-10 pt-2 md:pt-5 py-5 px-6 pr-3 mt-20 md:max-w-[16rem] ${mode === "day" ? "bg-neutral-100 !text-bg-900" : "bg-bg-900"}`}>
        <CancelOutlined className="block md:!hidden text-neutral-50 fill-neutral-50 cursor-pointer absolute top-3 right-5 text-xl" onClick={()=>{setShowSettingsInMobile(false)}} />
        <div className="flex flex-col gap-8 overflow-y-scroll overflow-x-clip">

        {
            !history ? <img src="/assets/loading-circle.svg" className="w-8 h-8 self-center" /> :
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
                                    <Link href={`https://vikrambots.ai/try-vikram-bots/${chat}`}>
                                    <span
                                        key={index}
                                        className={`text-sm ml-2 text-transparent cursor-pointer bg-clip-text ${mode === "day" ? "bg-bg-900" : "bg-gradient-to-r from-white via-white to-[#aaa]"} flex-wrap`}
                                        onClick={()=>{
                                            // props.setChangeChatTo(chat);
                                            setShowSettingsInMobile(false)
                                        }}
                                    >
                                        {chat}
                                    </span>
                                    </Link>
                                )
                            })
                        )
                    )
                }

                {/* <span className="text-sm text-transparent cursor-default bg-clip-text bg-gradient-to-r from-white via-white to-transparent min-w-max overflow-clip">Can you prepare a writeup for my presentation</span> */}

            </div>
        }
        {/* <Button title="Explore more Bots" buttonStyle="mr-auto mb-2" /> */}
        </div>

        <div className="flex flex-col gap-3 mt-8 pt-4 border-t-2 border-bg-500 pr-2">
            
            {
                tempuser ?   
                <Link href="/auth/create-account" className={`font-medium text-sm ${mode === "day" ? "text-bg-900" :"text-white"} flex items-center gap-2.5`}>
                    <BsRobot className="text-xl ml-[0.2rem] my-1" />
                    Create your own Bot
                </Link>
                :
                <Link href="/chat-bot" className={`font-medium text-sm ${mode === "day" ? "text-bg-900" :"text-white"} flex items-center gap-2.5`}>
                    <RiArrowGoBackFill className="text-xl ml-[0.2rem] my-1" />
                    Back to your own Bot
                </Link>
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

            <span className={`font-medium text-sm ${mode === "day" ? "text-bg-900" :"text-white"} flex cursor-pointer items-center gap-2.5`} onClick={()=>{localStorage.removeItem("token"); localStorage.removeItem("temptoken");localStorage.removeItem("user"); window.location.href = "/"}}>
                <LogoutOutlined />
                Logout
            </span>

        </div>

    </div>
  )
}

export default LeftPanel