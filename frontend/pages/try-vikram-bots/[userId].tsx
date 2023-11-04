import ChatArea from "@/layouts/chat-bot/temporary-chat/ChatArea"
import LeftPanel from "@/layouts/chat-bot/temporary-chat/LeftPanel"
import { MenuBook, MenuOpenOutlined, MenuSharp } from "@mui/icons-material"
import { MenuList } from "@mui/material"
import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ['latin'] })

function ChatBot() {

  
  const [mode, setMode] = useState<"day" | "night">("night")
  
  const [showPersonalBotDialog, setShowPersonalBotDialog] = useState(false)
  const [showBusinessBotDialog, setShowBusinessBotDialog] = useState(false)
  
  const [changeChatTo, setChangeChatTo] = useState<string | null>(null)
  const [changeChatToNotif, setChangeChatToNotif] = useState<string | null>(null)

  const [showSettingsInMobile, setShowSettingsInMobile] = useState<boolean>(false)

  const router = useRouter()
  let userId: string = ''

  if (router.query.userId) {
    userId = router.query.userId as string
  }

  useEffect(()=>{
    if (localStorage.getItem("token") || localStorage.getItem("temptoken")) {
      console.log("token found")
    } else {
      console.log("token not found")
      router.replace(`/${userId}`)
    }
  }, [])

  return (
    <div className="bg-transparent">
      <MenuOpenOutlined className="block md:hidden w-8 h-8 text-neutral-50 fill-neutral-50 cursor-pointer absolute top-6 z-[10000000] right-7" onClick={()=>{setShowSettingsInMobile(true)}} />
    <div
      className={`flex absolute top-0 left-0 w-screen h-screen -z-10 flex-row ${inter.className}`}
    >
      <div className="absolute top-20 left-0 w-6 h-6 bg-white block md:hidden"></div>

      <LeftPanel
        mode={mode}
        setMode={setMode}
        showSettingsInMobile={showSettingsInMobile}
        setShowSettingsInMobile={setShowSettingsInMobile}
      />

      {
        userId ? 
        <ChatArea
          mode={mode}
          setMode={setMode}
          usernameToConnect={userId}
        />
        :
        null
      }
    </div>
    </div>
  );
}

export default ChatBot