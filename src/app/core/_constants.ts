import { sidebarOptionsType } from "./_models";
import { useIntl } from "react-intl";

export const designationOptions = [
  {
    id: 1,
    name: "CEO",
    value: "CEO",
  },
  {
    id: 2,
    name: "CXO",
    value: "CXO",
  },
  {
    id: 3,
    name: "Charter Accountant - CA",
    value: "Charter Accountant - CA",
  },
  {
    id: 4,
    name: "Company Secretary - CS",
    value: "Company Secretary - CS",
  },
  {
    id: 5,
    name: "Accountant",
    value: "Accountant",
  },
  {
    id: 6,
    name: "Director",
    value: "Director",
  },
  {
    id: 7,
    name: "Investment Banker",
    value: "Investment Banker",
  },
  {
    id: 8,
    name: "Lawyer",
    value: "Lawyer",
  },
  {
    id: 9,
    name: "Others",
    value: "Others",
  },
];

export const industryOptions = [
  {
    id: 1,
    name: "Agriculture",
    value: "Agriculture",
  },
  {
    id: 2,
    name: "Advertising",
    value: "Advertising",
  },
  {
    id: 3,
    name: "AdultTech",
    value: "AdultTech",
  },
  {
    id: 4,
    name: "AI/ML",
    value: "AI/ML",
  },
  {
    id: 5,
    name: "AR/VR",
    value: "AR/VR",
  },
  {
    id: 6,
    name: "Biotech",
    value: "Biotech",
  },
  {
    id: 7,
    name: "Blockchain",
    value: "Blockchain",
  },
  {
    id: 8,
    name: "Crypto",
    value: "Crypto",
  },
  {
    id: 9,
    name: "Clothing and Apparel",
    value: "Clothing and Apparel",
  },
  {
    id: 10,
    name: "Consumer",
    value: "Consumer",
  },
  {
    id: 11,
    name: "Consumer Internet",
    value: "Consumer Internet",
  },
  {
    id: 12,
    name: "Cyber Security",
    value: "Cyber Security",
  },
  {
    id: 13,
    name: "Defence Tech",
    value: "Defence Tech",
  },
  {
    id: 14,
    name: "Drone",
    value: "Drone",
  },
  {
    id: 15,
    name: "Digital Entertainment",
    value: "Digital Entertainment",
  },
  {
    id: 16,
    name: "E-Commerce",
    value: "E-Commerce",
  },
  {
    id: 17,
    name: "EdTech",
    value: "EdTech",
  },
  {
    id: 18,
    name: "Energy",
    value: "Energy",
  },
  {
    id: 19,
    name: "Events",
    value: "Events",
  },
  {
    id: 20,
    name: "Financial Services",
    value: "Financial Services",
  },
  {
    id: 21,
    name: "FinTech",
    value: "FinTech",
  },
  {
    id: 22,
    name: "FMCG",
    value: "FMCG",
  },
  {
    id: 23,
    name: "FoodTech",
    value: "FoodTech",
  },
  {
    id: 24,
    name: "Gaming",
    value: "Gaming",
  },
  {
    id: 25,
    name: "Healthcare",
    value: "Healthcare",
  },
  {
    id: 26,
    name: "Information Technology",
    value: "Information Technology",
  },
  {
    id: 27,
    name: "IOT",
    value: "IOT",
  },
  {
    id: 28,
    name: "Marketplace",
    value: "Marketplace",
  },
  {
    id: 29,
    name: "Martech",
    value: "Martech",
  },
  {
    id: 30,
    name: "Media And Entertainment",
    value: "Media And Entertainment",
  },
  {
    id: 31,
    name: "Mobility & Transport",
    value: "Mobility & Transport",
  },
  {
    id: 32,
    name: "Payment",
    value: "Payment",
  },
  {
    id: 33,
    name: "Real Estate",
    value: "Real Estate",
  },
  {
    id: 34,
    name: "SaaS",
    value: "SaaS",
  },
  {
    id: 35,
    name: "Solar & Green Energy",
    value: "Solar & Green Energy",
  },
  {
    id: 36,
    name: "Sports & eSports",
    value: "Sports & eSports",
  },
  {
    id: 37,
    name: "Transportation",
    value: "Transportation",
  },
  {
    id: 38,
    name: "Travel And Tourism",
    value: "Travel And Tourism",
  },
  {
    id: 39,
    name: "Wearable",
    value: "Wearable",
  },
];

export const InvestorSidebarOptions = () => {
  const intl = useIntl();
  const investorSidebarOptions: sidebarOptionsType[] = [
    {
      id: 2,
      title: intl.formatMessage({ id: "Upcoming" }),
      slug: "/investor-crm/investor/activities/upcoming",
    },
    {
      id: 3,
      title: intl.formatMessage({ id: "Past" }),
      slug: "/investor-crm/investor/activities/past",
    },
    {
      id: 1,
      title: intl.formatMessage({ id: "All" }),
      slug: "/investor-crm/investor/activities/all",
    },
  ];
  const updateSidebarOptions: sidebarOptionsType[] = [
    {
      id: 1,
      title: intl.formatMessage({ id: "All" }),
      slug: "/investor-crm/investor/update/all",
    },
    {
      id: 2,
      title: intl.formatMessage({ id: "Internal" }),
      slug: "/investor-crm/investor/update/internal",
    },
    {
      id: 3,
      title: intl.formatMessage({ id: "External" }),
      slug: "/investor-crm/investor/update/external",
    },
  ];
  return {
    investorSidebarOptions,
    updateSidebarOptions,
  };
};

export const roundInitialValues = {
  roundName: "",
  amountTargeted: "",
  roundType: "",
  currency: "",
  amountAchieved: "",
};
