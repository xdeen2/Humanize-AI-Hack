import InputGroup from '@/components/InputGroup'
import PrimaryButton from '@/components/PrimaryButton'
import RightAuthContainer from '@/layouts/auth/RightAuthContainer'
import { Dialog } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {

    const router = useRouter()

    const [username, setusername] = React.useState(undefined)
    const [password, setPassword] = React.useState(undefined)

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [success, setSuccess] = React.useState<boolean>(false)

    async function login() {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
    
            const data = await response.json()
            console.log(data)
            if (data.success === true) {
                setError(undefined)
                setSuccess(true)
                console.log(data)
                localStorage.setItem("token", data.token)
                if (data.username != null) {
                    if (data.business_username != null || data.business_username != "None") {
                        localStorage.setItem("user", JSON.stringify({username: data.username, username_b: data.business_username}))
                    }
                    else {
                        localStorage.setItem("user", JSON.stringify({username: data.username}))
                    }
                } else if (data.business_username != null || data.business_username != "None") {
                    localStorage.setItem("user", JSON.stringify({username_b: data.business_username}))
                }
                
                setLoading(false)
                router.replace("/chat-bot")
            } else {
                setLoading(false)
                setError(data)
                toast.error(data.message)
                setSuccess(false)
            }
        } catch (error) {
            setLoading(false)
            setSuccess(false)
            toast.error("Check the username, if it's a business account, remember to add _b at the end.")
        }
    }

  return (
    <RightAuthContainer title="Welcome Back">
        
        <ToastContainer position="top-right" autoClose={2500} />

        <Dialog open={loading}>
            <div className="flex flex-col gap-2 p-6 items-center justify-center">
                <span className="font-medium text-lg">Logging you in...</span>
                <img src="/assets/loading1.svg" alt="" className="w-20 h-20" />
            </div>
        </Dialog>

        <Dialog open={success} onClose={() => {setSuccess(false); window.location.href = "/chat-bot"}}>
            <div className="flex flex-col gap-2 p-6 items-center justify-center">
                <span className="font-medium text-lg">Logged in successfully!</span>
                <img src="/assets/success1.svg" alt="" className="w-20 h-20" />
                <PrimaryButton title="Head to your Chat Bot" onClick={() => window.location.href = "/chat-bot"} />
            </div>
        </Dialog>

        <InputGroup value={username} required onChange={setusername} label='HumanizeAI Username' placeholder='user_9696' type="text" className='!mt-10' />

        <InputGroup value={password} required onChange={setPassword} onEnter={login} label='Password' placeholder='Your Password' type="password"  passwordAccessory={
            <div className='flex justify-between mt-1'>

                <div className="flex gap-1 5 items-center">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className='text-sm font-medium text-neutral-900'>Remember me</label>
                </div>

                <Link href='/auth/forgot-password'>
                    <span className="text-sm font-medium text-bg-50">Forgot Password?</span>
                </Link>
            </div>
        } />

        {/* forgot password */}
        <span className="text-xs font-medium text-neutral-900 ">Forgot Password? <Link href="/auth/forgot-password" className='text-primary-500 text-xs'>Reset Password</Link></span>

        <PrimaryButton title='Log In' buttonStyle='w-full mt-5 mb-5' onClick={login} />

        <span className="text-sm font-medium text-neutral-900">Don't have an account? <Link href="/auth/create-account" className='text-primary-500 text-sm'>Create an Account</Link></span>

    </RightAuthContainer>
  )
}

export default LoginForm