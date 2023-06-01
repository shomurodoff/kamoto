import arrowUpGreen from '../../../../_metronic/assets/images/svg/data-room/arrow-up-green.svg'
import {toAbsoluteUrl} from '../../../../_metronic/helpers/index'
import clsx from 'clsx'
function OverviewStats() {
  const items: Array<{
    name: string
    initials?: string
    src?: string
    state?: string
  }> = [
    {name: 'Alan Warden', initials: 'A', state: 'warning'},
    {name: 'Michael Eberon', src: toAbsoluteUrl('/media/avatars/300-11.jpg')},
    {name: 'Susan Redwood', initials: 'S', state: 'primary'},
    {name: 'Melody Macy', src: toAbsoluteUrl('/media/avatars/300-2.jpg')},
    {name: 'Perry Matthew', initials: 'P', state: 'danger'},
    {name: 'Barry Walter', src: toAbsoluteUrl('/media/avatars/300-12.jpg')},
  ]

  return (
    <div className='data-rooms-stats-grid'>
      <div className='bg-white stats-card-wrapper'>
        <div className='stats-card-top'>
          <p className='mb-0 stats-card-heading'>Total Visits</p>
          <div className='d-flex flex-row align-items-center'>
            <h1 className='mb-0'>125</h1>
            <p className='mb-0 d-flex flex-row align-items-center stats-percent text-success'>
              <img src={arrowUpGreen} alt=''></img> 2.2%
            </p>
          </div>
        </div>
        <div className='stats-card-bottom'></div>
      </div>
      <div className='bg-white stats-card-wrapper'>
        <div className='stats-card-top'>
          <p className='mb-0 stats-card-heading'>Average time spent</p>
          <div className='d-flex flex-row align-items-center'>
            <h1 className='mb-0'>5.5m</h1>
            <p className='mb-0 d-flex flex-row align-items-center stats-percent text-success'>
              <img src={arrowUpGreen} alt=''></img> 2.6%
            </p>
          </div>
        </div>
        <div className='stats-card-bottom'></div>
      </div>
      <div className='bg-white stats-card-wrapper '>
        <div className='stats-card-top'>
          <p className='mb-0 stats-card-heading'>New Committed Investor</p>
          <div className='d-flex flex-row align-items-center'>
            <h1 className='mb-0'>12</h1>
            <p className='mb-0 d-flex flex-row align-items-center stats-percent text-success'>
              <img src={arrowUpGreen} alt=''></img> 2.6%
            </p>
          </div>
        </div>
        <div className='stats-card-bottom'></div>
      </div>
      <div className='bg-white stats-card-wrapper d-flex flex-column  justify-content-between'>
        <div className='stats-card-top'>
          <p className='mb-0 stats-card-heading'>Active Investors</p>
          <div className='d-flex flex-row align-items-center'>
            <h1 className='mb-0'>12</h1>
            {/* <p className='mb-0 d-flex flex-row align-items-center stats-percent text-success'>
              <img src={arrowUpGreen} alt=''></img> 2.2%
            </p> */}
          </div>
        </div>
        <div className='stats-card-bottom'>
          <span className=' d-block mb-2'>Active Investors</span>
          <div className='symbol-group symbol-hover flex-nowrap'>
            {items.map((item, index) => (
              <div
                className='symbol symbol-35px symbol-circle'
                data-bs-toggle='tooltip'
                title={item.name}
                key={`cw7-item-${index}`}
              >
                {item.src && <img alt='Pic' src={item.src} />}
                {item.state && item.initials && (
                  <span
                    className={clsx(
                      'symbol-label fw-bold',
                      'bg-' + item.state,
                      'text-inverse-' + item.state
                    )}
                  >
                    {item.initials}
                  </span>
                )}
              </div>
            ))}

            <a href='https://example.com' className='symbol symbol-35px symbol-circle'>
              <span className={clsx('symbol-label')}>+6</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewStats
