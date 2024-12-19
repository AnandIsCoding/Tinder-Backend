import React, { useEffect } from 'react'
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addConnection} from '../redux/slices/connectionSlice.js'
import toast from 'react-hot-toast'
function Connections() {
  const dispatch = useDispatch()
  const connections = useSelector(store => store.connection)
  const fetchConnections = async(req,res) =>{
    try {
      const res = await axios.get(`https://lovefinder.onrender.com/user/requests/connections`, {withCredentials:true})
     console.log(res.data.data)
     dispatch(addConnection(res.data.data))
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchConnections()
    console.log('connections =>> ',connections)
  },[])
  return (
    <div className='w-full h-full flex flex-col justify-center gap-4'>
        <h1 className='text-3xl mt-5 font-bold text-center mb-4 text-white'>My Connections</h1>

        {/* all connections of logged in user */}


        {
            connections && connections.length < 1 ? <h1 className='text-white text-4xl text-center absolute top-[25vw] md:top-[10vw] left-[30vw] underline'>No Connections Found</h1> : connections && connections.map((item,index)=>{
              return  <div key={item._id} className='min-h-[6vw] w-[100%]  rounded-lg md:w-[40%] flex items-center mx-auto bg-white '>
                <div className='w-[28%] min-h-[100%]  rounded-lg'>
                  <img src='https://img.freepik.com/free-photo/indian-man-smiling-mockup-psd-cheerful-expression-closeup-portra_53876-143269.jpg?t=st=1734190014~exp=1734193614~hmac=acb9e85f129d51ca0ae2e0dbe79e9b26036a566f889a395ff8a45bfd38c9694b&w=900' alt='requester_image' className='w-full h-full object-cover rounded-l-lg' />
                </div>
                <div className='w-[72%] min-h-full px-6 py-2 text-black '>
                  <h2 className='text-2xl font-bold text-black'>{item.firstName} {item.lastName}</h2>
                  <p className='text-black font-bold'>{item.bio ? item.senderId.bio : 'Bio not available' }</p>
                  <p className='text-black'>Age : { item.age }</p>
                  <p>Here bio will be displayed</p>
                </div>                
        </div>
            })
        }


       

       
        

       
      
    </div>
  )
}

export default Connections
