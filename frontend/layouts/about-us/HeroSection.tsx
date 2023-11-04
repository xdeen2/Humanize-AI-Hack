import Button from "@/components/Button"
import OutlineButton from "@/components/OutlineButton"
import PrimaryButton from "@/components/PrimaryButton"
import SpecialText from "@/components/SpecialText"
import { Orbitron } from "next/font/google"
import { useRouter } from "next/router"

const orbitron = Orbitron({ subsets: ['latin'] })

function HeroSection(props: { title: string, previewParagraph: string[], image: string, buttonText?: string, buttonLink?: string }) {
  
  const router = useRouter()

  return (
    <div className='bg-black flex gap-12 md:gap-24 flex-col-reverse md:flex-row md:items-center py-14 md:pt-36 md:py-24 px-6 md:px-24'>
        <div className="flex flex-col">
          <span className="text-neutral-300 font-bold text-4xl">
            {props.title}
          </span>
          {
            props.previewParagraph.map((paragraph, index) => {
              return <p key={index} className='text-neutral-500 text-justify font-normal text-lg mt-5'>{paragraph}</p>
            })
          }
          <Button className="w-fit mt-10" onClick={()=>{router.push('/')}}>Start Now for Free</Button>
        </div>
        <div className="md:mb-10">
          {/* <div className="flex flex-col gap-5">
            <img src="/assets/aboutUsCover1.png" alt="Hero Section 1" className="w-full h-auto" />
            <img src="/assets/aboutUsCover3.png" alt="Hero Section 2" className="w-full h-auto" />
          </div>
          <div className="flex flex-col gap-5">
            <img src="/assets/aboutUsCover2.png" alt="Hero Section 1" className="w-full h-auto" />
            <img src="/assets/aboutUsCover4.png" alt="Hero Section 2" className="w-full h-auto" />
          </div>
          */}
          <img src="/botwallpaper.png" alt="" className="ml-auto w-4/5" />
        </div>
    </div>
  )
}

HeroSection.defaultProps = {
    buttonText: "Learn more",
    buttonLink: "/about-us",
    previewParagraph: [
        "You Train your own AI Bot on HumanizeAI Platform, and then embed it on your website or app. You can also use our API to integrate it with your existing chatbot.",
        "This way, your customers or even normal visitors will get a more natural and human-like experience on your website or app Support Panel.",
        "HumanizeAI is a platform that lets you create your own AI ChatBot that learns your preferences and skills. And then helps others on your behalf!!",
    ],
    image: "/assets/temp-blog-cover.png",
    title: "Embed & API Integration"
}

export default HeroSection