import { Icon } from '@mui/material'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import {RiLoader4Fill} from 'react-icons/ri'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

function PrimaryButton(props : {title: string, onClick?:any, disabled?:boolean, buttonStyle?: string, Icon?: any, showIcon?: boolean, loading?: boolean}) {

  const Icon = props.Icon

  return (
    <button
      disabled={props.disabled}
      onClick={props?.onClick}
      style={{transitionDuration: "200ms"}}
      type="button"
      className={`px-4 py-2 bg-primary-500 text-white rounded font-medium text-lg duration-200 transition hover:bg-gradient-to-r flex justify-center items-center gap-2 hover:from-gradient-pink hover:to-gradient-blue ${inter.className} ${props.buttonStyle}`}>
        {
          props?.loading ? <RiLoader4Fill className="animate-spin mr-2" /> : null
        }
        {props.title}
        {props.showIcon && <Icon extras="ml-1.5 mt-0.5" />}
    </button>
  )
}

PrimaryButton.defaultProps = {
  buttonStyle: "",
  Icon: ()=>{return <Image src='/assets/button-arrow.svg' alt='Arrow' width={15} height={15} priority />},
  showIcon: false,
  disabled: false
}

export default PrimaryButton