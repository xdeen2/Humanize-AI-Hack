import React from 'react'
import RightAuthContainer from '../RightAuthContainer'
import InputGroup from '@/components/InputGroup'
import Button from '@/components/SpecialButton'
import PrimaryButton from '@/components/PrimaryButton'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import { Dialog } from '@mui/material'

function TempRegister(props: {userId: string}) {

    const router = useRouter()

    // username from queries
    // const usernameToConnect = router.query.user

    const [name, setName] = React.useState<string>('')
    const [phone, setPhone] = React.useState<number>()
    const [otp, setOtp] = React.useState<number>()

    const [sendingOtp, setSendingOtp] = React.useState<boolean>(false)
    const [otpSent, setOtpSent] = React.useState<boolean>(false)
    const [verifyingOtp, setVerifyingOtp] = React.useState<boolean>(false)
    const [otpVerified, setOtpVerified] = React.useState<boolean>(false)

    async function sendOtp () {
        console.log("Sending")

        if (phone === undefined || phone === null) {
            // toast("Please enter a valid phone number")
            toast.error('Please enter a valid phone number', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }

        const response = await fetch(`http://localhost:5000/get-otp/${phone}`)
        const data = await response.json()
        console.log(data)

        if (data.return === true) {
            // toast("OTP sent successfully")
            toast.success('OTP sent successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setOtpSent(true)
        } else {
            // toast("Error sending OTP")
            toast.error(data.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setOtpSent(false)
        }
    }

    function verifyOtp () {

        fetch(`http://localhost:5000/verify-otp/${phone}/${otp}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success === true) {
                toast.success("OTP verified successfully")
                setOtpVerified(true)
                setOtpSent(false)
                // router.push('/temporary-chat')
            } else {
                toast.error("Invalid OTP")
                setOtpVerified(false)
            }
        })
    }

    const [creating, setCreating] = React.useState<boolean>(false)

    async function createTempUser() {
        setCreating(true)
        console.log("Creating acc for", phone)
        const response = await fetch(`http://localhost:5000/temp-register/${name}/${phone}`)
        const data = await response.json()
        console.log(data)
        setCreating(false)
        if (data.success === true) {
            toast.success("User created successfully")
            localStorage.setItem("temptoken", data.token)
            if (props.userId === "me") {
                router.push("/chat-bot")
            } else {
                router.push(`/try-vikram-bots/${props.userId}`)
            }
        } else {
            toast.error("Error creating user")
        }

    }

  return (
    <RightAuthContainer title="Quick Login">
        <ToastContainer />

        <Dialog open={creating}>
            <div className="flex flex-col gap-2 p-6 items-center justify-center">
                <span className="font-medium text-lg">Creating your account...</span>
                <img src="/assets/loading1.svg" alt="" className="w-20 h-20" />
            </div>
        </Dialog>

        <InputGroup
            label='Full Name'
            placeholder='Your Name'
            type='text'
            value={name}
            onChange={setName}
            className='md:w-[400px] !mt-16'
        />

        <InputGroup
            label='Phone Number'
            placeholder='98XXXXXXXX21'
            type='number'
            value={phone?.toString()}
            onChange={setPhone}
            className='md:w-[400px]'
            hintAccessory={()=>{return <span
                    className='text-xs text-blue-500 cursor-pointer font-semibold'
                    onClick={sendOtp}
                >
                    {otpSent ? "Resend OTP" : "Send OTP"}
                </span>}}
        />

        {
            otpSent ? 
            <InputGroup
                label="OTP"
                placeholder="123456"
                value={otp?.toString()}
                onChange={setOtp}
                hintAccessory={()=>{
                    return <span
                        className={`text-xs cursor-pointer font-semibold ${otpSent ? "text-blue-500" : "text-blue-400 cursor-not-allowed"}`}
                        onClick={()=>{
                            if(otpSent) {
                                verifyOtp()
                            }
                        }}
                    >
                        Verify OTP
                    </span>
                }}
                disabled={!otpSent}
                type="text"
            />
            :
            null
        }
        <Button
            title='Try Out HumanizeAI'
            Icon={undefined}
            buttonStyle='!mt-8 !w-full !text-center !font-medium !justify-center'
            onClick={createTempUser}
            disabled={!otpVerified}
        />
        <span className="text-sm font-medium text-gray-500 self-end mt-4">
            Or Already have an account? <span className="text-blue-600 font-semibold cursor-pointer" onClick={()=>{router.push('/auth/login')}}>Login</span>
        </span>
        <div className="flex w-full flex-row items-center mt-4">
            <div className="h-[1px] grow bg-gray-400"></div>
            <span className="text-gray-500 font-semibold mx-2">or</span>
            <div className="h-[1px] grow bg-gray-400"></div>
        </div>
            <span className="text-sm cursor-pointer font-semibold text-blue-600 text-center mt-5 p-2 px-4 border rounded-lg border-blue-600" onClick={()=>{router.push('/auth/create-account')}}>
                Create your own bot?
                {/* <span className="text-blue-600 cursor-pointer" >Register</span> */}
            </span>
    </RightAuthContainer>
  )
}

export default TempRegister