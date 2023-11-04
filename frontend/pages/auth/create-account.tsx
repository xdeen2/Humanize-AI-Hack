import CreateAccountForm from '@/layouts/auth/forms/CreateAccountForm'
import LeftInfo from '@/layouts/auth/LeftInfo'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
// import { getAuth, RecaptchaVerifier } from 'firebase/auth'

const inter = Inter({ subsets: ['latin'] })

// const auth = getAuth();

function CreateAccount() {

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      window.location.href = "/chat-bot"
    }
  }, [])

  return (
    <div className={`flex flex-col md:flex-row bg-bg-900 ${inter.className}`}>

        <LeftInfo />

        <CreateAccountForm />
        
    </div>
  )
}

export default CreateAccount