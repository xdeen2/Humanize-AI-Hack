import Button from '@/components/SpecialButton'
import FeaturesList from '@/components/FeaturesList'
import SpecialText from '@/components/SpecialText'
import { Orbitron } from 'next/font/google'
import React from 'react'

const orbitron = Orbitron({ subsets: ['latin'] })

function Features() {
  return (
    <div className='text-white flex flex-col bg-black'>
      <span className={`${orbitron.className} font-medium text-4xl md:text-5xl text-center`}>Our <SpecialText extra={`${orbitron.className}`}>Features</SpecialText></span>
      {/* <span className='text-base text-neutral-500 text-center mt-5'>The bot you create via HumanizeAI would be unlike anything you or anyone else would have seen. It will have:</span> */}
      <div className='px-3 md:px-0'>
        <FeaturesList features={[
          {
            image: '/assets/feature-image1.svg',
            title: "Get your own bot and Train it",
            description: 'Get a bot for yourself and tell it about yourself and train with your skills. Easy to learn training framework. Train your bot with 0 coding.'
          },
          {
            image: '/assets/feature-image3.svg',
            title: "Knowledge Base",
            description: "Have your bot learn from your own custom documents."
          },
          {
            image: '/assets/feature-image2.svg',
            title: "Use ChatGPT without giving it your expertise",
            description: "HumanizeAI bots use ChatGPT's power, but your interactions train your own bot, not ChatGPT."
          },
          {
            image: "/assets/feature-image4.svg",
            title: "Plugins",
            description: "Inbuilt APIs to Browse the Web, YouTube and much more…"
          }
        ]} />
      </div>
        {/* <Button title='So, Go Ahead and Get your Bot' buttonStyle='self-center mt-1' /> */}
    </div>
  )
}

export default Features