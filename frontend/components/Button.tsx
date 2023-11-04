import React from 'react'

function Button(props: ButtonProps) {
  return (
    <button
        id={props?.id}
        className={`flex flex-row items-center gap-2.5 text-base rounded-full py-2 px-6 border-white border-2 font-medium select-none cursor-pointer duration-200 ${props.variant == "primary" ? "bg-white text-black hover:bg-transparent hover:text-white" : props.variant == "outline" ? "bg-transparent text-white hover:bg-white hover:text-black" : "px-[1.6rem] py-2.5 bg-gradient-to-tr from-orange-700 to-orange-400 hover:to-orange-600 !border-0 text-white !border-orange-600"} ${props.className}`}
        onClick={props.onClick}
    >
        {props.children}
    </button>
  )
}

interface ButtonProps {
    children: React.ReactNode,
    onClick: () => void,
    variant?: "primary" | "outline" | "special",
    className?: string,
    id?: string
}

Button.defaultProps = {
    variant: "primary"
}

export default Button