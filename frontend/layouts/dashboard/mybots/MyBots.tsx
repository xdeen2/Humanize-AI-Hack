import ChatList from '@/layouts/chat-bot/ChatList'
import React, { useContext, useEffect, useState } from 'react'
import SearchBar from './Bots/SearchBar'
import RightBar from './Bots/RightBar'
import Setup from './Setup/Setup'
import { UserContext } from '@/pages/_app'
import ChatSection from '@/layouts/chat-bot/ChatSection'
import { Switch, Tooltip } from '@mui/material'
import { LuPanelRightOpen } from 'react-icons/lu'
import { BsRobot } from 'react-icons/bs'
import toast from 'react-hot-toast'
import {  BiLeftTopArrowCircle, BiMenu } from 'react-icons/bi'
import { AiOutlineArrowLeft, AiOutlineLeft } from 'react-icons/ai'
import Parser, {domToReact, htmlToDOM} from 'html-react-parser'
import { DashboardContext } from '@/pages/dashboard'
import BotInfo from './BotInfo/BotInfo'
import { ArrowLeft } from '@mui/icons-material'

function MyBots() {

  const userContext = useContext<any>(UserContext)

  const [botSelected, setBotSelected] = React.useState<"general" | string>("general")
  const [section, setSection] = React.useState<"chat" | "setup" | "info" | "chat-history">("chat")
  const [chatHistoryWith, setChatHistoryWith] = React.useState<string | null>(null)

  const [setupType, setSetupType] = React.useState<"first" | "edit">("first")

  const [chats, setChats] = React.useState<any[]>([])
  const [chatsUpdater, setChatsUpdater] = React.useState<any>(null)
  const [chatsLoading, setChatsLoading] = React.useState<boolean>(false)

  const [userMessage, setUserMessage] = React.useState<string>("")

  const [fileToSend, setFileToSend] = React.useState<any>("")

  const [showOwnerInfo, setShowOwnerInfo] = React.useState<boolean>(false)

  const [contstantApiReqCount, setConstantApiReqCount] = React.useState<number>(0)

  const [chatMode, setChatMode] = useState<"training" | "chat">("training")
  
  const fetchMessages = async () => {
    setChatsLoading(true)
    const response = await fetch(`http://localhost:5000/get-chats/${botSelected == "general" ? "humanize" : botSelected}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")!,
      }
    })

    const data = await response.json()
    // console.log(data)

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

  const uploadPDF = async (file: any, message: string) => {
    const uploadingPdfToast = toast.loading("Uploading PDF...")
    try {
      console.log("Uploading PDF", file)
      if (file.size > 5000000) {
        toast.error("File size should be less than 5MB")
        return
      } else if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed")
        return
      }
      const formData = new FormData()
      formData.append("file", file)
      formData.append("botid", botSelected)
      formData.append("message", message)
      const response = await fetch("http://localhost:5000/train-with-pdf", {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token")!,
        },
        body: formData
      })
      const data = await response.json()
      console.log(data)
  
      if (data.success) {
        toast.success("PDF uploaded successfully", {
          id: uploadingPdfToast
        })
        // add to pdfs array in userContext
        let pdfs = JSON.parse(userContext?.userDetails?.pdfs)
        pdfs.push({
          id: data.pdfid,
          title: file.name.split(".")[0],
        })
        userContext?.setUserDetails({
          ...userContext?.userDetails,
          pdfs: JSON.stringify(pdfs)
        })
        // add pdf<<data.pdfid>> to the chats array
        let tempChats = [...chats]
        tempChats.push({message: `pdf<<${data.pdfid}>>`, sender: "user"})
        setChats(tempChats)
      } else {
        toast.error(data.message, {
          id: uploadingPdfToast
        })
      }
    } catch (error) {
      toast.error("Error uploading PDF", {
        id: uploadingPdfToast
      })
    }
  }

  const uploadImage = async (file: any, message: string) => {
    const uploadingImageToast = toast.loading("Uploading Image...")
    try {

      if (file.size > 5000000) {
        toast.error("File size should be less than 5MB", {
          id: uploadingImageToast
        })
        return
      } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
        toast.error("Only JPG and PNG images are allowed", {
          id: uploadingImageToast
        })
        return
      }

      const formData = new FormData()
      formData.append("file", file)
      formData.append("botid", botSelected)
      formData.append("description", message)

      const response = await fetch("http://localhost:5000/upload-image", {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token")!,
        },
        body: formData
      })
      const data = await response.json()
      console.log(data)

      if (data.success) {
        toast.success("Image uploaded successfully", {
          id: uploadingImageToast
        })
        // add to images array in userContext
        // add img<<data.imageid>> to the chats array
        let tempChats = [...chats]
        tempChats.push({message: `img<<${data.link}>>`, sender: "user"})
        setChats(tempChats)
      } else {
        toast.error(data.message, {
          id: uploadingImageToast
        })
      }
    } catch (error) {
      console.log("ERR", error)
      toast.error("Error uploading image", {
        id: uploadingImageToast
      })
    }
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
    const url = botSelected == "general" ?
    `http://localhost:5000/general-bot/${localStorage.getItem("token")}/${chatsUpdater.replace("/", "%2F")}`
    :
    chatMode === "training" ?
    `http://localhost:5000/training/${localStorage.getItem("token")}/${botSelected}/${(chatsUpdater).replace("/", "%2F").replace("?", "%3F")}`
    :
    `http://localhost:5000/connect-business/${localStorage.getItem("token")}/${botSelected}/${chatsUpdater}`

    if (chats[chats.length - 1]?.message === "Loading...") {
      if ('EventSource' in window) {
        let source = new EventSource(url, {withCredentials: false})
        
        source.addEventListener("open", (e: any) => {
          console.log("Connection opened")
        })
  
        source.addEventListener("message", (e: any) => {
          console.log("Printing msgs")
          // preserving the formatting of new line coming from flask
          // const newData = e.data.split("\n").map((e: any) => {
          //   return e === "" ? '<br />' : e
          // })
          const newData = JSON.parse(JSON.stringify(e.data))
          // print the new word in the console with formatting
          let newChats = [...chats]
          if (newChats[newChats.length - 1]?.message === "Loading...") {
            // preserving the formatting of new line
            newChats[newChats.length - 1].message = (newData)
            setChats(newChats)
          } else {
            // adding the message chunk to the last message of the bot with preserving the formatting using <br />
            newChats[newChats.length - 1].message += newData
            // removing the <br /> from the last message of the bot
            // correcting the formatting
            console.log("New chats", newChats)
            setChats(newChats)
            // console.log("New chats", newChats)
            // console.log(newData);
          }
        })
  
        source.addEventListener("error", async(e: any) => {
          console.log("Error in connection")
          console.log(e)
          source.close()

          if (chats[chats.length - 1]?.message !== "Loading...") {
            const response = await fetch(`http://localhost:5000/get-last-msg/${botSelected == "general" ? "humanize" : botSelected}`, {
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


  useEffect(()=>{
    if (userContext?.userDetails?.setup === false) {
      setSection("setup")
      setBotSelected(userContext?.userDetails?.username ? userContext?.userDetails?.username : "")
    }
  }, [])

  useEffect(()=>{
    if (botSelected) {
      fetchMessages()
    }
  }, [botSelected])

  useEffect(()=>{
    const modeDesc = document.getElementById("chat-mode-desc")
    if (botSelected != "general" && modeDesc) {
      if (chatMode === "training") {
        modeDesc?.classList.remove("bg-emerald-700")
        modeDesc?.classList.add("bg-amber-700")
        modeDesc.innerText = "This is the training mode. The bot will remember whatever you teach it here."
      } else {
        modeDesc?.classList.remove("bg-amber-700")
        modeDesc?.classList.add("bg-emerald-700")
        modeDesc.innerText = "This is chat mode. You can chat to check, how your bot will talk to others."
      }
      modeDesc.classList.remove("h-0")
      modeDesc.classList.add("h-fit", "py-1.5")
      setTimeout(()=>{
        modeDesc.classList.add("h-0")
        modeDesc.classList.remove("h-fit", "py-1.5")
        modeDesc.innerHTML = ""
      }, 5000)
    } else if (modeDesc) {
      modeDesc.innerHTML = ""
      modeDesc.classList.remove("h-fit", "py-1.5")
      modeDesc.classList.add("h-0")
    }
  }, [chatMode, botSelected])

  const [mobile, setMobile] = React.useState<boolean>(false)

  useEffect(()=>{
    // check if window size is less than 768px
    if (window.innerWidth < 768) {
      document.getElementById("this-bot-owner-info")?.classList.remove("lg:w-[25rem]");
      document.getElementById("this-bot-owner-info")?.classList.remove("w-[100vw]");
      document.getElementById("this-bot-owner-info")?.classList.add("w-0");
      document.getElementById("this-bot-owner-info")?.classList.remove("p-4")
      document.getElementById("this-bot-owner-info")?.classList.remove("border-l")
      document.getElementById("this-bot-owner-info")?.childNodes.forEach((e: any)=>{
          // if (e.nodeName === "DIV") {
              e?.classList.add("hidden");
          // }
      })
      setMobile(true)
      setShowOwnerInfo(false)
    } else {
      setShowOwnerInfo(true)
      setMobile(false)
    }
  }, [section, botSelected])

  const getChatHistoryWith = async (username: string, botid: string) => {
    setChatsLoading(true)

    try {
      const response = await fetch(`http://localhost:5000/get-bot-chats/${botid}/${username}`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token")!,
        }
      })
      const data = await response.json()
      console.log("Chat history", data)
  
      if (data.success) {
        setChats(data.data.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Error fetching chat history")
    }
    setChatsLoading(false)
  }

  useEffect(()=>{
    if (chatHistoryWith && section === "chat-history" && chatHistoryWith !== "") {
      getChatHistoryWith(chatHistoryWith, botSelected)
    }
  }, [chatHistoryWith])

  // useEffect(()=>{
  //   // setting height of the chat-body to the height of 100%-height of chat-header and search bar
  //   const chatBody = document.getElementById("chat-body")
  //   const chatHeader = document.getElementById("chat-header")
  //   const searchBar = document.getElementById("search-bar")
  //   if (chatBody && chatHeader && searchBar) {
  //     console.log("Header height", chatHeader.clientHeight)
  //     console.log("Search bar height", searchBar.clientHeight)
  //     console.log("Chat body height", chatBody.clientHeight)
  //     console.log("Final height", `calc(100% - ${chatHeader.clientHeight + searchBar.clientHeight}px)`)
  //     chatBody.style.height = `calc(100% - ${chatHeader.clientHeight + searchBar.clientHeight}px)`
  //   }
  // }, [])

  return (
    <div className="h-screen max-h-screen lg:h-full w-full flex flex-row">

      <div className="flex flex-col h-screen lg:h-full w-full" id="chats-parent">

        <div className="w-full bg-black rounded-tl-xl px-8 py-3.5 flex flex-row items-center gap-4 h-fit" id="chat-header">
            {
              section === "chat-history" ? (
                <span className="py-2 px-4 rounded-full flex items-center gap-1 w-fit bg-bg-300 bg-opacity-50 hover:bg-opacity-75 active:opacity-95 text-neutral-50 cursor-pointer" onClick={()=>{
                  setSection("info")
                  setChatHistoryWith(null)
              }}>
                  <AiOutlineArrowLeft className="inline-block" />
                  {/* Go Back */}
              </span>
              ) : (
                null
              )
            }
          <BiMenu className="w-8 h-8 text-indigo-300 cursor-pointer lg:hidden" onClick={()=>{
            document.getElementById("left-bar")?.classList.toggle("hidden")
          }} />

          {botSelected == "general" 
          ?
          <BsRobot className="w-12 h-12 text-indigo-300 hidden lg:block" />
          :
          <img src={
            (userContext.bots?.find((bot: any) => bot[1] == botSelected) != null && userContext.bots?.find((bot: any) => bot[1] == botSelected)[20] != null)
            ?
            `http://localhost:5000/assets/${userContext.bots?.find((bot: any) => bot[1] == botSelected)[20]}`
            :
            "/assets/avatar.jpg"
            } alt="" className="rounded-full w-12 min-w-[48px] min-h-[48px] h-12 select-none object-cover" />
          }
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-neutral-400 text-base lg:text-lg font-semibold flex flex-col lg:flex-row items-start lg:items-center gap-2">
              {
                botSelected == "general"
                ?
                "General Bot"
                :
                userContext.bots?.length > 0
                ?
                userContext.bots?.find((bot: any) => bot[1] == botSelected)
                ?
                <>
                {
                  userContext.bots?.find((bot: any) => bot[1] == botSelected)[18]
                }
                &nbsp;
                {
                  section === "chat" ? (
                    <div className='flex items-center gap-2'>
                    {
                    chatMode === "chat" ?
                    "[Chatting Mode]"
                    :
                    "[Training Mode]"
                    }
                    <Switch
                      color='primary'
                      checked={chatMode === "training"}
                      onChange={()=>{
                        setChatMode((prev)=>{
                          if (prev === "chat") {
                            return "training"
                          } else {
                            return "chat"
                          }
                        })
                      }}
                    />
                    </div>                    
                  ) : ( 
                    null
                  )
                }
                </>
                :
                "Bot Name"
                :
                "Bot Name"
              }
            </span>
              <Tooltip title={userContext.bots?.length > 0
                ?
                userContext.bots?.find((bot: any) => bot[1] == botSelected)
                ?
                userContext.bots?.find((bot: any) => bot[1] == botSelected)[3]?.toString()
                :
                "Bot Description"
                :
                "Bot Description"
              }>
            <span className="text-neutral-700 hidden lg:block text-xs">
              {
                botSelected == "general"
                ?
                mobile ?
                "You can chat or ask queries related to HumanizeAI"
                :
                "You can chat here for fun or ask in-general queries or related to HumanizeAI"
                :
                userContext.bots?.length > 0
                ?
                userContext.bots?.find((bot: any) => bot[1] == botSelected)
                ? mobile ?
                userContext.bots?.find((bot: any) => bot[1] == botSelected)[3]?.split(" ")?.slice(0, 8)?.join(" ")?.toString() + (userContext.bots?.find((bot: any) => bot[1] == botSelected)[3]?.split(" ")?.length > 8 ? "..." : "")
                :
                userContext.bots?.find((bot: any) => bot[1] == botSelected)[3]?.split(" ")?.slice(0, 15)?.join(" ")?.toString() + (userContext.bots?.find((bot: any) => bot[1] == botSelected)[3]?.split(" ")?.length > 15 ? "..." : "")

                  :
                  "Bot Description comes here"
                  :
                  "Bot Description comes here"
                }
            </span>
                </Tooltip>
          </div>

          <Tooltip title="Open Bot Owner's Info">
            <LuPanelRightOpen
                className={`w-5 lg:w-8 min-w-[20px] h-5 lg:h-8 min-h-[20px] cursor-pointer text-neutral-400 ml-auto hover:text-indigo-300 duration-200 ${showOwnerInfo ? "rotate-180" : "rotate-0"}`}
                onClick={()=>{
                  console.log("Clicked", showOwnerInfo)
                  if (showOwnerInfo == false) {
                    document.getElementById("this-bot-owner-info")?.classList.add("lg:w-[25rem]");
                        document.getElementById("this-bot-owner-info")?.classList.add("w-[100vw]");
                        document.getElementById("this-bot-owner-info")?.classList.add("p-4");
                        document.getElementById("this-bot-owner-info")?.classList.remove("w-0");
                        document.getElementById("this-bot-owner-info")?.classList.add("border-l")
                        document.getElementById("this-bot-owner-info")?.childNodes.forEach((e: any)=>{
                            if (e.nodeName === "DIV") {
                                e?.classList.remove("hidden");
                            }
                        })
                    }
                    else {
                        document.getElementById("this-bot-owner-info")?.classList.remove("lg:w-[25rem]");
                        document.getElementById("this-bot-owner-info")?.classList.remove("w-[100vw]");
                        document.getElementById("this-bot-owner-info")?.classList.add("w-0");
                        document.getElementById("this-bot-owner-info")?.classList.remove("p-4")
                        document.getElementById("this-bot-owner-info")?.classList.remove("border-l")
                        document.getElementById("this-bot-owner-info")?.childNodes.forEach((e: any)=>{
                            if (e.nodeName === "DIV") {
                                e?.classList.add("hidden");
                            }
                          })
                        }
                        setShowOwnerInfo(!showOwnerInfo);
                }}
            />
          </Tooltip>
        </div>

        {
          section === "chat" ? (
            // calc height by subtracting header height and searchbar height
            <div className={`flex flex-col w-full overflow-y-auto grow lg:h-[calc(100%-4.6rem)]`} id="chat-body">
            <div id="chat-mode-desc" className="h-0 w-full px-4 text-xs text-white font-medium bg-emerald-700 duration-200">
            </div>
              <ChatSection
                allowAttachment={botSelected != "general"}
                chatsLoading={chatsLoading}
                chats={chats}
                sendMessage={sendMessage}
                uploadPDF={uploadPDF}
                uploadImage={uploadImage}
                setChats={setChats}
                botSelected={botSelected}
              />
            </div>
          ) :
          section === "chat-history" ? (
            <div className={`flex flex-col w-full overflow-y-auto grow lg:h-[calc(100%-4.6rem)]`} id="chat-body">
              <ChatSection
                allowAttachment={false}
                chatsLoading={chatsLoading}
                chats={chats}
                sendMessage={sendMessage}
                uploadPDF={uploadPDF}
                uploadImage={uploadImage}
                setChats={setChats}
                invert
                disableSending
              />
            </div>
          )
          :
          section === "setup" ? (
            <Setup type={setupType} botId={botSelected} />
          ) : (
            <BotInfo botId={botSelected} section={section} setSection={setSection} setChatHistoryWith={setChatHistoryWith} />
          )
        }

      </div>

      <div className={`w-[100vw] lg:w-[25rem] h-fit lg:h-full bg-bg-light-black lg:bg-transparent border-l p-4 border-l-bg-300 duration-300`} id="this-bot-owner-info">
        <RightBar
            setSetupType={setSetupType}
            botSelected={botSelected}
            setBotSelected={setBotSelected}
            section={section}
            setSection={setSection}
            setShowOwnerInfo={()=>{
              setShowOwnerInfo(false);
              document.getElementById("this-bot-owner-info")?.classList.remove("lg:w-[25rem]"); // w-[90vw] lg:w-[25rem]
              document.getElementById("this-bot-owner-info")?.classList.remove("w-[100vw]");
              document.getElementById("this-bot-owner-info")?.classList.add("w-0");
              document.getElementById("this-bot-owner-info")?.classList.remove("p-4")
              document.getElementById("this-bot-owner-info")?.classList.remove("border-l")
              document.getElementById("this-bot-owner-info")?.childNodes.forEach((e: any)=>{
                  if (e.nodeName === "DIV") {
                      e?.classList.add("hidden");
                  }
              })
            }}
          />
      </div>
    </div>
  )
}

export default MyBots