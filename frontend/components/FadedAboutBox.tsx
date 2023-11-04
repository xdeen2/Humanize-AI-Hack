import Image from 'next/image'
import React from 'react'

function FadedAboutBox({children}: {children: React.ReactNode}) {
  return (
    <div className='relative'>
      <Image src="/assets/rectangle-about.png" className='hidden md:block' alt="Rectangle About Box" width={1200} height={300} />
      <div className='md:absolute px-4 top-24 left-16'>
        {children}
      </div>
    </div>
  )
}

export default FadedAboutBox