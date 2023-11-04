import Button from '@/components/Button'
import { UserContext } from '@/pages/_app'
import { DashboardContext, Tab } from '@/pages/dashboard'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { FiEdit, FiLogOut } from 'react-icons/fi'
import { ImCancelCircle } from 'react-icons/im'

const poppins = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

function Sidebar() {

    const router = useRouter()

    const userContext = useContext<any>(UserContext)
    const dashboardContext = useContext<any>(DashboardContext)

    const [mobile, setMobile] = React.useState<boolean>(false)

    // useEffect(()=>{
    //     console.log("User", userContext)
    //     // 768px
    // }, [])
    useEffect(()=>{
        if (window.innerWidth < 768) {
            setMobile(true)
            document.getElementById("left-bar")?.classList.add("hidden")
        } else {
            setMobile(false)
            document.getElementById("left-bar")?.classList.remove("hidden")
        }
    }, [dashboardContext.currentTab])

  return (
    <div id="left-bar" className={`bg-transparent text-white flex flex-col items-start gap-2 h-full w-full px-4 lg:px-0 absolute top-0 left-0 !bg-bg-light-black lg:!bg-transparent z-[50000] lg:relative lg:w-[28vw] overflow-x-clip ${poppins.className}`}>
        <Link href="/" className='self-center'>
            <Image src="/longlogowhitecropped.png" alt="HumanizeAI Logo" width={220} height={10} className="my-5 mt-9 object-contain" />
        </Link>

        <ImCancelCircle className="w-5 h-5 absolute top-4 right-4 md:hidden text-neutral-400 self-end cursor-pointer" onClick={(e)=>{
            e.preventDefault()
            document.getElementById("left-bar")?.classList.add("hidden")
        }} />

        <div className="flex flex-col gap-2 mt-4 px-1 w-full grow">
            {
                dashboardContext.tabs?.map((tab: Tab, index: number)=>{
                    return (
                        <div
                            id={`tab-${index}`}
                            className={`flex flex-row items-center gap-3 py-3 px-5 rounded-xl cursor-pointer ${dashboardContext.currentTab === tab.name ? "bg-[#ffffff1f] text-white" : "bg-transparent text-white hover:bg-bg-light-black hover:text-white"}`}
                            onClick={()=>{dashboardContext.setCurrentTab(tab.name); dashboardContext.setCurrentSubTab(0); mobile ? document.getElementById("left-bar")?.classList.add("hidden") : null}}>
                            {tab.icon}
                            <span className="text-sm">{tab.name}</span>
                        </div>
                    )
                })
            }
            <div className="w-[90%] bg-neutral-800 h-[1px] my-0.5"></div>
            <div className="flex flex-row items-center gap-3 py-3 px-5 rounded-xl cursor-pointer bg-transparent text-white hover:bg-bg-light-black hover:text-white" onClick={()=>{
                userContext.setLoggedIn(false)
                localStorage.removeItem("token")
                window.location.href = "/"
            }}
            >
                <FiLogOut />
                <span className="text-sm" onClick={()=>{
                    userContext.setLoggedIn(false)
                    localStorage.removeItem("token")
                }}>Logout</span>
            </div>
        </div>

        <div className="bg-bg-lighter-black mb-2 lg:mb-0 lg:bg-bg-light-black flex flex-col items-start rounded-xl p-[1.15rem] w-full">
            
            <div className="flex flex-row gap-2 items-center w-full">
                <Image src={userContext.userDetails.pic != null ? userContext.userDetails.pic.startsWith("https") ? userContext.userDetails.pic : `http://localhost:5000/assets/${userContext.userDetails?.pic}` : "/assets/avatar.jpg"} alt="Profile Picture" width={45} height={45} className="rounded-full w-[45px] h-[45px] object-cover" />
                <div className="flex flex-col grow">
                    {
                        <div className="w-full gap-2 flex items-center">
                            <span className="text-sm">{userContext.userDetails?.name}</span>
                            {
                                userContext.userDetails?.plan > 0 && <Image src="/assets/thunder-gold.svg" alt="HumanizeAI Logo" width={15} height={15} />
                            }
                            {/* <div className="w-2 h-2 rounded-full bg-green-500">Free</div> */}
                        </div>
                    }
                    <span className="text-xs text-neutral-500">{userContext.userDetails?.email_id}</span>
                </div>

                <FiEdit className="text-neutral-500 self-start hover:text-white cursor-pointer" onClick={()=>{
                    dashboardContext.setCurrentTab("Settings")
                    dashboardContext.setCurrentSubTab(0)
                }} />
            </div>

            <Button className="mt-4 w-full !text-sm !border-[1px] text-center justify-center" variant='outline' onClick={()=>{dashboardContext.setCurrentTab("Upgrade")}}>Upgrade to Pro</Button>
        </div>
    </div>
  )
}

export default Sidebar