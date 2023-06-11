import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import { SelectInput } from "../../widgets/components/Input/SelectInput";
import {
  dateFormatOptions,
  localeInitialValues,
  localeOptions,
  timeFormatOptions,
  timeStampOptions,
  timeZoneOptions,
} from "../core/_constants";
import { CustomButton } from "../../widgets/components/UI/CustomButton";
import { createLocale, getLocale } from "../core/_requests";
import { useAuth } from "../../auth";
import { toast } from "react-toastify";
import { Spinner } from "../../widgets/components/General/Spinner";
import { getCompanyMetaIdType } from "../core/_models";
import { getLocaleData } from "../../../../_metronic/partials/layout/core/_requests";
import SearchInput from "./SearchInput";

const localSchema = Yup.object().shape({
  locale: Yup.string(),
  timezone: Yup.string(),
  dateFormat: Yup.string(),
  timeFormat: Yup.string(),
  timestampFormat: Yup.string(),
});

export const Locale = ({ key, getLocaleApiLoading }: any) => {
  const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || "i18nConfig";
  const { currentUser } = useAuth();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);
  const onSubmit = async (values: {
    locale: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    timestampFormat: string;
  }) => {
    try {
      setLoading(true);
      const allpromises: any[] = [
        createLocale(
          "dateFormat",
          values.dateFormat,
          currentUser?.personality[0].personalityId
        ),
        createLocale(
          "locale",
          values.locale,
          currentUser?.personality[0].personalityId
        ),
        createLocale(
          "timeFormat",
          values.timeFormat,
          currentUser?.personality[0].personalityId
        ),
        createLocale(
          "timezone",
          values.timezone,
          currentUser?.personality[0].personalityId
        ),
        createLocale(
          "timestampFormat",
          values.timestampFormat,
          currentUser?.personality[0].personalityId
        ),
      ];

      const data = await Promise.all(allpromises);

      if (data) {
        const {
          data: { success, data },
        } = await getLocale();
        if (success) {
          data.map(({ key, value }: getCompanyMetaIdType) => {
            return (localeInitialValues[key] = value);
          });
          setLoading(false);
          toast.success(formatMessage({ id: "Locale updated successfully" }));
          Locale();
        }
      }
    } catch (err) {
      toast.error(formatMessage({ id: "Locale updated Failed" }));
    }
  };

  const Locale = async () => {
    try {
      const {
        data: { data, success },
      } = await getLocaleData();
      if (success) {
        data.forEach((e: any) => {
          if (e.key === "locale") {
            if (e.value === "fr_FR") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "fr" })
                );
              }
            } else if (e.value === "de_GN") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "de" })
                );
              }
            } else if (e.value === "en_US") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "en" })
                );
              }
            } else if (e.value === "es_ES") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "es" })
                );
              }
            } else if (e.value === "zh_CN") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "zh" })
                );
              }
            } else if (e.value === "hi_HI") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "hi" })
                );
              }
            } else if (e.value === "bn_BN") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "bn" })
                );
              }
            } else if (e.value === "it_IT") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "it" })
                );
              }
            } else if (e.value === "ko_KO") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "ko" })
                );
              }
            } else if (e.value === "pt_PT") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "pt" })
                );
              }
            } else if (e.value === "ru_RU") {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "ru" })
                );
              }
            } else {
              if (status) {
                setStatus(false);
                localStorage.setItem(
                  I18N_CONFIG_KEY,
                  JSON.stringify({ selectedLang: "ja" })
                );
              }
            }
          } else if (e.key === "dateFormat") {
            localStorage.setItem("dateFormat", e.value);
          } else if (e.key === "timeFormat") {
            localStorage.setItem("timeFormat", e.value);
          } else if (e.key === "timezone") {
            localStorage.setItem("timeZone", e.value);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <SearchInput />
      {getLocaleApiLoading ? <Spinner /> : null}
      <div
        className={
          "bg-[#171825] md:px-[50px] px-[16px] py-[16px] md:pb-[40px] shadow-default rounded"
        }
      >
        <div className={"col-span-12 md:col-span-6 text-[#FFFFFFCC]"}>
          <h3 className={"text-[16px] leading-[22px] font-medium mb-[8px]"}>
            Locale Setting
          </h3>
        </div>
        <Formik
          initialValues={localeInitialValues}
          validationSchema={localSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className={"max-w-4xl"}>
                  <div className="grid grid-cols-12 gap-x-[32px]">
                    <div className={"col-span-12 md:col-span-6"}>
                      <SelectInput
                        label={formatMessage({ id: "Locale" })}
                        fieldName={"locale"}
                        placeholder={formatMessage({ id: "Select the Locale" })}
                        formik={formik}
                        options={localeOptions}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.LOCALE.LOCALE",
                        })}
                      />
                    </div>
                    <div className={"col-span-12 md:col-span-6"}>
                      <SelectInput
                        label={formatMessage({ id: "Time Zone" })}
                        fieldName={"timezone"}
                        placeholder={formatMessage({
                          id: "Select the Time Zone",
                        })}
                        formik={formik}
                        options={timeZoneOptions}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.LOCALE.TIME_ZONE",
                        })}
                      />
                    </div>
                    <div className={"col-span-12 md:col-span-6"}>
                      <SelectInput
                        label={formatMessage({ id: "Date Format" })}
                        fieldName={"dateFormat"}
                        placeholder={formatMessage({
                          id: "Select the Date Format",
                        })}
                        formik={formik}
                        options={dateFormatOptions}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.LOCALE.DATE_FORMAT",
                        })}
                      />
                    </div>
                    <div className={"col-span-12 md:col-span-6"}>
                      <SelectInput
                        label={formatMessage({ id: "Time Format" })}
                        fieldName={"timeFormat"}
                        placeholder={formatMessage({
                          id: "Select the Time Format",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.LOCALE.TIME_FORMAT",
                        })}
                        options={timeFormatOptions}
                      />
                    </div>
                    <div className={"col-span-12 md:col-span-6"}>
                      <SelectInput
                        label={formatMessage({ id: "Timestamp Format" })}
                        fieldName={"timestampFormat"}
                        placeholder={formatMessage({
                          id: "Select the Timestamp Format",
                        })}
                        formik={formik}
                        toolTipText={formatMessage({
                          id: "GLOBAL.TOOLTIP.LOCALE.TIME_FORMAT",
                        })}
                        options={timeStampOptions}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end md:mt-[135px]">
                  <div className={"flex-grow md:flex-grow-0"}>
                    <CustomButton
                      isSubmitting={formik.isSubmitting}
                      isValid={formik.isValid}
                      buttonText={formatMessage({ id: "Save Changes" })}
                      loading={loading}
                      customClass={"w-full md:w-auto"}
                      height={44}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
