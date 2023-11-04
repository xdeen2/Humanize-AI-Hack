import HeroSection from '@/layouts/blogs/HeroSection'
import BlogsSection from '@/layouts/blogs/BlogsSection'
import { Inter, Poppins } from 'next/font/google'
import React from 'react'
import Button from '@/components/SpecialButton'
import SubscribeBox from '@/components/SubscribeBox'
import Head from 'next/head'

const inter = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

function Blogs() {

    const [blogs2, setBlogs2] = React.useState([
        {
            title: "So, What is HumanizeAI?",
            blogId: "1",
            previewParagraph: "See, We all have tried ChatGPT and probably have been amazed by it. But, have you ever thought of making your own ChatGPT Bot? A bot learns...",
            image: "/bot.jpg",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "Shubham Singh",
            authorImage: "/team/shubham.jpeg"
        },
        {
            title: "How does the Learning Work?",
            blogId: "2",
            previewParagraph: "HumanizeAI allows your bot to engage in conversations with users. Every chat interaction is an opportunity for your bot to learn. It understands...",
            image: "/chatbotlearns.png",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "Dhruv Pal",
            authorImage: "/team/dhruvpal.jpeg"
        }
    ])
    
    const [blogs, setBlogs] = React.useState([
        {
            title: "How does the Learning Work?",
            blogId: "2",
            previewParagraph: "HumanizeAI allows your bot to engage in conversations with users. Every chat interaction is an opportunity for your bot to learn. It understands...",
            image: "/chatbotlearns.png",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "Dhruv Pal",
            authorImage: "/team/dhruvpal.jpeg"
        },
        {
            title: "Your Skills & Knowledge are Valuable",
            blogId: "3",
            previewParagraph: "While ChatGPT is impressive, it lacks real-world experience. Your skills are grounded in practical knowledge and expertise...",
            image: "/chatbottalks.webp",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "Shubham Singh",
            authorImage: "/team/shubham.jpeg"
        },
        {
            title: "So, What is HumanizeAI?",
            blogId: "1",
            previewParagraph: "See, We all have tried ChatGPT and probably have been amazed by it. But, have you ever thought of making your own ChatGPT Bot? A bot learns...",
            image: "/bot.jpg",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "Shubham Singh",
            authorImage: "/team/shubham.jpeg"
        }
    ])

  return (
    <>
        <Head>
            <title>HumanizeAI | Blogs</title>
            <meta name="description" content="HumanizeAI is a platform that lets you create your own bot with a unique VBot id. Use this as a communication medium or train it with your skills to help others." />
        </Head>
        <div className={`${inter.className} flex flex-col`}>
            
            <HeroSection title="So, What is HumanizeAI?" previewParagraph={[
                "See, We all have tried ChatGPT and probably have been amazed by it. But, have you ever thought of making your own ChatGPT Bot? A bot that learns your skills and preferences and then helps others on your behalf?",
                "Well, that's what HumanizeAI is all about. We are a platform that lets you create your own AI ChatBot, train it with your own Knowledge, and then deploy it to help others. And the best part? You don't need to know any coding to do that!"
                ]} image="/bot.jpg"
            />

            <BlogsSection title="Trending Topics" blogs={blogs2} />

            <BlogsSection title="Suggested Topics" blogs={blogs} />

            {/* <div className='my-16 mb-24 flex flex-row justify-center'>
                <SubscribeBox />
            </div> */}
        </div>
    </>
  )
}

export default Blogs