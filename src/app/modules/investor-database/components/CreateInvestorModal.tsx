import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import TextInput from "../../widgets/components/Input/TextInput";
import { ToolTipUI } from "../../widgets/components/UI/ToolTipUI";
import { investorType } from "../core/_constants";
import Select from "react-select";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import {
  createInvestor,
  getActiveRound,
  getAddToCRMData,
} from "../core/_requests";
import { toast } from "react-toastify";
import { useAuth } from "../../auth";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: '',
  contact_name: '',
  email: '',
}
export const CreateInvestorModal = ({showModal, setShowModal}: any) => {
  const {formatMessage} = useIntl()
  const [investorsType, setInvestorsType] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [addCRMToggle, setAddCRMToggle] = useState(false)
  const [fundTypeError, setFundTypeError] = useState(false)
  const {personalityId} = useAuth()
  const [roundId, setRoundId] = useState<number>()
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()

  const userSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Investor name is required" }))
      .nullable(),
    contact_name: Yup.string()
      .min(1, formatMessage({ id: "Minimum 1 character is required" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Contact name is required" }))
      .nullable(),
    email: Yup.string()
      .email(formatMessage({ id: "Invalid email format" }))
      .max(50, formatMessage({ id: "Maximum 50 characters" }))
      .required(formatMessage({ id: "Email is required" })),
  });

  useEffect(() => {
    const activeRound = async () => {
      try {
        const {
          data: {data, success, errors},
        } = await getActiveRound(personalityId)
        if (success) {
          setRoundId(data?.roundId);
        } else {
          errors.forEach((error: string) => {
            toast.error(formatMessage({ id: error }));
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    activeRound()
  }, [personalityId]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: any) => {
    setLoading(true);
    setStatus(true);
    try {
      let fund_type = investorsType.map((e: any) => e.value);

      if (fund_type.length > 0) {
        const payload = {
          ...values,
          fund_type,
        };
        const {
          data: { data, success, errors },
        } = await createInvestor(payload);
        if (success) {
          setShowModal(false);
          setLoading(false);
          toast.success(formatMessage({ id: "Investor added successfully" }));
          navigate(
            `/investor-database/individual-investor/${data?.investorId}`
          );
          if (addCRMToggle) {
            try {
              const {
                data: { success, errors },
              } = await getAddToCRMData({
                roundId: roundId,
                investorId: Number(data.investorId),
                isFavourite: false,
              });
              if (success) {
                toast.success(
                  formatMessage({
                    id: "Investor added to CRM in current round",
                  })
                );
              } else {
                errors.forEach((error: string) => {
                  toast.error(formatMessage({ id: error }));
                });
              }
            } catch (err) {
              console.log(err);
            }
          }
        } else {
          setLoading(false);
          errors.forEach((error: string) => {
            toast.error(formatMessage({ id: error }));
          });
        }
      } else {
        setFundTypeError(true);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    if (status && investorsType.length === 0) {
      setFundTypeError(true);
    } else {
      setFundTypeError(false);
    }
  }, [investorsType, status]);
  return (
    <>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setAddCRMToggle(false);
          setStatus(false);
          setLoading(false);
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2>{formatMessage({ id: "Create Investor" })}</h2>
        </Modal.Header>{" "}
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Modal.Body>
                  <div className="d-md-flex col-md-12 flex-wrap w-100 m-auto justify-content-center">
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "Investor Name" })}
                      fieldName={"name"}
                      formik={formik}
                      placeholder={formatMessage({
                        id: "Enter Investor's Name",
                      })}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.GENERAL.INVESTOR_NAME",
                      })}
                      margin="me-6"
                      width={5}
                      isStarRequired={true}
                    />
                    <div className="me-6 multi-select">
                      <label className="text-dark text-capitalize font-size-13 form-label ">
                        {formatMessage({ id: "Investors Type*" })}
                      </label>
                      <ToolTipUI
                        tooltipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.HIGHLIGHTS.INVESTOR_TYPE",
                        })}
                      />
                      <div className=" highlight-multi-select font-size-12 text-bold">
                        <Select
                          isMulti
                          name="investorsType"
                          options={investorType}
                          className="basic-multi-select mb-7 mb-md-0 custom-select"
                          onChange={(investorsType) =>
                            setInvestorsType(investorsType)
                          }
                          placeholder={formatMessage({
                            id: "Choose Investor type",
                          })}
                          classNamePrefix="react-select"
                          required={true}
                        />
                      </div>
                      {fundTypeError && (
                        <span className="text-danger font-size-13">
                          {formatMessage({ id: "Fund Type is Required" })}
                        </span>
                      )}
                    </div>
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "Contact Name" })}
                      fieldName={"contact_name"}
                      formik={formik}
                      placeholder={formatMessage({ id: "Enter Contact Name" })}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.GENERAL.CONTACT_NAME",
                      })}
                      margin="me-6"
                      width={5}
                      isStarRequired={true}
                    />
                    <TextInput
                      fieldType={"email"}
                      fieldName={"email"}
                      formik={formik}
                      placeholder={formatMessage({ id: "Enter Email" })}
                      label={formatMessage({ id: "Contact Email ID" })}
                      width={5}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.PEOPLE.EMAIL",
                      })}
                      isStarRequired={true}
                    />
                    <div className="form-check form-switch form-switch-md form-check-custom form-check-solid toggle-width">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        name="notifications"
                        onChange={() => setAddCRMToggle(!addCRMToggle)}
                      />
                      <label className="form-check-label font-size-13">
                        {formatMessage({
                          id: "Also, add this investor to CRM",
                        })}
                      </label>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                  <button
                    type="button"
                    className="btn btn-light font-size-13 font-weight-400"
                    onClick={() => {
                      setShowModal(false);
                      setAddCRMToggle(false);
                      setStatus(false);
                      setLoading(false);
                    }}
                  >
                    {formatMessage({ id: "Cancel" })}
                  </button>
                  <CustomButton
                    isSubmitting={formik.isSubmitting}
                    isValid={formik.isValid}
                    buttonText={formatMessage({ id: "Create Investor" })}
                    loading={loading}
                    widthLoading={2}
                    width={2}
                    margin={"me-5 mt-5"}
                  />
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};
