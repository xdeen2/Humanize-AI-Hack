import Image from "next/image"

function FeaturesList({features} : {features: {image: string, title?: string, description: string}[]}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 px-0 my-[5.5rem] flex-0">
    {
        features.map((feature, index) => {
            return (
                <div className={index === 0 ? 
                    `bg-gradient-to-t from-[#FFFFFF4D] to-transparent p-[1px]`
                    : index === features.length - 1 ?
                    "bg-gradient-to-b from-[#FFFFFF4D] to-transparent p-[1px]"
                    : index%2 === 0 ?
                    "bg-[#FFFFFF4D] md:bg-transparent md:bg-gradient-to-t md:from-[#FFFFFF4D] md:to-transparent p-[1px]"
                    :
                    "bg-[#FFFFFF4D] md:bg-transparent md:bg-gradient-to-b md:from-[#FFFFFF4D] md:to-transparent p-[1px]"
                    } key={index}>
                <div className={index%2==0 ? 
                    "flex flex-col items-center gap-6 h-full p-10 bg-bg-900 bg-gradient-to-t from-[#181e2c] to-[#141824]"
                    :
                    "flex flex-col items-center gap-6 h-full p-10 bg-[#0B0B15] bg-gradient-to-b from-[#181e2c] to-[#141824]"
                }>
                    <Image src={feature.image} alt="Feature" height={70} width={70} />
                    <p className='text-center flex flex-col text-[#FFFFFFD9]'><b className="">{feature?.title}</b><span className="mt-2">{feature.description}</span></p>
                </div>
                </div>
            )
        })
    }
    </div>
  )
}

export default FeaturesList