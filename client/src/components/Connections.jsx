import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addConnection } from '../redux/slices/connectionSlice.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.connection);
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`https://lovefinder.onrender.com/user/requests/connections`, { withCredentials: true });
      console.log(response); // Log the fetched data
      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center gap-4">
      <h1 className="text-3xl mt-5 font-bold text-center mb-4 text-white">My Connections</h1>

      {/* Conditional rendering of connections */}
      {connections && connections.length === 0 ? (
        <h1 className="text-white text-4xl text-center absolute top-[25vw] md:top-[10vw] left-[30vw] underline">
          No Connections Found
        </h1>
      ) : (
        connections?.map((item) => (
          <div key={item._id} className="min-h-[6vw] w-[100%] rounded-lg md:w-[40%] flex items-center mx-auto bg-white">
            <div className="w-[28%] min-h-[100%] rounded-lg">
              <img
                src={item?.userimage}
                alt="requester_image"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="w-[72%] min-h-full px-6 py-2 text-black">
              <h2 className="text-2xl font-bold text-black">
                {item?.firstName} {item?.lastName}
              </h2>
              <p className="text-black font-bold">
                {item?.bio ? item?.senderId?.bio : 'Bio not available'}
              </p>
              <p className="text-black">Age: {item?.age}</p>
              <p>Here bio will be displayed</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Connections;
