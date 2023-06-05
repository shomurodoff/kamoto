
import React from 'react'

export const CustomToast = ({status}:{status:string}) => {
  return (
    <div className={`mb-lg-15 alert alert-warning bg-[#C2D24B1A]`}>
      <div className='text-dark font-weight-bold '>{status}</div>
    </div>
  )
}
