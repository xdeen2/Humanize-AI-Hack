import SpecialText from '@/components/SpecialText'
import ContactForm from '@/layouts/contact-box/ContactForm'
import { Mail } from '@mui/icons-material'
import { Inter, Orbitron } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const orbitron = Orbitron({subsets: ["latin"]})
const inter = Inter({subsets: ["latin"]})

function ContactUs() {
  return (
    <div className={`flex flex-col bg-bg-900 px-4 md:px-0 w-full items-center ${inter.className}`}>

        <span className={`text-5xl font-bold mt-10 text-white ${orbitron.className}`}>
            Get in <SpecialText extra="text-5xl font-bold">Touch</SpecialText>
        </span>

        <span className="mt-5 text-neutral-500">Got questions or ideas? We&apos;d love to chat! Hit us up through our contact form or email, and we&apos;ll get back to you ASAP.</span>

        <Link href="mailto:info@arthlex.com" className='text-lg md:text-xl mb-12 font-medium text-neutral-500 mt-10'><Mail className='fill-neutral-500 w-5 h-6 mr-1.5 align-text-top' />Email us at: <span className='text-primary-500'>info@arthlex.com</span></Link>

        <ContactForm showDescription={false} showTitle={false} showMail={false} />

    </div>
  )
}

export default ContactUs