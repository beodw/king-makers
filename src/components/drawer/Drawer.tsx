import React, { useEffect } from 'react'
import {DrawerProps} from '../../types'

function Drawer({children, isVisible, setDrawerIsVisible}:DrawerProps) {
  const animateDrawerIn = () => {
    const drawer = document.getElementById('drawer')
    // Wait 20ms for drawer to render before adding animation
    setTimeout(()=> drawer?.classList.remove("-translate-x-full"), 20)
  }
  const animateDrawerOut = () => {
    const drawer = document.getElementById('drawer')
    drawer?.classList.add("-translate-x-full")
    //wait for drawer animate out to finish before closing overlay
    setTimeout(()=> setDrawerIsVisible(!isVisible), 300)
  }
  useEffect(()=>{
      animateDrawerIn()
      return animateDrawerOut
  },[isVisible])
  return (
    <div onClick={animateDrawerOut} className={`${isVisible ? 'flex':'hidden'} animate-fadeIn md:hidden absolute z-20 top-0 left-0 w-screen h-screen bg-black bg-opacity-40 justify-start`}>
      <div id="drawer" onClick={(e)=>e.stopPropagation()} className='delay-200 duration-300 -translate-x-full transition ease-in-out bg-gray-800 dark:bg-gray-100 px-2 z-30 w-1/2 h-full flex flex-col'>
          {
          children.map(
                (child, index) =>
                    <div key={index} className='w-[150px] md:w-48 my-2'>
                        {child}
                    </div>)
          }
      </div>
    </div>
  )
}

export default Drawer
