import InputGroup from "@/components/InputGroup";
import RightAuthContainer from "../RightAuthContainer";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPasswordForm() {

    const router = useRouter()

    const username = router.query.username

    const [password, setPassword] = useState<string | undefined>(undefined)
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>(undefined)

    async function resetPassword () {
        const pass = password;
        const confirmPass = confirmPassword;

        if (pass === undefined || pass === null || pass === "") {
            // toast("Please enter a valid phone number")
            toast.error('Please enter a valid password', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } else {
            if (confirmPass === undefined || confirmPass === null || confirmPass === "") {
                // toast("Please enter a valid phone number")
                toast.error('Please enter a valid password', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            } else {
                if (pass === confirmPass) {
                    const response = await fetch(`http://localhost:5000/change_password/${username}/${pass}`)
                    const data = await response.json()
                    console.log(data)
                    if ("properties" in data) {
                        // toast("OTP sent successfully")
                        toast.success('Password changed successfully', {
                            position: "top-right",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        router.push({
                            pathname: "/auth/login",
                        })
                    } else {
                        // toast("Error sending OTP")
                        toast.error('Error changing password', {
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
                } else {
                    toast.error('Passwords do not match', {
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
        }
    }


  return (
    <RightAuthContainer title="Reset Password">
        <ToastContainer />

        <InputGroup label="New Password" placeholder="Enter your new password" value={password} onChange={setPassword} type="password" className="!mt-10" passwordAccessory={<label htmlFor="password" className='text-sm text-neutral-900'>Password should contain atleast number, capital letter, small letter and symbol.</label>} />
        
        <InputGroup label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Confirm your new password" type="password" passwordAccessory={
            <div className="flex justify-between">
                <div className="flex gap-1 5 items-center">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className='text-sm font-medium text-neutral-900'>Remember me</label>
                </div>
                <Link href="/auth/forgot-password">
                    <span className="text-sm font-medium text-bg-50">Forgot Password?</span>
                </Link>
            </div>
        } />

        <PrimaryButton title="Reset Password" buttonStyle="w-full mt-5 mb-5" onClick={resetPassword} disabled={password === undefined || password === null || password === "" || confirmPassword === undefined || confirmPassword === null || confirmPassword === ""} />

        <span className="text-sm text-neutral-900">You will be required to sign in with new password on all devices</span>

    </RightAuthContainer>
  )
}

export default ResetPasswordForm