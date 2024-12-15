import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../redux/slices/userSlice'
import toast from 'react-hot-toast'
import axios from 'axios'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
function Navbar() {
  const [openPanel, setOpenpanel] = useState(false)
  const user = useSelector(store => store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/logout`, { withCredentials: true });
     
      if (res.data.success) { // Adjusting this part to access res.data
        dispatch(removeUser());
        toast.success(res.data.message); // Access the message properly
        navigate('/login');
      } else {
        toast.error(res.data.message); // Access the message properly
      }
    } catch (error) {
      console.error(error.message); // Log any error that occurs
      toast.error('Something went wrong during logout');
    }
  };
  
  return (
    <div className="fixed flex w-full h-[10vh] backdrop-blur-2xl z-[10]">
      <NavLink to='/' className="w-[40%] h-full text-3xl md:text-4xl font-semibold px-5 py-5 text-white cursor-pointer">
        💘inder
      </NavLink>

      

      <div className="w-[30%] h-full  justify-between py-7 text-white hidden md:flex ">
        <NavLink to='/profile' className="text-xl font-normal text-white hover:scale-110 cursor-pointer  duration-[0.3s]">
          Profile
        </NavLink>
        <NavLink to='/connections'  className="text-xl font-normal  hover:scale-110  cursor-pointer duration-[0.3s] ">
          My Connections
        </NavLink>
        <h1 onClick={handleLogout} className="text-xl font-normal  cursor-pointer  hover:scale-110 duration-[0.3s]">
          Logout
        </h1>
        <NavLink to='/requestsreceived' className="text-xl font-normal  cursor-pointer  hover:scale-110 duration-[0.3s]">
          All Requests
        </NavLink>

      </div>

      <div className="w-[30%] h-full px-20 py-6 flex gap-4">
        <h1 className="hidden md:flex text-lg font-normal hover:scale-110 text-white cursor-pointer ml-20 duration-[0.3s]">
          Welcome {user ? user.firstName : 'User'}
        </h1>
        <img src={user ? user.userimage : 'https://img.freepik.com/free-vector/follow-me-social-business-theme-design_24877-52233.jpg?semt=ais_hybrid'} alt='user_image' className='w-[3.2vw] h-[3.2vw] rounded-xl mt-[-0.6vw] ' />
        <h1 className=' cursor-pointer text-white text-xl font-bold hidden md:flex'> {!openPanel ? <GiHamburgerMenu size={28} className='mt-0 mr-[-4]' onClick={()=> setOpenpanel(prev => !prev)}/> : <IoMdClose size={28} className='mt-0 mr-[-4]' onClick={()=> setOpenpanel(prev => !prev)}/>  } </h1>
      </div>

      <h1 className='cursor-pointer text-white text-xl font-bold md:hidden'> {!openPanel ? <GiHamburgerMenu size={28} className='mt-6' onClick={()=> setOpenpanel(prev => !prev)}/> : <IoMdClose size={28} className='mt-6' onClick={()=> setOpenpanel(prev => !prev)}/>  } </h1>

      {
  openPanel && (
    <div
      className={`absolute top-0 h-[100vh] sidepanel ${
        openPanel ? 'w-[60%]' : 'w-[0%]'
      } bottom-0 left-0 right-0 bg-white transition-all px-2 py-3 flex flex-col gap-2 md:w-[20%]`}
    >
    
        <NavLink to='/profile' className='w-full px-5 py-2 rounded-lg bg-black text-white text-xl font-semibold text-center' onClick={()=>setOpenpanel(false)}>Profile</NavLink>
        <NavLink to='/requestsreceived' className='w-full px-5 py-2 rounded-lg bg-black text-white text-xl font-semibold text-center' onClick={()=>setOpenpanel(false)}>All Requests</NavLink>
        <NavLink to='/connections' className='w-full px-5 py-2 rounded-lg bg-black text-white text-xl font-semibold text-center' onClick={()=>setOpenpanel(false)}>My Connections</NavLink>
        <NavLink to='/login' className='w-full px-5 py-2 rounded-lg bg-black text-white text-xl font-semibold text-center' onClick={()=>setOpenpanel(false)}>Another account</NavLink>
        <NavLink to='/' className='w-full px-5 py-2 rounded-lg bg-black text-white text-xl font-semibold text-center' onClick={()=>setOpenpanel(false)}>Feed</NavLink>
        <NavLink onClick={handleLogout} className='w-full px-5 py-2 rounded-lg bg-black text-white text-xl font-semibold text-center' >Logout</NavLink>
        
        
    </div>
  )
}


     
    </div>
  )
}

export default Navbar
