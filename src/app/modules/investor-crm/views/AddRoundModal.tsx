import { Formik, Form } from "formik";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import TextInput from "../../widgets/components/Input/TextInput";
import { roundInitialValues } from "../../../core/_constants";
import { useInitializeRoundSchema } from "../../../hooks/useInitializeRoundSchema";
import {
  createRound,
  currencies,
  updateRound,
} from "../../onboarding/core/_requests";
import { useAuth } from "../../auth";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import { roundTypeOptions } from "../../onboarding/core/_constants";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import { getActiveRound, getAllRounds } from "../core/_requests";
import { DropdownType } from "../../../core/_models";

export const AddRoundModal = ({
  modalShow,
  setModalShow,
  currency,
  setActiveRound,
  setSelectedRoundId,
  activeRound,
  setAllRounds,
  isEditRound,
}: {
  modalShow: boolean;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  currency: number;
  setActiveRound: any;
  setSelectedRoundId: any;
  activeRound: any;
  setAllRounds: any;
  isEditRound: boolean;
}) => {
  const { companyId } = useAuth();
  const { formatMessage } = useIntl();
  const { AddRoundSchema } = useInitializeRoundSchema();
  const [loading, setLoading] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState<any>();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [formValues, setFormValues] = useState<any>(null);
  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      if (!companyId) {
        throw formatMessage({ id: "Company ID is required." });
      }

      const {
        data: { success, errors },
      } = await createRound(
        values.roundName,
        values.roundType,
        values.amountTargeted,
        values.amountAchieved,
        values.currency,
        companyId as number
      );

      if (success) {
        setLoading(false);
        setModalShow(false);
        getRoundsFromApi();
        getActiveRoundFromApi();
        toast.success(formatMessage({ id: "Round added successfully" }));
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

  const getRoundsFromApi = async () => {
    try {
      if (companyId) {
        const {
          data: { success, data: apiRounds },
        } = await getAllRounds(companyId);
        if (success) {
          setAllRounds(apiRounds);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveRoundFromApi = async () => {
    try {
      if (companyId) {
        const {
          data: { success, data: apiActiveRound },
        } = await getActiveRound(companyId);
        if (success) {
          setLoading(false);

          setActiveRound(apiActiveRound);
          setSelectedRoundId(activeRound?.roundId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCurrencies = async () => {
      let currencyData: DropdownType[] = [];
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
  useEffect(() => {
    if (isEditRound && activeRound && currencyOptions) {
      setFormValues({
        ...roundInitialValues,
        roundName: activeRound.roundName,
        amountTargeted: parseInt(activeRound.amountTargeted),
        amountAchieved: parseInt(activeRound.amountAchieved),
        roundType: activeRound.roundType,
        currency: parseInt(activeRound.currency.currencyId),
      });
    } else if (isEditRound === false) {
      setFormValues(roundInitialValues);
    }
  }, [isEditRound, currencyOptions, activeRound]);

  const onUpdateRound = async (values: any) => {
    try {
      setLoading(true);
      if (!companyId) {
        throw formatMessage({ id: "Company ID is required." });
      }

      const {
        data: { success, errors },
      } = await updateRound(
        values.roundName,
        values.roundType,
        values.amountTargeted,
        values.amountAchieved,
        values.currency,
        companyId as number,
        activeRound.roundId as number
      );

      if (success) {
        setLoading(false);
        setModalShow(false);
        getRoundsFromApi();
        getActiveRoundFromApi();
        toast.success(formatMessage({ id: "Round updated successfully" }));
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
    <Modal
      size="xl"
      show={modalShow}
      onHide={() => setModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="fs-4 fw-bold">
          {isEditRound
            ? formatMessage({ id: "Edit investment round" })
            : formatMessage({ id: "Create new investment round" })}
        </div>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={AddRoundSchema}
          initialValues={formValues || roundInitialValues}
          onSubmit={isEditRound ? onUpdateRound : onSubmit}
          enableReinitialize={true}
        >
          {(formik) => {
            formik.values.currency !== "" &&
              currencyOptions.find((currency: any) => {
                if (currency.id === parseInt(formik.values.currency)) {
                  setSelectedCurrency(currency.name.substring(0, 4));
                  return true;
                }
                return null;
              });
            return (
              <Form className="w-100  d-md-flex flex-md-row d-flex flex-column  col-12">
                <div className=" col-md-6 col-12 ">
                  <div className=" pt-md-1 ">
                    <TextInput
                      fieldType={"text"}
                      label={formatMessage({ id: "Round Name" })}
                      fieldName={"roundName"}
                      placeholder={formatMessage({
                        id: "Enter name of the investment round",
                      })}
                      formik={formik}
                      margin={"me-md-15 "}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.INITIALIZE_ROUND.ROUND_NAME",
                      })}
                      width={11}
                    />
                    <TextInput
                      fieldType={"number"}
                      label={formatMessage({ id: "Amount targeted" })}
                      fieldName={"amountTargeted"}
                      placeholder={`${formatMessage({
                        id: "Enter amount in",
                      })}${selectedCurrency}`}
                      formik={formik}
                      margin={"me-md-15"}
                      width={11}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.INITIALIZE_ROUND.AMOUNT_TARGETED",
                      })}
                    />

                    <SelectInput
                      label={formatMessage({ id: "Round Type" })}
                      fieldName={"roundType"}
                      placeholder={formatMessage({
                        id: "Select the round type",
                      })}
                      formik={formik}
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.INITIALIZE_ROUND.ROUND_TYPE",
                      })}
                      margin={"me-md-14"}
                      options={roundTypeOptions}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 d-md-flex flex-md-column justify-content-between ">
                  <div>
                    <div className="mb-10 pt-1">
                      <SelectInput
                        label={formatMessage({ id: "Select Currency" })}
                        fieldName={"currency"}
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

                    <TextInput
                      fieldType={"number"}
                      label={formatMessage({ id: "Amount achieved" })}
                      fieldName={"amountAchieved"}
                      placeholder={`${formatMessage({
                        id: "Enter amount in",
                      })}${selectedCurrency}`}
                      formik={formik}
                      margin="me-4"
                      toolTipText={formatMessage({
                        id: "GLOBAL.TOOLTIP.INITIALIZE_ROUND.AMOUNT_ACHIEVED",
                      })}
                      width={12}
                      isDisabled={isEditRound}
                    />
                  </div>
                  <div className="mt-20 d-flex justify-content-end me-md-6">
                    <BasicButton
                      buttonText={formatMessage({ id: "Cancel" })}
                      border="none"
                      color="#F5F8FA"
                      textColor="#5E6278"
                      minWidth={90}
                      onClick={() => setModalShow(false)}
                    />

                    <CustomButton
                      isSubmitting={formik.isSubmitting}
                      isValid={formik.isValid}
                      buttonText={formatMessage({ id: "Save" })}
                      loading={loading}
                      width={2}
                      marginButtom={"mb-0 ms-3"}
                      widthLoading={4}
                      height={44}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
