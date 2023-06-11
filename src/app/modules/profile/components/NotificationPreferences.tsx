import { useIntl } from "react-intl";
import "../styles/index.scss";
import { ToolTipUI } from "../../widgets/components/UI/ToolTipUI";
import { EmailPreferencesInput, EmailPreferencesOutput } from "../core/_constants";
import {
  EmailPreferencesInputType,
  EmailPreferencesOutputType,
} from "../core/_models";
import { Dispatch, SetStateAction, useState, useEffect, memo } from "react";
import { createEmailPreferences, getEmailPreferences } from "../core/_requests";
import { useAuth } from "../../auth";
import { toast } from "react-toastify";
import { Spinner } from "../../widgets/components/General/Spinner";
import { BasicButton } from "../../widgets/components/UI/BasicButton";
import SearchInput from "./SearchInput";

const NotificationPreferencesComponent = (
) => {
  const [loading, setLoading] = useState(false);
  const [getPreferencesApiLoading, setGetPreferencesApiLoading] = useState(false);
  const [getPreferences, setGetPreferences] = useState(EmailPreferencesOutput);

  const { personalityId } = useAuth();

  const handleToogle = (id: number, checked: boolean) => {
    let newGetPreferences:Array<EmailPreferencesOutputType> = getPreferences.map((preference: EmailPreferencesOutputType) => {
      if (preference.id == id) {
       return {...preference, value: checked}
      } else {
        return preference
      }
    });
    setGetPreferences(newGetPreferences)
  };

  useEffect(() => {
    const getApiEmailPreferences = async () => {
      try {
          setGetPreferencesApiLoading(true);
          const {
            data: {
              data: { value },
              success,
              errors,
            },
          } = await getEmailPreferences();
          if (success) {
            setGetPreferencesApiLoading(false);
            let newGetPreferences = getPreferences.map((item)=>{
              if(value[item.title]!==null){
                return {...item, value: value[item.title]}
              }else {
                return item
              }
            })
            setGetPreferences(newGetPreferences);
          } else {
            setGetPreferencesApiLoading(false);
            errors.forEach((error: string) => {
              toast.error(formatMessage({ id: error }));
            });
          }
      } catch (err) {
        setGetPreferencesApiLoading(false);
        console.log(err);
      }
    };
    getApiEmailPreferences();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const handleSumbit = async () => {
    try {
      setLoading(true);
      if (personalityId) {
        let obj:{[key: string]: boolean;} = {}
        getPreferences.forEach((item)=>{
          obj[item.title] = item.value
        })
        const {
          data: { success, errors },
        } = await createEmailPreferences(
          JSON.stringify(obj),
        );
        if (success) {
          const {
            data: {
              data: { value },
              success,
            },
          } = await getEmailPreferences();
          if (success) {
            let newGetPreferences = getPreferences.map((item)=>{
              if(value[item.title]!==null){
                return {...item, value: value[item.title]}
              }else {
                return item
              }
            })
            setGetPreferences(newGetPreferences);
          }
          setLoading(false);
          toast.success(
            formatMessage({ id: "Preferences updated successfully" })
          );
        } else {
          setLoading(false);
          errors.forEach((error: string) => {
            toast.error(formatMessage({ id: error }));
          });
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const { formatMessage } = useIntl();
  interface TooltipObj {
    [key: number]: string;
  }
  const tooltipObj: TooltipObj = {
    1: "GLOBAL.TOOLTIP.NOTIFICATIONS.SUCCESSFULPAYMENTS",
    2: "GLOBAL.TOOLTIP.NOTIFICATIONS.NEW_INVESTOR_UPDATE",
    3: "GLOBAL.TOOLTIP.NOTIFICATIONS.FEE_COLLECTION",
    4: "GLOBAL.TOOLTIP.NOTIFICATIONS.CUSTOMER_PAYMENT_DISPUTE",
    5: "GLOBAL.TOOLTIP.NOTIFICATIONS.REFUND_DETAILS",
    6: "GLOBAL.TOOLTIP.NOTIFICATIONS.INVOICE_PAYMENT",
    7: "GLOBAL.TOOLTIP.NOTIFICATIONS.BILLING UPDATES",
    8: "GLOBAL.TOOLTIP.NOTIFICATIONS.NEW_TEAM_MEMBERS",
    9: "GLOBAL.TOOLTIP.NOTIFICATIONS.COMPLETED_INVESTMENTS",
    10: "GLOBAL.TOOLTIP.NOTIFICATIONS.NEWSLETTERS",
  };

  return (
    <>
      <SearchInput />
      {getPreferencesApiLoading ? <Spinner /> : null}
      <div className="!bg-[#171825] md:px-[50px] px-[16px] py-[16px] md:pb-[40px] shadow-default rounded text-[#FFFFFFCC] company-container">
        <h3 className={"text-[16px] leading-[22px] font-medium mb-[8px]"}>
          {formatMessage({ id: "Notification Preferences" })}
        </h3>
        {EmailPreferencesInput.map(
          (
            { id, title, subtitle }: EmailPreferencesInputType,
            index: number
          ) => (
            <div className="border-bottom" key={id}>
              <form className="form-check  foΩrm-check-custom form-check-solid form-check-primary form-switch flex items-center gap-x-[8px]">
                <div>
                  <input
                    className="form-check-input flex-grow !w-[45px]"
                    type="checkbox"
                    id={id.toString()}
                    name="model.app.sidebar.default.minimize.desktop.hoverable"
                    checked={
                      getPreferences && getPreferences[index]?.value
                    }
                    onChange={(e) => {
                      handleToogle(id, e.target.checked);
                    }}
                  />
                </div>
                <div className="d-flex flex-column justify-content-end py-[4px] md:py-2">
                  <div className="d-flex">
                    <div>
                      <label
                        className="text-[13px] leading-5 text-[#FFFFFFCC] font-semibold"
                        htmlFor={id.toString()}
                        data-bs-toggle="tooltip"
                        data-kt-initialized="1"
                      >
                        {title}
                      </label>
                    </div>
                    <div>{<ToolTipUI tooltipText={tooltipObj[id]} />}</div>
                  </div>
                  <label
                    className="text-[12px] leading-4 text-[#FFFFFFA6]"
                    htmlFor={id.toString()}
                    data-bs-toggle="tooltip"
                    data-kt-initialized="1"
                  >
                    {subtitle}
                  </label>
                </div>
              </form>
            </div>
          )
        )}
        <div className="flex justify-end mt-[20px] md:mt-[135px]">
          <BasicButton
            buttonText={formatMessage({ id: "Save Changes" })}
            onClick={handleSumbit}
            disabled={loading}
            loading={loading}
            height="44px"
            customClass={"w-full md:w-auto"}
            border="1px solid #C2D24B"
            color="#C2D24B"
            textColor="#000000"
            padding="12px 24px"
          />
        </div>
      </div>
    </>
  );
};

export const NotificationPreferences = memo(NotificationPreferencesComponent)