import React, { useEffect, useState } from "react";
import { SelectInput } from "../Input/SelectInput";
import { useIntl } from "react-intl";
import { getLocation, state } from "../../../onboarding/core/_requests";
import { StateModel } from "../../../onboarding";

export const State = ({
  countryId,
  formik,
  initialValues,
  tooltipText,
}: {
  initialValues: any;
  countryId: string | undefined;
  formik: any;
  tooltipText: string;
}) => {
  const [stateOptions, setstateOptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchState = async () => {
      try {
        if (!countryId) {
          return;
        }
        const [
          ipStackData,
          {
            data: { data: stateApi, success },
          },
        ] = await Promise.all([getLocation(), state(countryId!)]);
        if (success) {
          const stateData = stateApi.map((state: any) => {
            return {
              id: state.stateId,
              name: state.state_name,
              value: state.stateId,
            };
          });
          setstateOptions([...stateData]);
          const state = stateApi.find(
            (state: StateModel) =>
              state.state_name === ipStackData.data.region_name
          );
          if (state) {
            initialValues.state = state.stateId;
          }
        }
      } catch (err) {
        const {
          data: { success, data: states },
        } = await state(countryId!);
        if (success) {
          const stateData = states?.map((state: any) => {
            return {
              id: state.stateId,
              name: state.state_name,
              value: state.stateId,
            };
          });
          setstateOptions([...stateData]);
        }
      }
    };
    fetchState();
  }, [countryId]); // eslint-disable-line react-hooks/exhaustive-deps
  const { formatMessage } = useIntl();
  return (
    <SelectInput
      label={formatMessage({ id: "State/Province" })}
      fieldName={"state"}
      placeholder={formatMessage({ id: "Select Your State or Province" })}
      formik={formik}
      toolTipText={tooltipText}
      options={stateOptions}
      width={12}
    />
  );
};
