import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import ExistingInvestor from './view/ExistingInvestor'
import ProspectiveInvestor from './view/ProspectiveInvestor'
import Profile from './view/Profile'
import {useIntl} from 'react-intl'
import ImportInvestors from './view/ImportInvestors'
import {IndividualInvestorDetails} from './view/IndividualInvestorDetails'
import {General} from './view/General'
import {Highlights} from './view/Highlights'
import {People} from './view/People'
import {Investments} from './view/Investments'
import {useInvestorDatabase} from './core/InvestorContext'
import {Constants, InvestorDatabase} from './core/_constants'

const InvestorDBRoutes = () => {
  const {formatMessage} = useIntl()
  const {
    IndividualInvestorBreadCrumbs,
    IndividualInvestorUserBreadCrumbs,
    ImportInvestorBreadCrumbs,
  } = Constants()
  const {
    InvestorDatabaseBreadCrumbs,
    InvestorDatabaseProspectiveBreadCrumbs,
    InvestorDatabaseExistingBreadCrumbs,
  } = InvestorDatabase()
  const {companyName, investorUser} = useInvestorDatabase()
  return (
    <div className='mt-3'>
      <Routes>
        <Route
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route
            path='prospective-investor'
            element={
              <>
                <PageTitle
                  breadcrumbs={InvestorDatabaseProspectiveBreadCrumbs}
                  description={formatMessage({id: 'Investor Database'})}
                >
                  {formatMessage({id: 'Investor Database'})}
                </PageTitle>
                <ProspectiveInvestor />
              </>
            }
          />
          <Route
            path='existing-investor'
            element={
              <>
                <PageTitle
                  breadcrumbs={InvestorDatabaseExistingBreadCrumbs}
                  description={formatMessage({id: 'Investor Database'})}
                >
                  {formatMessage({id: 'Investor Database'})}
                </PageTitle>
                <ExistingInvestor />
              </>
            }
          />
          <Route
            path='individual-investor/:id'
            element={
              <>
                <PageTitle
                  breadcrumbs={IndividualInvestorBreadCrumbs}
                  description={`${companyName}`}
                >
                  {formatMessage({id: 'Investor Database'})}
                </PageTitle>
                <IndividualInvestorDetails />
              </>
            }
          />
          <Route
            path='import-investors'
            element={
              <>
                <PageTitle
                  breadcrumbs={ImportInvestorBreadCrumbs}
                  description={formatMessage({id: 'Import Investors'})}
                >
                  {formatMessage({id: 'Import Investors'})}
                </PageTitle>
                <ImportInvestors />
              </>
            }
          />
          <Route
            path='profile/:id'
            element={
              <>
                <PageTitle
                  breadcrumbs={IndividualInvestorUserBreadCrumbs}
                  description={`${investorUser}`}
                >
                  {formatMessage({id: 'Investor Database'})}
                </PageTitle>
                <Profile />
              </>
            }
          />
          <Route
            path='create-investor/'
            element={
              <>
                <PageTitle
                  breadcrumbs={InvestorDatabaseBreadCrumbs}
                  description={formatMessage({id: 'Settings'})}
                >
                  {formatMessage({id: 'Create Investor'})}
                </PageTitle>
                <General />
              </>
            }
          />
          <Route
            path='create-investor/:id'
            element={
              <>
                <PageTitle
                  breadcrumbs={InvestorDatabaseBreadCrumbs}
                  description={formatMessage({id: 'Settings'})}
                >
                  {formatMessage({id: 'Create-investor'})}
                </PageTitle>
                <General />
              </>
            }
          />

          <Route
            path='create-investor/highlights/:id'
            element={
              <>
                <PageTitle
                  breadcrumbs={InvestorDatabaseBreadCrumbs}
                  description={formatMessage({id: 'Settings'})}
                >
                  {formatMessage({id: 'Create-investor'})}
                </PageTitle>
                <Highlights />
              </>
            }
          />
          <Route
            path='create-investor/people/:id'
            element={
              <>
                <PageTitle
                  breadcrumbs={InvestorDatabaseBreadCrumbs}
                  description={formatMessage({id: 'Settings'})}
                >
                  {formatMessage({id: 'Create-investor'})}
                </PageTitle>
                <People />
              </>
            }
          />
          <Route
            path='create-investor/investments/:id'
            element={
              <>
                <PageTitle
                  breadcrumbs={InvestorDatabaseBreadCrumbs}
                  description={formatMessage({id: 'Settings'})}
                >
                  {formatMessage({id: 'Create-investor'})}
                </PageTitle>
                <Investments />
              </>
            }
          />

          <Route index element={<Navigate to='/investor-database/prospective-investor' />} />
          {/*  */}
        </Route>
      </Routes>
    </div>
  )
}

export default InvestorDBRoutes
