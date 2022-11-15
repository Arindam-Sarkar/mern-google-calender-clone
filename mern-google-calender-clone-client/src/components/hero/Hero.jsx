import React from 'react'
import LeftPanel from '../leftPanel/LeftPanel'
import RightPanel from '../rightPanel/RightPanel'

const Hero = () => {
  return (
    <div className='flex'>
      <LeftPanel />

      <RightPanel />
    </div>
  )
}

export default Hero