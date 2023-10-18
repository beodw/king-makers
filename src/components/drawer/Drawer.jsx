import React from 'react'

function Drawer({children, isVisible, setDrawerIsVisible}) {
  return (
    <div onClick={()=> setDrawerIsVisible(!isVisible)} className={`${isVisible ? 'flex':'hidden'} md:hidden absolute z-20 top-0 left-0 w-screen h-screen bg-black bg-opacity-40 justify-start`}>
      <div onClick={(e)=>e.stopPropagation()} className='bg-gray-800 dark:bg-gray-100 px-2 z-30 w-1/2 h-full flex flex-col'>
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
