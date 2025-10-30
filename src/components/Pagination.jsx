import React from 'react'

function Pagination({ handleprevious, handleNext, pageNo }) {
  return (
    <div className='flex justify-center items-center bg-gray-100 p-4 mt-8'> 
    
    <div onClick={handleprevious} className='px-8 text-gray-800 text-3xl cursor-pointer hover:text-blue-600 transition font-bold'>
      <i class="fa-solid fa-arrow-left"></i>
    </div>
    <div className='text-gray-800 font-semibold text-lg'>{pageNo}</div> 
    <div onClick={handleNext} className='px-8 text-gray-800 text-3xl cursor-pointer hover:text-blue-600 transition font-bold'>
        
      <i class="fa-solid fa-arrow-right"></i>
    </div>
    </div>
  )
}

export default Pagination

