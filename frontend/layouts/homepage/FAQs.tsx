import { Inter, Orbitron, Poppins } from 'next/font/google'
// import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion'
import Button from '@/components/SpecialButton'
import SubscribeBox from '@/components/SubscribeBox'
import Accordion from '@/components/Accordion'

const poppins = Poppins({ weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

// const AccordionItem = ({ header, ...rest } : {header: string, children: any}) => (
//   <Item
//     {...rest}
//     header={({ state: { isEnter } }) => (
//       <>
//         <span className='text-lg font-semibold'>{header}</span>
//         <img
//           className={`ml-auto transition-transform duration-200 ease-in-out ${
//             isEnter && "rotate-225"
//           }`}
//           src="/assets/add.svg"
//           alt="Chevron"
//         />
//       </>
//     )}
//     className="border-b py-1 !bg-transparent select-none"
//     buttonProps={{
//       className: ({ isEnter }) =>
//         `flex w-full p-4 text-left`
//         // ${
//           // isEnter && "bg-slate-200"
//         // }
//     }}
//     contentProps={{
//       className: "transition-height duration-200 ease-in-out text-left"
//     }}
//     panelProps={{ className: "p-4" }}
//   />
// );

const faqs = [
  {
    header: "What is HumanizeAI and how does it work?",
    content: "HumanizeAI, is a platform that allows you to create, and train your own AI-powered bot. The system lets you impart your personal knowledge, skills, and style to your bot, and then allows you to offer the services of your bot to others, potentially creating an additional revenue stream."
  },
  {
    header: "How do I get started with creating my own bot?",
    content: "You start by creating a Botin the My Bots Section and thensetting up it by defining the Role of Bot, the rules it should follow, your company (where the bot can say that it works). And that's it, you can then share your Bot's Link like https://humanizeai.in/<your-username>, as well as it becomes visible to other users on the Platform."
  },
  {
    header: "How can I 'train' my AI Bot?",
    content: "So, We're trying to keep training an AI Bot as simple as possible. You can train your Bot 1. by just normally Chatting with it, 2. Uploading PDFs from which it can read and store readable data into its memory, 3. Upload Images with a text caption so the bot can show image if someone asks it."
  },
  {
    header: "How can I leverage more of the Bot with Bot-Embed or APIs?",
    content: "After you've built atleast 1 Bot, you can then start out with Integrating it into your Website (Currently, we're supporting ReactJS Websites, for other technologies like Angular we're coming very soon). That too, we've kept a lot simple, just a line of code with API key passed is enough to install the AI Bot in your own Website. If that doesn't fulfills your need, start out with the APIs to build your custom Bot."
  },
  {
    header: "Can I make money with my HumanizeAI bot?",
    content: "To be honest, We're in the initial phase of building the Platform. So, currently, we haven't started Monetization, but yes, in near-future you might be able to do so."
  },
  {
    header: "Is my personal data safe with HumanizeAI?",
    content: "Yes, HumanizeAI is designed to prioritize your privacy. While the bot learns from your interactions, it doesn't give out any data about you or its training to anyone using its services. The interactions between you and your bot, including the role descriptions and steps, remain proprietary to you and encrypted."
  },
]


function FAQs() {
  return (
    <div id="faqs" className={`text-white z-10 flex flex-col relative self-center text-center w-[95%] ${poppins.className} bg-transparent from-[#C816D333] to-[#1A9EDA33]`}>
      {/* <span className={`font-semibold text-4xl mb-10 ${poppins.className}`}>FAQS</span> */}
      <Accordion faqs={faqs} expandButon={1} showBorder={false} />
      {/* <SubscribeBox boxStyle='mt-24 -bottom-24 -mb-56' /> */}
      
    </div>
  )
}

export default FAQs