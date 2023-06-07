import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import TextInput from "../../widgets/components/Input/TextInput";
import * as Yup from "yup";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import { addInvestorInvestments, getAllInvestments } from "../core/_requests";
import { toast } from "react-toastify";
import { currencies } from "../../onboarding/core/_requests";
import { DropdownType } from "../../../core/_models";
import { CreateInvestorTabs } from "../components/CreateInvestorTabs";
import { useParams } from "react-router-dom";
import { Toaster } from "../../widgets/components/General/Toaster";
import { useDateFormat } from "../../../hooks/useDateFormat";
import { DateTime } from "luxon";
import { designationOptions } from "../core/_constants";

const initialValues = {
  organization_name: "",
  lead_investor: "",
  funding_round: "",
  money_raised: "",
  currencyId: "",
  info: "",
};

const Investments = () => {
  const { formatMessage } = useIntl();
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isAnnouncedDateSorted, setIsAnnouncedDateSorted] = useState(false);
  const [isOrganisationNameSorted, setIsOrganisationNameSorted] =
    useState(false);
  const [isLeadInvestorsSorted, setIsLeadInvestorsSorted] = useState(false);
  const [isFundingRoundSorted, setIsFundingRoundSorted] = useState(false);
  const [isMoneyRaisedSorted, setIsMoneyRaisedSorted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([]);
  const [investments, setInvestments] = useState<any>([]);
  const { id } = useParams();
  const { getDateValue } = useDateFormat();

  const userSchema = Yup.object().shape({
    organization_name: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Organisation Name is required" }))
      .nullable(),
    lead_investor: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Lead Investor is required" }))
      .nullable(),
    info: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Information is required" }))
      .nullable(),
    money_raised: Yup.number()
      .required(formatMessage({ id: "Money Raised is required" }))
      .nullable(),

    funding_round: Yup.string()
      .required(formatMessage({ id: "Funding Round is required" }))
      .nullable(),
    currencyId: Yup.string().required(
      formatMessage({ id: "Currency is required" })
    ),
  });

  let investorInvestments = investments;

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      const {
        data: { data, success, errors },
      } = await addInvestorInvestments(values, Number(id));
      if (success) {
        investorInvestments.push(data.investments);
        setModalShow(false);
        toast.success(formatMessage({ id: "Investment Added successfully" }));
        setLoading(false);
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    let currencyData: DropdownType[] = [];
    const getCurrencies = async () => {
      try {
        const {
          data: { data: currency, success },
        } = await currencies();
        if (success) {
          currencyData = currency.map((curr: any) => {
            return {
              id: curr.currencyId,
              name: `${curr.code} (${curr.symbol}) - ${curr.currency}`,
              value: curr.currencyId,
            };
          });
          setCurrencyOptions([...currencyData]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCurrencies();
  }, []);

  const getInvestments = async () => {
    try {
      const {
        data: { data, success, errors },
      } = await getAllInvestments(Number(id), sortOrder, sortBy);
      if (success) {
        setInvestments(data);
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInvestments();
  }, [id, sortOrder, sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Toaster />
      <div className="g-5 g-xxl-8  create-investor-people company-container">
        <CreateInvestorTabs />
        <div>
          <div className="title-main  ms-8 me-10 mt-7 mb-0  d-flex justify-content-between">
            <h4 className="fw-bold">{formatMessage({ id: "Investments" })}</h4>
            <button
              className="btn btn-primary font-size-13 height-36 d-flex align-items-center"
              onClick={() => setModalShow(true)}
            >
              {formatMessage({ id: "Add Investment" })}
            </button>
          </div>
        </div>
        <div className="mx-8 d-flex flex-column justify-content-between min-height pb-6">
          <div className="table-responsive">
            <table className="table table-row-bordered align-middle gs-0 gy-3 mt-0">
              <thead className="fs-6">
                <tr className="fw-bold text-muted border-bottom-0 ">
                  <th className="min-w-200px table-header ">
                    <div
                      className="border border-color p-3 rounded-1 d-flex justify-content-between"
                      onClick={() => {
                        setIsAnnouncedDateSorted(!isAnnouncedDateSorted);
                        setSortBy("createdAt");
                        isAnnouncedDateSorted
                          ? setSortOrder("ASC")
                          : setSortOrder("DESC");
                      }}
                    >
                      <span className="font-weight-500 font-size-13 text_clr56">
                        <img
                          src={toAbsoluteUrl(
                            "/media/icons/investor/FilterSymbol.svg"
                          )}
                          alt=""
                        />{" "}
                        {formatMessage({ id: "Announced Date" })}
                      </span>
                      <span>
                        {isAnnouncedDateSorted ? (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/UpArrow.svg"
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/DownArrow.svg"
                            )}
                            alt=""
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="min-w-200px table-header ">
                    <div
                      className="border p-3  rounded-1 d-flex justify-content-between"
                      onClick={() => {
                        setIsOrganisationNameSorted(!isOrganisationNameSorted);
                        setSortBy("organization_name");
                        isOrganisationNameSorted
                          ? setSortOrder("ASC")
                          : setSortOrder("DESC");
                      }}
                    >
                      <span className="font-weight-500 font-size-13 text_clr56">
                        {formatMessage({ id: "Organisation Name" })}
                      </span>
                      <span>
                        {isOrganisationNameSorted ? (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/UpArrow.svg"
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/DownArrow.svg"
                            )}
                            alt=""
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="min-w-200px table-header">
                    <div
                      className="border p-3  rounded-1 d-flex justify-content-between"
                      onClick={() => {
                        setIsLeadInvestorsSorted(!isLeadInvestorsSorted);
                        setSortBy("lead_investor");
                        isLeadInvestorsSorted
                          ? setSortOrder("ASC")
                          : setSortOrder("DESC");
                      }}
                    >
                      <span className="font-weight-500 font-size-13 text_clr56">
                        {formatMessage({ id: "Lead Investors" })}
                      </span>
                      <span>
                        {isLeadInvestorsSorted ? (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/UpArrow.svg"
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/DownArrow.svg"
                            )}
                            alt=""
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="min-w-200px table-header ">
                    <div
                      className="border p-3  rounded-1 d-flex justify-content-between"
                      onClick={() => {
                        setIsFundingRoundSorted(!isFundingRoundSorted);
                        setSortBy("funding_round");
                        isFundingRoundSorted
                          ? setSortOrder("ASC")
                          : setSortOrder("DESC");
                      }}
                    >
                      <span className="font-weight-500 font-size-13 text_clr56">
                        {formatMessage({ id: "Funding round" })}
                      </span>
                      <span>
                        {isFundingRoundSorted ? (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/UpArrow.svg"
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/DownArrow.svg"
                            )}
                            alt=""
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="min-w-200px table-header ">
                    <div
                      className="border p-3  rounded-1 d-flex justify-content-between"
                      onClick={() => {
                        setIsMoneyRaisedSorted(!isMoneyRaisedSorted);
                        setSortBy("money_raised");
                        isMoneyRaisedSorted
                          ? setSortOrder("ASC")
                          : setSortOrder("DESC");
                      }}
                    >
                      <span className="font-weight-500 font-size-13 text_clr56">
                        {formatMessage({ id: "Money Raised" })}
                      </span>
                      <span>
                        {isMoneyRaisedSorted ? (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/UpArrow.svg"
                            )}
                            alt=""
                          />
                        ) : (
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/DownArrow.svg"
                            )}
                            alt=""
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="min-w-120px"></th>
                </tr>
              </thead>
              <tbody>
                {!!investorInvestments?.length &&
                  investorInvestments.map((investment: any) => (
                    <tr key={investment.investmentId}>
                      <td className="ps-8">
                        <p className="font-weight-400 text-hover-primary table-body font-size-12 dark_text_color">
                          {getDateValue(investment.createdAt.toString())
                            ? getDateValue(investment.createdAt.toString())
                            : DateTime.fromISO(
                                investment.createdAt.toString()
                              ).toLocaleString(DateTime.DATE_MED)}
                        </p>
                      </td>
                      <td className="ps-8">
                        <p className="font-weight-400 text-hover-primary d-block mb-1 table-body font-size-12 dark_text_color">
                          {investment.organization_name}
                        </p>
                      </td>
                      <td className="ps-8">
                        <p className="font-weight-400 text-hover-primary d-block mb-1 table-body font-size-12 dark_text_color">
                          {investment?.lead_investor
                            ? investment.lead_investor
                            : "-"}
                        </p>
                      </td>
                      <td className="ps-8">
                        <p className="font-weight-400 text-hover-primary d-block mb-1 table-body font-size-12 dark_text_color">
                          {investment.funding_round}
                        </p>
                      </td>
                      <td className="font-weight-400 text-hover-primary table-body ps-8 dark_text_color">
                        <p className="font-size-12">
                          {investment.money_raised}
                        </p>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-light">
                          <img
                            src={toAbsoluteUrl(
                              "/media/icons/investor/threeDots.svg"
                            )}
                            alt=""
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          size="lg"
          show={modalShow}
          onHide={() => setModalShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Modal.Body>
                    <div className="d-flex justify-content-between m-5">
                      <h2>{formatMessage({ id: "Add Investment" })}</h2>
                      <img
                        src={toAbsoluteUrl("/media/icons/investor/Cancel.svg")}
                        alt="cancel"
                        className="cursor-pointer"
                        onClick={() => {
                          setModalShow(false);
                        }}
                      />
                    </div>
                    <div className="col-md-12 col-12 mt-md-0 mt-6">
                      <TextInput
                        fieldType={"text"}
                        label={formatMessage({ id: "Organisation Name" })}
                        fieldName={"organization_name"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Enter Organisation Name",
                        })}
                        margin="me-6"
                        width={16}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTMENT.ORGANISATION_NAME",
                        })}
                      />
                      <TextInput
                        fieldType={"text"}
                        fieldName={"lead_investor"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Enter Lead Investor",
                        })}
                        label={formatMessage({ id: "Lead Investor" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTMENTS.LEAD_INVESTMENT",
                        })}
                      />
                      <SelectInput
                        label={formatMessage({ id: "Funding Round" })}
                        fieldName={"funding_round"}
                        placeholder={formatMessage({
                          id: "Select Funding Round",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTMENTS.FUNDING_ROUND",
                        })}
                        options={designationOptions}
                      />
                      <TextInput
                        fieldType={"number"}
                        fieldName={"money_raised"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Enter Money Raised",
                        })}
                        label={formatMessage({ id: "Money Raised" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTMENT.MONEY_RAISED",
                        })}
                      />
                      <TextInput
                        fieldType={"text"}
                        fieldName={"info"}
                        formik={formik}
                        placeholder={formatMessage({ id: "Enter Information" })}
                        label={formatMessage({ id: "Information" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTMENT.INFORMATION",
                        })}
                      />
                      <SelectInput
                        label={formatMessage({ id: "Select Currency" })}
                        fieldName={"currencyId"}
                        placeholder={formatMessage({
                          id: "Select the currency",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INITIALIZE_ROUND.SELECT_CURRENCY",
                        })}
                        options={currencyOptions}
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <div className="d-flex gap-3 m-5 w-100 justify-content-md-end">
                      <button
                        type="button"
                        className="btn btn-bg-light w-50 w-md-auto font-size-13"
                        onClick={() => {
                          setModalShow(false);
                        }}
                      >
                        {formatMessage({ id: "Cancel" })}
                      </button>
                      <button
                        className="btn btn-primary w-50 w-md-auto font-size-13"
                        disabled={loading}
                      >
                        {!loading && (
                          <span className="indicator-label font-size-13 p-0">
                            {formatMessage({ id: "Add Investment" })}
                          </span>
                        )}
                        {loading && (
                          <span className="indicator-label font-size-13 p-0">
                            {formatMessage({ id: "Please wait..." })}
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        )}
                      </button>
                    </div>
                  </Modal.Footer>
                </Form>
              );
            }}
          </Formik>
        </Modal>
      </div>
    </>
  );
};

export { Investments };
