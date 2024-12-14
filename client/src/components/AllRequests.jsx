import React from 'react'

function AllRequests() {
  return (
    <div className='w-full min-h-screen flex flex-col text-white items-center gap-5 overflow-y-auto'>
            <h1 className='text-3xl mt-5 font-bold text-center mb-4'>My Connection Requests</h1>

            {/* all requests */}
            <div className='min-h-[6vw] rounded-lg w-[40%] flex '>
                <div className='w-[15%] min-h-[95%]  rounded-lg'>
                  <img src='https://img.freepik.com/free-photo/indian-man-smiling-mockup-psd-cheerful-expression-closeup-portra_53876-143269.jpg?t=st=1734190014~exp=1734193614~hmac=acb9e85f129d51ca0ae2e0dbe79e9b26036a566f889a395ff8a45bfd38c9694b&w=900' alt='requester_image' className='w-full h-full object-cover rounded-l-lg' />
                </div>
                <div className='w-[53%] min-h-full px-6 py-4'>
                  <h2 className='text-xl font-bold'>Name of requester</h2>
                  <p>Here bio will be displayed</p>
                </div>
                <div className='w-[30%]  rounded-r-lg flex justify-center gap-2 items-center pr-4 '>
                <button className='px-4 h-[3vw] rounded-lg text-white text-lg font-semibold bg-[red]'>Reject</button>
                <button className='px-4 h-[3vw]  rounded-lg text-white text-lg font-semibold bg-[blue]'>Accept</button>
                </div>
            </div>

           
      
    </div>
  )
}

export default AllRequests
