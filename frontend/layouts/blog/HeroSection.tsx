import { Orbitron, Poppins } from "next/font/google"

const orbitron = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

function HeroSection(props: {blogId: string}) {
  const titles: {[blogId: string]: string} = {
    "1": "VBots and HumanizeAI: Your Guide to Training with Role Description and Steps",
    "2": "HumanizeAI: A Breakthrough Platform Melding Human Individuality with AI",
    "3": "HumanizeAI - What the Future Holds?"
  }
  return (
    <div className="flex flex-row-reverse items-center md:px-16 justify-center bg-bg-900 gap-3 py-6 md:py-28">
      <img src="/chatbotlearns.png" alt="" className="w-[60vw]" />
      <span className={`text-4xl text-start md:text-5xl font-semibold my-5 md:my-10 text-white ${orbitron.className}`}>{titles[props.blogId]}</span>
    </div>
  )
}

export default HeroSection