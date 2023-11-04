import LongBlogCard from "@/components/LongBlogCard"
import SpecialText from "@/components/SpecialText"
import Link from "next/link"

function ExploreMore(props: {blogId?: string}) {

  const blogs: Blogs = {
    "1": {
        title: "VBots and HumanizeAI: Your Guide to Training with Role Description and Steps",
        part1: [
            "Hey there! You've probably heard about HumanizeAI, right? If you haven't, let me introduce you: HumanizeAI, or the Variable Inference Knowledge & Response Augmentation Model, is a super cool platform where you can cook up your own personal AI - we like to call it a VBot!",
            "Now, you're probably thinking, 'Creating my own VBot? Sounds tough.' Well, guess what? It's as easy as pie with HumanizeAI's Role Description and Steps. Let's dive in!"
        ],
        img: "/assets/ss.png",
        part2: [
            {
                title: "All About Role Description and Steps",
                content: [
                    "These two ingredients are what make your VBot unique. Role Description is like your VBot's job profile - what it does, what it's good at. Steps are the specific actions it takes to do its job. Sounds simple, right?"
                ]
            },
            {
                title: "Whipping up the Perfect Role Description",
                content: ["Think of Role Description as your VBot's resume. You're gonna want to be specific. Let's say your VBot is going to be a shopping buddy. Your Role Description might be something like, 'You're the ultimate shopping sidekick, always on top of the latest fashion trends and finding the best deals.' The more detailed you are, the better your VBot can copy your style and expertise."]
            },
            {
                title: "Crafting the Steps",
                content: [
                    "Steps are like your VBot's to-do list. These should be clear and direct, explaining exactly what your VBot needs to do when it gets a certain prompt or question. Using our shopping sidekick as an example, the Steps could be, 'Get the user's style and budget. And Hunt down matching items online. Show the user your top picks.'. There are 4 kids od steps which you should include to make a perfect recipe.",
                    "1. Requirement Gathering - where you ask the bot to gauge what the user wants",
                    "2. External Data Reference - where you upload some data to the platform and ask the bot to refer the same",
                    "3. Response content - where you tell the bot what should be included in the response",
                    "4. Response style - where you tell the bot the tone and style of responses."
                ]
            },
            {
                title: "Chatting and Tweaking",
                content: ["Once you've got your Role Description and Steps, it's time to have a chat with your VBot. See how it responds, and then tweak the Role Description and Steps to make them even better. It's all about trial and error."]
            },
            {
                title: "Checking in and Updating",
                content: ["Just like you wouldn't wear last year's fashion, your VBot should always be up-to-date. Every now and then, take a look at your Role Description and Steps and see if they need a revamp. You might add new Steps, tweak the Role Description, or even come up with a whole new role for your VBot!"]
            },
            {
                title: "Wrap Up",
                content: ["So there you have it! With a solid Role Description and some simple Steps, you can train your VBot to be the ultimate personal assistant. Don't forget, it's all about creating a VBot that not only does the job but also feels uniquely you. So get out there and start cooking up your perfect VBot!"]
            }
        ]
    },
    "2": {
        title: "HumanizeAI: A Breakthrough Platform Melding Human Individuality with AI",
        part1: ["In recent years, a burning question has fueled substantial debate within our society: will artificial intelligence (AI) usurp human jobs? With the introduction of HumanizeAI, a pioneering AI platform, this query is about to be reimagined.",
            "HumanizeAI, an acronym for Variable Inference Knowledge & Response Augmentation Model, isn't just another addition to the AI echelon. Instead, it represents a revolutionary platform where individuals can forge their unique Virtual Bot (VBot) - a digital entity that encapsulates personal style, experiential knowledge, and distinctive problem-solving abilities. This VBot operates as a digital counterpart, augmented by the inherent speed and computational power of AI.",
            "One of the notable elements setting HumanizeAI apart is its crucial emphasis on human variance. Each person embodies a unique methodology, a distinctive cognitive approach, and an individual communication style. HumanizeAI doesn't merely recognize this human attribute, but amplifies it with the prowess of AI. Individuals train their VBots to mirror their own operating styles, thinking patterns, and communication preferences, creating not a replacement, but an extension of themselves that enhances their productivity manifold.",
            "Another innovative aspect of HumanizeAI is its potential to revolutionize income generation. Once the VBot is adequately trained, it can serve others on the platform, undertaking tasks and providing a novel revenue stream for its creator.",
        ],
        img: "/assets/bg-2.jpeg",
        part2: [
            {
                title: "Threat to Employment?",
                content: [
                    "So, does AI signify an existential threat to employment? The advent of HumanizeAI suggests otherwise. This groundbreaking platform integrates the capabilities of AI with the distinctiveness of human variance, fostering a collaborative synergy rather than a displacement scenario. HumanizeAI heralds a new era in the workforce landscape where AI and human variance harmoniously coexist, marking a paradigm shift in our understanding of employment in the AI age."
                ]
            }
        ]
    },
    "3": {
        title: "HumanizeAI - What the Future Holds?",
        part1: ["Vikas, the CEO of a bustling corporation sits comfortably in their office while their AI bot, powered by HumanizeAI, attends a crucial board meeting on their behalf. The AI bot is trained to understand the CEO's vision, strategies, and decision-making patterns. It adeptly navigates through complex discussions, offers insights, and even negotiates deals, impressing the board members with its comprehensive knowledge and analytical prowess. The CEO confidently leads the company from behind the scenes, while the AI bot becomes a trusted representative, ensuring the CEO's vision is flawlessly executed.",
        "Rakshit is an HR professional with around 10 years of experience. He is an expert in crafting employee policies, attrition management and employee engagement. He creates a bot which is working for 10 companies at the same time – attending meetings writing emails, launching campaigns and taking exit interviews. But where is Rakshit? He is with his family enjoying the cool sea breeze in Goa. ",
        "These 2 scenarios which look straight out of a sci-fi movie might be possible in the future with HumanizeAI or Variable Inference Knowledge & Response Augmentation Model. Developed by a group of engineering college students, HumanizeAI empowers individuals to train their own bots, infusing them with unique knowledge, skills, and experiences. This distinctive feature, known as variable inference, allows users to shape their bots' responses in a way that captures their individual style and expertise. ",
        "HumanizeAI is an effort to completely reverse the narrative on job losses due to AI. The makers of this breakthrough model believe that since each individual is unique, the outputs and responses produced by them are unique and that’s what makes them valuable. It combines the intelligence and strength of AI with the variance of humans.",
        "Imagine a future where your bot can attend meetings on your behalf, work diligently in companies, or assist you in a myriad of tasks, tailored precisely to your needs. With HumanizeAI, this future is within reach.",
        "The implications of HumanizeAI are vast and far-reaching. This platform has the potential to transform the professional landscape, enabling individuals to extend their capabilities, increase productivity, and even generate additional income by lending their bots to others seeking specialized assistance.",
        "But HumanizeAI is not just a tool for the tech-savvy elite. The creators have designed it with simplicity in mind, ensuring that even those without extensive coding knowledge can leverage its power. HumanizeAI opens the doors of AI to a wider audience, democratizing the technology and empowering individuals from all walks of life.",
        "As we unveil HumanizeAI to the world, the excitement is palpable. This platform is poised to disrupt the AI landscape, forever altering the way we interact with technology and harnessing the potential of AI like never before.",
        "The future of AI has arrived, and its name is HumanizeAI."],
        img: "",
        part2: []
    }  
}

  return (
    <div className="flex flex-col">
        <span className="flex flex-col md:flex-row justify-between">
            <SpecialText extra="font-bold text-3xl md:text-4xl">Explore More</SpecialText>
            <Link href="/blogs">
                <span className="text-primary-500 cursor-pointer mt-2 md:mt-0">View all</span>
            </Link>
        </span>
        <div className="blogs mt-2 border-b border-bg-50">
            {
                Object.keys(blogs).map((blogId) => {
                    if (blogId !== props.blogId) {
                        return <LongBlogCard key={blogId} blogId={blogId} title={blogs[blogId].title} description={blogs[blogId].part1[0]} image={blogs[blogId].img} />
                    }
                })
            }
        </div>
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


export default ExploreMore