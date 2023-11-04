import React from 'react'
import ChatList from './ChatList'
import SearchBar from '../dashboard/mybots/Bots/SearchBar'

function ChatSection({ chats, setChats, sendMessage, chatsLoading, allowAttachment, uploadPDF, uploadImage, disableSending, invert, botSelected }: { chats: any[], setChats: Function, sendMessage: Function, chatsLoading: boolean, allowAttachment: boolean, uploadPDF?: Function, uploadImage?: Function, disableSending?: boolean, invert?: boolean, botSelected?: string }) {
  return (
    <>
        <ChatList
            loading={chatsLoading}
            chats={ chats }
            invert={invert}
        />

        {
          disableSending ? null :
          <SearchBar
              sendMessage={sendMessage}
              setChats={setChats}
              allowAttachment={allowAttachment}
              uploadPDF={uploadPDF}
              uploadImage={uploadImage}
              botSelected={botSelected}
          />
        }
    </>
  )
}

ChatSection.defaultProps = {
  chatsLoading: false,
  allowAttachment: false
}

export default ChatSection