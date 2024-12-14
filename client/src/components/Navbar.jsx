import React from 'react'
import { NavLink } from 'react-router-dom'


function Navbar() {
  return (
    <div className="fixed flex w-full h-[10vh] backdrop-blur-2xl z-[999]">
      <div  className="w-[45%] h-full text-3xl md:text-4xl font-semibold px-5 py-5 text-white ">
        💘inder
      </div>

      

      <div className="w-[35%] h-full  justify-between py-7 text-white hidden md:flex ">
        <h1 className="text-xl font-normal text-white hover:scale-110 cursor-pointer  duration-[0.3s]">
          Profile
        </h1>
        <NavLink  className="text-xl font-normal  hover:scale-110  cursor-pointer duration-[0.3s] ">
          My Connections
        </NavLink>
        <h1 className="text-xl font-normal  cursor-pointer  hover:scale-110 duration-[0.3s]">
          Logout
        </h1>
        <h1 className="text-xl font-normal  cursor-pointer  hover:scale-110 duration-[0.3s]">
          All Requests
        </h1>
      </div>

      <div className="w-[20%] h-full px-20 py-6 ">
        <h1 className="hidden md:flex text-2xl font-normal hover:scale-110 text-white cursor-pointer ml-20 duration-[0.3s]">
          Contact
        </h1>
      </div>



     
    </div>
  )
}

export default Navbar
