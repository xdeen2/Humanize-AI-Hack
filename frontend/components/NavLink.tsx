import Link from 'next/link'
import React, { useEffect } from 'react'

function NavLink({children, closeNavbar, active=false, href="/"} : {children: React.ReactNode, closeNavbar: any, active?: boolean, href?: string}) {
  useEffect(()=>{
    closeNavbar()
  }, [active])
  return (
    <Link href={href} className={active ? "font-semibold mx-5 text-lg text-white border-2 rounded-full border-gray-500 py-2 px-5 cursor-pointer" : 'text-gray-400 text-lg font-medium mx-5 cursor-pointer duration-200'}>
        {children}
    </Link>
  )
}

export default NavLink