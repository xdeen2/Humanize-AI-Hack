import Image from 'next/image'
import { Inter, Poppins } from 'next/font/google'
import NavLink from '@/components/NavLink'
import OutlineButton from '@/components/OutlineButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AlternateEmail, BorderColor, Call, CloseOutlined, CloudUpload, ContentCopy, Edit, EditOutlined, MailOutline, MenuOpenOutlined, ModeEdit, Person, Person2, Person2Outlined, UploadFile } from '@mui/icons-material'
import { useContext, useEffect, useRef, useState } from 'react'
import PrimaryButton from '@/components/PrimaryButton'
import { Chip, Dialog, Tooltip } from '@mui/material'
import { BsArrowLeft, BsBack, BsClipboard } from 'react-icons/bs'
import {HiClipboardCopy} from "react-icons/hi"
import { RiArrowGoBackFill, RiLoader4Fill } from 'react-icons/ri'
import Button from '@/components/Button'
import InputGroup from '@/components/InputGroup'
import { FcGoogle, FcLeft } from 'react-icons/fc'
import { UserContext } from '@/pages/_app'
import toast, { Toaster } from "react-hot-toast"
import { useGoogleLogin } from '@react-oauth/google'
import { signInWithGoogle } from '@/config/firebase'

const inter = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

export function useOutsideAlerter(ref: any, onBlur?: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onBlur()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}


function Navbar({showPersonalEditBox, setShowPersonalEditBox, showBusinessEditBox, setShowBusinessEditBox}: {showPersonalEditBox: boolean, setShowPersonalEditBox: any, showBusinessEditBox: boolean, setShowBusinessEditBox: any}) {

  const router = useRouter()
  console.log(router.pathname)

  const vikramTry = router.pathname.startsWith("/try-vikram-bots")

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, ()=>{setShowInfoBox(false)});

  const {loggedIn, userDetails, showLoginBox, setShowLoginBox, setLoggedIn, setUserDetails, showSstickyLoginBox} = useContext<any>(UserContext)

  const [userDetail, setUserDetail] = useState<any>(null)

  const [navbarOpen, setNavbarOpen] = useState(false)

  const openMobileNavbar = () => {
    setNavbarOpen(true)
  }

  const closeMobileNavbar = () => {
    setNavbarOpen(false)
  }

  const [showInfoBox, setShowInfoBox] = useState<boolean>(false)

  const [infoLoading, setInfoLoading] = useState<boolean>(false)

  const [showImageEditPencil, setShowImageEditPencil] = useState<boolean>(false)

  const [showImageEditDialog, setShowImageEditDialog] = useState<boolean>(false)

  const [newProfile, setNewProfile] = useState<File | null>(null)

  const [updatingProfile, setUpdatingProfile] = useState<boolean>(false)

  const [business, setBusiness] = useState<boolean>(false)
  const [tempuser, setTempuser] = useState<boolean>(false)



  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      if (window.scrollY > window.innerHeight*2/5) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    })
  }, [])  

  return (
    <div className={`${scrolled ? "bg-black" : "bg-transparent"} fixed flex flex-row duration-200 justify-between ${(router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) ? "px-5 md:px-32 md:pl-8" : "px-6 md:px-32"} items-center w-screen h-20 px-0 py-12 z-50 ${inter.className}`} style={{boxShadow: scrolled ? "0px 20px 24px -4px rgba(3, 5, 12, 0.08), 0px 8px 8px -4px rgba(255,255,255, 0.2)" : ""}}>
        
        {
          showLoginBox ? 
          <LoginForm sticky={showSstickyLoginBox} />
          :
          null
        }

        {
          ((router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) && (business || tempuser)) ? (
            <Link href="/explore-bots" className='mr-4'>
              <span className="py-2 px-5 rounded-full bg-gradient-to-r from-gradient-dull-pink to-gradient-blue opacity-80 hover:opacity-100 hover:from-gradient-blue hover:to-gradient-pink duration-200 cursor-pointer flex items-center gap-2">
                <BsArrowLeft className="w-5 h-5 text-white" />
                <span className="text-white font-medium text-xs md:text-sm">Explore Other Bots</span>
              </span>
            </Link>
          ) : null
        }
        
        <Link href="/" className={`navbar-logo cursor-pointer relative ${(router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) && (business || tempuser) ? "hidden md:block md:mr-auto" : ""}`}>
            <Image src={scrolled ? "/longlogowhite.svg" : '/hwhite.png'} alt='HumanizeAI Logo' width={110} height={40} priority className={scrolled ? "min-w-[360px] -mx-28 h-[50] object-cover" : ""} />
            {/* <span className="absolute bottom-0 -right-2 text-white font-bold text-[0.6rem] p-0.5 px-1 rounded-md bg-warning-500">BETA</span> */}
        </Link>

        {
          (router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) ? (
            null
          ) : (
        <div className={`flex-col absolute top-0 left-0 bg-bg-900 gap-5 md:gap-0 py-6 md:py-0 w-full h-screen z-50 md:w-fit md:h-fit ${navbarOpen ? "flex"  : "hidden"} md:relative md:bg-transparent md:!block`} id="navbar">
            <CloseOutlined className="w-7 h-7 z-[500] text-white block md:!hidden ml-auto mr-5" onClick={closeMobileNavbar} />
            <NavLink closeNavbar={closeMobileNavbar} href="/" active ={router.pathname === "/"}>Home</NavLink>
            <NavLink closeNavbar={closeMobileNavbar} href="/about-us" active ={router.pathname === "/about-us"}>API & Embedding</NavLink>
            <NavLink closeNavbar={closeMobileNavbar} href="/pricing" active ={router.pathname === "/pricing"}>Pricing</NavLink>
            {/* <NavLink closeNavbar={closeMobileNavbar} href="/#use-cases" active ={router.pathname === "/#use-cases"}>Use Case</NavLink> */}
            <NavLink closeNavbar={closeMobileNavbar} href="/blogs" active ={router.pathname === "/blogs"}>Blogs</NavLink>
            {/* <NavLink>Contact Us</NavLink> */}
        </div>
          )
        }


        <div className='profile cursor-pointer flex gap-10 items-center'>
          {/* {
            (router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) ? (
              <div className="flex gap-10">
                <span className="text-white hidden md:block" onClick={()=>{router.push("/contact-us")}}>Help & Feedback</span>
              </div>
            ) : (
              <Link href="/contact-us" className='hidden md:block'>
                <OutlineButton title='Contact Us' buttonStyle='mr-8' />
              </Link>
            )
          } */}
          {/* <Link href="/auth/create-account" className='self-center flex gap-5 items-center'> */}
          {
            loggedIn ? (
              <>
                <span className="text-warning-500 font-medium gap-3 hidden lg:flex self-end">Upgrade Plan <img src="/assets/thunder-gold.svg" alt="" className="w-3.5 self-start mt-1" /></span>
                {
                  (router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) && (infoLoading ? <img src="/assets/loading-circle.svg" className='w-6 h-6 ml-4' /> : <span className="text-white hidden md:block ml-4">{userDetails?.name}</span>)
                }
                <div className="relative z-50" onBlur={()=>{
                    if (loggedIn) {
                      setShowInfoBox(false)
                    }
                  }}>
                    {
                      userDetails?.pic
                      ?
                      userDetails?.pic.startsWith("https") ?
                      <Link href="/dashboard">
                        <img src={userDetails?.pic} alt="" className="w-10 h-10 rounded-full self-center object-cover" />
                      </Link>
                      :
                      <Link href="/dashboard">
                      <img src={`http://localhost:5000/assets/${userDetails?.pic}`} alt="" className="w-10 h-10 rounded-full self-center object-cover" onClick={()=>{
                          // setShowInfoBox(!showInfoBox)
                      }} />
                      </Link>
                      :
                      <Link href="/dashboard">
                      <Image src='/assets/profileIcon.svg' alt='Profile' className=' ' width={30} height={30} priority onClick={()=>{
                          // setShowInfoBox(!showInfoBox)
                      }}  />
                      </Link>
                    }
                  {
                  showInfoBox
                  &&
                  (
                    // !tempuser ?
                    <div className="bg-bg-500 absolute top-[35px] min-w-[14rem] pb-6 rounded-lg w-max -right-14 md:right-0 flex shadow-lg drop-shadow-md flex-col" ref={wrapperRef}>
                    {
                      // infoLoading ? <img src="/assets/loading-circle.svg" alt="" className="w-10 mb-8 self-center mt-10" /> :
                    // <div className="flex text-neutral-50 flex-col gap-1 p-6 items-start justify-center">
                    //   <div className="w-fit h-fit rounded-full relative mb-2 self-center" onMouseOver={()=>{
                    //     tempuser ? null :
                    //     setShowImageEditPencil(true)
                    //   }} onMouseLeave={()=>{
                    //     tempuser ? null :
                    //     setShowImageEditPencil(false)
                    //   }}>
                    //     <img src={userDetails?.pic ? `http://localhost:5000/assets/${userDetails?.pic}` : "/assets/avatar4.png"} alt="" className="w-24 h-24 object-cover rounded-full" />
                    //     {
                    //       showImageEditPencil ? 
                    //     <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.45)] rounded-full flex flex-col items-center justify-center" onClick={()=>{
                    //       setShowImageEditDialog(true)
                    //     }}>
                    //       <Edit className='text-neutral-50 fill-neutral-50 w-8 h-8' />
                    //     </div>
                    //     :
                    //     null
                    //     }
                    //   </div>
                    //   <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><Person /> {userDetails?.name}</span>
                    //   <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12" onClick={()=>{
                    //     // clipboard cpoy
                    //     navigator.clipboard.writeText(`https://vikrambots.ai/${userDetails?.username}`)
                    //     toast.success("Bot Link Copied to clipboard")
                    //   }}>
                    //     <AlternateEmail /> 
                    //     {userDetails?.username}
                    //     &nbsp;
                    //     <Tooltip title="Copy your bot link" placement="top" arrow>
                    //     <ContentCopy
                    //     className="w-5 h-5 text-neutral-50 mb-1 fill-neutral-50 cursor-pointer ml-auto" />
                    //     </Tooltip>
                    //   </span>
                    //   {userDetails?.email_id || userDetails?.email ?
                    //     <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><MailOutline /> {userDetails?.email_id || userDetails?.email}</span>
                    //     :
                    //     null
                    //   }
                    //   <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><Call /> {userDetails?.phone}</span>
                    //   {
                    //     userDetails?.b_username && <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><AlternateEmail /> {userDetails?.b_username}</span>
                    //   }
                    // </div>
                    }
                      <PrimaryButton buttonStyle='text-sm z-50 p-3 self-end mr-5 bg-red-500 mt-2' title="Logout" onClick={() => {localStorage.removeItem("token"); localStorage.removeItem("temptoken"); localStorage.removeItem("user"); window.location.href = "/"}} />
                  </div>
                  // :
                  // <div className='bg-bg-500 absolute top-[35px] min-w-[14rem] pt-3 rounded-lg w-max -right-14 md:right-0 flex shadow-lg drop-shadow-md flex-col' ref={wrapperRef}>
                  //   {
                  //     infoLoading ? <RiLoader4Fill className="animate-spin w-10 mb-8 self-center mt-10" />
                  //     :
                  //   <div className="flex text-neutral-50 flex-col gap-1 p-6 items-start justify-center">
                  //       <img src={userDetails?.pic ? `http://localhost:5000/assets/${userDetails?.pic}` : "/assets/avatar4.png"} alt="" className="w-24 h-24 object-cover self-center rounded-full" />
                  //       <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><Person /> {userDetails?.name ? userDetails?.name : "Your Name"}</span>
                  //       <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><Call /> {userDetails?.phone ? userDetails?.phone : "+91 8373958829"}</span>
                  //     {/* <Link href="/explore-bots" onClick={()=>{
                  //       setShowInfoBox(false)
                  //     }}>
                  //       <Button title="Explore More Bots" buttonStyle='mt-4 font-medium' /> 
                  //     </Link> */}
                  //     {/* <PrimaryButton buttonStyle='text-sm p-3 self-end mt-2' title="Create Your own Bot" onClick={() => {localStorage.removeItem("token"); localStorage.removeItem("temptoken"); localStorage.removeItem("user"); window.location.href = "/"}} /> */}
                  //     <PrimaryButton buttonStyle='text-sm p-3 self-end bg-red-500 mt-2' title="Logout" onClick={() => {localStorage.removeItem("token"); localStorage.removeItem("temptoken"); localStorage.removeItem("user"); window.location.href = "/"}} />
                  //   </div>
                  //   }
                  // </div>
                  )
                  }
                </div>
              </>
            ) : (
              <div className="flex flex-row items-center gap-3">
                  {/* <Button variant='outline' onClick={()=>{setShowLoginBox(true)}}  className='hidden lg:flex'>
                    Login
                  </Button> */}
                {/* <Link href="/explore-bots" className='hidden lg:block'> */}
                  <Button onClick={()=>{setShowLoginBox(true)}} variant="special">
                    Checkout Top Bots
                  </Button>
                {/* </Link> */}
              </div>
            )
          }
          {/* </Link> */}
            <MenuOpenOutlined className={`w-8 h-8 text-white md:!hidden ${(router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) ? "-z-10" : ""}`} onClick={()=>{
              openMobileNavbar()
            }} />
        </div>

    </div>
  )
}

const LoginForm = ({sticky}: {sticky?: boolean} = {sticky: false}) => {

  const router = useRouter()

  const {loggedIn, setLoggedIn, showLoginBox, setShowLoginBox, setUserDetails, setBots} = useContext<any>(UserContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const [form, setForm] = useState<"login" | "signup" | "forgot">("login")

  const [loading, setLoading] = useState<boolean>(false)

  const signup = async () => {
    setLoading(true)
    // start loading in hot toast here
    const loginToast = toast.loading("Creating your Account...")

    const res = fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email_id: email,
        password
      })
    })
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      console.log(data)
      if (data.success === true) {
        toast.success("Account created successfully", {
          id: loginToast,
        })
        localStorage.setItem("token", data.token)
        setUserDetails(data.data)
        setBots(data.bots)
        setLoggedIn(true)
        // router.push("/dashboard")
      } else {
        toast.error(data.message)
      }
    })
    .catch((err)=>{
      toast.error("Some Error Occurred", {
        id: loginToast
      })
      console.log(err)
    })
  }

  const login = async () => {
    setLoading(true)
    // start loading in hot toast here
    const loginToast = toast.loading("Logging in...")

    const res = fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: email,
        password
      })
    })
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      console.log(data)
      if (data.success === true) {
        toast.success("Logged in successfully", {
          id: loginToast,
        })
        localStorage.setItem("token", data.token)
        setUserDetails(data.data)
        setBots(data.bots)
        setLoggedIn(true)
        router.push("/dashboard")
      } else {
        toast.error(data.message, {
          id: loginToast
        })
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  // const onLogin = async (profile: any) => {
  //   console.log("profile", profile)

  //   const googleLoginLoading = toast.loading("Logging in with Google...")

  //   const response = await fetch("http://localhost:5000/google-login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       access_token: profile.access_token
  //     })
  //   })

  //   const data = await response.json()

  //   if (data.success) {
  //     localStorage.setItem("token", data.token)
  //     setLoggedIn(true)
  //     setUserDetails(data.data)
  //     toast.success("Logged in Successfully", {
  //       id: googleLoginLoading
  //     })
  //     // router.push("/dashboard")
  //   } else {
  //     console.log(data)
  //     toast.error(data.message, {
  //       id: googleLoginLoading
  //     })
  //   }
  // }

  // const googleLogin = useGoogleLogin({
  //   onSuccess: onLogin,
  //   onError: (err: any)=>{console.log("Error", err)},
  // })

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

  const wrapperRef = useRef<any>(null)
  useOutsideAlerter(wrapperRef, ()=>{setShowLoginBox(false)});

  return (
    <div className="h-screen w-screen absolute top-0 left-0 flex z-[500000] flex-col items-center justify-center bg-[rgba(0,0,0,0.4)]">

      <div className="bg-neutral-100 rounded-xl p-5 lg:p-8 flex flex-col items-center gap-4" style={{boxShadow: "0px 0px 24px rgba(255,255,255,0.3)"}} ref={!sticky ? wrapperRef : null}>
        <span className="font-bold text-2xl self-start">{form ==="login" ? "Welcome Back" : form == "signup" ? "Create Account" : "Reset Password"}</span>
        <span className="text-gray-500 text-sm -mt-4 self-start">{form ==="login" ? "Login to your account" : form == "signup" ? "Create your own Humanized AI Bot for Free" : "Verify your E-Mail with OTP to reset your Password"}</span>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        {
          form === "login" ? (
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-col gap-2">
                {/* <InputGroup label='Full Name' placeholder='Enter your full name' /> */}
                <InputGroup label='Email or Username' placeholder='Enter your EmailID or Username' className='w-80' value={email} onChange={setEmail} />
                <InputGroup label='Password' placeholder='Enter your password' className='w-80' type='password' value={password} onChange={setPassword} />
              </div>

              <Button variant='primary' onClick={login} className=' !bg-black !text-white'>
                Login
              </Button>

            <div className="flex flex-col gap-1 mt-1 w-full">
              <span className="self-end text-bg-500 cursor-pointer" onClick={()=>{
                setForm("forgot")
              }}>
                Forgot Password?
              </span>
              <span className="self-end text-bg-500 cursor-pointer" onClick={()=>{
                setForm("signup")
              }}>
                Don't have an account? <span className="font-semibold">Signup</span>
              </span>
            </div>
            </div>
          ) : form === "signup" ? (
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-col">
                {/* <div className="grid grid-cols-12 gap-3"> */}
                  <InputGroup label='Full Name' placeholder='Enter your full name' className='col-span-6' value={name} onChange={setName} />
                  {/* <InputGroup label='Username' type="username" placeholder='Bot ID that would be visible to others' className='col-span-6' value={name} onChange={setName} /> */}
                {/* </div> */}
                  <InputGroup label='Email' placeholder='Enter your email (Verification Mail will be sent)' className='w-full' value={email} onChange={setEmail} />
                <div className="grid grid-cols-12 gap-3">
                  <InputGroup type="password" label='Password' placeholder='Enter your password' className='col-span-6' value={password} onChange={setPassword} />
                  <InputGroup type="password" label='Confirm Password' placeholder='Enter your password again' className='col-span-6' value={confirmPassword} onChange={setConfirmPassword} />
                </div>
              </div>

              <Button variant='primary' onClick={signup} className=' !bg-black !text-white'>
                Signup
              </Button>

              <span className="self-end text-bg-500 cursor-pointer" onClick={()=>{
                setForm("login")
              }}>
                Already have an account? <span className="font-semibold">Login</span>
              </span>

            </div>
          ) : (
            <div className="flex flex-col items-center">


              <div className="flex flex-col items-center gap-5">
                <InputGroup label='Email' placeholder='Enter your email' className='w-80' value={email} onChange={setEmail} />

                <Button variant='primary' onClick={()=>{return}} className=' !bg-black !text-white w-fit'>
                  Send Verification Code
                </Button>
              </div>
            </div>
          )
        }
        {
          form === "forgot" ? (
            <span className="text-gray-600 flex flex-row items-center gap-2 cursor-pointer font-semibold self-end mt-3" onClick={()=>{
              setForm("login")
            }}>
              {/* <FcLeft className="w-5 h-5" /> */}
              <RiArrowGoBackFill className="w-5 h-5" />
              Go Back to Login
            </span>
          ) : (
            null
          )
        }
        {
          form !== "forgot" ? (
            <div className="w-full flex flex-row items-center gap-2">
              <div className="w-full h-[1px] bg-neutral-800 grow"></div>
              <span className="text-bg-200 mb-1">or</span>
              <div className="w-full h-[1px] bg-neutral-800 grow"></div>
            </div>
          ) : (
            null
          )
        }
        {
          form !== "forgot" ? (
            <Button variant='primary' onClick={()=>signInWithGoogle(onLogin)} className='!bg-black text-white'>
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </Button>
          ) : (
            null
          )
        }

      </div>

    </div>
  )
}

export default Navbar