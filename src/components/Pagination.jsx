import React from 'react'

function Pagination({ handleprevious, handleNext, pageNo }) {
  
  return (
     <div className='flex justify-center items-center bg-gray-100 dark:bg-gray-800 p-4 mt-8 rounded-lg transition-colors duration-300'> 
      <div onClick={handleprevious} className='px-8 text-gray-800 dark:text-gray-200 text-3xl cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition font-bold'>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div className='text-gray-800 dark:text-gray-200 font-semibold text-lg'>{pageNo}</div> 
      <div onClick={handleNext} className='px-8 text-gray-800 dark:text-gray-200 text-3xl cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition font-bold'>
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  )
}

export default Pagination

