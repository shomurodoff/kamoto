import { Form, Formik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import TextInput from "../../widgets/components/Input/TextInput";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import {
  InvestmentConfirmationInitialValues,
  termSheetStatusValues,
} from "../core/_constants";
import * as Yup from "yup";
import {
  createTransactionApi,
  getInvestorResponseAPI,
} from "../core/_requests";
import { useAuth } from "../../auth";
import TextArea from "../../widgets/components/Input/TextArea";
import { ToolTipUI } from "../../widgets/components/UI/ToolTipUI";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export const InvestmentConfirmationModal = ({
  modalShow,
  setModalShow,
  currency,
  roundId,
  roundName,
  investorId,
  currencyOptions,
  getInvestor,
  getAllColumnsFromRoundId,
  setColumns,
  setCurrentStatus,
  partialStatus,
  getActiveRoundFromApi,
}: {
  modalShow: boolean;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  currency: number;
  roundId: number;
  roundName: string | undefined;
  investorId: number;
  currencyOptions: [];
  getInvestor?: () => void;
  getAllColumnsFromRoundId?: (
    roundId: number,
    search?: string | undefined,
    sort_by_investor?: string | undefined,
    sort_order_investor?: string | undefined
  ) => Promise<AxiosResponse<any, any>>;
  setColumns?: React.Dispatch<any>;
  setCurrentStatus?: Dispatch<SetStateAction<any>>;
  partialStatus?: any;
  getActiveRoundFromApi?: () => void;
}) => {
  const {formatMessage} = useIntl()
  const [loading, setLoading] = useState(false)
  const {personalityId} = useAuth()
  const [formValues, setFormValues] = useState<any>(null)
  const intializeInvestmentConfirmationSchema = Yup.object().shape({
    roundId: Yup.string(),
    amount: Yup.number()
      .moreThan(-1, formatMessage({ id: "Amount Confirmed can't be negative" }))
      .required(formatMessage({ id: "Amount Confirmed is required" }))
      .integer(formatMessage({ id: "Amount Confirmed must be integer" })),

    termSheetStatus: Yup.string().required(
      formatMessage({ id: "Termsheet Status is required" })
    ),
    currencyId: Yup.number(),
    additionalTermsandCoditions: Yup.string(),
  });
  useEffect(() => {
    if (currency) {
      setFormValues({
        ...InvestmentConfirmationInitialValues,
        currencyId: currency,
      });
    } else {
      setFormValues({
        ...InvestmentConfirmationInitialValues,
        currencyId: "",
      });
    }
  }, [currency]);

  useEffect(() => {
    const getInvestorResponse = async () => {
      if (roundId && investorId) {
        const {
          data: { data: responseData, success },
        } = await getInvestorResponseAPI(investorId, roundId);
        if (success && responseData) {
          if (currency) {
            setFormValues({
              ...InvestmentConfirmationInitialValues,
              additionalTermsandCoditions:
                responseData.additionalTermsandCoditions || "",
              amount: +responseData.amount,
              roundId: responseData.roundId,
              termSheetStatus: responseData.termSheetStatus || "",
              currencyId: currency,
            });
          } else {
            setFormValues({
              ...InvestmentConfirmationInitialValues,
              additionalTermsandCoditions:
                responseData.additionalTermsandCoditions,
              amount: responseData.amount,
              roundId: responseData.roundId,
              termSheetStatus: responseData.termSheetStatus,
              currencyId: "",
            });
          }
        }
      }
    };
    getInvestorResponse();
  }, [investorId, roundId, modalShow]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: any) => {
    try {
      setLoading(true)
      if (!personalityId) {
        throw formatMessage({id: 'Company ID is required.'})
      }
      values.roundId = +roundId;
      values.currencyId = currency;
      values.investorId = investorId;
      const {
        data: { success, errors },
      } = await createTransactionApi(values);
      if (success) {
        setLoading(false);
        if (getInvestor) {
          getInvestor();
        }
        if (getActiveRoundFromApi) {
          getActiveRoundFromApi();
        }
        if (getAllColumnsFromRoundId) {
          const {
            data: { success, data: allColumns },
          } = await getAllColumnsFromRoundId(roundId);
          if (success) {
            setColumns!(allColumns);
          }
        }
        if (partialStatus && setCurrentStatus) {
          setCurrentStatus(partialStatus);
        }

        setModalShow(false);
        toast.success(formatMessage({ id: "Investor confirmation done" }));
      } else {
        setLoading(false);
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <div className="fs-4 fw-bold">
            {formatMessage({ id: "Investment Confirmation Details" })}
          </div>
        </Modal.Header>
        <Formik
          validationSchema={intializeInvestmentConfirmationSchema}
          initialValues={formValues || InvestmentConfirmationInitialValues}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Modal.Body>
                  <div className="row d-md-flex justify-content-between">
                    <div className="col-md-6">
                      <div className="fv-row mb-7">
                        <label className="form-label font-size-13 text-dark text-capitalize ms-3 ms-md-0">
                          {formatMessage({ id: "Round Name" })}*{" "}
                          <ToolTipUI
                            tooltipText={formatMessage({
                              id: "GLOBAL.TOOLTIP.INITIALIZE_ROUND.ROUND_TYPE",
                            })}
                          />
                        </label>
                        <select
                          disabled
                          className="form-select form-select-lg  h-40px font-size-13"
                          placeholder="select Round"
                        >
                          <option value={roundId}>{roundName}</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
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
                        disabled={!!currency}
                      />
                    </div>
                  </div>
                  <div className="row d-md-flex justify-content-between">
                    <div className="col-md-6">
                      <TextInput
                        fieldType={"number"}
                        label={formatMessage({ id: "Amount Confirmed" })}
                        fieldName={"amount"}
                        placeholder={formatMessage({ id: "Enter amount in" })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTOR.AMOUNT_CONFIRMED",
                        })}
                      />
                    </div>
                    <div className="col-md-6">
                      <SelectInput
                        label={formatMessage({ id: "Termsheet Status" })}
                        fieldName={"termSheetStatus"}
                        placeholder={formatMessage({
                          id: "Select Termsheet Status",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTOR.TERMSHEET_STATUS",
                        })}
                        options={termSheetStatusValues}
                      />
                    </div>
                  </div>
                  <div>
                    <TextArea
                      fieldName={"additionalTermsandCoditions"}
                      formik={formik}
                      placeholder={formatMessage({
                        id: "Any Additional Terms & Conditions?",
                      })}
                      label={formatMessage({
                        id: "Any Additional Terms & Conditions?",
                      })}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.INVESTOR.ANY_ADDITIONALDETAILS",
                      })}
                      isTooltipNotRequired={true}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="w-100 d-flex justify-content-md-end justify-content-around">
                    <BasicButton
                      buttonText={formatMessage({ id: "Cancel" })}
                      onClick={() => setModalShow(false)}
                      border="none"
                      color="#F5F8FA"
                      textColor="#5E6278"
                      height="44"
                      padding="12px 22px"
                      minWidth={90}
                    />
                    <CustomButton
                      isSubmitting={formik.isSubmitting}
                      isValid={formik.isValid}
                      buttonText={formatMessage({ id: "Confirm" })}
                      loading={loading}
                      width={2}
                      marginButtom={"mb-0 ms-3"}
                      widthLoading={4}
                      height={44}
                    />
                  </div>
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};
