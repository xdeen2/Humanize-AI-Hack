import Message from "@/components/Message"
import { useEffect, useRef } from "react"
import { RiLoader2Line, RiLoader3Line, RiLoader4Fill, RiLoader4Line, RiLoaderLine } from "react-icons/ri"

function ChatList(props: ChatListProps) {

  const messagesEndRef = useRef<null | HTMLDivElement>(null)


  const scrollToBottom = () => {
    // messagesEndRef.current && (messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight)
    // scrolling but with smooth animation
    setTimeout(()=>{
      messagesEndRef.current && messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth"
      })
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
    console.log(props.botIcon)
  }, [props.chats]);

  return (
    <div ref={messagesEndRef} className={`overflow-y-auto flex flex-col h-full w-full p-2 lg:p-5 ${props.className}`}>
        {
          props.loading ? (
            <RiLoader4Fill className="animate-spin w-8 h-8 text-neutral-500 mx-auto self-center justify-self-center" />
          ) : (
            props.chats.length === 0 ? (
              <div className="my-auto self-center justify-self-center opacity-40 flex flex-col gap-3">
                <img src="/chatback.svg" alt="" className="h-32 lg:h-52" />
                <span className="text-neutral-500 font-medium text-base text-center lg:text-lg">Your Chats with the General Bot will Appear Here</span>
              </div>
            ) :
            props.chats.map((chat, index) => {
                return chat.links ?
                  chat.links.length>0 ? (
                    <Message invert={props?.invert} mode={props.mode} type="image" images={chat.links} sender={chat.sender} botIcon={chat.sender=="bot" ? props.botIcon ? props.botIcon.endsWith("False") ? undefined : props.botIcon : undefined : undefined} key={index} />
                    ) : (
                    <Message invert={props?.invert} mode={props.mode} sender={chat.sender} botIcon={chat.sender=="bot" ? props.botIcon ? props.botIcon.endsWith("False") ? undefined : props.botIcon : undefined : undefined} key={index}>{chat.message}</Message>
                  ) : (
                    <Message invert={props?.invert} mode={props.mode} sender={chat.sender} botIcon={chat.sender=="bot" ? props.botIcon ? props.botIcon.endsWith("False") ? undefined : props.botIcon : undefined : undefined} key={index}>{chat.message}</Message>
                )
            })
          )
        }
    </div>
  )
}

interface ChatListProps {
    chats: Chats[],
    mode: string,
    setMode?: any,
    botIcon?: string,
    className?: string,
    loading?: boolean,
    invert?: boolean
}

interface Chats {
    message: string,
    sender: string,
    links?: string[]
}

ChatList.defaultProps = {
    chats: [
      {
        message: "Hello, I am HumanizeAI. How can I help you?",
        sender: "bot"
      },
      {
        message: "I want to book a ticket",
        sender: "user"
      },
      {
        message: "Okay, please tell me the source and destination",
        sender: "bot"
      },{
        message: "Hello, I am HumanizeAI. How can I help you?",
        sender: "bot"
      },
      {
        message: "I want to book a ticket",
        sender: "user"
      },
      {
        message: "Okay, please tell me the source and destination",
        sender: "bot"
      },{
        message: "Hello, I am HumanizeAI. How can I help you?",
        sender: "user"
      },
      {
        message: "I want to book a ticket",
        sender: "user"
      },
      {
        message: "Okayy",
        sender: "bot"
      },
    ],
    mode: "night",
    setMode: () => {},
     loading: false
}

export default ChatList