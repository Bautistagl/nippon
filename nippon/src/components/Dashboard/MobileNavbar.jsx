import Image from 'next/image'
import React from 'react'

const MobileNavbar = ({setMobile}) => {
  return (
    <div className='navbar-mobile'>
        <Image style={{marginLeft:'20px'}} alt='' src='/logoBien.png' width={100}
            height={30}
        />
         <Image onClick={()=>{setMobile(true)}} style={{marginRight:'20px'}} alt='' src='/menuMobile.png' width={30}
            height={30}
        />
        

    </div>
  )
}

export default MobileNavbar