/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
// import {
//   ListsWidget2,
//   ListsWidget3,
//   ListsWidget4,
//   ListsWidget6,
//   TablesWidget5,
//   TablesWidget10,
//   MixedWidget8,
//   CardsWidget7,
//   CardsWidget17,
//   CardsWidget20,
//   ListsWidget26,
//   EngageWidget10,
// } from '../../../_metronic/partials/widgets'
import { ListsWidget2 } from "../../../_metronic/partials/widgets";
const DashboardPage: FC = () => (
  <>
    <ListsWidget2 className={""} />
  </>
);

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "Dashboard" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
