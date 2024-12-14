import React from 'react'

function Connections() {
  return (
    <div className='w-full h-full flex flex-col justify-center gap-4'>
        <h1 className='text-3xl mt-5 font-bold text-center mb-4 text-white'>My Connections</h1>

        {/* all connections of logged in user */}
        <div className='min-h-[6vw] w-[100%]  rounded-lg md:w-[40%] flex items-center mx-auto bg-white '>
                <div className='w-[25%] min-h-[95%]  rounded-lg'>
                  <img src='https://img.freepik.com/free-photo/indian-man-smiling-mockup-psd-cheerful-expression-closeup-portra_53876-143269.jpg?t=st=1734190014~exp=1734193614~hmac=acb9e85f129d51ca0ae2e0dbe79e9b26036a566f889a395ff8a45bfd38c9694b&w=900' alt='requester_image' className='w-full h-full object-cover rounded-l-lg' />
                </div>
                <div className='w-[75%] min-h-full px-6 py-2 text-black'>
                  <h2 className='text-2xl font-bold text-black'>Name of requester</h2>
                  <p>Here bio will be displayed</p>
                </div>
                
        </div>

       
        

       
      
    </div>
  )
}

export default Connections
