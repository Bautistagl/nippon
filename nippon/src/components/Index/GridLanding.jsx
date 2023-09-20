import Image from 'next/image'
import React from 'react'

const GridLanding = () => {
  return (
    <div className='grid-landing'>
        <div className='div1'>
        <Image style={{marginLeft:'50px',display:'flex',margin:'40px auto'}} width={200} height={60} alt='' src='/logoMarron.png'/> 
        <Image style={{marginLeft:'50px',display:'flex',margin:'10px auto'}} width={150} height={30} alt='' src='/letraMarron.png'/>    
        <span> breath and flow</span>
        <div> Macetas. Muebles. Decohogar</div>
         </div>
        <div className='div2'> </div>
        <div className='div3'> </div>
        <div className='div4'> </div>

    </div>
  )
}

export default GridLanding