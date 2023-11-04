import { useState } from "react"

function Content(props: {blogId: string}) {

    const blogId = props.blogId

    const blogs: Blogs = {
        "1": {
            title: "So, What is HumanizeAI?",
            part1: [
                "See, We all have tried ChatGPT and probably have been amazed by it. But, have you ever thought of making your own ChatGPT Bot? A bot that learns your skills and preferences and then helps others on your behalf?",
                "Well, that's what HumanizeAI is all about. We are a platform that lets you create your own AI ChatBot, train it with your own Knowledge, and then deploy it to help others. And the best part? You don't need to know any coding to do that!",
                "Let's checkout below, how simple it is to create your own AI Bot."
            ],
            img: "/botwallpaper.png",
            part2: [
                {
                    title: "Step 1: Create A Bot",
                    content: [
                        "First things first, you need to create a bot. You can do that by clicking on the 'Create Bot' in the dashboard as you login. You will be asked to enter a name for your bot. Once you do that, your AI Bot has been created (but not setup). So, go ahead and click on the 'Setup Bot' button to start training your bot. Remember, the first Bot you train is your primary Bot, that is the Primary Bot should replicate you, and its settings is in-sync with your Account Settings. So, make sure you train your primary Bot first well."
                    ]
                },
                {
                    title: "Step 2: Train Your Bot",
                    content: [
                        "Firstly, you would need to put some basic info for your bot. This includes the:",
                        "Bot's name,",
                        "Description (That would be shown to other users scrolling on the Platform),",
                        "the Bot's Profile Picture & the Main Things",
                        "Botrole (How it should act) &",
                        "Rules (Strict Rules that it should follow).",
                        "After putting these information in the setup page, you're ready to go for the Next One",
                        "Now, you can train your Bot while Chatting (the fun part), by including PDFs & Images as well. The Bot will learn from the content of the PDF (hopefullly it's readable by it), & will remember the images (as per the caption you provide) & the PDF Content or whatever you Chat with it, for future use while other users chat with your bot."
                    ]
                },
                // {
                //     title: "Crafting the Steps",
                //     content: [
                //         "Steps are like your VBot's to-do list. These should be clear and direct, explaining exactly what your VBot needs to do when it gets a certain prompt or question. Using our shopping sidekick as an example, the Steps could be, 'Get the user's style and budget. And Hunt down matching items online. Show the user your top picks.'. There are 4 kids od steps which you should include to make a perfect recipe.",
                //         "1. Requirement Gathering - where you ask the bot to gauge what the user wants",
                //         "2. External Data Reference - where you upload some data to the platform and ask the bot to refer the same",
                //         "3. Response content - where you tell the bot what should be included in the response",
                //         "4. Response style - where you tell the bot the tone and style of responses."
                //     ]
                // },
                // {
                //     title: "Chatting and Tweaking",
                //     content: ["Once you've got your Role Description and Steps, it's time to have a chat with your VBot. See how it responds, and then tweak the Role Description and Steps to make them even better. It's all about trial and error."]
                // },
                {
                    title: "If you want your bot to remain on the Platform that's great, but if you wanna put the Bot on your Website, you can do that too!",
                    content: [
                        "You can do that by clicking on the 'Embeding' Section in the Dashboard. You will be asked to choose the Bot which you want to get the API for, and then you will be provided with a code. You can paste that code in your website's code, and your bot will be live on your website."
                    ]
                },
                {
                    title: "Checking in and Updating",
                    content: ["Just like you wouldn't wear last year's fashion, your Bot should always be up-to-date. Every now and then, take a look at your Role Description and Steps and see if they need a revamp. You might add new Steps, tweak the Role Description, or even come up with a whole new role for your Bot!"]
                },
                {
                    title: "Wrap Up",
                    content: ["So there you have it! With a solid Role Description and some simple Steps, you can train your Bot to be the ultimate personal assistant. Don't forget, it's all about creating a Bot that not only does the job but also feels uniquely you. So get out there and start cooking up your perfect Bot!"]
                }
            ]
        },
        "2": {
            title: "",
            part1: ["Learning is at the core of every successful AI chatbot. In this blog, we'll take a deep dive into how learning works on the HumanizeAI platform. Discover how your bot can absorb knowledge from various sources, including PDFs, images, and chat interactions.",
            ],
            img: "/assets/bg-2.jpeg",
            part2: [
                {
                    title: "Learning from Chat Interactions",
                    content: [
                        "HumanizeAI allows your bot to engage in conversations with users. Every chat interaction is an opportunity for your bot to learn. It understands user queries, refines responses, and improves over time."
                    ]
                },{
                    title: "PDFs as Learning Materials",
                    content: [
                        "PDFs are a valuable source of information. Your bot can ingest PDF documents, extract text, and learn from their contents. This ensures that your bot remains up-to-date with the latest industry knowledge."
                    ]
                },{
                    title: "Remembering Images",
                    content: [
                        "Images are not left out. Your bot can be trained to remember images based on the caption your provide. It can learn from image captions and use this knowledge in conversations."
                    ]
                },
            ]
        },
        "3": {
            title: "",
            part1: ["The Difference Between ChatGPT and You, "],
            img: "",
            part2: [
                {
                    title: "Experience Matters",
                    content: ["While ChatGPT is impressive, it lacks real-world experience. Your skills are grounded in practical knowledge and expertise.",]
                },
                {
                    title: "Personalized Assistance",
                    content: ["Your AI bot is a reflection of you. It learns from your experience and understands your unique skills, allowing it to provide personalized assistance."]
                },
                {
                    title: "Helping the Masses",
                    content: ["Your AI bot can assist users with valuable insights, recommendations, and solutions. It empowers individuals and businesses to benefit from your expertise.",
                                "Users turn to your bot for real-world challenges. Your knowledge is applied to address their needs effectively."]
                },
                {
                    title: "Conclusion",
                    content: ["HumanizeAI empowers you to share your skills and knowledge with the world. By creating AI bots that learn from you, you bridge the gap between your expertise and the masses, making a meaningful impact in various industries."]
                }
            ]
        }  
    }

  return (
    <div className="flex flex-col">
        
        <div className="flex flex-row gap-8 items-center">

            <div className="flex flex-col">
                {
                    blogs[blogId].part1.map((content, index) => {
                        return (
                            <p key={index} className="text-justify py-2">{content}</p>
                        )
                    })
                }
            </div>

            {
                blogs[blogId].img !== "" && ( <img src={blogs[blogId].img} alt="blog" className="w-[20vw] h-auto my-4" /> )
            }
        </div>

        {
            blogs[blogId].part2.map((content, index) => {
                return (
                    <div key={index} className="flex flex-col py-4 text-bg-900">
                        <h1 className="text-3xl font-semibold mb-3">{content.title}</h1>
                        {
                            content.content.map((content, index) => {
                                return (
                                    <p key={index} className="text-justify py-3.5">{content}</p>
                                )
                            })
                        }
                    </div>
                )
            })
        }

    </div>
  )
}

interface ContentParts {
    title: string
    content: string[]
}

interface Blogs {
    [blogId: string]: {
        title: string
        part1: string[]
        img: string
        part2: ContentParts[]
    }
}

export default Content