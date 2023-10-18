import React from 'react'
import BrandLogo from '../../assets/logo/BrandLogo.svg'
function NavBar() {
  return (
      <div className='sticky top-0 z-10 font-bold text-2xl py-4 px-2 flex flex-col justify-center w-full text-black dark:text-gray-500 dark:bg-gray-800 bg-blue-800'>
        <img onClick={()=>window.location.reload()} className='w-24 2xl:w-48 hover:cursor-pointer' src={BrandLogo}/>
      </div>
  )
}

export default NavBar
