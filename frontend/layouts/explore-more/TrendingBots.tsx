import BotCard from '@/components/BotCardOld'
import SpecialText from '@/components/SpecialText'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

function TrendingBots({title, className, textClassName}: {title?: string, className?: string, textClassName?: string} = {className: "", textClassName: ""}) {

  const [bots, setBots] = React.useState<any[]>([])

  async function getBots() {
    const res = await fetch("http://localhost:5000/get-bots")
    const data = await res.json()
    console.log(data)

    if (data.success) {
      setBots(data.message)
    } else {
      console.log("Error")
      toast.error("Error fetching bots!")
    }
  }

  useEffect(()=>{
    getBots()
  }, [])

  return (
    <div className={`flex flex-col gap-5 lg:px-2 ${className}`}>
      <SpecialText extra={`text-[32px] lg:text-[42px] font-semibold pb-2 ${textClassName}`}>
        {
          title ? title : "Trending Bots"
        }
      </SpecialText>

      <div className="flex flex-row gap-5 overflow-x-auto p-4 pb-6">
        {
          bots.map((bot, index) => {
            return <BotCard key={index} name={bot.name} userName={bot.username} interactions={bot.interactions} logo={`http://localhost:5000/assets/${bot.pic}`} description={bot.description} />
          })
        }
      </div>
      
    </div>
  )
}

export default TrendingBots