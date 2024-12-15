import React, { Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import Feed from './pages/Feed'
import NotFound from './pages/NotFound'
import AllRequests from './components/AllRequests'
import Connections from './components/Connections'
import Profile from './pages/Profile'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {addUser} from './redux/slices/userSlice'
import Editprofile from './pages/Editprofile'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function App() {
  const dispatch = useDispatch()
   const navigate = useNavigate()
  const user = useSelector(store => store.user)

  const disableContextMenu = (event) => {
    event.preventDefault();
  };

  const CheckLoggedin = async() =>{
    try {
      const res = await axios.get(`${BACKEND_URL}/profile/view`, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });      
        if(res.status == 200){
        dispatch(addUser(res.data))
        navigate('/')
        }else{
          navigate('/login')
        }
    } catch (error) {
      console.log(error)
      navigate('/login')
    }
  }

  useEffect(()=>{
    !user && CheckLoggedin()
  },[])

  return (
<div onContextMenu={disableContextMenu}>
<Suspense  fallback={
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-black flex justify-center items-center duration-[2s]">
        {" "}
        <img src='client/public/loader.gif' alt="loader" className="" />{" "}
      </div>
    }>
      <Navbar/>
       <Routes>
        <Route path='/' element={user ? <Feed/> : <Signup/>} />
        <Route path='/login' element={ <Signup/>} />
        <Route path='/profile' element={ user && <Profile/>} />
        <Route path='/connections' element={user && <Connections/>} />
        <Route path='/requestsreceived' element={<AllRequests/>} />
        <Route path='/edit-profile' element={<Editprofile/>} />
        <Route path='*' element={user && <NotFound/>} />
        
       </Routes>
      <Footer/>
    </Suspense>
</div>
  )
}

export default App
