import FadedAboutBox from '@/components/FadedAboutBox'
import SpecialText from '@/components/SpecialText'
import Image from 'next/image'
import { Orbitron } from 'next/font/google'
import React from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import { BsRobot } from 'react-icons/bs'

const orbitron = Orbitron({ subsets: ['latin'] })

function AboutSection() {

  const features: Features[] = [
    {
      title: 'Create your AI Replica',
      description: 'Upload your Resume & Get your AI Replica that can talk to other users as if you\'re talking to them. Embed it on your Website or Share it with your friends.',
      image: '/assets/computer.jpeg',
      direction: 'left'
    },
    {
      title: 'Deploy the Bot on your own Website',
      description: "If you're a Professional, you can create an AI ChatBot for your Website, that will answer your customer's queries based on your feeded questions powered by its own AI Intelligence.",
      image: '/assets/chatbot2.png'
    },
    {
      title: "Just Say, Send an Email for me!",
      description: "You can even send an email to someone by just saying it to your bot, it will generate the content ask you email address and done, it would be sent to the receiver.",
      image: '/assets/email.png',
      direction: 'left'
    },
    {
      title: 'Generate Leads',
      description: "No one fills out those boring forms, but everyone loves to chat. So, you can generate leads in between chat of your bot with the users on your website or our Platform including their Names, Email IDs or Phone Numbers.",
      image: '/assets/chatbot.jpg',
      upcoming: true
    },
    {
      title: "Deploy on Discord & Telegram",
      description: "You can deploy your bot on Discord to chat with your friends or even on your own Discord Server.",
      image: '/assets/chatbot.webp',
      direction: 'left',
      upcoming: true
    }
  ]


  return (
    <div className='text-bg-900 flex flex-col items-start bg-gray-100 p-8 px-5 lg:px-24 lg:p-24 z-10'>
      {/* <FadedAboutBox> */}
        <span className={` text-3xl md:text-5xl font-semibold self-center text-center`}>So, What can you do with HumanizeAI? </span>
        <span className="text-lg mt-4 px-8 text-bg-800 self-center text-center">
            Basically HumanizeAI enables you to share your knowledge & Create an AI powered ChatBot out of it. It can be creating your <i>own AI Replica</i> or for <i>Professional purposes</i> (like creating an AI Chatbot for your Website to help out Customers & even generate leads) with the power of ChatGPT. <br /><br />
        </span>
        <div className='flex flex-col items-center gap-20 mt-4 w-full'>
          {/* <div className='grow text-justify'> */}
            
            {
              features.map((feature, index) => {
                return (
                  <FeatureCard upcoming={feature.upcoming} key={index} title={feature.title} description={feature.description} image={feature.image} direction={feature?.direction} />
                )
              })
            }
{/* 
            <span className='text-lg font-normal text-bg-800'>
              <b>If you're just trying out personally:</b><br />You can train your bot with either your Resume or manual training so it repicates you and communicate with other users as if you're talking to them either on using it on your own Website or someone connecting to your Bot on HumanizeAI only. <br /><br />
              <b>For Professional Usage:</b><br />
              <ul className='list-outside list-decimal'>
                <li>You can create an AI ChatBot for your Website, that can answer your customer's queries based on your feeded questions plus its own AI Intelligence.</li>
                <li>Additionally, you can provide files (like images) of your products or any image you might want to show while interacting or upon being asked like your Leather shoes collection.</li>
                <li>Fortunately, You can even generate leads in between chat of your bot with the users on your website or our Platform, like their Names, Email IDs or Phone Numbers.</li>
              </ul>
            </span> */}
          {/* </div> */}
          {/* <img src="/assets/about-robot.svg" alt="About Robot" className='w-48 ml-5 md:ml-0 md:w-96 self-center' /> */}
        </div>


            {/* Try out btn */}
        {/* <Link href="/chat-bot" className='z-20 mt-14 self-center'>
          <Button variant="special" onClick={()=>{return}}>
            <BsRobot className='h-6 w-6' />
            Still, Confused? Try it out!
          </Button>
        </Link> */}
    </div>
  )
}

const FeatureCard = (props: { title: string, description: string, image: string, direction?: "right" | "left", upcoming?: boolean }) => {
  return (
    <div className={`flex ${props.direction=="right" ? "flex-col-reverse lg:flex-row" : "flex-col-reverse lg:flex-row-reverse"} items-center gap-10 lg:max-w-[70vw] rounded-xl shadow-xl py-6 px-10`}>
      <div className="flex flex-col items-start text-left gap-2">
        <span className='text-4xl flex-wrap font-semibold text-bg-900 mt-2 flex flex-row items-center gap-3'>
          {props.title}
          {
            props.upcoming ? (
              <span className='text-sm min-w-max text-amber-600 py-1 px-2 border rounded-full border-amber-600'>
                Under Testing
              </span>
            ) : null
          }
        </span>
        <span className='text-lg text-bg-800 mt-2'>{props.description}</span>
      </div>
      <img src={props.image} alt={props.title} className='w-24 h-24 md:w-auto md:h-64 rounded-lg ' />
    </div>
  )
}

FeatureCard.defaultProps = {
  direction: "right",
  upcoming: false
}

interface Features {
  title: string,
  description: string,
  image: string,
  direction?: "right" | "left",
  upcoming?: boolean
}

export default AboutSection