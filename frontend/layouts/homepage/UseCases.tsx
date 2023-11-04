import SpecialText from "@/components/SpecialText"

function UseCases() {

    const useCases = {
        "Normal Users": [
            "You are a business leader and an opinion maker. Young students and professionals look up to you for career advice. Create a bot and upload your career philosophy and professional experiences. Share your bot id and positively influence thousands of young minds  to help choose their career goals.",
            "You are a young professional looking for a career move. Create a bot and let it speak about your achievements and areas of interest. Extra points for that tech savvy first impression!",
            "You are the go to guy for people looking for great options for food in the city. Create a pdf with your knowledge about the city's restaurants and upload it to your bot. Send the bot id to your friends and let them use your expertise through your bot.",
            "You are standing in a local body election. Create a bot and feed it your manifesto. Let the public interact with it and know your views."
        ],
        "Professionals": [
            {
                title: "Use Case 1: Brand Visibility",
                description: ["• If you are a new organization, you can create a bot to tell prospective candidates about the organization and improve your visibility. You can also use the bot to engage with offered candidates to keep them engaged."]
            },
            {
                title: "Use Case 2: Career Counselor",
                description: ["• If you run a coaching centre, you can create a bot to interact with students and give them study tips to pull them to your business."]
            },
            {
                title: "Use Case 3: Your Catalogue",
                description: ["• If you run a restaurant, create a bot and upload your menu to help people know about the delicious food you have."]
            }
        ]
    }

  return (
    <div className="flex flex-col z-10 bg-white w-full p-8 pt-12 md:p-24 items-center" id="use-cases">
        <SpecialText extra="text-4xl md:text-5xl font-medium">USE CASES FOR EVERYONE</SpecialText>
        <span className="text-lg text-bg-50 mt-2.5">HumanizeAI caters to both normal users and professionals who are looking to monetize their skills by making the bots serve others.</span>

        <div className="flex flex-col mt-14 gap-2.5">
            <SpecialText extra="text-3xl md:text-4xl">Normal Users</SpecialText>
            <span className="font-semibold text-bg-50">Your personal bot comes with a range of pre-built use cases to help you with various tasks. Here's what you can expect from your HumanizeAI bot:</span>
            <div className="flex flex-col md:flex-row px-4 md:px-0 gap-0 mt-5">
                <img src="/assets/about-robot.svg" className="self-center drop-shadow-xl md:self-start" alt="" />
                <div className="flex flex-col">
                    <ul className="md:ml-5 mt-8">
                    {
                        useCases["Normal Users"].map((useCase, index) => {
                            return <li key={index} className="text-sm text-bg-50 list-disc my-1.5 text-justify list-outside">{useCase}</li>
                        })
                    }
                    </ul>
                    <span className="font-semibold text-bg-50 mt-3">Experience the power of HumanizeAI and make your life easier by having a personalized AI bot that caters to your individual needs!</span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row px-4 md:px-0 gap-5 md:gap-10 mt-10">
                <SpecialText extra="text-4xl">Professionals</SpecialText>
                <span className="font-semibold text-bg-50">As an expert, you can use HumanizeAI to monetize your skills by building on top of the built-in learning. Create commercial bots that share your expertise, and rest easy knowing your knowledge is protected.</span>
            </div>
                <div className="flex flex-col">
                    <ul className="md:ml-5 mt-4 md:px-16">
                    {
                        useCases["Professionals"].map((useCase, index) => {
                            return <li key={index} className="text-sm text-bg-50 list-none my-4 list-outside"><b>{useCase.title} : </b>{useCase.description.map((i, index2)=>{
                                return <p key={index2} className="text-justify ml-1 mt-1">{i}</p>
                            })}</li>
                        })
                    }
                    </ul>
                </div>
                <span className="text-bg-400 text-sm font-medium">
                    * Coming Soon
                </span>
        </div>
    </div>
  )
}

export default UseCases