import { useEffect, useState } from "react";
import { currencies } from "../modules/onboarding/core/_requests";
import { DropdownType } from "../core/_models";

export const useCurrency = () => {
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([]);
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
  return { currencyOptions };
};
