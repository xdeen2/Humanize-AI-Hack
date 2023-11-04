import LeftInfo from "@/layouts/auth/LeftInfo"
import ResetPasswordForm from "@/layouts/auth/forms/ResetPasswordForm"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

function ResetPassword() {
  return (
    <div className={`flex flex-col md:flex-row bg-bg-900 ${inter.className}`}>
        
        <LeftInfo />

        <ResetPasswordForm />

    </div>
  )
}

export default ResetPassword