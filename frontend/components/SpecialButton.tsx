import Image from 'next/image'
import React from 'react'

function Button({
    title,
    Icon=({extras} : {extras : string})=>{
      return <Image src='/assets/button-arrow.svg' className={extras} alt='Arrow' width={15} height={15} priority />
    },
    buttonStyle,
    onClick,
    disabled
  } : {title: string, Icon?: any, buttonStyle?: string, onClick?: any, disabled?: boolean}) {
  return (
    <button disabled={disabled ? disabled : false} onClick={onClick ? onClick : null} type="button" className={`flex flex-row text-center ${disabled && "opacity-50 cursor-not-allowed"} w-max px-6 py-2.5 bg-blue-500 text-white text-sm rounded-lg bg-gradient-button self-center cursor-pointer ${buttonStyle}`}>
        {title}
        <Icon extras="ml-1.5 mt-0.5" />
    </button>
  )
}

export default Button