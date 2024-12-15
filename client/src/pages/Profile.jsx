import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
function Profile() {
  const user = useSelector(store => store.user)
  return (
    <div className='text-white absolute top-[5vw] left-0 right-0 bottom-0  flex justify-center items-center px-2 '>
       <div className='w-full md:w-[35vw] h-[83vh] md:h-[85vh] bg-zinc-100 absolute top-[15vw] md:top-[0vw] text-black md:rounded-xl'> 
       <div className='w-full h-[65%] rounded-t-xl bg-pink-200 '>
          <img src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" alt='user_image' className='w-full h-full object-cover' />
        </div>
        <div className='details p-4'>
          <div className='flex gap-2'>
            <h1 className='text-2xl font-bold'>{user.firstName}</h1>
            <h3 className='text-xl font-bold'> {user.lastNAme} </h3>
          </div>
          <h3 className='text-lg font-semibold'>{user.gender}</h3>
          <h3 className='text-lg font-semibold'>{user.age}</h3>
          <h3 className='text-lg font-semibold'>{user.bio || 'Bio not available for this user'}</h3>
        
          <NavLink to='/edit-profile' className='text-lg text-blue-500'>Edit profile</NavLink>
        </div>
       </div>
    </div>
  )
}

export default Profile
