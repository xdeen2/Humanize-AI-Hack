import SpecialText from "@/components/SpecialText"

function Tribute() {

    const tributeTextArray = [
        "Adding A ChatBot with so much power have never been so easy. You can create your own AI ChatBot just like ChatGPT but with your own skills and knowledge.",
        "You can upload PDFs & Images to train your bot on the Platform & harness the power of that Bot on your own Website or App. Currently, we don't allow Images to be shown on the Embed ChatBot, but we're working on it to make it Possible.",
        "The Embed ChatBot has flexible customizability, but we're working on it to make it more customizable. You can also use our API to integrate it with your existing ChatBot.",
    ]

  return (
    <div className="flex flex-col md:flex-row md:items-center px-4 md:px-24 p-14 md:p-24 gap-10 md:gap-24 bg-white">
        <video src="/assets/embed.mp4" className="h-80 self-center md:self-start rounded-lg" autoPlay loop muted />
        <div className="flex flex-col">
            <span className="text-bg-light-black font-semibold text-3xl">Bot Embedding</span>
            {
                tributeTextArray.map((paragraph, index) => {
                    return <p key={index} className="text-bg-50 mt-4 text-justify">{paragraph}</p>
                })
            }
        </div>
    </div>
  )
}

export default Tribute