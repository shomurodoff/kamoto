import React from 'react'

export const Spinner = ({placement}: {placement?: boolean}) => {
  return (
    <div className={`spinner-wrapper `}>
      <div
        className={`spinner-border ${placement ? 'd-center' : ''}`}
        style={{width: '4rem', height: '4rem'}}
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}
