import Button from "@/components/Button"
import InputGroup from "@/components/InputGroup"
import PrimaryButton from "@/components/PrimaryButton"
import SpecialText from "@/components/SpecialText"
import { Mail, MailOutline } from "@mui/icons-material"
import { Orbitron } from "next/font/google"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import 'react-toastify/dist/ReactToastify.css';

const orbitron = Orbitron({subsets: ["latin"]})

function ContactForm(props: {className?: string, showTitle: boolean, showDescription?: boolean, showMail?: boolean}) {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  async function submitForm() {
    const response = await fetch("https://humanize-ai-default-rtdb.firebaseio.com/queries.json", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        description: description
      })
    })
    const data = await response.json()

    console.log(data)
    if (data.name) {
      toast.success('Form submitted successfully');
      setName("")
      setEmail("")
      setDescription("")
    } else {
      toast.error('Error submitting form');
    }
  }

  return (
    <div className={`flex flex-row px-3 md:px-24 py-8 md:py-20 bg-white w-full rounded-xl relative ${props.className}`}>
        <div className="flex flex-col grow justify-center px-3 md:px-0 z-10">
            
            {props.showTitle && <span className={`font-semibold text-xl lg:text-3xl text-bg-500`}>Leave your valuable Suggestion/Feedback</span>}

            {props.showDescription && <span className="mt-5 text-bg-50">Got some Doubts or Suggestions for us? We would really love to actch up with you ! Just leave us a message through from or E-Mail.</span>}

            {props.showMail && <Link href="mailto:humanizeai@gmail.com" className='text-base font-medium text-bg-200 mt-5'><MailOutline className='fill-bg-200 w-6 h-5 mr-1' />Email us at: <span className='text-blue-600'>mail.humanize.ai@gmail.com</span></Link>}

            <InputGroup label="Name" type="text" required placeholder="Enter your name" className="mt-5 w-[65vw] lg:w-auto" value={name} onChange={setName} />

            <InputGroup label="Email" type="text" required placeholder="Enter your email" className="mt-4 w-[65vw] lg:w-auto" value={email} onChange={setEmail} />

            <InputGroup label="Suggestion" required textareaRows={6} type="description" placeholder="Ask us your Query/Feeback/Suggestion in Brief" inputClassName="!rounded-xl" className="mt-4 w-[65vw] lg:w-auto"  value={description} onChange={setDescription} />

            <Button className="justify-center mt-5 w-full z-10 !bg-black !text-white" onClick={submitForm}>Submit</Button>

        </div>

        <div className="absolute top-0 left-0 flex flex-col z-0">
          <img src="/assets/contact-top-left.svg" alt="" />
          <img src="/assets/contact-top-left-2.svg" alt="" className="w-fit self-center mr-3 -mt-3.5" />
        </div>
        
        <img src="/assets/contact-bottom-left.svg" alt="" className="absolute bottom-0 left-0 z-0" />

        <div className="flex-row-reverse justify-center items-center ml-16 md:ml-32 lg:ml-48 hidden md:flex">
          <img src="/assets/contact-top-right.svg" alt="" className="absolute top-0 md:w-96 lg:w-[420px] xl:w-fit right-0 z-0" />
          {/* <img src="/assets/contact-man.svg" alt="" className=" md:mb-32 xl:w-80 z-10 hidden md:block" /> */}
          <img src="/assets/contact-top-right-2.svg" alt="" className="mt-48" />
        </div>

    </div>
  )
}

ContactForm.defaultProps = {
    showTitle: true,
    showDescription: true,
    showMail: true
}

export default ContactForm