import Button from '@/components/Button'
import PricingCard, { Plan, PricingProps } from '@/components/PricingCard'
import FAQs from '@/layouts/homepage/FAQs'
import { UserContext } from '@/pages/_app'
import { DashboardContext } from '@/pages/dashboard'
import { Switch } from '@mui/material'
import { Poppins } from 'next/font/google'
import Head from 'next/head'
import React, { useContext } from 'react'
import { BiMenu } from 'react-icons/bi'

const poppins = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

function Upgrade() {

  const { userDetails } = useContext<any>(UserContext)

  const [mode, setMode] = React.useState<"monthly" | "yearly">("monthly")

  const plans: PricingProps[] = [
    {
      title: "Basic",
      pricing: [{amount: "0", currency: "$", interval: "monthly"}, {amount: "0", currency: "$", interval: "yearly"}],
      features: [
        "General ChatGPT Unlimited Chats",
        "Unlimited Bots Allowed",
        "API Access",
        "Website Bot Integration",
        "Include Images & PDFs in your Training Chat",
        "100 Chats per Day with your Bot (For API)",
        "2,500 Chats per Month with your Bot (For API)",
      ],
    },
    {
      title: "Standard",
      pricing: [{amount: "XX", currency: "$", interval: "monthly"}, {amount: "XXX", currency: "$", interval: "yearly"}],
      features: [
        "General ChatGPT Unlimited Chats",
        "Unlimited Bots Allowed",
        "API Access",
        "Website Bot Integration",
        "Discord Bot Integration",
        "Telegram Bot Integration",
        "Include Images & PDFs in your Training Chat",
        "1,000 Chats per Day with your Bot (For API)",
        "25,000 Chats per Month with your Bot (For API)",
        "Lead Generation stored on database upto 100"
      ],
    },
    {
      title: "Premium",
      pricing: [{amount: "XXX", currency: "$", interval: "monthly"}, {amount: "XXX", currency: "$", interval: "yearly"}],
      features: [
        "General ChatGPT Unlimited Chats",
        "Unlimited Bots Allowed",
        "API Access",
        "Website Bot Integration",
        "Discord Bot Integration",
        "Telegram Bot Integration",
        "Include Images & PDFs in your Training Chat",
        "5,000 Chats per Day with your Bot (For API)", 
        "100,000 Chats per Month with your Bot (For API)",
        "Unlimited Lead Generation stored on database",
      ],
    }
  ]

  return (
    <>
        <Head>
            <title>Pricing - HumanizeAI</title>
            <meta name="description" content="The Pricing model for Premium Usage for training your AI Bots & have more than 100K daily users." />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className={`p-4 pt-20 flex flex-col w-full items-center bg-bg-light-black overflow-y-auto ${poppins.className}`}>
        <span className="text-neutral-400 text-3xl my-4 font-semibold text-center">
        <BiMenu className="w-8 h-8 text-indigo-300 cursor-pointer lg:hidden absolute top-14 left-8" onClick={()=>{
                document.getElementById("left-bar")?.classList.toggle("hidden")
            }} />
            Pricing Plans Coming Soon
        </span>

        <span className="text-lg text-neutral-700 lg:px-10 text-center">
            We are working on our pricing plans and will be launching them soon.
            Until then, you can use all the features for completely <b>Free</b>.
        </span>

        <div className="flex flex-row gap-2 items-center mb-5">
            <span className="text-neutral-300 font-medium text-sm">Monthly</span>
            <Switch checked={mode === "yearly"} onChange={() => setMode(mode === "monthly" ? "yearly" : "monthly")} />
            <span className="text-neutral-300 font-medium text-sm">Yearly</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full p-3">
            {
            plans.map((plan, index) => (
                <PricingCard
                key={index}
                title={plan.title}
                pricing={plan.pricing}
                features={plan.features}
                active={userDetails?.plan === index}
                interval={mode}
                />
            ))
            }
        </div>

        <div className="flex flex-col items-center gap-4 my-6">

            <span className="text-neutral-600 text-lg font-light text-center px-8">
                While We&apos;re working on our Pricing Plan & Overall Platform, your Feedback is very much valuable to us.<br />
                It would be great if you give suggestions or any feedback in <span>Help & Feedback</span> Section.
            </span>

            <Button onClick={()=>{}} variant='outline'>
                Go to Help & Feedback
            </Button>
            {/* <FAQs /> */}
        </div>
        </div>
    </>
  )
}

export default Upgrade