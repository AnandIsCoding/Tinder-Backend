import React, { useEffect } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addRequest, removeRequest } from '../redux/slices/requestSlice.js'
import toast from 'react-hot-toast'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
function AllRequests() {
  const dispatch = useDispatch()
  const request = useSelector(store => store.request)
  const fetchRequests = async(req,res) =>{
    try {
      const res = await axios.get(`${BACKEND_URL}/user/requests/received`, {withCredentials:true})
      dispatch(addRequest(res.data.data))
      
    } catch (error) {
      console.log(error)
      toast.error(error.data.message)
    }
  }
  useEffect(()=>{
    fetchRequests()
    console.log('requests =>> ',request)
  },[])

  const handleRequest = async (status, _id) => {
    try {
      console.log("Request ID:", _id);
      
      const res = await axios.post(
        `${BACKEND_URL}/request/review/${status}/${_id}`, 
        {}, 
        { withCredentials: true }
      );
  
      // Dispatch action to update state (assuming removeRequest is Redux action)
      dispatch(removeRequest(_id));
      
      toast.success(res.data.message);
      console.log("Response:", res);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  
  return (
    <div className='w-full min-h-screen flex flex-col text-white items-center gap-5 overflow-y-auto'>
            <h1 className='text-3xl mt-5 font-bold text-center mb-4'>My Connection Requests</h1>

            {/* all requests */}
           
           {
            request && request.length < 1 ? <h1>No Request found</h1> : request && request.map((item,index)=>{
              return  <div key={item._id} className='min-h-[6vw] w-full px-2 md:px-0 rounded-lg md:w-[40%] flex bg-white '>
                <div className='w-[15%] min-h-[95%]  rounded-lg'>
                  <img src={item.senderId.userimage} alt='requester_image' className='w-full h-full object-cover rounded-l-lg' />
                </div>
                <div className='w-[53%] min-h-full px-6 py-4'>
                  <h2 className='text-xl font-bold text-black'>{item.senderId.firstName}</h2>
                  <p className='text-black'>{item.senderId.bio ? item.senderId.bio : 'Bio not available' }</p>
                  <p className='text-black'>Age : { item.senderId.age }</p>
                  <p className='text-black'>Gender : { item.senderId.gender }</p>
                </div>
                <div className='w-[30%]  rounded-r-lg flex justify-center gap-2 items-center pr-4 '>
                <button className='px-4 h-[15vw]  md:h-[3vw] rounded-lg text-white text-lg font-semibold bg-[red]' onClick={()=>handleRequest('rejected',item._id)} >Reject</button>
                <button className='px-4 h-[15vw] md:h-[3vw]  rounded-lg text-white text-lg font-semibold bg-[blue]' onClick={()=>handleRequest('accepted',item._id)}>Accept</button>
                </div>
            </div>
            })
           }

           
      
    </div>
  )
}

export default AllRequests
