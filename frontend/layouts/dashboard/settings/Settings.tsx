import Button from '@/components/Button'
import InputGroup from '@/components/InputGroup'
import { UserContext } from '@/pages/_app'
import { DashboardContext } from '@/pages/dashboard'
import { Edit } from '@mui/icons-material'
import { Switch } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiCheckCircle, BiMenu, BiSolidSave } from 'react-icons/bi'

function Settings(props: any) {

  const { userDetails, bots } = useContext<any>(UserContext)
  const { getInfo } = useContext<any>(DashboardContext)

  const type = "edit"
  const botid = bots?.length == 0 ? null : bots[0][1]

  const [showImageEditPencil, setShowImageEditPencil] = React.useState<boolean>(false)
  const [showImageEditDialog, setShowImageEditDialog] = React.useState<boolean>(false)

  const [editButFirst, setEditButFirst] = React.useState<boolean>(false)

  const [name, setName] = React.useState<string | null>(null)
  const [botId, setBotId] = React.useState<string | null>(null)
  const [botCreated, setBotCreated] = React.useState<boolean>(false)
  const [existingPic, setExistingPic] = React.useState<string | null>(null)
  const [profilePic, setProfilePic] = React.useState<File | null>(null)
  const [description, setDescription] = React.useState<string | null>(null)
  const [botrole, setBotRole] = React.useState<string | null>(null)
  const [steps, setSteps] = React.useState<string | null>(null)
  const [publicBot, setPublicBot] = React.useState<boolean>(true)
  const [purpose, setPurpose] = React.useState<"personal" | "business">("personal")
  const [companyInfo, setCompanyInfo] = React.useState<string | null>(null)
  const [socials, setSocials] = React.useState<any>({
    whatsapp: null,
    instagram: null,
    twitter: null,
    youtube: null,
    discord: null,
    telegram: null,
    linkedin: null,
    website: null
  })

  useEffect(()=>{
    console.log("Ex Bots", bots)
    console.log("Ex Bots Length", bots?.length)
    console.log(bots?.length == undefined)
  }, [bots])

  const createBot = async () => {

    if (!botId || botId == "") {
      toast.error("Please enter a Bot ID")
      return
    }


    const botCreationToast = toast.loading("Creating Bot... You can continue filling other Info")

     try {
      const response = await fetch("http://localhost:5000/create-bot", {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token")!,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          botid: botId,
          primary: bots?.length == 0 || bots?.length == undefined
        })
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Bot Created Successfully", {
          id: botCreationToast
        })
        setBotCreated(true)
      } else {
        toast.error(data.message, {
          id: botCreationToast
        })
      }
     } catch (error) {
        console.log(error)
        toast.error("Error in Creating Bot", {
          id: botCreationToast
        })
      }
  }

  const uploadBotData = async () => {

    if (name == "" || !profilePic || description == "" || botrole == "" || steps == "") {
      toast.error("Please fill all the details")
      return
    }

    console.log({
      name,
      botId,
      profilePic,
      description,
      botrole,
      steps,
      publicBot,
      purpose,
      companyInfo,
      socials
    })

    const uploadingBotDataToast = toast.loading("Setting up your Bot...")

    try {
      const formData = new FormData()
      formData.append("name", name!)
      formData.append("botid", botId!)
      formData.append("pic", profilePic!)
      formData.append("description", description!)
      formData.append("botrole", botrole!)
      formData.append("steps", steps!)
      formData.append("public", publicBot.toString())
      formData.append("purpose", purpose)
      purpose == "business" && formData.append("companyInfo", companyInfo!)
      formData.append("whatsapp", socials.whatsapp)
      formData.append("instagram", socials.instagram)
      formData.append("twitter", socials.twitter)
      formData.append("youtube", socials.youtube)
      formData.append("discord", socials.discord)
      formData.append("telegram", socials.telegram)
      formData.append("linkedin", socials.linkedin)
      formData.append("website", socials.website)

      const response = await fetch(`http://localhost:5000/store-bot-data`, {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token")!
        },
        body: formData
      })
      const data = await response.json()
      console.log(data)

      if (data.success) {
        toast.success("Bot Data Uploaded Successfully", {
          id: uploadingBotDataToast
        })
        window.location.reload()
      } else {
        toast.error(data.message, {
          id: uploadingBotDataToast
        })
      }
    } catch (error) {
      console.log(error)
      toast.error("Error in uploading Bot Data", {
        id: uploadingBotDataToast
      })
    }
  }

  const updateBotData = async () => {
    console.log({
      name,
      botId,
      profilePic,
      description,
      botrole,
      steps,
      publicBot,
      purpose,
      companyInfo,
      socials
    })

    try {
      const formData = new FormData()
      formData.append("name", name!)
      formData.append("botid", botId!)
      profilePic && formData.append("pic", profilePic)
      formData.append("description", description!)
      formData.append("botrole", botrole!)
      formData.append("steps", steps!)
      formData.append("public", publicBot.toString())
      formData.append("purpose", purpose)
      purpose == "business" && formData.append("companyInfo", companyInfo!)
      formData.append("whatsapp", socials.whatsapp)
      formData.append("instagram", socials.instagram)
      formData.append("twitter", socials.twitter)
      formData.append("youtube", socials.youtube)
      formData.append("discord", socials.discord)
      formData.append("telegram", socials.telegram)
      formData.append("linkedin", socials.linkedin)
      formData.append("website", socials.website)

      const response = await fetch(`http://localhost:5000/update-bot-data`, {
        method: "PUT",
        headers: {
          "x-access-token": localStorage.getItem("token")!
        },
        body: formData
      })
      const data = await response.json()
      console.log(data)

      if (data.success) {
        toast.success("Bot Data Updated Successfully")
        getInfo()
        // window.location.reload()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error in updating Bot Data")
    }
  }

  useEffect(()=>{
    if (type == "edit" && bots) {
      console.log("Searching for bot id", botid)
      console.log("in", bots)

      const func = async () => {
        const data = await bots?.find((bot: any) => bot[1] == botid)
        console.log("Bot found", data)
        if (!data) {
          console.log("Settings wala not found")
          return
        }
        if (!data[18]) {
          setEditButFirst(true)
        } else {
          setEditButFirst(false)
        }
        setBotId(botid!)
        setName(data[18])
        setDescription(data[3])
        setBotRole(data[12])
        setSteps(data[13])
        setPublicBot(data[15])
        setPurpose(data[17])
        setCompanyInfo(data[14])
        setSocials({
          whatsapp: data[6],
          instagram: data[8],
          twitter: data[19],
          youtube: data[7],
          discord: data[9],
          telegram: data[10],
          linkedin: data[21],
          website: data[24]
        })
        setExistingPic(data[20])
      }

      func()
      // console.log("Bot found", typeof data[0])

    } else {
      console.log("Setting up for first time")
      setName("")
      setDescription(null)
      setBotRole(null)
      setSteps(null)
      setPublicBot(true)
      setPurpose("personal")
      setCompanyInfo(null)
      console.log("New name", name)
    }
  }, [type, botid])

  return (
    <div className="p-5 pt-8 flex flex-col h-full w-full items-start gap-8 overflow-auto rounded-l-xl">

      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2">
        <BiMenu className="w-8 h-8 text-indigo-300 cursor-pointer lg:hidden" onClick={()=>{
              document.getElementById("left-bar")?.classList.toggle("hidden")
            }} />
        <span className="text-neutral-800 font-medium text-xl">Account Settings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 items-start">
            <InputGroup
              type="text"
              label="Your Name"
              placeholder="Your Name"
              value={userDetails?.name}
              className="w-full !bg-transparent"
              labelClassName='!text-neutral-500'
              inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
            />

            <InputGroup
              type="text"
              label="Your Email"
              placeholder="Your Email"
              value={userDetails?.email_id}
              className="w-full !bg-transparent"
              labelClassName='!text-neutral-500'
              inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
            />

            <InputGroup
              type="text"
              label="Your Phone Number"
              placeholder="Your Phone Number"
              value={userDetails?.phone}
              className="w-full !bg-transparent"
              labelClassName='!text-neutral-500'
              inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
            />

            {/* <InputGroup
              type="password"
              label="Your Old Password"
              placeholder="Old Pass to change"
              className="w-full !bg-transparent"
              labelClassName='!text-neutral-500'
              inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
            />
            <InputGroup
              type="password"
              label="Your New Password"
              placeholder="Enter New Pass"
              className="w-full !bg-transparent"
              labelClassName='!text-neutral-500'
              inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
            />
            <InputGroup
              type="password"
              label="Confirm New Password"
              placeholder="Re-Enter New Password"
              className="w-full !bg-transparent"
              labelClassName='!text-neutral-500'
              inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
            /> */}
        </div>

        <Button onClick={()=>{}} className="self-center mt-2">
          Save
          <BiSolidSave className="w-5 h-5" />
        </Button>

      </div>

      <div className="p-2 flex flex-col h-full w-full items-start pt-5 gap-8">

        <span className="text-neutral-800 font-medium text-xl">Other Settings (Same as Primary Bot Settings)</span>

      <div className="flex flex-col lg:flex-row items-center gap-3 w-full">

          <input
            type="file"
            accept='image/*'
            id="profile-pic"
            className="hidden"
            onChange={(e: any)=>{
              setProfilePic(e.target.files[0])
            }}
          />
          {/* <img src="/assets/avatar.jpg" alt="" className="w-24 h-24 rounded-full mr-2" /> */}
          <div className="w-fit h-fit rounded-full relative mb-2 self-center cursor-pointer" onMouseOver={()=>{
              setShowImageEditPencil(true)
            }} onMouseLeave={()=>{
              setShowImageEditPencil(false)
            }}>
          <img src={profilePic ? URL.createObjectURL(profilePic) : existingPic ? `http://localhost:5000/assets/${existingPic}` : "/assets/avatar.jpg"} alt="" className="w-24 min-w-[6rem] h-24 min-h-[6rem] object-cover rounded-full" />
          {
            showImageEditPencil ? 
          <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.45)] rounded-full flex flex-col items-center justify-center" onClick={()=>{
            document.getElementById("profile-pic")?.click()
          }}>
            <Edit className='text-neutral-200 fill-neutral-50 w-8 h-8' />
          </div>
          :
          null
          }
        </div>

        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-col lg:flex-row gap-3 w-full justify-start items-start lg:items-center">
            <span className="text-neutral-300 font-medium min-w-max">
              {
                props.primary ?
                "Your Username/Bot ID"
                :
                "Bot ID"
              }
            </span>

            {/* <div className="flex flex-col items-start"> */}
              <input
                type="text"
                value={botId ? botId : undefined}
                onChange={(e)=>{
                  setBotId(e.target.value)
                }}
                disabled
                className="rounded-full w-[80vw] lg:w-auto bg-transparent border border-bg-50 py-2 px-6 text-neutral-400 outline-none"
                placeholder={props.primary ? "Choose your unique Username/Bot ID" : "Choose a Unique Bot ID"}
              />
            {/* </div> */}
          </div>
          {/* <span className="text-bg-50 text-xs min-w-max">
            Your Humanized Bot URL look like https://humanize.ai/{botid}
          </span> */}
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center mt-1">
            <span className="text-neutral-300 font-medium min-w-max">
              Bot Name
            </span>
            <input
              type="text"
              value={name ? name : undefined}
              onChange={(e)=>{
                setName(e.target.value)
              }}
              className="rounded-full bg-transparent border w-full border-bg-50 py-2 px-6 text-neutral-400 outline-none"
              placeholder="Choose a Bot Name"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 w-full">
          <span className="text-neutral-300 font-medium">
            Short Description
          </span>

          <textarea
            name=""
            id=""
            rows={2}
            value={description ? description : undefined}
            onChange={(e)=>{
              setDescription(e.target.value)
            }}
            className="border rounded-xl border-bg-50 p-4 w-full bg-transparent text-neutral-400 outline-none"
            placeholder="Short Description of your Bot to be shown to other users"
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
          <span className="text-neutral-300 font-medium">
            Explain your Information, that the bot would replicate
          </span>

          <textarea
            name=""
            id=""
            rows={6}
            value={botrole ? botrole : undefined}
            onChange={(e)=>{
              setBotRole(e.target.value)
            }}
            className="border rounded-xl border-bg-50 p-4 w-full bg-transparent text-neutral-400 outline-none"
            placeholder="Explain yourself in detail, so that the bot can replicate your information. Like `I am a Lawyer who have been studying for...` "
          />
      </div>

      <div className="flex flex-col w-full gap-2">
          <span className="text-neutral-300 font-medium">
            Explain the Steps or Strict Rules that the bot should follow
          </span>

          <textarea
            name=""
            id=""
            rows={6}
            value={steps ? steps : undefined}
            onChange={(e)=>{
              setSteps(e.target.value)
            }}
            className="border rounded-xl border-bg-50 p-4 w-full bg-transparent text-neutral-400 outline-none"
            placeholder="Lay out the steps that the bot should follow. Like `1. Greet the user first 2. Ask for the user's name. Always say, nice to meet you & promote about the Youtube Channel ABC...` "
          />
      </div>

      <div className="flex flex-row gap-2 items-center flex-wrap">
        <span className="text-neutral-300 font-medium mr-4">Purpose (Optional)</span>
        <input
          type="radio"
          className="w-4 h-4 outline-none cursor-pointer"
          placeholder="Choose a Bot Name"
          id="personal"
          name='purpose'
          checked={purpose == "personal"}
          onClick={()=>{
            setPurpose("personal")
          }}
        />
        <label htmlFor='personal' className="text-neutral-600 cursor-pointer">Personal</label>

        <input
          type="radio"
          className="w-4 h-4 ml-4 outline-none cursor-pointer"
          placeholder="Choose a Bot Name"
          id="business"
          name='purpose'
          checked={purpose == "business"}
          onClick={()=>{
            setPurpose("business")
          }}
        />
        <label htmlFor='business' className="text-neutral-600 cursor-pointer">Business/Professional</label>
      </div>
      
      <div className="flex flex-col w-full items-start">
        <span className="text-neutral-200 font-medium">
          Add Socials (Optional)
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-3 items-center">
          <InputGroup
            type="number"
            label="Whatsapp"
            onChangeSpecial={(e: any)=>{
              setSocials({
                ...socials,
                whatsapp: e.target.value
              })
            }}
            placeholder="9876543210"
            value={socials.whatsapp}
            className="w-full !bg-transparent"
            labelClassName='!text-neutral-500'
            inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
          />
          <InputGroup
            type="text"
            label="Instagram"
            placeholder="https://instagram.com/username"
            className="w-full"
            value={socials.instagram}
            onChangeSpecial={(e: any)=>{
              setSocials({
                ...socials,
                instagram: e.target.value
              })
            }}
            labelClassName='!text-neutral-500'
            inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
          />
          <InputGroup
            type="text"
            label="Twitter"
            placeholder="https://twitter.com/username"
            className="w-full !bg-transparent"
            value={socials.twitter}
            onChangeSpecial={(e: any)=>{
              setSocials({
                ...socials,
                twitter: e.target.value
              })
            }}
            labelClassName='!text-neutral-500'
            inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
          />
          <InputGroup
            type="text"
            label="Youtube"
            placeholder="https://youtube.com/username"
            className="w-full"
            value={socials.youtube}
            onChangeSpecial={(e: any)=>{
              setSocials({
                ...socials,
                youtube: e.target.value
              })
            }}
            labelClassName='!text-neutral-500'
            inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
          />
          <InputGroup
            type="text"
            label="Discord"
            placeholder="https://discord.gg/username"
            className="w-full"
            value={socials.discord}
            onChangeSpecial={(e: any)=>{
              setSocials({
                ...socials,
                discord: e.target.value
              })
            }}
            labelClassName='!text-neutral-500'
            inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
          />
          <InputGroup
            type="text"
            label="Telegram"
            placeholder="https://t.me/username"
            className="w-full"
            value={socials.telegram}
            onChangeSpecial={(e: any)=>{
              setSocials({
                ...socials,
                telegram: e.target.value
              })
            }}
            labelClassName='!text-neutral-500'
            inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
          />
          <InputGroup
            type="text"
            label="LinkedIn"
            placeholder="https://linkedin.com/in/username"
            className="w-full"
            value={socials.linkedin}
            onChangeSpecial={(e: any)=>{
              setSocials({
                ...socials,
                linkedin: e.target.value
              })
            }}
            labelClassName='!text-neutral-500'
            inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
          />
          <InputGroup
            type="text"
            label="Website"
            placeholder="https://my-portfolio.com"
            className="w-full"
            value={socials.website}
            onChangeSpecial={(e: any)=>{
              setSocials({
                ...socials,
                website: e.target.value
              })
            }}
            labelClassName='!text-neutral-500'
            inputClassName='!bg-transparent !text-white !border-bg-50 placeholder-neutral-800'
          />
      </div>

      </div>

      <div className="flex flex-row gap-3 w-full items-center">
        <span className="text-neutral-300 font-medium">Keep your Bot Public?</span>
        <Switch checked={publicBot} color='success' onChange={()=>{
          setPublicBot(!publicBot)
        }}/>
      </div>


      <Button onClick={()=>{
          if (!editButFirst) {
            console.log("Editing")
            updateBotData()
          } else {
            console.log("Editing but after bot creation")
            uploadBotData()
          }
      }} className="self-center mb-6">
        Save
        <BiSolidSave className="w-5 h-5" />
      </Button>

    </div>


    </div>
  )
}

export default Settings