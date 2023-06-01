import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import {useState} from 'react'

// import {toAbsoluteUrl} from '../../../../_metronic/helpers'

import '../../profile/styles/index.scss'

import {getSingleInvestor} from '../core/_requests'
import {toast} from 'react-toastify'
import {CreateInvestorTabs} from '../components/CreateInvestorTabs'
import {useParams} from 'react-router-dom'
import {AddInvestorUserModal} from './AddInvestorUserModal'

const People = () => {
  const {formatMessage} = useIntl()
  const [modalShow, setModalShow] = React.useState(false)
  const [investorUsers, setInvestorUsers] = useState<any>()
  const {id} = useParams()

  let investorPeople = investorUsers

  useEffect(() => {
    const singleInvestor = async () => {
      try {
        const {
          data: {success, data, errors},
        } = await getSingleInvestor(Number(id))
        if (success) {
          setInvestorUsers(data.investorUsers)
        } else {
          errors.forEach((error: string) => {
            toast.error(formatMessage({id: error}))
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
    singleInvestor()
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className='g-5 g-xxl-8 create-investor-people company-container'>
        <CreateInvestorTabs />
        <div className=' title-main  d-flex justify-content-between ms-8 me-10 mt-7 mb-2'>
          <h4>{formatMessage({id: 'People'})}</h4>
          <button className='btn btn-primary font-size-13 height-36 d-flex align-items-center' onClick={() => setModalShow(true)}>
            {formatMessage({id: 'Add People'})}
          </button>
        </div>

        <div className='d-flex flex-column justify-content-between min-height pb-8 mx-10'>
          <div className='table-responsive'>
            <table className='table table-row-bordered table-row-gray-100 align-middle gy-3 mt-0'>
              <tbody>
                {!!investorPeople?.length &&
                  investorPeople.map((user: any) => (
                    <tr className='border-top font-size-12 aaa' key={user.investorUserId}>
                      <td className='min-w-md-100px min-w-150px'>
                        <p className='font-weight-500 text-hover-primary text-clr58 dark_text_color'>
                          {user.name ? user.name : '-'}
                        </p>
                      </td>
                      <td className='font-weight-400 text-center text-clr58 min-w-md-100px min-w-150px'>
                        <p className='fw-semi-bold text-hover-primary mb-1 text-clr58 dark_text_color'>
                          {user.designation ? user.designation : '-'}
                        </p>
                      </td>
                      <td className='text-center min-w-md-100px min-w-200px'>
                        <a href={`mailto:${user.email}`} className='font-weight-500 text-dark fw-bold text-hover-primary mb-1  table-email dark_text_color'>
                          {user.email ? user.email : '-'}
                        </a>
                      </td>
                      {/* <td className='text-left text-end'>
                        <button className='btn btn-light'>
                          <img src={toAbsoluteUrl('/media/icons/investor/threeDots.svg')} alt='' />
                        </button>
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <AddInvestorUserModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          id={id}
          investorPeople={investorPeople}
        />
      </div>
    </>
  )
}

export {People}
