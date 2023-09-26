import Image from 'next/image'
import React from 'react'

const MobileNavbar = ({setMobile}) => {
  return (
    <div className='navbar-mobile'>
        <Image style={{marginLeft:'20px'}} alt='' src='/logoNippon.png' width={150}
            height={50}
        />
         <Image onClick={()=>{setMobile(true)}} style={{marginRight:'20px'}} alt='' src='/menuMobile.png' width={50}
            height={50}
        />
        

    </div>
  )
}

export default MobileNavbar