import { Outlet } from 'react-router-dom'
import { useThemeMode } from '../../../_metronic/partials'

const ErrorsLayout = () => {
  const {mode} = useThemeMode()
  return (

    <div className='d-flex flex-column flex-center text-center p-10'>
      <div className={`card card-flush  w-lg-650px py-5 ${mode === "dark"?"errorContainerDark":"errorContainer"}`}>
        <div className="card-body py-15 py-lg-20">
          <Outlet />
        </div>
      </div>
    </div>


  )
}

export { ErrorsLayout }
