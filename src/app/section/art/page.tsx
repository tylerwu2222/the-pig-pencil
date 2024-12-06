// import SectionTemplate from '@/app/components/Sections/SectionTemplate/SectionTemplate';
import React from 'react'

const Art = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p>Art section will return shortly (once I'm done prepping for these job interviews)</p>
      <img 
      src='/img/art/alphabet_deities/Deli.jpg' 
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[14vh] w-auto transition-transform transform origin-center hover:scale-[5] duration-1000 ease-in-out' 
      />
      {/* <SectionTemplate section='art' /> */}
    </div>
  )
}

export default Art;