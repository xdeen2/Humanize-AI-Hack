import SpecialText from "@/components/SpecialText"
import { Orbitron } from "next/font/google"
import Image from "next/image"

const orbitron = Orbitron({ subsets: ['latin'] })

function MissionVision() {

    const vision = "At the core of our mission is a profound ambition: to revolutionize the landscape of digital interactions for individuals and organizations. Our vision entails a transformative paradigm shift in everyday communication, accomplished through the deployment of autonomous and personalized AI bots."
    const mission = "Our mission is to empower users to create their unique bot identities, setting new standards for digital interaction, and freeing individuals and organizations to focus on what truly matters. Through our innovative platform, we aim to provide a tool that enables seamless, autonomous communication in an increasingly connected world."

  return (
    <div className="bg-bg-900 w-full px-4 md:px-24 p-14 md:p-24 flex flex-col items-center text-neutral-300">
        
        <span className="text-3xl md:text-5xl font-semibold self-center text-center">API Callings</span>
        <span className="text-lg mt-4 px-8 text-bg-800 self-center text-center">
            You can use our API to integrate your Bot with your existing ChatBot or any other platform like maybe Discord. <br /><br />
        </span>

    <div className="flex w-full justify-between">
        <div className="flex flex-col gap-5">
            NOTE that this feature is under testing, so it would be live by the end of September with full documentation.
            <span className="text-2xl font-semibold">What's the use of this here?</span>
            <span className="text-lg font-normal text-neutral-900">
                You can use our API to integrate your Bot with your existing ChatBot or any other platform like maybe Discord. <br /><br />
            </span>
            <span className="text-2xl font-semibold">How to use it?</span>
            <span className="text-lg font-normal text-meutral-900">
                1. Create a Bot & Train it as you want on HumanizeAI. <br />
                2. Go to the Integrations Tab. <br />
                3. Select the BotID you want to integrate. <br />
                4. Copy the API Key. <br />
                5. Use the API Key to make API Calls. <br />
            </span>
        </div>
        <img src="/api.png" alt="" className="rounded-lg h-96" />
    </div>
    </div>
  )
}

export default MissionVision