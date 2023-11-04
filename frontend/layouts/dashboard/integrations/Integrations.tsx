import { UserContext } from '@/pages/_app'
import { DashboardContext } from '@/pages/dashboard'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { BiMenu } from 'react-icons/bi'

function Integrations() {

  const userContext = useContext<any>(UserContext)
  const dashboardContext = useContext<any>(DashboardContext)

  const [botidSelected, setBotidSelected] = React.useState<string>("")
  const [apiKey, setApiKey] = React.useState<string>("")

  const [copied, setCopied] = React.useState<boolean>(false)

  const getApiKey = async () => {
    if (botidSelected === "") {
      toast.error("Please Select a Bot First")
    } else {
      const gettingApiKeyToast = toast.loading("Generating API Key...")
      const response = await fetch(`http://localhost:5000/get-api-key/${botidSelected}`, {
        headers: {
          "x-access-token": localStorage.getItem("token")!
        }
      })
      const data = await response.json()
      if (data.success) {
        setApiKey(data.data)
        toast.success("API Key Generated Successfully", {
          id: gettingApiKeyToast
        })
      } else {
        toast.error(data.message, {
          id: gettingApiKeyToast
        })
      }
    }
  }

  return (
    <div className='fle flex-col overflow-y-auto'>
      <div className="w-full flex flex-row gap-2 items-center">
      <BiMenu className="w-8 h-8 min-w-[32px] min-h-[32px] text-indigo-300 cursor-pointer lg:hidden pl-3" onClick={()=>{
            document.getElementById("left-bar")?.classList.toggle("hidden")
          }} />
      <div className="flex w-full flex-col items-start justify-between py-6 px-2 lg:px-8 border-b border-bg-600">
        <span className="text-2xl font-semibold text-neutral-300 flex gap-2 items-center">API Integrations & Embedding ChatBot</span>
        <span className="text-sm font-normal text-neutral-600">The Part where it goes Interesting</span>
      </div>
      </div>

      <div className="flex flex-col gap-6 p-8">
        <span className="text-xl font-semibold text-neutral-400">1. ChatBot Embedding</span>

        <div className="flex w-full flex-col-reverse lg:flex-row items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-medium text-neutral-300">Let's See, How you'll Embed your Trained ChatBot into Your Website</span>
            <span className="text-sm font-normal text-neutral-500">1. Generate an API Key by Selecting anyone of your Trained ChatBots (If not trained, <span onClick={()=>{dashboardContext.setCurrentTab("My Bots"); dashboardContext.setCurrentSubTab(0)}} className='text-blue-600 cursor-pointer'>Create One</span>)</span>
            <div className="flex flex-row gap-2 my-1">
              <select name="" id="" className="w-full h-fit bg-transparent border border-neutral-700 rounded-md p-2 py-1.5 text-neutral-300 outline-none" onChange={(e: any)=>{
                setBotidSelected(e.target.value)
              }}>
                <option value="" selected disabled className="text-neutral-500 bg-bg-900 p-2">
                  Select a Bot
                </option>
                {
                  userContext.bots?.map((bot: any)=>{
                    return (
                      <option value={bot[1]} className="text-neutral-500 bg-bg-900 p-2">
                        {bot[18]}
                      </option>
                    )
                  })
                }
              </select>
              <button className=" bg-neutral-600 min-w-max rounded-md px-3 py-1.5 text-bg-500 font-medium outline-none hover:bg-neutral-400" onClick={getApiKey}>
                Generate API Key
              </button>
            </div>

            {
              apiKey != "" && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-normal text-neutral-500">2. Copy the API Key Somewhere, and we'll use it in our Code.</span>
                  <div className="flex flex-row gap-2 items-center">
                    <input type="text" disabled className="w-full h-fit bg-transparent border border-neutral-700 rounded-md p-2 py-1.5 text-neutral-300 outline-none" value={apiKey} />
                    <button className=" bg-neutral-600 hover:bg-neutral-400 min-w-max rounded-md px-3 py-1.5 text-bg-500 font-medium outline-none" onClick={()=>{
                      navigator.clipboard.writeText(apiKey)
                      setCopied(true)
                      setTimeout(()=>{
                        setCopied(false)
                      }, 2000)
                    }}>
                      {
                        copied ? "Copied" : "Copy"
                      }
                    </button>
                  </div>
                </div>
              )
            }

            <span className="text-xs font-medium mb-1 text-neutral-500">Currently We have A Library for ReactJS only, for HTML, AngularJS & other Technologies we're coming up very soon</span>
            <span className="text-sm font-normal text-neutral-500">2. So, for the ReactJS Developers, start with creating a React App:</span>
            <code className="text-sm font-normal text-neutral-500 bg-bg-900 p-2 rounded-md">
              npx create-react-app my-app
            </code>
            <span className="text-sm font-normal text-neutral-500 mt-1.5">3. Now, Install the ChatBot Library:</span>
            <code className="text-sm font-normal text-neutral-500 bg-bg-900 p-2 rounded-md">
              npm i humanize-ai-embed
            </code>
            <span className="text-sm font-normal text-neutral-500 mt-1.5">4. Now, Import the Library in your App.js or whichever component you want:</span>
            <code className="text-sm font-normal text-neutral-500 bg-bg-900 p-2 rounded-md">
              import HumanizeAI from 'humanize-ai-embed'
            </code>
            <span className="text-sm font-normal text-neutral-500 mt-1.5">5. And, Finally Use the Component in your JSX that we've kept extremly simple (Just pass the apiKey):</span>
            <code className="text-sm font-normal text-neutral-500 bg-bg-900 p-2 rounded-md">
              {"<HumanizeAI apiKey={apiKey} />"}
            </code>
        </div>
        <video src="/assets/embed.mp4" autoPlay loop controls className="w-full lg:w-2/5 rounded-md" controlsList='nodownload' />
        {/* <img src="/assets/embed.gif" className="w-full lg:w-2/5 rounded-md" /> */}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-lg font-medium text-neutral-500">Other Props you can pass into the HumanizeAI ChatBot Component</span>
        <div className="flex flex-col gap-2">
          {/* 
          className?: string,
          style: React.CSSProperties,
          theme: "default" | "blue" | "red" | "green" | "purple",
          title: string,
          autoposition?: "top-right" | "bottom-right" | "top-left" | "bottom-left",
          apiKey: string,
          initialMessage?: string, */}
          <span className="text-sm font-normal text-neutral-600">1. <span className="text-green-300">apiKey</span> (Required): The API Key you just generated</span>
          <span className="text-sm font-normal text-neutral-600">2. <span className="text-green-300">title</span> (Optional): The Name of the Bot you want to show in the ChatBot Header (If not passed, your Bot Name will be there)</span>
          <span className="text-sm font-normal text-neutral-600">
            3. <span className="text-green-300">theme</span> (Optional): The Theme of the ChatBot (If not passed, the default theme will be there)
            <br />
            <span className="text-xs font-medium text-neutral-700">
              "default" | "red" | "blue" | "green" | "purple"
            </span>
          </span>
          <span className="text-sm font-normal text-neutral-500">
            4. <span className="text-green-300">autoposition</span> (Optional): The Position of the ChatBot (If not passed, the default position will be there)
            <br />
            <span className="text-xs font-medium text-neutral-700">
              "top-right" | "bottom-right" | "top-left" | "bottom-left"
            </span>
          </span>
          <span className="text-sm font-normal text-neutral-500">5. <span className="text-green-300">initialMessage</span> (Optional): The Initial Message that will be shown when the ChatBot is Opened (If not passed, No Message would be there in the beginning from Bot)</span>
          <span className="text-sm font-normal text-neutral-500">6. <span className="text-green-300">className</span> (Optional): The className you want to pass to the ChatBot Component (If not passed, No className would be there)</span>
          <span className="text-sm font-normal text-neutral-500">7. <span className="text-green-300">style</span> (Optional): The style you want to pass to the ChatBot Component (If not passed, No style would be there)</span>
        </div>
      </div>

        <span className="font-medium text-sm text-red-300 my-1">
          NOTE: Image Feature is not available in the Embedding ChatBot. If want us to know that you're waiting, just drop us a message from Help & Feedback Section so we can prioritize it.
        </span>

        <span className="text-xl font-semibold text-neutral-400">2. API Integrations</span>
        {/* same first step to get the api from above, then list the 3 endpoints available with their GET/POST and body/queries required */}
        <span className="text-sm font-medium text-neutral-500 -my-1 -mt-5">Just Gather the API Key of your Bot from above and you're good to go</span>
        <div className="flex flex-col gap-2">
          <span className="text-lg font-medium text-neutral-500">1. <span className="text-blue-300">/**-**-**/:botid</span> (GET): Get the API Key of the Bot</span>
          <span className="text-sm font-normal text-neutral-600">1. <span className="text-neutral-300">botid</span> (Required): The Bot ID of the Bot you want to get the API Key of</span>
          <span className="text-sm font-normal text-neutral-600">2. <span className="text-neutral-300">x-access-token</span> (Required): The JWT Token of the User</span>
          <span className="text-sm font-normal text-neutral-600">3. <span className="text-neutral-300">Response</span> (Required): The Response will be a JSON Object with <span className="text-neutral-300">success</span> (Boolean), <span className="text-neutral-300">message</span> (String) and <span className="text-neutral-300">data</span> (String)</span>
          
          <span className="text-lg font-medium text-neutral-500">2. <span className="text-blue-300">/***-***-***</span> (GET): Get all the Bots of the User</span>
          <span className="text-sm font-normal text-neutral-600">1. <span className="text-neutral-300">x-access-token</span> (Required): The JWT Token of the User</span>
          <span className="text-sm font-normal text-neutral-600">2. <span className="text-neutral-300">Response</span> (Required): The Response will be a JSON Object with <span className="text-neutral-300">success</span> (Boolean), <span className="text-neutral-300">message</span> (String) and <span className="text-neutral-300">data</span> (Array of Objects)</span>

          <span className="text-lg font-medium text-neutral-500">3. <span className="text-blue-300">/***-***/:botid</span> (GET): Get the Bot Details of the Bot</span>
          <span className="text-sm font-normal text-neutral-600">1. <span className="text-neutral-300">botid</span> (Required): The Bot ID of the Bot you want to get the Details of</span>
          <span className="text-sm font-normal text-neutral-600">2. <span className="text-neutral-300">x-access-token</span> (Required): The JWT Token of the User</span>
          <span className="text-sm font-normal text-neutral-600">3. <span className="text-neutral-300">Response</span> (Required): The Response will be a JSON Object with <span className="text-neutral-300">success</span> (Boolean), <span className="text-neutral-300">message</span> (String) and <span className="text-neutral-300">data</span> (Object)</span>
        </div>

          {/* proper api documentation will be releasing by month end */}
          <span className="text-base font-medium text-red-300 self-center my-1.5">We're working on the API Documentation, it'll be available by the third week of October :)</span>
    </div>
    </div>
  )
}

export default Integrations