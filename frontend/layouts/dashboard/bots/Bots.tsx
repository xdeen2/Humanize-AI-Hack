import BotCard from '@/components/BotCard'
import { UserContext } from '@/pages/_app'
import { DashboardContext } from '@/pages/dashboard'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BiMenu } from 'react-icons/bi'
import { BsArrowBarDown, BsSearch } from 'react-icons/bs'
import { RiLoader4Fill } from 'react-icons/ri'
import { TbReload } from 'react-icons/tb'

function Bots() {

  const dashboardContext = React.useContext<any>(DashboardContext)

  const [fetchingBots, setFetchingBots] = React.useState<boolean>(false)

  const [likedBots, setLikedBots] = React.useState<any>([])
  const [popularBots, setPopularBots] = React.useState<any>([])
  const [latestBots, setLatestBots] = React.useState<any>([])

  const [selectedBot, setSelectedBot] = React.useState<string>("")
  const [currentSection, setCurrentSection] = React.useState<"explore" | "search" | "profile" | "chat">("explore")

  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [searchedBots, setSearchedBots] = React.useState<any>([])

  const searchBots = async () => {
    // search only if searchQuery is not empty & changed for atleast 1 second
    if (searchQuery && searchQuery.length > 0) {
      try {
        setFetchingBots(true)
        const response = await fetch(`http://localhost:5000/search-bots/${searchQuery}`, {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token")!
          }
        })
  
        const data = await response.json()
        console.log(data)
  
        if (data.success) {
          setSearchedBots(data.data)
          setCurrentSection("search")
          setFetchingBots(false)
        } else {
          console.log(data)
          toast.error("Error searching bots")
          setFetchingBots(false)
        }
      } catch (error) {
        console.log(error)
        setFetchingBots(false)
      }
    }
  }

  useEffect(()=>{
    // only search if searchQuery is not empty & stays same for atleast 1 second
    if (searchQuery && searchQuery.length > 0) {
      const timeout = setTimeout(()=>{
        searchBots()
      }
      , 500)
      return () => clearTimeout(timeout)
    } else {
      setCurrentSection("explore")
    }
  }, [searchQuery])

  const getBots = async () => {
    setFetchingBots(true)
    const response = await fetch("http://localhost:5000/get-bots", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")!
      }
    })

    const data = await response.json()
    console.log(data)
    setFetchingBots(false)

    if (data.success) {
      // setLikedBots(data.data.talkedBots)
      // setting liked bots with checking for duplicates
      // let tempLikedBots: any = []
      // data.data.talkedBots.forEach((bot: any) => {
      //   tempLikedBots.map((likedBot: any) => likedBot[0] == bot[0]) ? null : tempLikedBots.push(bot)
      // })
      setLikedBots(data.data.talkedBots)
      setPopularBots(data.data.topBots)
      setLatestBots(data.data.latestBots)
    } else {
      console.log(data)
      toast.error("Error fetching bots")
    }
  }

  const [morePopularBotsLoading, setMorePopularBotsLoading] = React.useState<boolean>(false)
  const [moreLatestBotsLoading, setMoreLatestBotsLoading] = React.useState<boolean>(false)

  const loadMorePopularBots = async () => {
    setMorePopularBotsLoading(true)
    const response = await fetch(`http://localhost:5000/load-more-popular-bots/${popularBots.length-1}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")!
      }
    })

    const data = await response.json()
    console.log(data)
    setMorePopularBotsLoading(false)

    if (data.success) {
      setPopularBots([...popularBots, ...data.data])
    } else {
      console.log(data)
      toast.error("Error fetching more popular bots")
    }
  }

  const loadMoreLatestBots = async () => {
    setMoreLatestBotsLoading(true)
    const response = await fetch(`http://localhost:5000/load-more-latest-bots/${latestBots.length-1}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")!
      }
    })

    const data = await response.json()
    console.log(data)
    setMoreLatestBotsLoading(false)

    if (data.success) {
      setLatestBots([...latestBots, ...data.data])
    } else {
      console.log(data)
      toast.error("Error fetching more latest bots")
    }
  }

  useEffect(()=>{
    getBots()
  }, [])

  return (
    <div className="p-2 lg:p-5 flex flex-col gap-5 items-center h-full overflow-y-auto">
      
      <div className="flex w-full flex-col lg:flex-row items-end justify-between py-2 pb-6 px-4 border-b border-bg-600">
        <span className="text-2xl font-semibold text-neutral-300 flex gap-2 items-center"><BiMenu className="w-8 min-w-[20px] h-8 min-h-[20px] mr-2 text-indigo-300 cursor-pointer lg:hidden" onClick={()=>{
            document.getElementById("left-bar")?.classList.toggle("hidden")
          }} />Scroll through Humanized Bots<TbReload className={`text-neutral-400 w-5 min-w-[20px] h-5 min-h-[20px] cursor-pointer ${fetchingBots ? "animate-spin" : "animate-none"}`} onClick={()=>getBots()} /></span>
        <div className="p-2 border-b border-bg-50 flex flex-row gap-3 items-center mt-2 lg:mt-0">
          <BsSearch className="w-4 h-4 text-neutral-500" />
          <input
            type="search"
            placeholder="Search Bots"
            autoComplete="off"
            list="autocompleteOff"
            className="bg-transparent w-[65vw] lg:w-auto outline-none border-none text-neutral-200"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {
        fetchingBots ? (
          <RiLoader4Fill className="w-8 h-8 text-neutral-400 animate-spin self-center my-auto" />
        ) : currentSection == "explore" ? (
          <>
            <div className="flex flex-col gap-4 items-start w-full px-2 lg:px-4 mt-1">

              
              <span className="text-neutral-400 text-xl self-start font-medium">
                Your Recent & Liked Bots
              </span>

              <div className={`flex flex-row gap-3 overflow-x-auto ${likedBots?.length == 0 ? "w-full" : "lg:w-[70vw] w-[90vw] p-3"} `}>
                {
                  likedBots.length == 0 ? (
                    <span className="text-neutral-800 text-sm">
                      No Bots Liked or Talked to
                    </span>
                  ) :
                  likedBots.map((bot: any, index: number)=>{
                    return (
                      <BotCard
                        key={index}
                        className='min-w-[280px]'
                        username={bot[0]}
                        name={bot[5]}
                        image={bot[6] ? `http://localhost:5000/assets/${bot[6]}` : "/assets/avatar.jpg"}
                        description={bot[2]}
                        interactions={bot[3]}
                        likes={bot[4]}
                        verified={bot[7]}
                        onClick={()=>{
                          dashboardContext.setExtraInfo({
                            botToChat: bot[0]
                            // botToChat: {
                            //   botid: bot[0],
                            //   name: bot[5],
                            //   username: bot[1],
                            //   description: bot[2],
                            //   image: bot[6] ? `http://localhost:5000/assets/${bot[6]}` : "/assets/avatar.jpg",
                            //   interactions: bot[3],
                            //   likes: bot[4],
                            // }
                          })
                          dashboardContext.setCurrentSubTab(1);
                        }}
                      />
                    )
                  })
                }
              </div>
            </div>

            <div className="flex flex-col gap-4 items-start w-full px-4 mt-4">
              
              <span className="text-neutral-400 text-xl self-start font-medium">
                Popular Bots
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {
                  popularBots.length == 0 ? (
                    <span className="text-neutral-800 text-sm">
                      No Bots Liked or Talked to
                    </span>
                  ) :
                  popularBots.map((bot: any, index: number)=>{
                    return (
                      <BotCard
                        key={index}
                        username={bot[0]}
                        name={bot[1]}
                        image={bot[2] ? `http://localhost:5000/assets/${bot[2]}` : "/assets/avatar.jpg"}
                        description={bot[3]}
                        interactions={bot[4]}
                        likes={bot[5]}
                        verified={bot[6]}
                        onClick={()=>{
                          dashboardContext.setExtraInfo({
                            botToChat: bot[0]
                            // botToChat: {
                            //   botid: bot[0],
                            //   name: bot[1],
                            //   description: bot[3],
                            //   image: bot[2] ? `http://localhost:5000/assets/${bot[2]}` : "/assets/avatar.jpg",
                            //   interactions: bot[4],
                            //   likes: bot[5],
                            // }
                          })
                          dashboardContext.setCurrentSubTab(1);
                        }}
                      />
                    )
                  })
                }
              </div>
              {
                morePopularBotsLoading ? (
                  <RiLoader4Fill className="w-8 h-8 text-neutral-400 animate-spin self-center my-auto" />
                ) : 
              <span className="text-blue-500 font-medium flex gap-2 items-center cursor-pointer" onClick={loadMorePopularBots}>
                <BsArrowBarDown className="w-5 h-5" />
                View More
              </span>
              }
            </div>

            <div className="flex flex-col gap-4 items-start w-full px-4 mt-4 mb-4">
              
              <span className="text-neutral-400 text-xl self-start font-medium">
                Latest Bots
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {
                  latestBots.length == 0 ? (
                    <span className="text-neutral-800 text-sm">
                      No Bots Liked or Talked to
                    </span>
                  ) :
                  latestBots.map((bot: any, index: number)=>{
                    return (
                      <BotCard
                        key={index}
                        username={bot[0]}
                        name={bot[1]}
                        image={bot[2] ? `http://localhost:5000/assets/${bot[2]}` : "/assets/avatar.jpg"}
                        description={bot[3]}
                        interactions={bot[4]}
                        likes={bot[5]}
                        verified={bot[6]}
                        onClick={()=>{
                          dashboardContext.setExtraInfo({
                            botToChat: bot[0]
                              // botid: bot[0],
                              // name: bot[1],
                              // description: bot[3],
                              // image: bot[2] ? `http://localhost:5000/assets/${bot[2]}` : "/assets/avatar.jpg",
                              // interactions: bot[4],
                              // likes: bot[5],
                            // }
                          })
                          dashboardContext.setCurrentSubTab(1);
                        }}
                      />
                    )
                  })
                }
              </div>

                {
                  moreLatestBotsLoading ? (
                    <RiLoader4Fill className="w-8 h-8 text-neutral-400 animate-spin self-center my-auto" />
                  ) :
                  <span className="text-blue-500 font-medium flex gap-2 items-center cursor-pointer" onClick={loadMoreLatestBots}>
                    <BsArrowBarDown className="w-5 h-5" />
                    View More
                  </span>
                }
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-3 w-full">
            {
              searchedBots.length == 0 ? (
                <span className="text-neutral-800 text-sm">
                  No Bots Found for the Searched Query
                </span>
              ) :
              searchedBots.map((bot: any, index: number)=>{
                return (
                  <BotCard
                    key={index}
                    username={bot[0]}
                    name={bot[1]}
                    image={bot[2] ? `http://localhost:5000/assets/${bot[2]}` : "/assets/avatar.jpg"}
                    description={bot[3]}
                    interactions={bot[4]}
                    likes={bot[5]}
                    verified={bot[6]}
                    onClick={()=>{
                      dashboardContext.setExtraInfo({
                        botToChat: bot[0]
                      })
                      dashboardContext.setCurrentSubTab(1);
                    }}
                  />
                )
              })
            }
          </div>
        )
      }

      {/* <div className="flex flex-col gap-5 overflow-y-auto h-full"> */}
      {/* </div> */}
      
    </div>
  )
}

export default Bots