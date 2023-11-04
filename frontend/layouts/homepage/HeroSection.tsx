import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { UserContext } from '@/pages/_app'
import { SiChatbot, SiLivechat } from 'react-icons/si'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Poppins } from 'next/font/google'
import { getRefreshToken } from './utils'
import { auth, signInWithGoogle } from "@/config/firebase"

const poppins = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

function HeroSection() {

  const { setShowLoginBox, loggedIn, setLoggedIn, setUserDetails, setBots } = useContext<any>(UserContext)

  const [fullScrolled, setFullScrolled] = React.useState<boolean>(false)

  const router = useRouter()

  const onLogin = async (profile: any) => {
    console.log("PROFILE", profile)
    const googleLoginLoading = toast.loading("Logging in with Google...")

    const response = await fetch("http://localhost:5000/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token: profile.accessToken,
        refresh_token: profile.refresh_token,
      })
    })

    const data = await response.json()

    if (data.success) {
      localStorage.setItem("token", data.token)
      setLoggedIn(true)
      setUserDetails(data.data)
      toast.success("Logged in Successfully", {
        id: googleLoginLoading
      })
      // router.push("/dashboard")
    } else {
      console.log(data)
      toast.error(data.message, {
        id: googleLoginLoading
      })
    }
  }

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (resp: any)=>{
  //     console.log("RESP", resp)
  //     getRefreshToken(resp.code, onLogin)
  //   },
  //   onError: (err)=>{console.log("Error", err)},
  //   flow: "auth-code",
  //   scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.send",
  // })

  // const googleLogin = async () => {
  //   const response = await auth.signInWithPopup(googleProvider)
  //   console.log(response)
  // }

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight - 100) {
        setFullScrolled(true)
      } else {
        setFullScrolled(false)
      }
    })
  }, [])

  return (
    <div className='flex flex-col'>
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerClassName={`${poppins.className} font-medium`}
        />
        {/* <span className={`text-white px-4 md:px-0 ${orbitron.className} font-semibold text-3xl md:text-5xl text-center heading-text mt-10 md:mt-24`}>
            Get Your Own <SpecialText>PERSONAL BOT</SpecialText><br />To Interact with The World!
        </span>
        <span className='font-normal px-4 md:px-0 text-sm md:text-lg text-center mt-5 text-[#FFFFFFB2]'>
        You may have a number and an email id or even a website. But do you have a bot with a bot id?<br /> HumanizeAI is a platform that lets you create your own bot with a unique VBot id. Use this <br/>as a communication medium or train it with your skills to help others. 
        </span>

        <div className="flex flex-row gap-5 items-center justify-center">
          <Link href={loggedIn ? "/chat-bot" : "/me"} className='self-center z-20 select-none'>
            <PrimaryButton title="Get your own VBot" buttonStyle='mt-10 z-20 w-fit self-center cursor-pointer select-none' showIcon />
          </Link>
        </div>
        <div className='flex flex-row justify-between relative md:-mt-24 select-none'>
          <Image src='/assets/gradient-pink-left.png' alt='Gradient Pink' width={800} height={320} className='mt-2 md:-mt-0 w-2/3 md:w-fit object-cover absolute left-0 bg-gradient-to-r from-current' />
          <img src='/assets/macbookfinal.png' alt='Macbook' width={900} height={320} className='mt-8 md:mt-36 px-4 md:px-0 z-10 ml-auto mr-auto' />
          <Image src='/assets/gradient-blue-right.png' alt='Gradient Blue' width={1000} height={340} className='-mt-3 md:-mt-16 w-2/3 md:w-fit object-cover absolute right-0' />
        </div> */}

        <div className="bg-[#000] h-screen w-screen flex pt-12 flex-col z-0 justify-center items-center gap-5 relative">
          {/* <video autoPlay loop muted className="absolute z-0 w-full h-full object-cover">
            <source src="/starsanim.webm" type="video/webm" />
          </video> */}

          {
            !fullScrolled ?
            <video autoPlay loop muted className="fixed -z-10 w-[80vw] lg:w-[500px] rounded-full object-cover">
              <source src="/animationmax.mp4" type="video/mp4" />
            </video>
            :
            null
          }

          <div className="flex flex-col mt-8 gap-5 items-center relative self-center z-10">
            <Image src="/longlogowhitecropped.png" alt="Logo" width={400} height={100} className='object-contain w-[85vw] lg:w-[520px]' />
            <div className="h-[1px] w-24 lg:w-52 my-2 bg-white"></div>
            <span className="text-white text-center px-4 text-lg lg:text-xl">A No-Code Platform to Inject your Human Powers into an AI Bot.</span>


            {
              loggedIn ? (
                <Link href="/dashboard" className='self-center z-20 select-none'>
                  <Button onClick={()=>{return}} variant='primary'>
                    Continue to your Chat Bot
                    <SiChatbot className='h-[1.3rem] w-[1.3rem]' />
                  </Button>
                </Link>
              ) : (
                <div className="flex flex-col lg:flex-row gap-3 items-center">
                <div className='self-center z-20 select-none' onClick={()=>{
                    setShowLoginBox(true)
                }}>
                  <Button onClick={()=>{return}} variant='outline'>Sign Up with Email</Button>
                </div>
                  <Button variant='primary' onClick={()=>signInWithGoogle(onLogin)}>
                    <FcGoogle className='h-6 w-6' />
                    Continue with Google
                  </Button>
                </div>
              )
            }

            </div>
        {/* <SpaceParticles count={100} /> */}
        </div>

    </div>
  )
}

export default HeroSection