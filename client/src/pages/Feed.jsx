import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { setFeed, removeFromFeed } from '../redux/slices/feedSlice.js';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Feed() {
  const [loading, setLoading] = useState(true);
  const feed = useSelector(store => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://lovefinder.onrender.com/feed`, { withCredentials: true });
      dispatch(setFeed(res.data?.data || []));
      if(feed.length > 0) toast.success(res.data.message);
      if(feed.length <= 0) toast.success('No users found for feed');
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch feed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const sendRequest = async (status, id) => {
    try {
      const res = await axios.post(`https://lovefinder.onrender.com/request/send/${status}/${id}`, {}, { withCredentials: true });
      // toast.success(res.data.message);
      if(status === 'interested') toast.success('Interested connection sent');
      if(status === 'rejected') toast.success('Ignored user');
      dispatch(removeFromFeed(id));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send request.");
    }
  };

  if (loading) {
    return <h1 className='text-white text-5xl text-center'>Loading...</h1>;
  }

  if (!feed || feed.length === 0) {
    return <h1 className='text-white text-lg md:text-4xl text-center absolute top-[25vw] md:top-[10vw] left-[20vw] md:left-[30vw] underline'>No Subscribers available for feed</h1>;
  }

  const user = feed[0];
  return (
    <div className='flex justify-center z-[999]'>
      <div className='bg-white shadow-sm shadow-violet-200 w-[90%] md:w-[25%] h-[80vh] md:h-[82vh] rounded-xl mt-[22vw] md:mt-[5vw] overflow-hidden'>
        <div className='w-full h-[65%] rounded-t-xl bg-pink-200 '>
          <img src={user.userimage} alt='user_image' className='w-full h-full object-cover' />
        </div>
        <div className='details p-4'>
          <div className='flex gap-2'>
            <h1 className='text-xl font-bold'>{user.firstName}</h1>
            <h3 className='text-lg font-bold'>{user.lastName}</h3>
          </div>
          <h3 className='text-lg font-semibold'>{user.gender}</h3>
          <h3 className='text-lg font-semibold'>{user.age}</h3>
          <h3 className='text-lg font-semibold'>{user.bio || 'Bio not available for this user'}</h3>
          <div className='flex justify-center gap-4'>
            <button className='px-4 py-2 rounded-lg text-white text-xl font-semibold bg-[red]' onClick={() => sendRequest('rejected', user._id)}>Ignore</button>
            <button className='px-4 py-2 rounded-lg text-white text-xl font-semibold bg-[blue]' onClick={() => sendRequest('interested', user._id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
