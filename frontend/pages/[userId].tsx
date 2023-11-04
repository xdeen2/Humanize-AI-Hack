import PrimaryButton from '@/components/PrimaryButton'
import SpecialText from '@/components/SpecialText'
import TrendingBots from '@/layouts/explore-more/TrendingBots'
import AboutSection from '@/layouts/homepage/AboutSection'
import HeroSection from '@/layouts/homepage/HeroSection'
import Testimonials from '@/layouts/homepage/Testimonials'
import { ArrowLeft, ChatBubble } from '@mui/icons-material'
import { Inter, Poppins } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { RiInstagramFill, RiLinkedinBoxFill, RiLinkedinFill, RiLoader4Line, RiWhatsappFill } from 'react-icons/ri'
import { TbMessageShare } from 'react-icons/tb'
import { UserContext } from './_app'

const poppins = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

function Profile() {

    const router = useRouter()

    const userId = router.query.userId as string

    const { userDetails, loggedIn, setLoggedIn, setShowLoginBox, setShowSstickyLoginBox } = useContext<any>(UserContext)

    const [userData, setUserData] = useState<any>(null)
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false)

    const redirectToUserPage = (userId: string) => {
      // window.location.href = `/dashboard?user=${userId}`
      router.replace(`/dashboard?user=${userId}`)
    }

    useEffect(()=>{
        console.log("Finding for", userId)
        if (userId != undefined && userId != null) {
          // if (userId === "me"){
          //   if (localStorage.getItem("token") || localStorage.getItem("temptoken")) {
          //     // setUserData(JSON.parse(localStorage.getItem("user")!)) // general tab will come
          //     router.replace("/chat-bot")
          //   } else {
          //     router.replace("/quick-login?userId=me")
          //   }
          // }
          // else {
            // getUserData()
          // }
          if (localStorage.getItem("token")) {
            redirectToUserPage(userId)
          } else {
            setShowLoginBox(true)
            setShowSstickyLoginBox(true)
          }
        }
    }, [userId])

    useEffect(()=>{
      if (loggedIn == true) {
        redirectToUserPage(userId)
      }
    }, [loggedIn])

  return (
    <>
      <Head>
        <title>HumanizeAI</title>
        <meta name="description" content="HumanizeAI is a platform that helps you train AI Chatbots for your business or Personal use. It is a no-code platform that helps you train your own AI Bot without any coding knowledge." />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        className={`bg-bg-900 flex flex-col w-screen ${poppins.className}`}
      >
          <HeroSection />

          <div className='px-4 md:px-0 z-10'>
            <AboutSection />
          </div>

          <Testimonials />

      </main>
    </>
  )
}

export default Profile