import { AccountCircleOutlined, BookmarkBorderOutlined, BorderColorOutlined, ContentCopyRounded, Person2Outlined, ThumbDownAltOutlined, ThumbDownAltSharp, ThumbUpAlt, ThumbUpAltOutlined, ThumbUpAltSharp, ThumbUpOffAlt } from "@mui/icons-material"
import { useContext, useEffect, useRef, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import Parser from "html-react-parser"
import { BsFileEarmarkPdfFill, BsPersonCircle, BsRobot } from "react-icons/bs"
import toast from "react-hot-toast";
import { UserContext } from "@/pages/_app";

function Message({ children, type, images, mode, sender, botIcon, invert } : {children?: string, type?: "text" | "image", images?: string[], mode:string, sender: string, botIcon?: string, invert?: boolean}) {

  const [liked, setLiked] = useState<boolean>(false)
  const [disliked, setDisliked] = useState<boolean>(false)

  const userContext = useContext<any>(UserContext)

  const [formattedMessage, setFormattedMessage] = useState<any>("")

  useEffect(()=>{
    if (children != null || children != undefined) {
      console.log("message rendered", children)
  
      // setFormattedMessage(Parser(children))
      // linkifying the message

      if (children === "Loading...") {
        setFormattedMessage(children)
        return
      } else if (children == null) {
        setFormattedMessage(children)
        return
      }

      // let linkifiedMessage = children.replace(/(https?:\/\/[^\s]+)/g, ' <a href="$1" class="font-semibold text-blue-500 hover:text-blue-700 break-all" target="_blank">$1</a>')
      // links may end with a period, comma, closing parenthesis, closing square paranthesis or no punctuation at all
      let linkifiedMessage = children.replace(/(https?:\/\/[^\s]+)[,)]/g, ' <a href="$1" class="font-semibold text-blue-500 hover:text-blue-700 break-all" target="_blank">$1<br /></a>')
      // their maybe links at the end of the message
      // linkifiedMessage = linkifiedMessage.replace(/(https?:\/\/[^\s]+)$/g, ' <a href="$1" class="font-semibold text-blue-500 hover:text-blue-700 break-all" target="_blank">$1</a>')
      console.log(linkifiedMessage)
      // check for single backticks and triple backticks
      // let backtickRegex = /`([^`]+)`/g
      let backtickRegex2 = /```([^`]+)```/g
      
      // checking for links list containing image links within single quotes in the list. It looks like ['images/Screenshotfrom2023-09-1901-44-21.png', 'images/Screenshotfrom2023-09-1901-44-48.png', 'images/Screenshotfrom2023-09-2115-27-13.png', 'images/Screenshotfrom2023-09-1921-44-15.png', 'images/admitCardDTU.jpg']

      // let codifiedMessage = linkifiedMessage.replace(backtickRegex, '<code class="bg-neutral-200 text-neutral-900 p-1 rounded-md">$1</code>')
      let codifiedMessage = linkifiedMessage.replace(backtickRegex2, '<code class="bg-neutral-200 w-full text-bg-900 p-1 rounded-md">$1</code>')
      // check for single word code
      let singleWordCodeRegex = /`([^`]+)`/g
      codifiedMessage = codifiedMessage.replace(singleWordCodeRegex, '<code class="bg-neutral-500 text-bg-900 p-1 rounded-md">$1</code>')
      console.log(codifiedMessage)

      // checking for image links within single quotes starting with 'images/' like 'images/abcd/png'
      // checking for list square brackets first to replace it with 2x2 grid
      let listRegex = /\[([^\]]+)\]/g
      let listifiedMessage = codifiedMessage.replace(listRegex, '<div class="grid grid-cols-2 mt-4 flex-wrap gap-2">$1</div>')
      console.log(listifiedMessage)
      // removing commas in between the list
      let commaRegex = /,/g
      listifiedMessage = listifiedMessage.replace(commaRegex, '')
      console.log(listifiedMessage)
      // checking for image links within single quotes starting with 'images/' like 'images/abcd/png'
      let imageRegex = /'images\/([^']+)'/g
      let imagifiedMessage = listifiedMessage.replace(imageRegex, '<img src="http://localhost:5000/assets/images/$1" alt="" class="w-full rounded-xl object-cover" />')
      console.log(imagifiedMessage)
      // check for bold
      // let boldRegex = /\*([^*]+)\*/g
      // let boldifiedMessage = codifiedMessage.replace(boldRegex, '<span class="font-semibold">$1</span>')
      // console.log(boldifiedMessage)
      // checking for new line
      let newLineRegex = /\n/g
      // <br /> doesn't work, only \n works

      console.log(imagifiedMessage)

      // if the list is empty remove square brackets
      // creating a 2x2 grid of images by replacing the square brackets with divs & remove the inbetween commas

      // checing for <br /> tag
      setFormattedMessage((imagifiedMessage))
      // // check for italics
      // let italicRegex = /_([^_]+)_/g
      // let italicifiedMessage = boldifiedMessage.replace(italicRegex, '<span class="italic">$1</span>')
      // console.log(italicifiedMessage)
      // // check for strikethrough
      // let strikethroughRegex = /~([^~]+)~/g
      // let strikethroughifiedMessage = italicifiedMessage.replace(strikethroughRegex, '<span class="line-through">$1</span>')
      // console.log(strikethroughifiedMessage)
      // // check for underline
      // let underlineRegex = /\+([^+]+)\+/g
      // let underlineifiedMessage = strikethroughifiedMessage.replace(underlineRegex, '<span class="underline">$1</span>')
      // console.log(underlineifiedMessage)
      
    }
  }, [children])
  
  // const CC = dynamic(() => import("react-copy-to-clipboard").then(mod => mod.CopyToClipboard), { ssr: false })
  const [showImage, setShowImage] = useState<boolean>(false)
  const [image, setImage] = useState<string>("")

  return (
    // breaking all if width is going more than 200px
    <div className={`flex flex-col md:flex-row duration-200 gap-3 md:gap-3.5 items-start md:items-center h-fit w-fit max-w-[80%] lg:max-w-[70%] rounded-xl p-5 m-2 ${sender === "user" ? invert ? "bg-neutral-200 text-black self-start rounded-bl-none" : "bg-black text-white self-end rounded-br-none" : invert ? "bg-black text-white self-end rounded-br-none" : "bg-neutral-200 text-black self-start rounded-bl-none"}`}>
      {
        showImage ?
        <div className="fixed top-0 left-0 h-screen w-screen z-[10000000] bg-[rgba(0,0,0,0.4)]" onClick={()=>{
          setShowImage(false)
        }} onMouseOver={()=>{
            setShowImage(true)
        }} onMouseOut={()=>{
            setShowImage(false)
        }}>
          <img src={image} alt="" className="fixed cursor-pointer rounded-lg shadow-lg z-[1000000] top-1/2 left-1/2 -translate-x-1/2 mt-5 -translate-y-1/2 h-[75vh]" onMouseOver={()=>{
            setShowImage(true)
          }} onClick={()=>{
            setShowImage(false)
          }} onMouseOut={()=>{
            setShowImage(false)
          }} />
        </div>
        :
        null
      }
      {/* <ToastContainer autoClose={1000} position="bottom-right" /> */}
        {
            sender === "user" || sender === "User" ? (
                <BsPersonCircle className={`w-6 ${(formattedMessage)?.toString()?.startsWith("pdf<") ? "hidden" : ""} h-6 min-w-[24px] min-h-[24px] duration-200`} />
            ) : (
              botIcon ?
                <img src={botIcon} alt="HumanizeAI Bot" className="duration-200 rounded-full object-cover" width={40} height={40} /> :
                // <Image src={ mode === "night" ? "/hblack.png" : "/hblack.png"} alt="HumanizeAI Bot" className="duration-200" width={40} height={40} />
                <BsRobot className={`w-7 h-7 min-w-[26px] min-h-[26px] duration-200`} />
            )
        }
        <div id="msg-box" className={`duration-200 ${sender === "user" ? invert ? "text-black" : "text-white" : invert ? "text-white" : "text-black"} font-medium text-sm grow`}>
          {
            children != "Loading..."
            ? type === "image" ? (
              <div className="flex flex-row items-start flex-wrap gap-2">
                {
                  images && images.length > 0 ? images.map((image, index) => {
                    return (
                      <img
                        src={`http://localhost:5000/assets/${image}`}
                        alt=""
                        className="h-48 rounded-xl object-cover"
                        key={index}
                        onMouseOver={()=>{
                            setImage(`http://localhost:5000/assets/${image}`)
                            setShowImage(true)
                          // setShowImage(true)
                        }}
                        onMouseOut={()=>{
                          setShowImage(false)
                        }}
                      />
                    )
                  }) : null
                }
              </div>
            ) :
            (formattedMessage)?.toString()?.startsWith("pdf<") ?
            <div className="flex flex-row gap-2 items-center">
              <BsFileEarmarkPdfFill className="w-10 h-10 mb-1 text-red-400" />
              <span className="text-sm font-medium break-all">{
                // getting corresponding pdf name from pdfs array in userDetails
                // formattedMessage.toString().split("<<")[1].split(">>")[0]
                JSON.parse(userContext.userDetails?.pdfs).find((pdf: any) => {
                  return pdf.id === (formattedMessage)?.toString()?.split("<<")[1]?.split(">>")[0]
                })?.title
                // formattedMessage?.toString()
              }.pdf</span>
            </div>
            :
            (formattedMessage)?.toString()?.startsWith("img<") ?
            <div className="flex flex-row gap-2 items-center">
              <img
                src={`http://localhost:5000/assets/${(formattedMessage)?.toString()?.split("<<")[1]?.split(">>")[0]}`}
                alt=""
                className="h-48 rounded-xl object-cover"
                onClick={()=>{
                  setImage(`http://localhost:5000/assets/${(formattedMessage)?.toString()?.split("<<")[1]?.split(">>")[0]}`)
                  setShowImage(!showImage)
                }}
              />
            </div>
            :
            <div
              dangerouslySetInnerHTML={{ __html: formattedMessage}}
              // breaking all if the div width is greater than 200px
              className={`whitespace-pre-wrap`}
            ></div>
            :
            <div className="bouncing-loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
            // <img src="/assets/chatLoading2.svg" alt="" className="w-10 h-10 self-center" />
          }
        </div>

        <div className="flex gap-2">
          {
            sender === "user" || sender === "User" ? (
              // <BorderColorOutlined className={`w-5 h-5 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} />
                // <ContentCopyRounded className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} onClick={() => {navigator.clipboard.writeText(children); toast.success("Copied to Clipboard!")}} />
                  null
                ) : children === "Loading..." ? null : (
              <div className="flex gap-2">
              {
              //   liked ? (
              //     <ThumbUpAltSharp className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-primary-500" : "fill-primary-900"}`} onClick={()=>{setLiked(false)}} />
              //   ) : (
              //     <ThumbUpAltOutlined className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} onClick={()=>{setLiked(true); setDisliked(false)}} />
              //   )
              // }
              // {
              //   disliked ? (
              //     <ThumbDownAltSharp className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-primary-500" : "fill-primary-900"}`} onClick={()=>{setDisliked(false)}} />
              //   ) : (
              //     <ThumbDownAltOutlined className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} onClick={()=>{setDisliked(true); setLiked(false)}} />
              //   )
              }
                <ContentCopyRounded
                  className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-bg-light-black" : "fill-neutral-900"}`}
                  onClick={() => {
                    children ?
                    navigator.clipboard.writeText(children)
                    :
                    null;
                    toast.success("Copied to Clipboard!")
                  }}
                  />
              </div>
            )
          }

          {/* <BookmarkBorderOutlined className={`w-5 h-5 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} /> */}
        </div>
    </div>
  )
}


export default Message