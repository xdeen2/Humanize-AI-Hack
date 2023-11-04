import ContactForm from '@/layouts/contact-box/ContactForm'
import FAQs from '@/layouts/homepage/FAQs'
import React from 'react'
import { BiMenu } from 'react-icons/bi'

function HelpNFeedback() {
  return (
    <div className="p-6 py-10 flex flex-col w-full items-center gap-8 overflow-y-auto">

      <div className="flex flex-col gap-5 w-full items-center">
        <div className="flex gap-4 mb-2 lg:mb-0 w-full lg:justify-center">
          <BiMenu className="w-8 h-8 text-indigo-300 cursor-pointer lg:hidden" onClick={()=>{
            document.getElementById("left-bar")?.classList.toggle("hidden")
          }} />
          <span className="text-2xl text-neutral-200 font-semibold">Help & Feedback</span>
        </div>
        <span className="-mt-4 text-neutral-700 font-sm px-5 text-center">
          Checkout the FAQs for any help or send us a Feedback or Suggestion through the form below. We'll really appreciate your time & valuable feedback.
        </span>
      </div>
      <FAQs />

      <ContactForm />
    </div>
  )
}

export default HelpNFeedback