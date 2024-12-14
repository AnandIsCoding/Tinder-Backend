import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Feed() {
  return (
     <div className='flex justify-center z-[999]'>
      <div className='bg-zinc-200 shadow-sm   shadow-violet-200 w-[90%] md:w-[25%] h-[80vh] md:h-[82vh] rounded-xl mt-[22vw] md:mt-[5vw] overflow-auto'>
        <div className='w-full h-[65%] rounded-t-xl bg-pink-500'></div>
        <div className='details p-4'>
            <h1 className='text-xl font-bold'>Anand Jha</h1>
            <h3  className='text-lg font-bold '>Senior Software Engineer</h3>
            <h3 className='text-lg font-semibold'>Male</h3>
            <h3 className='text-lg font-semibold'>21</h3>
            <div className='flex justify-center gap-4'>
                <button className='px-4 py-2 rounded-lg text-white text-xl font-semibold bg-[red]'>Ignore</button>
                <button className='px-4 py-2 rounded-lg text-white text-xl font-semibold bg-[blue]'>Interested</button>
            </div>
        </div>
      </div>
    </div>   
   
  )
}

export default Feed
