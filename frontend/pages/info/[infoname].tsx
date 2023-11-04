import SpecialText from "@/components/SpecialText"
import { Inter, Poppins } from "next/font/google"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

const inter = Poppins({weight: ['200', '300', '400', '500', '600', '700'], subsets: ['latin']})

function Info() {

    const router = useRouter()
    const infoName = router.query.infoname

    const infos = [
        {
            name: "privacy-policy",
            title: "Privacy Policy",
            subtext: "HumanizeAI self-operates the AI Bots creation platform. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal information we receive from users of our platform.",
            content: [
                {
                    title: "1. Information Collection and Use",
                    content: "While using our platform, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your name, email address, and a unique bot ID (\"Personal Information\")."
                },
                {
                    title: "2. Usage of your GMail Account Permissions",
                    content: "As you might know, we're providing you with the ability to send emails from your bot. For this, we need to have the permission to send emails. We cannot store your email or send emails without your consent. We only store the email address of the recipient and the content of the email. We don't share this information with anyone."
                },
                {
                    title: "3. Log Data",
                    content: "Like site operators, we collect information that your browser sends whenever you visit our rm (\"Log Data\"). This Log Data may include information such as your computer's rnet Protocol (\"IP\") address, browser type, browser version, the pages of our m that you visit, the time and date of your visit, the time spent on those pages, other statistics."
                },
                {
                    title: "4. Cookies",
                    content: "Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive. Like many sites, we use \"cookies\" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
                },
                {
                    title: "5. Security",
                    content: "The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security."
                },
                {
                    title: "6. Changes to This Privacy Policy",
                    content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the platform. You are advised to review this Privacy Policy periodically for any changes."
                }
            ]
        },
        {
            name: "terms-and-conditions",
            title: "Terms and Conditions",
            subtext: "Please read these Terms of Service (\"Terms\", \"Terms of Service\") carefully before using the HumanizeAI bot creation platform operated by HumanizeAI (\"us\", \"we\", or \"our\").",
            content: [
                {
                    title: "1. Your Access to and Use of the Service",
                    content: "Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service."
                },
                {
                    title: "2. Accounts",
                    content: "When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service."
                },
                {
                    title: "3. Content",
                    content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect."
                },
                {
                    title: "4. Changes",
                    content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect."
                },
                {
                    title: "5. Termination",
                    content: "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
                },
                {
                    title: "Limitation of Liability",
                    content: "In no event shall HumanizeAI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose."
                },
                {
                    title: "7. Governing Law",
                    content: "These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions."
                },
                {
                    title: "8. Contact Us",
                    content: "If you have any questions about these Terms, please contact us at info@arthlex.com"
                }
            ]
        }
    ]

    useEffect(()=>{
        console.log("INFO", infoName)
        // if(!infoName) {
        //     router.push("/404")
        // }
        console.log(infos.filter((info) => info.name === infoName))
    }, [])

    // const title = infos.filter((info) => info.name === infoName)[0].title
    // console.log(title)

  return (
    <>
        <Head>
            <title>HumanizeAI | {infos.filter((info) => info.name === infoName)[0] && infos.filter((info) => info.name === infoName)[0].title}</title>
            <meta name="description" content={infos.filter((info) => info.name === infoName)[0] && infos.filter((info) => info.name === infoName)[0].subtext} />
        </Head>
        <div className="w-full bg-bg-900 flex flex-col text-justify p-6 md:p-16 md:pt-32 md:px-20 border-b">
            <span className={`text-5xl font-bold mb-6 text-neutral-300 ${inter.className}`}>
                {infos.filter((info) => info.name === infoName)[0] && infos.filter((info) => info.name === infoName)[0].title}
                {/* Abcd */}
            </span>
            <span className={`text-lg text-neutral-50 mb-14 ${inter.className}`}>{infos.filter((info) => info.name === infoName)[0] && infos.filter((info) => info.name === infoName)[0].subtext}</span>
            {
                infos.filter((info) => info.name === infoName)[0] && infos.filter((info) => info.name === infoName)[0].content.map((content, index) => {
                    return (
                        <div key={index} className={`flex flex-col gap-3 mb-14 text-neutral-50 ${inter.className}`}>
                            <span className="font-semibold text-2xl">{content.title}</span>
                            <span className="text-lg">{content.content}</span>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}

export default Info