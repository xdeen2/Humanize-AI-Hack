import PrimaryButton from '@/components/PrimaryButton'
import RightAuthContainer from '@/layouts/auth/RightAuthContainer'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import OTPInput from 'react-otp-input';
import { useRouter } from 'next/router';

function VerifyOTPForm() {

    
//   const phoneNumber = localStorage.getItem("phoneForForgotPassword");

  const router = useRouter()

  const [otp, setOtp] = React.useState<string | number | undefined>(undefined)

  async function sendOtp () {
    const phone = router.query.phoneNumber;

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
    }
}

  function verifyOtp () {

    const phone = router.query.phoneNumber

        fetch(`http://localhost:5000/verify-otp/${phone}/${otp}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success === true) {
                toast.success("OTP verified successfully")
                router.push({
                  pathname: "/auth/forgot-password/reset-password",
                  query: {
                    username: router.query.username,
                  }
                })
            } else {
                toast.error("Invalid OTP")
            }
        })
// }
        // toast.success("OTP verified successfully")
}


  return (
    <RightAuthContainer title="Verify OTP">
      <ToastContainer />

        <span className="font-medium text-neutral-900 mt-2">Please enter the verification code sent to +91 {router.query.phoneNumber}</span>


        <div className="flex gap-2 mt-10 self-center md:self-start">
            {/* 6 digit inputs */}
            <OTPInput value={otp?.toString()} shouldAutoFocus onChange={setOtp} numInputs={4} renderSeparator={<span></span>} inputStyle="!w-10 md:!w-28 !mx-1 h-10 text-sm outline-none font-medium text-center border border-neutral-400 rounded-md w-10 md:w-20" renderInput={props => <input pattern='\d*' {...props} />} />

        </div>

        <span className="text-sm text-neutral-900 mt-5 self-center">Didn't recieve an OTP?</span>

        <span className="font-medium text-bg-900 mt-1 self-center underline underline-offset-2" onClick={sendOtp}>Resend OTP</span>

        <PrimaryButton title='Verify' buttonStyle='w-full mt-5 mb-5' onClick={verifyOtp} />

    </RightAuthContainer>
  )
}

export default VerifyOTPForm