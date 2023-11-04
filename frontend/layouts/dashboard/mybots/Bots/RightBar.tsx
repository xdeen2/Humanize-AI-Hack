import Button from '@/components/Button'
import MyBotCard from '@/components/MyBotCard'
import { UserContext } from '@/pages/_app'
import React, { useContext } from 'react'
import { BsRobot } from 'react-icons/bs'
import { HiPlus } from 'react-icons/hi'
import { ImCancelCircle } from 'react-icons/im'

function RightBar({botSelected, setBotSelected, section, setSection, setSetupType, setShowOwnerInfo} : {botSelected: "general" | string, setBotSelected: Function, setSetupType: Function, section: "chat" | "setup" | "info" | "chat-history", setSection: Function, setShowOwnerInfo: Function}) {

    const { userDetails, bots } = useContext<any>(UserContext)

  return (
    <div className="fixed left-0 top-0 bg-bg-light-black lg:bg-transparent z-[500000] md:relative p-4 lg:p-0 flex flex-col items-start gap-2 h-full">
        <span className="text-neutral-400 text-lg self-center font-medium">
            Your Bots
        </span>

        <ImCancelCircle className="w-5 h-5 absolute top-4 right-4 md:hidden text-neutral-400 self-end cursor-pointer" onClick={(e)=>setShowOwnerInfo()} />

        {/* padding right 2 if height length crossed and scrollbar appears */}
        <div className={`flex flex-col gap-3 grow overflow-y-auto ${bots?.length > 1 ? "pr-2" : "pr-0"}`}>

            <span className="text-bg-100 font-medium">
                General Bot
            </span>

            <div id="general-bot-card" className={`bg-bg-lighter-black hover:bg-[#ffffff0f] cursor-pointer ${botSelected == "general" ? "!bg-[#ffffff1f] hover:!bg-[#ffffff0f]" : ""} p-4 rounded-xl flex flex-col gap-3`} onClick={()=>{
                setBotSelected("general")
                setSection("chat")
            }}>
                <div className="flex flex-row gap-3 items-center w-full justify-start">
                    {/* <img src="/assets/avatar.jpg" alt="Bot Image" className="rounded-full" width={40} height={40} /> */}
                    <BsRobot className="w-8 h-8 text-indigo-300" />
                    <span className="text-base font-semibold text-white">General Bot</span>
                </div>
                <span className="text-neutral-800 text-xs">
                    This is just your general purpose bot like GPT with some superpowers like, you can ask weather tonight or searching Youtube Videos.
                </span>
            </div>

            <span className="text-bg-100 font-medium mt-2" id="your-bots">
                Your Bots
            </span>

            {
                bots?.map((bot: any)=>{
                    return (
                        <MyBotCard
                            key={bot.id}
                            name={bot[18]}
                            description={bot[3]}
                            image={bot[20] ? `http://localhost:5000/assets/${bot[20]}` : undefined}
                            interactions={bot[4]}
                            likes={bot[5]}
                            username={bot[1]}
                            personal={bot[1] == bot[2]}
                            onCardClick={()=>{setBotSelected(bot[1]); setSection("info")}}
                            onSettingsClick={()=>{setBotSelected(bot[1]); setSetupType("edit"); setSection("setup")}}
                            onTrainingClick={()=>{setBotSelected(bot[1]); setSection("chat"); console.log("USER", userDetails); console.log("BOTS", bots)}}
                        />
                    )
                })
            }
            {/* <MyBotCard
                personal
                onSettingsClick={()=>{setBotSelected("Personal"); setSection("setup")}}
                onTrainingClick={()=>{setBotSelected("Personal"); setSection("chat")}}
            /> */}
        </div>

        <Button onClick={()=>{
            setBotSelected("")
            setSetupType("first")
            setSection("setup")
        }} className="w-full justify-center">
            <HiPlus />
            Create New Bot
        </Button>
    </div>
  )
}

export default RightBar