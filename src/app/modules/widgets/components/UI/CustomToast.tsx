
import React from 'react'

export const CustomToast = ({status}:{status:string}) => {
  return (
    <div className={`mb-lg-15 alert alert-warning`}>
      <div className='text-dark font-weight-bold '>{status}</div>
    </div>
  )
}
