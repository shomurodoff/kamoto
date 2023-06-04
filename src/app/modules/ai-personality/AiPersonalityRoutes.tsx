import React from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'

const AiPersonalityRoutes = () => {
  return (
    <Routes>
      <Route path={'chat'} element={<AiPersonalityRoutes />} />
      <Route path={'post'} element={<AiPersonalityRoutes />} />
      <Route element={<AiPersonalityRoutes />} />
      {/*<Route index element={<Navigate to='/my-ai/chat' />} />*/}
    </Routes>
  )
}

export default AiPersonalityRoutes
