import { Formik, Form } from "formik";
import React, { useState } from "react";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import TextInput from "../../widgets/components/Input/TextInput";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { InfoCard } from "../../widgets/components/UI/InfoCard";
import { useIntl } from "react-intl";
import { createPersonality, createRound } from "../core/_requests";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { roundTypeOptions } from "../core/_constants";
import { toast } from "react-toastify";
import { Toaster } from "../../widgets/components/General/Toaster";
import { useInitializeRoundSchema } from "../../../hooks/useInitializeRoundSchema";
import { roundInitialValues } from "../../../core/_constants";
import { useCurrency } from "../../../hooks/useCurrency";
import TextArea from "../../widgets/components/Input/TextArea";
import { verifyToken } from "../../auth/core/_requests";

export const InitializeRound = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const {  storePersonalityId, setCurrentUser,personalityId, onboardingData,setOnboardingData } = useAuth();
  const { intializeRoundSchema } = useInitializeRoundSchema();
  const { currencyOptions } = useCurrency();

  const onSubmit = async (values: any) => {
    let onboarding = {...onboardingData, ...values}
    setOnboardingData(onboarding)

    // navigate("/onboarding/team-members");
    try {
      // const chargebeePlanId = `${selected}-${currencyBill}-${currentState}`;

      const {
        data: { data, success, errors },
      } = await createPersonality(
        values.personalityName,
        values.industry,
        values.country,
        values.state,
        values.logoId,
        onboarding.chagebeePlanId,
        onboarding.description,
        onboarding.personalityType
      );
      if (success) {
        setLoading(false);
        const {
          data: { success, data: value },
        } = await verifyToken(data.token);
        if (success) {
          setOnboardingData(null)
          setCurrentUser({ ...value });
          storePersonalityId(data.personalityId);
          setTimeout(() => {
            navigate("/dashboard");
          });
        }
      } else {
        errors.forEach((error: string) => {
          toast.error(formatMessage({ id: error }));
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <Toaster />
      <Formik
        // validationSchema={intializeRoundSchema}
        initialValues={onboardingData}
        onSubmit={onSubmit}
      >
        {(formik) => {
          formik.values.currency !== "" &&
            currencyOptions.some((currency: any) => {
              if (currency.id === parseInt(formik.values.currency)) {
                setSelectedCurrency(currency.name.substring(0, 4));
                return true;
              }
              return null;
            });

          return (
            <Form className="text-[#FFFFFFCC] grid grid-cols-12 md:gap-x-[32px] gap-y-[40px]">
              <div className={"col-span-12 font-medium"}>
                <h1
                  className={
                    "text-[14px] md:text-[22px] leading-[20px] md:leading-[32px] mb-2"
                  }
                >
                  Give us some details & background about this AI personality
                </h1>
                <p
                  className={
                    "text-[13px] md:text-[16px] leading-5 text-[#A8B3BF] font-medium md:font-semibold"
                  }
                >
                  This will help this AI personality behave in the way you want.
                </p>
              </div>
              <div className={"col-span-12 md:col-span-6"}>
                <TextInput
                  fieldType={"text"}
                  label={formatMessage({ id: "Personality’s Name" })}
                  fieldName={"personalityName"}
                  placeholder={formatMessage({
                    id: "Enter Personality’s Name",
                  })}
                  formik={formik}
                  toolTipText={formatMessage({
                    id: "GLOBAL.TOOLTIP.INITIALIZE_ROUND.ROUND_NAME",
                  })}
                />
                <SelectInput
                  label={formatMessage({ id: "Personality Type" })}
                  fieldName={"personalityType"}
                  placeholder={formatMessage({ id: "Select Personality Type" })}
                  formik={formik}
                  toolTipText={formatMessage({
                    id: "GLOBAL.TOOLTIP.INITIALIZE_ROUND.ROUND_TYPE",
                  })}
                  margin={"me-md-14"}
                  options={[
                    {
                      name: "Actor",
                      value: "actor",
                    },
                    {
                      name: "Gamer",
                      value: "gamer",
                    },
                    {
                      name: "Comedian",
                      value: "comedian",
                    },
                  ]}
                />
                <TextArea
                  fieldName={"description"}
                  label={formatMessage({ id: "Description" })}
                  toolTipText={formatMessage({
                    id: "GLOBAL.TOOLTIP.INITIALIZE_ROUND.ROUND_TYPE",
                  })}
                  formik={formik}
                  placeholder={formatMessage({
                    id: "Write a paragraph describing who your character is",
                  })}
                />
                <p className={"font-[12px] leading-[18px] text-[#FFFFFFA6]"}>
                  <span className={"text-[#FFFFFFCC] font-semibold"}>
                    Note:
                  </span>{" "}
                  There are tons of customizations options available for the AI
                  personality fine-tuning, you can edit the above fields along
                  with others later.
                </p>
              </div>
              <div className={"col-span-12 md:col-span-6"}>
                <InfoCard
                  title={formatMessage({ id: "What is a funding round?" })}
                  desc={formatMessage({
                    id: "Funding round details in Foundercrate is needed to initialize the Investor CRM & keep the targeted investors at one place.",
                  })}
                  slug={"#"}
                />
              </div>
              <div className={"col-span-12 flex justify-end"}>
                <div className={"w-full md:w-auto"}>
                  <CustomButton
                    isSubmitting={formik.isSubmitting}
                    isValid={formik.isValid}
                    buttonText={formatMessage({ id: "Continue" })}
                    loading={loading}
                    width={2}
                    customClass={"!w-full md:w-auto"}
                    widthLoading={4}
                    height={44}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
