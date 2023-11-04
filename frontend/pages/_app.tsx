import Footer from '@/layouts/footer/Footer'
import Navbar from '@/layouts/navbar/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState, createContext } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';

export const UserContext = createContext({})

const GOOGLE_OAUTH_CLIENT_ID = "656861677540-vciqnqigidvsap6f6egcc106bclij1h1.apps.googleusercontent.com"
const GOOGLE_OAUTH_CLIENT_SECRET = "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"

export default function App({ Component, pageProps }: AppProps) {
  
  const router = useRouter()
  
  const [isAuthPage, setIsAuthPage] = useState(false)
  const [invertColors, setInvertColors] = useState(false)
  
  const [showPersonalEditBox, setShowPersonalEditBox] = useState<boolean>(false)
  const [showBusinessEditBox, setShowBusinessEditBox] = useState<boolean>(false)
  
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [userDetails, setUserDetails] = useState<any>({})
  const [bots, setBots] = useState<any>([])
  const [showLoginBox, setShowLoginBox] = useState<boolean>(false)
  const [showSstickyLoginBox, setShowSstickyLoginBox] = useState<boolean>(false)

  const contextValues = {
    loggedIn,
    userDetails,
    bots,
    showLoginBox,
    showSstickyLoginBox,
    setLoggedIn,
    setUserDetails,
    setBots,
    setShowLoginBox,
    setShowSstickyLoginBox
  }

  useEffect(() => {
    console.log(router.pathname)

    if (router.pathname.startsWith('/dashboard')) {
      setIsAuthPage(true)
    } else {
      setIsAuthPage(false)
    }
    if (router.pathname.startsWith('/contact-us') || router.pathname.startsWith('/blogs') || router.pathname.startsWith('/')) {
      setInvertColors(true)
    }
  }, [router.pathname])
  
  return <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
  <UserContext.Provider value={contextValues}>
  <div>
  {
    !isAuthPage ?
    <Navbar showPersonalEditBox={showPersonalEditBox} setShowPersonalEditBox={setShowPersonalEditBox} showBusinessEditBox={showBusinessEditBox} setShowBusinessEditBox={setShowBusinessEditBox} />
    :
    null
  }
  <Component {...pageProps} showPersonalEditBox={showPersonalEditBox} setShowPersonalEditBox={setShowPersonalEditBox} showBusinessEditBox={showBusinessEditBox} setShowBusinessEditBox={setShowBusinessEditBox} />
  {
    !isAuthPage ?
    <Footer invertColor={invertColors} />
    :
    null
  }
  </div>
  </UserContext.Provider>
  </GoogleOAuthProvider>
}

// export {UserEditContext}