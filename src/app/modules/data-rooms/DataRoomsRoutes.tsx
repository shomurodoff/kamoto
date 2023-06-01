import React from 'react'
import {Routes, Route} from 'react-router-dom'
import DataRoomsOverview from './view/DataRoomsOverview'
import './styles/DataRooms.scss'
import DataRoomsSpaces from './view/DataRoomsSpaces'
import DataRoomsFiles from './view/DataRoomsFiles'

const DataRoomsRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path='overview'
          element={
            <>
              {' '}
              <DataRoomsOverview />{' '}
            </>
          }
        />
        <Route
          path='spaces'
          element={
            <>
              <DataRoomsSpaces />
            </>
          }
        />
        <Route
          path='files'
          element={
            <>
              <DataRoomsFiles />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default DataRoomsRoutes
