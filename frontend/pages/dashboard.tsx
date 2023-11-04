import Sidebar from '@/layouts/dashboard/Sidebar'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './_app'
import { createContext } from 'react'
import Integrations from '@/layouts/dashboard/integrations/Integrations'
import HelpNFeedback from '@/layouts/dashboard/helpnfeedback/HelpNFeedback'
import Settings from '@/layouts/dashboard/settings/Settings'
import Upgrade from '@/layouts/dashboard/upgrade/Upgrade'
import { RiRobotLine } from 'react-icons/ri'
import { Poppins } from 'next/font/google'
import { FiHelpCircle, FiSettings } from 'react-icons/fi'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { TbPlugConnected } from 'react-icons/tb'
import { BsRobot } from 'react-icons/bs'
import { RxCardStack } from 'react-icons/rx'
import MyBots from '@/layouts/dashboard/mybots/MyBots'
import ExploreBots from '@/layouts/dashboard/bots/Bots'
import { ToastBar, Toaster } from 'react-hot-toast'
import BotProfile from '@/layouts/dashboard/bots/BotProfile'
import BotChat from '@/layouts/dashboard/bots/BotChat'
import Joyride from 'react-joyride'

const poppins = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

export const DashboardContext = createContext({})

function Dashboard() {

    const router = useRouter()

    const { loggedIn, userDetails, bots, setLoggedIn, setUserDetails, setBots } = useContext<any>(UserContext)

    const [currentTab, setCurrentTab] = useState<"My Bots" | "Explore Bots" | "Integrations" | "Help & Feedback" | "Settings" | "Upgrade">("My Bots")
    const [currentSubTab, setCurrentSubTab] = useState<number>(0)
    const [extraInfo, setExtraInfo] = useState<any>("")

    const tabs: Tab[] = [
        {
            name: "My Bots",
            icon: <BsRobot className='w-5 h-5 text-blue-500' />,
            subTabs: {
                0: <MyBots />,
            }
        },
        {
            name: "Explore Bots",
            icon: <RxCardStack className='w-5 h-5 text-teal-600' />,
            subTabs: {
                0: <ExploreBots />,
                1: <BotProfile />,
                2: <BotChat />
            }
        },
        {
            name: "Integrations",
            icon: <TbPlugConnected className='w-5 h-5 text-green-600' />,
            subTabs: {
                0: <Integrations />,
            }
        },
        {
            name: "Upgrade",
            icon: <Image src="/assets/thunder-gold.svg" alt="HumanizeAI Logo" width={15} height={15} />,
            subTabs: {
                0: <Upgrade />,
            }
        },
        {
            name: "Settings",
            icon: <FiSettings className='w-5 h-5 text-violet-600' />,
            subTabs: {
                0: <Settings />,
            }
        },
        {
            name: "Help & Feedback",
            icon: <FiHelpCircle className='w-5 h-5 text-yellow-400' />,
            subTabs: {
                0: <HelpNFeedback />,
            }
        },
    ]

    const  getInfo = async () => {
        if (localStorage.getItem("token") === null) {
            console.log("Token null")
            return null
        } else {
            console.log("Token not null")
            const res = await fetch("http://localhost:5000/ginfo", {
                headers: {
                    "x-access-token": localStorage.getItem("token")!
                }
            })
            const data = await res.json()
            console.log(data)
            
            if (data.success == false) {
                localStorage.removeItem("token")
                router.replace("/")
                return
            }
            setUserDetails(data.data)
            setBots(data.bots)
            setLoggedIn(true)
        }
    }

    const dashboardContext = {
        currentTab,
        setCurrentTab,
        currentSubTab,
        setCurrentSubTab,
        tabs,
        extraInfo,
        setExtraInfo,
        getInfo
    }

    useEffect(()=>{
        console.log("User", userDetails)
        if (localStorage.getItem("token")) {
            console.log("token found")
            if (Object.keys(userDetails).length == 0) {
                console.log("user details not found")
                getInfo()
            }
        } else {
            console.log("token not found")
            window.location.href= "/"
        }
    }, [])

    useEffect(()=>{
        // check if there is ?user= in url
        console.log("Queries", router.pathname, router.query)
        if (router.query.user != undefined && router.query.user != null) {
            setCurrentTab("Explore Bots")
            setExtraInfo({
                botToChat: router.query.user
            })
            setCurrentSubTab(1)
        }
    }, [router.query])

    const [showTut, setShowTut] = useState<boolean>(false)

    useEffect(()=>{
        if (userDetails && "firsttime" in userDetails) {
            console.log("Checking firsttime", userDetails?.firsttime)
            if (userDetails?.firsttime == 1 || userDetails?.firsttime == true || userDetails?.firsttime == undefined) {
                console.log("First time")
                setShowTut(true)
            } else {
                console.log("Not first time")
                setShowTut(false)
            }
        } else {
            setShowTut(false)
        }
        // setShowTut(true)
    }, [userDetails])

    const setFirstTimeOff = async () => {
        const response = await fetch("http://localhost:5000/set-first-time-off", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")!
            }
        })
        const data = await response.json()

        console.log(data)
        if (!data.success) {
            setUserDetails({...userDetails, firsttime: false})
            console.log("Error setting first time flase")
        }
    }

  return (
    <DashboardContext.Provider value={ dashboardContext }>

        <Toaster
          position="top-center"
          reverseOrder={false}
          containerClassName={`${poppins.className} font-medium`}
        />

        {
            showTut ?
            <div className='z-[99999]'>
                <Joyride
                    showProgress
                    continuous
                    styles={{buttonNext: {...poppins.style, backgroundColor: "#1f1f1f"}, buttonBack: {color: "#1f1f1f", ...poppins.style}, tooltipTitle: {...poppins.style}, tooltipContent: {...poppins.style}, tooltip: {...poppins.style}}}
                    callback={(data)=>{
                        if (data.status == "finished") {
                            setFirstTimeOff()
                        }
                    }}
                    steps={[
                        // {
                        //     target: "#left-bar",
                        //     content: "You can checkout other sections like Explore AI Bots, Integrating your Trained Bots etc here.",
                        //     disableBeacon: true,
                        // },
                        {
                            target: "#tab-0",
                            content: "This is where your Humanize General Bot and your other trained Bots will appear.",
                            disableBeacon: true,
                            placement: "right-end",
                            
                        },
                        {
                            target: "#general-bot-card",
                            content: <span>This is your General-purpose Bot that got some superpowers like <b>sending E-Mails</b> for you (If logged in with Google only) or checking weather or getting <b>YouTube Videos</b> for you.</span>,
                            disableBeacon: true,
                            placement: "left",
                        },
                        {
                            target: "#your-bots",
                            content: <div className="flex flex-col items-start">
                                <span>This is where all your trained bots either Personal (That replicates you, and is your profile&apos;s default bot) or the other bots you build.</span>
                                <span>You can change the settings of Bots once created, and chat with them to train them in the long term</span>
                            </div>,
                            disableBeacon: true,
                            placement: "left"
                        },
                        {
                            target: "#tab-1",
                            content: "Here, You can find other AI Bots trained by people that might help you. For Eg. Getting a basic Legal Advice or finetuning your Resume etc",
                            disableBeacon: true,
                            placement: "right"
                        },
                        {
                            target: "#tab-2",
                            content: "Here, you can start Integrating your built/trained AI Bot into your own Website (Discord & Telegram Int. Coming soon).",
                            disableBeacon: true,
                            placement: "right"
                        },
                        {
                            target: "#tab-3",
                            content: "Pricing plans to be released in future. As for now, all the features are free to use.",
                            disableBeacon: true,
                            placement: "right"
                        },
                        {
                            target: "#tab-4",
                            content: "Settings for your account, also synced with your Personal Bot Settings that replicates you.",
                            disableBeacon: true,
                            placement: "right-start"
                        },
                        {
                            target: "#tab-5",
                            content: "You can leave us a message here & we'll get back to you within 24 hours or get your queries resolved from FAQs.",
                            disableBeacon: true,
                            placement: "right-start"
                        },
                    ]} />
            </div>
            :
            null
        }

        <div className={`bg-bg-950 lg:p-4 gap-5 flex flex-col lg:flex-row h-screen w-screen ${poppins.className}`}>
            <Sidebar />
            <div className="h-full w-full bg-bg-light-black rounded-xl">
                {
                    tabs.map((tab: Tab, index: number)=>{
                        return (
                            <div key={index} className={`${currentTab === tab.name ? "flex" : "hidden"} flex-col h-full w-full`}>
                                {
                                    tab.subTabs[currentSubTab]
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>

    </DashboardContext.Provider>
  )
}

export interface Tab {
    name: string,
    icon: JSX.Element | any,
    subTabs: {
        [key: number]: JSX.Element
    }
}

export default Dashboard