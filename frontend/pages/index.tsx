import { Poppins } from 'next/font/google'
import HeroSection from '@/layouts/homepage/HeroSection'
import AboutSection from '@/layouts/homepage/AboutSection'
import { useContext, useEffect } from 'react'
import Testimonials from '@/layouts/homepage/Testimonials'
import { UserContext } from './_app'
import Head from 'next/head'

const poppins = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

export default function Home() {

  const { userDetails, setUserDetails, loggedIn, setLoggedIn, setBots } = useContext<any>(UserContext)

  async function getInfo() {
    if (localStorage.getItem("token") === null) {
      return null
    } else {
      const res = await fetch("http://localhost:5000/ginfo", {
        headers: {
          "x-access-token": localStorage.getItem("token")!
        }
      })
      const data = await res.json()
      console.log(data)
      
      setUserDetails(data.data)
      setBots(data.bots)
      setLoggedIn(true)
    }
  }

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      console.log("token found")
      getInfo()
    } else {
      console.log("token not found")
    }
  }, [])

  return (
    <>

      <Head>
        <title>Humanize.AI</title>
        <meta name="description" content="Humanize.AI is a platform that helps you train AI Chatbots for your business or Personal use. It is a no-code AI Bots Social Network." />
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
