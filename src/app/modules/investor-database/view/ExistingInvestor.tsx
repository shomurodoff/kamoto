import React, {useEffect, useState} from 'react'
import {InvestorSidebar} from '../components/InvestorSidebar'
import {getActiveRound, getAllInvestor} from '../core/_requests'
import {InvestorModel} from '../core/_models'
import InvestorCard from '../components/InvestorCard'
import {useInvestorDatabase} from '../core/InvestorContext'
import {useIntl} from 'react-intl'
import {toast} from 'react-toastify'
import {Toaster} from '../../widgets/components/General/Toaster'
import {useAuth} from '../../auth'
import {Spinner} from '../../widgets/components/General/Spinner'

const sidebarOptions: any[] = [
  {
    id: 1,
    title: 'Committed',
  },
  {
    id: 2,
    title: 'Invested',
  },
  {
    id: 3,
    title: 'All',
  },
]

const ExistingInvestor = () => {
  const [existingInvestor, setExistingInvestor] = useState<InvestorModel[]>([])
  const {searchValue, sort_by_investorDb, sort_order_investorDb} = useInvestorDatabase()
  const [selectedOption, setSelectedOption] = useState(2)
  const [roundId, setRoundId] = useState<number>()
  const {companyId} = useAuth()
  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  useEffect(() => {
    const getAllExistingInvestors = async () => {
      try {
        if (selectedOption === 2) {
          setLoading(true)
          const {
            data: {
              data: {data: edata, totalCount},
              success,
              errors,
            },
          } = await getAllInvestor(
            'existing',
            searchValue,
            sort_by_investorDb,
            sort_order_investorDb,
            companyId,
            'invested',
            page,
            12
          )
          if (success) {
            setExistingInvestor(edata)
            setTotalCount(totalCount)
          } else {
            errors.forEach((error: string) => {
              toast.error(formatMessage({id: error}))
            })
          }
        } else if (selectedOption === 1) {
          setLoading(true)
          const {
            data: {
              data: {data: edata, totalCount},
              success,
              errors,
            },
          } = await getAllInvestor(
            'existing',
            searchValue,
            sort_by_investorDb,
            sort_order_investorDb,
            companyId,
            'committed',
            page,
            12
          )
          if (success) {
            setExistingInvestor(edata)
            setTotalCount(totalCount)
          } else {
            errors.forEach((error: string) => {
              toast.error(formatMessage({id: error}))
            })
          }
        } else {
          setLoading(true)
          const {
            data: {
              data: {data: edata, totalCount},
              success,
              errors,
            },
          } = await getAllInvestor(
            'existing',
            searchValue,
            sort_by_investorDb,
            sort_order_investorDb,
            companyId,
            'all',
            page,
            12
          )
          if (success) {
            setExistingInvestor(edata)
            setTotalCount(totalCount)
          } else {
            errors.forEach((error: string) => {
              toast.error(formatMessage({id: error}))
            })
          }
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getAllExistingInvestors()
  }, [searchValue, sort_by_investorDb, sort_order_investorDb, selectedOption, page]) // eslint-disable-line react-hooks/exhaustive-deps

  const activeRound = async () => {
    try {
      const {
        data: {data, success, errors},
      } = await getActiveRound(Number(companyId))
      if (success) {
        setRoundId(data?.roundId)
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({id: error}))
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    activeRound()
  }, [companyId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / 12))
  }, [totalCount])
  return (
    <>
      {loading ? <Spinner /> : null}
      <Toaster />
      <div className='d-flex main-content px-4 px-md-6'>
        <InvestorSidebar
          sidebarOptions={sidebarOptions}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        <div className='prospective-investor w-100'>
          {existingInvestor.map((existing: InvestorModel) => (
            <InvestorCard key={existing.investorId} investor={existing} roundId={roundId} />
          ))}
        </div>
      </div>
      {existingInvestor.length > 0 && (
        <div>
          <div className='d-flex flex-stack flex-wrap pt-10 px-8 mt-5 mb-5'>
            <div className='fs-6 fw-bold text-gray-700'></div>
            <ul className='pagination'>
              <li className={`page-item previous ${page - 1 === 0 && 'disableDiv'}`}>
                <p className='page-link' onClick={() => setPage((prev) => prev - 1)}>
                  <i className='previous'></i>
                </p>
              </li>
              {Array.from({length: totalPages}).map((_, index) => (
                <li className={`page-item cursor-pointer ${index + 1 === page && 'active'}`}>
                  <p className='page-link' key={index} onClick={() => setPage(index + 1)}>
                    {index + 1}
                  </p>
                </li>
              ))}
              <li className={`page-item next ${page + 1 > totalPages && 'disableDiv'}`}>
                <p className='page-link' onClick={() => setPage((prev) => prev + 1)}>
                  <i className='next'></i>
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default ExistingInvestor
