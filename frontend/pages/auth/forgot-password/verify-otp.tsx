import LeftInfo from '@/layouts/auth/LeftInfo'
import VerifyOTPForm from '@/layouts/auth/forms/VerifyOTPForm'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function VerifyOTP() {
  return (
    <div className={`flex flex-col md:flex-row bg-bg-900 ${inter.className}`}>

        <LeftInfo />

        <VerifyOTPForm />

    </div>
  )
}

export default VerifyOTP