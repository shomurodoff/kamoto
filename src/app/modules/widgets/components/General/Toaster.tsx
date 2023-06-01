import React from 'react'
import {ToastContainer} from 'react-toastify'

export const Toaster = () => {
  return <ToastContainer
  position="top-right"
  autoClose={parseInt(process.env.REACT_APP_AUTOCLOSE_TIME || "3000")}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  />
}
