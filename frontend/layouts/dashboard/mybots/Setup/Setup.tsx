import Button from '@/components/Button'
import InputGroup from '@/components/InputGroup'
import { UserContext } from '@/pages/_app'
import { DashboardContext } from '@/pages/dashboard'
import { Edit } from '@mui/icons-material'
import { Switch, Tooltip } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiCheckCircle, BiSave, BiSolidSave } from 'react-icons/bi'
import { BsSave, BsSave2 } from 'react-icons/bs'
import { FiEdit, FiEdit2, FiSave } from 'react-icons/fi'
import { HiSave } from 'react-icons/hi'

function Setup(props: SetupProps) {

  const { userDetails, bots } = useContext<any>(UserContext)
  const { getInfo } = useContext<any>(DashboardContext)

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
  const [botrolePdf, setBotRolePdf] = React.useState<File | null>(null)
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

    if (bots?.length != 0 && bots?.length != undefined) {
      const botFound = bots?.find((bot: any) => bot[1] == botId)
      if (botFound) {
        toast.error("Bot ID already taken")
        return
      }
    }

    // check if not starting with number and only having letters, numbers, underscore
    if (!botId.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
      toast.error("Bot ID can only have letters, numbers and underscore. And should not start with a number")
      return
    }

    setBlockFurtherForm(false)

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
        toast.error("Username already exists", {
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

  const getPDFText = async () => {

    if (!botrolePdf) {
      toast.error("Please upload a PDF")
      return
    }
    if (botrolePdf.size > 10000000) {
      toast.error("PDF size should be less than 10 mb")
      return
    }
    if (botrolePdf.type != "application/pdf") {
      toast.error("Only PDF files are allowed")
      return
    }

    const uploadPDFToast = toast.loading("Uploading PDF...")

    const formData = new FormData()
    formData.append("pdf", botrolePdf)

    const response = await fetch("http://localhost:5000/upload-pdf", {
      headers: {
        "x-access-token": localStorage.getItem("token")!
      },
      method: "POST",
      body: formData
    })
    const data = await response.json()

    if (data.success) {
      setBotRole(data.data)
      toast.success("PDF Uploaded Successfully", {
        id: uploadPDFToast
      })
    } else {
      toast.error(data.message, {
        id: uploadPDFToast
      })
    }
  }

  const uploadBotData = async () => {

    if (name == "" || description == "" || botrole == "" || steps == "") {
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
      formData.append("public", publicBot==true ? '1' : '0')
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
      formData.append("public", publicBot == true ? '1' : '0')
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
    if (props.type == "edit" && bots) {
      console.log("Searching for bot id", props.botId)
      console.log("in", bots)

      const func = async () => {
        const data = await bots?.find((bot: any) => bot[1] == props.botId)
        console.log("Bot found", data)
        if (!data) {
          toast.error("Bot not found")
          console.log("Settings wala not found")
          return
        }
        if (!data[18]) {
          setEditButFirst(true)
        } else {
          setEditButFirst(false)
        }
        setBotId(props.botId!)
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
  }, [props.type, props.botId])

  const [blockFurtherForm, setBlockFurtherForm] = React.useState<boolean>(false)

  useEffect(()=>{
    if (props.type == "first") {
      if (!botCreated) {
        setBlockFurtherForm(true)
      } else {
        setBlockFurtherForm(false)
      }
    }
  }, [])

  return (
    <div className="p-4 flex flex-col h-full w-full items-start pt-5 gap-12 overflow-auto">
      
      <div className="flex flex-col items-start gap-1 w-full">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center w-full justify-start">
            <span className="text-neutral-300 font-medium">
              {
                props.primary ?
                "Your Username/Bot ID"
                :
                "Bot ID"
              }
            </span>

            <input
              type="text"
              value={botId ? botId : undefined}
              onChange={(e)=>{
                // only allowing letters, numbers, underscore
                if (e.target.value.match(/^[a-zA-Z0-9_]+$/)) {
                  setBotId(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                } else if (e.target.value == "") {
                  setBotId(null)
                }
              }}
              disabled={props.type != "first" || (props.type == "first" && botCreated)}
              className="rounded-full w-full lg:w-[45%] min-w-64 bg-transparent border border-bg-50 py-2 px-6 text-neutral-400 outline-none"
              placeholder={"Choose a Unique Bot ID"}
            />
          {
            props.type == "first" ? (
              botCreated ? 
              <Button onClick={()=>{toast.success("Bot Already Created. Continue Setting up")}} variant="outline">
                <BiCheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Bot Created
              </Button>
              :
              <Button id="botidbtn" onClick={createBot}>
                Create Bot ID
              </Button>
            ) : (
              null
            )
          }
        </div>

        <span className="text-bg-50 text-xs">
          Your Humanized Bot URL look like https://humanizeai.in/{botId}
        </span>
      </div>

          <div className="flex flex-col h-full w-full items-start gap-12 relative pb-3">

          {
            blockFurtherForm ?
            <Tooltip title="Create Bot ID First" placement="top">
              <div className="absolute h-full w-full opacity-50 z-50 cursor-not-allowed" onClick={()=>{
                toast.error("You need to create the Bot ID First");
                document.getElementById("botidbtn")?.focus();
                document.getElementById("botidbtn")?.classList.add("ring-4", "ring-red-600")
                setTimeout(()=>{
                  document.getElementById("botidbtn")?.classList.remove("ring-4", "ring-red-600")
                }, 2500)
              }}></div>
            </Tooltip>
            :
            null
          }

      <div className="flex flex-row items-center gap-3 w-full -my-4">

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

          {/* <div className="flex flex-col items-start gap-1"> */}
            {/* <div className="flex flex-row gap-3 w-full items-center"> */}
            <div className="flex flex-col md:flex-row md:gap-3 w-full md:items-center">
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
            {/* </div> */}

          {/* </div> */}
      </div>

      <div className="flex flex-col items-start gap-3 w-full">
        <span className="text-neutral-300 font-medium">
          1. Short Description
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
          placeholder="To be shown to other users like - This Bot might help you out in legal matters."
        />
      </div>

      <div className="flex flex-col w-full gap-2">
          <span className="text-neutral-300 font-medium">
            2. Who will the Bot behave like? Your Bot's Role
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
            placeholder="You are a Senior Official of Crazy Company who helps out in legal matters. You're 26 years old who studied at ABC University & now A Lawyer by profession."
          />

          <div className="flex gap-2 items-center my-2">
            <div className="bg-neutral-900 grow h-[1px]"></div>
            <span className="text-neutral-500 font-medium">
              OR
            </span>
            <div className="bg-neutral-900 grow h-[1px]"></div>
          </div>

          {/* upload resume pdf, that it will replicate */}
          <div className="flex flex-row gap-2 items-center self-center">
            <span className="text-neutral-300 font-medium flex items-end flex-col justify-center">
              {
                botrolePdf ?
                <>
                {botrolePdf.name}
                </>
                :
                <>
                Upload your Resume
                <span className="text-xs text-neutral-800 font-normal">PDF Less than 10 mb</span>
                </>
              }
            </span>
            <input
              type="file"
              accept='application/pdf'
              id="resume"
              className="hidden"
              onChange={(e: any)=>{
                setBotRolePdf(e.target.files[0])
              }}
            />
            <Button onClick={()=>{
              if (botrolePdf) {
                getPDFText()
              } else {
                document.getElementById("resume")?.click()
              }
            }}>
              {
                botrolePdf ?
                <>
                Upload
                </>
                :
                <>
                Choose PDF
                </>
              }
            </Button>
          </div>
      </div>

      <div className="flex flex-col w-full gap-2">
          <span className="text-neutral-300 font-medium">
            3. Explain the Strict Rules that the bot should follow
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
            placeholder="Always Greet Users with Bonjour Monsieur and always ask give short responses, ask questions to get clear on What user Needs."
          />
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <span className="text-neutral-300 font-medium mr-4">4. Purpose (Optional)</span>
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
          5. Add Socials (Optional)
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 items-center">
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
        if (props.type == "first") {
          console.log("First time submit")
          if (!botCreated) {
            toast.error("You need to create the Bot ID First");
            // focus on bot id
            document.getElementById("botidbtn")?.focus();
            document.getElementById("botidbtn")?.classList.add("ring-4", "ring-red-600")
            setTimeout(()=>{
              document.getElementById("botidbtn")?.classList.remove("ring-4", "ring-red-600")
            }, 2500)
            return
          }
          uploadBotData()
        } else {
          if (!editButFirst) {
            console.log("Editing")
            updateBotData()
          } else {
            console.log("Editing but after bot creation")
            uploadBotData()
          }
        }
      }} className="self-center mb-8">
        Save
        <BiSolidSave className="w-5 h-5" />
      </Button>
      {
        bots?.length == 0 ?
        <span className="text-sm font-normal -mt-8 text-neutral-800">
          <b>NOTE</b>: After setting your First Bot (Primary Bot), you would need to Re-login!
        </span>
        :
        null
      }
          </div>


    </div>
  )
}

interface SetupProps {
  primary?: boolean,
  type: "first" | "edit",
  botId?: string,
  data: any
}

Setup.defaultProps = {
  primary: true,
  type: "first",
  botId: "",
  data: {}
}

export default Setup