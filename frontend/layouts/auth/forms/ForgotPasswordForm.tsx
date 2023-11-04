import InputGroup from '@/components/InputGroup'
import PrimaryButton from '@/components/PrimaryButton'
import RightAuthContainer from '@/layouts/auth/RightAuthContainer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function ForgotPasswordForm() {

  const router = useRouter()

  const [username, setUsername] = React.useState<string | undefined>(undefined)
  const [phoneNumber, setPhoneNumber] = React.useState<string | number | undefined>(undefined)

  async function sendOtp () {
    const phone = phoneNumber;

    if (phone === undefined || phone === null || phone === "") {
        // toast("Please enter a valid phone number")
        toast.error('Please enter a valid phone number', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    console.log(phone)
    console.log("CALLING", `http://localhost:5000/get-otp/${phone}`)
    const response = await fetch(`http://localhost:5000/get-otp/${phone}`)
    const data = await response.json()
    console.log(data)

    if (data.return === true) {
        // toast("OTP sent successfully")
        toast.success('OTP sent successfully', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        phoneNumber != undefined && localStorage.setItem("phoneForForgotPassword", phoneNumber.toString())
        router.push({
            pathname: "/auth/forgot-password/verify-otp",
            query: { username: username, phoneNumber: phoneNumber }
        })
    } else {
        // toast("Error sending OTP")
        toast.error('Error sending OTP', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}

  return (
    <RightAuthContainer title="Forgot Password">
        <ToastContainer />
        
        <InputGroup required label='Username' placeholder='Your Personal/Agent VBot ID' type="username" className='!mt-10' value={username?.toString()} onChange={setUsername} />
        <InputGroup required label='Phone Number' placeholder='Your Phone Number' type="number" className='' value={phoneNumber?.toString()} onChange={setPhoneNumber} />
        <PrimaryButton title='Continue' buttonStyle='w-full mt-5 mb-5' onClick={sendOtp} disabled={phoneNumber === undefined || phoneNumber === null || phoneNumber === ""} />

    </RightAuthContainer>
  )
}

export default ForgotPasswordForm