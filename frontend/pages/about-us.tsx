import HeroSection from "@/layouts/about-us/HeroSection"
import Makers from "@/layouts/about-us/Makers"
import MissionVision from "@/layouts/about-us/MissionVision"
import Tribute from "@/layouts/about-us/Tribute"
import { Inter, Poppins } from "next/font/google"

const poppins = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

function AboutUs() {
  return (
    <div className={`${poppins.className}`}>
        
        <HeroSection />

        <Tribute />

        <MissionVision />

        {/* <Makers /> */}

    </div>
  )
}

export default AboutUs