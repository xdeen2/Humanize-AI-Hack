import React from 'react'

function OutlineButton(props:{title: string, onClick?: any, buttonStyle?: string}) {
  return (
    <button type="button" onClick={props?.onClick} className={`px-4 py-2 bg-transparent text-primary-500 border-primary-500 border-[1px] rounded font-medium text-lg duration-200 transition hover:bg-white hover:text-primary-500 hover:border-transparent ${props.buttonStyle}`}>
        {props.title}
    </button>
  )
}

export default OutlineButton