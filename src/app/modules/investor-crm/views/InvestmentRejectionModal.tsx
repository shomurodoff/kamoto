import { Form, Formik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import TextArea from "../../widgets/components/Input/TextArea";
import TextInput from "../../widgets/components/Input/TextInput";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import {
  InvestmentRejectionInitialValues,
  rejectionReasons,
} from "../core/_constants";
import {
  getInvestorResponseAPI,
  rejectTransactionApi,
} from "../core/_requests";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

export const InvestmentRejectionmModal = ({
  modalRejectShow,
  setModalRejectShow,
  roundId,
  investorId,
  investorUsers,
  getAllColumnsFromRoundId,
  setColumns,
  getInvestor,
  setCurrentStatus,
  partialStatus,
  refreshRound,
  getActiveRoundFromApi,
  setRefreshRound,
}: {
  modalRejectShow: boolean;
  setModalRejectShow: Dispatch<SetStateAction<boolean>>;
  roundId: number;
  investorId: number;
  investorUsers: [any];
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
  refreshRound?: boolean;
  getActiveRoundFromApi?: () => void;
  setRefreshRound?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [whoRejected, setWhoRejected] = useState<any>();
  const [formValues, setFormValues] = useState<any>(null);

  const intializeInvestmentRejectionSchema = Yup.object().shape({
    rejectReason: Yup.string().required(
      formatMessage({ id: "Rejection reason is required" })
    ),
    investorUserId: Yup.string().required(
      formatMessage({ id: "Contact person who rejected is required" })
    ),
    rejectDate: Yup.date()
      .required(formatMessage({ id: "Rejection Date required" }))
      .nullable(),
    contactAgainDate: Yup.date()
      .required(formatMessage({ id: "When To Contact Again" }))
      .nullable(),
    feedBackDetailReason: Yup.string(),
  });

  useEffect(() => {
    const getInvestorResponse = async () => {
      if (roundId && investorId) {
        const {
          data: { data: responseData, success },
        } = await getInvestorResponseAPI(investorId, roundId);
        if (success && responseData) {
          setFormValues({
            ...InvestmentRejectionInitialValues,
            contactAgainDate: responseData.contactAgainDate || "",
            feedBackDetailReason: responseData.feedBackDetailReason || "",
            investorUserId: responseData.investorUserId || "",
            rejectDate: responseData.rejectDate || "",
            rejectReason: responseData.rejectReason || "",
          });
        }
      }
    };
    getInvestorResponse();
  }, [investorId, roundId, modalRejectShow]);

  useEffect(() => {
    if (investorUsers?.length > 0) {
      const inverstorUserUpdated = investorUsers.map((investorUser) => {
        return {
          id: investorUser.investorUserId,
          name: investorUser.name,
          value: investorUser.investorUserId,
        };
      });
      setWhoRejected(inverstorUserUpdated);
    }
  }, [investorUsers]);

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      values.roundId = +roundId;
      values.investorId = investorId;

      const {
        data: { success, errors },
      } = await rejectTransactionApi({
        ...values,
        investorUserId: +values.investorUserId,
      });
      if (success) {
        setLoading(false);
        if (getInvestor) {
          getInvestor();
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
        if (refreshRound && getActiveRoundFromApi && setRefreshRound) {
          setRefreshRound(false);
          getActiveRoundFromApi();
        }
        setModalRejectShow(false);
        toast.success(formatMessage({ id: "Investor Rejected successfully" }));
      } else if (errors) {
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
        show={modalRejectShow}
        onHide={() => setModalRejectShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <div className="fs-4 fw-bold">
            {formatMessage({ id: "Investment Rejection Details" })}
          </div>
        </Modal.Header>
        <Formik
          validationSchema={intializeInvestmentRejectionSchema}
          initialValues={formValues || InvestmentRejectionInitialValues}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Modal.Body>
                  <div className="row d-md-flex justify-content-between">
                    <div className="col-md-6">
                      <SelectInput
                        label={formatMessage({ id: "Rejection reason" })}
                        fieldName={"rejectReason"}
                        placeholder={formatMessage({
                          id: "Select Cancellation reason",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTOR.REJECTION_REASON",
                        })}
                        options={rejectionReasons}
                      />
                    </div>
                    <div className="col-md-6">
                      <SelectInput
                        label={formatMessage({
                          id: "Contact person who rejected",
                        })}
                        fieldName={"investorUserId"}
                        placeholder={formatMessage({
                          id: "Select the contact name who said no",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTOR.REJECTION_REASON",
                        })}
                        options={whoRejected}
                      />
                    </div>
                  </div>
                  <div className="row d-md-flex justify-content-between">
                    <div className="col-md-6">
                      <TextInput
                        fieldType={"date"}
                        fieldName={"rejectDate"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Select rejection date",
                        })}
                        label={formatMessage({ id: "Rejection Date" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTOR.REJECTION_DATE",
                        })}
                        isStarRequired={true}
                      />
                    </div>
                    <div className="col-md-6">
                      <TextInput
                        fieldType={"date"}
                        fieldName={"contactAgainDate"}
                        formik={formik}
                        placeholder={formatMessage({
                          id: "Select contact date",
                        })}
                        label={formatMessage({ id: "When to contact again" })}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.INVESTOR.REJECTION_DATE",
                        })}
                        isStarRequired={true}
                      />
                    </div>
                  </div>
                  <div>
                    <TextArea
                      fieldName={"feedBackDetailReason"}
                      formik={formik}
                      placeholder={formatMessage({
                        id: "Feedback or detailed reason",
                      })}
                      label={formatMessage({
                        id: "Feedback or detailed reason",
                      })}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.INVESTOR.FEEDBACK_OR_DETAIL_REASON",
                      })}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="d-flex justify-content-md-end justify-content-around">
                    <BasicButton
                      buttonText={formatMessage({ id: "Cancel" })}
                      onClick={() => setModalRejectShow(false)}
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
