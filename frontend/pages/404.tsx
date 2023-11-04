import OutlineButton from "@/components/OutlineButton"
import PrimaryButton from "@/components/PrimaryButton"
import SpecialText from "@/components/SpecialText"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({subsets: ["latin"]})

function UnknownDestination() {
  return (
    <div className={`flex flex-col-reverse md:flex-row px-8 md:px-36 lg:px-52 py-12 md:py-24 bg-bg-900 lg:gap-48 ${inter.className}`}>
        <div className="flex flex-col">

            <SpecialText extra="font-bold text-8xl">404</SpecialText>

            <div className="flex flex-col mt-4 gap-2 mb-10">
                <span className="font-semibold text-3xl text-white">OOPS! Page not found</span>
                <span className="lg text-neutral-500">The page you are looking for might have been removed, had it’s name changed or is temporarily unavailable!</span>
            </div>

            <div className="flex flex-col md:flex-row gap-5">

                <Link href="/">
                    <PrimaryButton title="Go to home page" />
                </Link>

                <Link href="/contact">
                    <OutlineButton title="Report problem" />
                </Link>

            </div>

        </div>

        <img src="/assets/404-robot.png" alt="Not Found Errored Robot" className="w-32 mb-8 md:mb-0 md:w-64" />

    </div>
  )
}

export default UnknownDestination