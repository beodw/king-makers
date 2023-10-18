import React from 'react'
import BrandLogo from '../../assets/logo/BrandLogoRed.svg'
function Footer() {
  return (
      <footer className='w-full mt-2 p-4 2xl:py-8 z-10 absolute bottom-0 flex flex-col items-center bg-blue-800 dark:bg-gray-800'>
        <img className='w-24 2xl:w-48' src={BrandLogo}/>
      </footer>
  )
}

export default Footer
