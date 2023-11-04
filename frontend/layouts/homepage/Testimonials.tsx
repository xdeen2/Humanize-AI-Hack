import TestimonialCard from '@/components/TestimonialCard'
import React from 'react'

function Testimonials() {

    const testimonials: any[] = [
        {
            name: "Shubham S.",
            image: "/assets/shubham.jpeg",
            username: "shubh62",
            text: "Humanize.AI transformed my business with AI Bot trained from PDF knowledgebase. Improved response time and customer satisfaction. Impressed!"
        },
        {
            name: "Dhruv Pal",
            image: "/assets/dhruv.jpeg",
            username: "dhruvpal",
            text: "The AI Bot trained with my Startup's Products' images added a great helping hand in its marketing. It identifies objects and assists in personal tasks. Amazing tool!"
        },
        {
            name: "Aryan Singh",
            image: "/assets/aryan.enc",
            username: "probablyaryan",
            text: "This has revolutionized my business with AI Bot trained from PDFs. Efficiently handles inquiries reduces workload and enhances response time."
        },
        {
            name: "Vedica Gairola",
            image: "/assets/vedica.enc",
            username: "vedica.g",
            text: "Humanize.AI's personalized AI Bot trained with images is a game-changer. Recognizes objects simplifies tasks and saves time. Highly recommend!"
        },
    ]

  return (
    <div className="bg-black text-white flex flex-col items-justify p-8 lg:p-24 z-10">
        <span className="text-3xl md:text-5xl font-semibold self-center">What do people say about HumanizeAI?</span>
        <span className="text-lg mt-4 px-8 text-white self-center text-center">
            Here's what our users have to say about us.
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16 w-full">
            {
                testimonials.map((testimonial, index)=>{
                    return <TestimonialCard key={index} name={testimonial.name} username={testimonial.username} image={testimonial.image} text={testimonial.text} />
                })
            }
        </div>
    </div>
  )
}

export default Testimonials