import { DashboardContext } from '@/pages/dashboard';
import { CancelRounded, RefreshOutlined, SendOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react'
import { BsFileEarmarkPdfFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { RiLoader4Line } from 'react-icons/ri';
import { RxReload } from 'react-icons/rx';
import { TbPdf } from 'react-icons/tb';

function SearchBar(props: SearchProps) {

    const messageRef = useRef<MessageRefType | null>(null);

    const [userMessage, setUserMessage] = React.useState<string | null>(null)
    const [fileToSend, setFileToSend] = React.useState<any>("")

    const dashboardContext = useContext<any>(DashboardContext)

    interface MessageRefType extends HTMLTextAreaElement {
        style: CSSStyleDeclaration;
        scrollHeight: number;
    }

    useEffect(() => {
      if (messageRef.current) {
            messageRef.current.style.height = "0px";
            const scrollHeight = messageRef.current.scrollHeight;
            messageRef.current.style.height = scrollHeight + "px";
      } else {
        console.log(null)
      }
    }, [messageRef, userMessage]);

    useEffect(()=>{
      console.log("Type of file", fileToSend?.type)
    }, [fileToSend])

  return (
    <div className={`flex flex-col gap-2 w-full mt-auto lg:mt-0 z-50 p-3 lg:p-6 pt-2 lg:pt-2 duration-200 bg-transparent border-t border-bg-300`}>
          
          <div className="w-full flex flex-row justify-between items-end px-2">
            {/* <button className={`py-2 px-4 flex min-w-max items-center w-fit gap-2 mx-auto text-sm self-center font-medium bg-transparent rounded-xl border duration-200 border-neutral-700 text-neutral-700`} onClick={()=>{ props.setChats([]) }}>
              <RxReload className="w-4 h-4" />
              Reset chat
            </button> */}

            <span className={`${userMessage && userMessage?.split(" ")?.length > 799 ? "text-red-500" : "text-bg-100"} text-xs ml-auto`}>
              Word Limit: {userMessage && userMessage?.split(" ")?.length != 0 ? userMessage?.split(" ")?.length+" / " : ""}800
            </span>

          </div>

          {/* <span className={`${mode === "day" ? "text-bg-50" : "text-neutral-500"} duration-200 text-sm font-medium`}>Current search category: Ticket booking</span> */}

          <div className="flex flex-col gap-3 w-full">
            {
              // ==================SELECTED FILE PREVIEW=======================
              fileToSend != "" && <div className="flex flex-row gap-2 items-end">
                <span className="text-sm font-semibold min-w-max text-neutral-500">File to send:</span>
                <div className="flex flex-col gap-1">
                  {
                    fileToSend?.type == "application/pdf" ?
                    <BsFileEarmarkPdfFill className="w-10 h-10 mb-1 text-red-400" />
                    :
                    <img
                      src={typeof fileToSend === "object" ? URL.createObjectURL(fileToSend) : fileToSend ? fileToSend.toString() : ""}
                      alt="file to send"
                      className="w-fit h-14 rounded-md"
                    />
                  }
                <span className="text-sm text-neutral-500">{fileToSend?.name}</span>
                </div>
                <CancelRounded className='cursor-pointer w-5 text-red-400 self-center' onClick={() => {
                  setFileToSend("")
                }} />
              </div>
            }
          <div className={`flex flex-row items-center justify-between p-3 rounded-lg duration-200bg-bg-600 border border-bg-400`}>
            <textarea
              // type="text"
              ref={messageRef}
              className={`bg-transparent grow lg:text-sm border-none overflow-y-auto pr-2 pl-1 resize-none h-fit max-h-[120px] break-all outline-none text-neutral-500`}
              placeholder={fileToSend == "" ? dashboardContext.currentTab === "My Bots" ? props.botSelected=="general" ? "Text area" : "Teach your Bot in Training mode or upload PDF or Image as attachment  ->" : "Text area" : fileToSend?.type == "application/pdf" ? "Description of the PDF with which it will read it to store (Optional)." : "Enter caption to be stored with Image"}
              value={userMessage ? userMessage : ""}
              id="userMessage"
              onKeyDown={(e)=>{
                if(e.shiftKey){
                  if (e.key === "Enter") {
                    e.preventDefault()
                    setUserMessage(userMessage + "\n")
                  }
                } else if(e.key === "Enter"){
                  e.preventDefault()
                  fileToSend != "" ?
                    fileToSend?.type == "application/pdf" ?
                    props.uploadPDF(fileToSend, userMessage) && setUserMessage("") :
                    props.uploadImage(fileToSend, userMessage) && setUserMessage("") :
                    props.sendMessage(userMessage) && setUserMessage("");
                  setFileToSend("")
                }
              }}
              onChange={(e) => {
                // check if the message is not more than 1000 words
                if (e.target.value.split(" ").length > 800) {
                    return null
                }
                setUserMessage(e.target.value)
                console.log("New message", e.target.value)
              }}
            />
            <div className="icons flex gap-5">
              <input
                type="file"
                className="hidden w-0 h-0"
                id="send-img"
                // allowed only image & pdf
                accept="image/*, .pdf"
                // value={fileToSend === "object" ? fileToSend?.name! : fileToSend}
                onChange={(e)=>{
                  e?.target?.files && setFileToSend(e?.target?.files[0])
                }} />
                {
                  props.allowAttachment ?
                  <Tooltip title="Upload PDF Knowledge to your Bot or Upload Image with a caption required">
                    <ImAttachment className="w-5 h-5 text-bg-50 fill-bg-50 cursor-pointer hover:fill-neutral-700 focus:fill-neutral-400" onClick={()=>{
                      document.getElementById("send-img")?.click()
                    }} />
                  </Tooltip>
                  :
                  null
                }
              {
                (props.sendingMessage)
                ?
                <RiLoader4Line className="w-5 h-5 fill-bg-100 animate-spin" />
                :
                <SendOutlined onClick={async ()=> {
                  (props.sendingMessage)
                  ?
                  console.log('l')
                  :
                  (
                    fileToSend != "" ?
                    fileToSend?.type == "application/pdf" ?
                    props.uploadPDF(fileToSend, userMessage) && setUserMessage("") :
                    props.uploadImage(fileToSend, userMessage) && setUserMessage("") :
                    props.sendMessage(userMessage) && setUserMessage("")
                  );
                  setFileToSend("")
                }} className={`w-5 h-5 ${props.sendingMessage ? "fill-bg-300" : "fill-bg-50 text-bg-50 hover:fill-neutral-700 focus:fill-neutral-400"} cursor-pointer`} />
              }
              </div>
          </div>
          </div>
        </div>
  )
}

const SearchBar2 = () => {
  return <div className=''>
    abcd
  </div>
}

interface SearchProps {
    sendingMessage?: boolean,
    className?: string,
    botSelected?: string,
    // userMessage: string,
    // setUserMessage: any,
    sendMessage: any,
    setChats: any,
    allowAttachment?: boolean,
    uploadPDF?: any,
    uploadImage?: any
}

export default SearchBar