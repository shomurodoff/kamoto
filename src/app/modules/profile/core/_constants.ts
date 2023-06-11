import { PageLink } from "../../../../_metronic/layout/core";
import { LocaleValueType } from "./_models";

export const profileBreadCrumbs: Array<PageLink> = [
  {
    title: "Home",
    path: "/",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

export const socialMediaData = [
  {
    id: 1,
    icon: "website.svg",
    iconLable: "Website",
    placeholder: "Enter website URL here",
    fieldName: "socialMedia.website",
  },

  {
    id: 2,
    icon: "facebook.svg",
    iconLable: "Facebook",
    placeholder: "Enter facebook URL here",
    fieldName: "socialMedia.facebook",
  },
  {
    id: 3,
    icon: "twitter.svg",
    iconLable: "Twitter",
    placeholder: "Enter twitter URL here",
    fieldName: "socialMedia.twitter",
  },
  {
    id: 4,
    icon: "linkedin.svg",
    iconLable: "LinkedIn",
    placeholder: "Enter linkedin URL here",
    fieldName: "socialMedia.linkedin",
  },
  {
    id: 5,
    icon: "instagram.svg",
    iconLable: "Instagram",
    placeholder: "Enter instagram URL here",
    fieldName: "socialMedia.instagram",
  },
];

export const investorsocialMediaData = [
  {
    id: 1,
    icon: "facebook.svg",
    iconLable: "Facebook",
    placeholder: "Enter facebook URL here",
    fieldName: "socialMedia.facebook",
  },
  {
    id: 2,
    icon: "twitter.svg",
    iconLable: "Twitter",
    placeholder: "Enter twitter URL here",
    fieldName: "socialMedia.twitter",
  },
  {
    id: 3,
    icon: "linkedin.svg",
    iconLable: "LinkedIn",
    placeholder: "Enter linkedin URL here",
    fieldName: "socialMedia.linkedin",
  },
  {
    id: 4,
    icon: "instagram.svg",
    iconLable: "Instagram",
    placeholder: "Enter instagram URL here",
    fieldName: "socialMedia.instagram",
  },
];
export const EmailPreferencesInput = [
  {
    id: 1,
    title: "AI Personality Details Edit",
    subtitle:
      "Receive a notification every time the details of your AI personality is edited.",
    toggleLabel: "editAiPersonality",
  },
  {
    id: 2,
    title: "AI Personality Training by Chat",
    subtitle: "Receive a notification for every submission on Train by Chat",
    toggleLabel: "trainingChat",
  },
  {
    id: 3,
    title: "AI Personality Training by Public Links",
    subtitle: "AI Personality Training by Public Links",
    toggleLabel: "trainingLink",
  },
  {
    id: 4,
    title: "AI Personality Training by Private Data",
    subtitle:
      "Receive a notification for every submission on Train by Private Data",
    toggleLabel: "trainingPrivate",
  },
  {
    id: 5,
    title: "Monetization Details updated",
    subtitle:
      "Receive a notification when your AI Personality’s monetization details are updated.",
    toggleLabel: "monetizationDetailsUpdated",
  },
  {
    id: 6,
    title: "Listing Status Changed",
    subtitle:
      "Receive a notification when anyone follows this AI Personality on AI Marketplace",
    toggleLabel: "listingStatusChanged",
  },
  {
    id: 7,
    title: "Someone Followed the AI Personality",
    subtitle:
      "Receive a notification when anyone follows this AI Personality on AI Marketplace",
    toggleLabel: "followerUpdates",
  },
  {
    id: 8,
    title: "Someone Subscribe to Paid access of AI Personality",
    subtitle:
      "Receive a notification when someone subscribe to the paid access to this AI Personality",
    toggleLabel: "paidAccess",
  },
  {
    id: 9,
    title: "Paid session completed",
    subtitle:
      "Receive a notification when a user complete a paid ser session of your AI Personality",
    toggleLabel: "PaidSessionCompleted",
  },
  {
    id: 10,
    title: "Settlement Executed",
    subtitle:
      "Receive a notification when KamotoAI settle the money in your account.",
    toggleLabel: "fillAccount",
  },
];

export const EmailPreferencesOutput = [
    {
        "id": 1,
        "title": "edit_ai_personality",
        "value": false
    },
    {
        "id": 2,
        "title": "train_ai_personality_by_chat",
        "value": false
    },
    {
        "id": 3,
        "title": "train_ai_personality_by_public_link",
        "value": false
    },
    {
        "id": 4,
        "title": "train_ai_personality_by_private_data",
        "value": false
    },
    {
        "id": 5,
        "title": "monetization_details_updated",
        "value": false
    },
    {
        "id": 6,
        "title": "listing_status_changed",
        "value": false
    },
    {
        "id": 7,
        "title": "ai_personality_followed",
        "value": false
    },
    {
        "id": 8,
        "title": "ai_personality_paid_access_subscribed",
        "value": false
    },
    {
        "id": 9,
        "title": "paid_session_complete",
        "value": false
    },
    {
        "id": 10,
        "title": "settlement_executed",
        "value": false
    }
];

export const localeOptions = [
  {
    id: 1,
    name: "English - US",
    value: "en_US",
  },

  {
    id: 2,
    name: "Deutsch - German",
    value: "de_GN",
  },

  {
    id: 3,
    name: "français - France",
    value: "fr_FR",
  },
  {
    id: 4,
    name: "Español - Spain",
    value: "es_ES",
  },

  {
    id: 5,
    name: "中国人 - China",
    value: "zh_CN",
  },

  {
    id: 6,
    name: "日本語 - Japan",
    value: "ja_JP",
  },
  {
    id: 7,
    name: "हिंदी-Hindi",
    value: "hi_HI",
  },
  {
    id: 8,
    name: "বাংলা-Bangla",
    value: "bn_BN",
  },
  {
    id: 9,
    name: "italiano-Italian",
    value: "it_IT",
  },
  {
    id: 10,
    name: "한국인-Korean",
    value: "ko_KO",
  },
  {
    id: 11,
    name: "Português-Portuguese",
    value: "pt_PT",
  },
  {
    id: 12,
    name: "Русский-Russian",
    value: "ru_RU",
  },
];

export const dateFormatOptions = [
  {
    id: 1,
    name: "03 Sep, 2023",
    value: "DD MMM, YYYY",
  },
  {
    id: 2,
    name: "Sep 03, 2023",
    value: "MMM DD, YYYY",
  },
  {
    id: 3,
    name: "September 03, 2023",
    value: "MMMM DD, YYYY",
  },
  {
    id: 4,
    name: "09/03/2023",
    value: "MM/DD/YYYY",
  },
  {
    id: 5,
    name: "03/09/23",
    value: "DD/MM/YY",
  },
  {
    id: 6,
    name: "03/09/2023",
    value: "DD/MM/YYYY",
  },
  {
    id: 7,
    name: "03-09-2023",
    value: "DD-MM-YYYY",
  },
  {
    id: 8,
    name: "2023/09/03",
    value: "YYYY/MM/DD",
  },

  {
    id: 9,
    name: "2023-09-03",
    value: "YYYY-MM-DD",
  },
];

export const timeFormatOptions = [
  {
    id: 1,
    name: "14:5:3",
    value: "H:m:s",
  },
  {
    id: 2,
    name: "14:05:03",
    value: "HH:mm:ss",
  },
  {
    id: 3,
    name: "2:5:3 PM",
    value: "h:m:s a",
  },
  {
    id: 4,
    name: "2:05:03",
    value: "h:mm:ss a",
  },
  {
    id: 5,
    name: "2:05:03 PM",
    value: "h:mm:ss A",
  },
  {
    id: 6,
    name: "02:05:03 pm",
    value: "hh:mm:ss a",
  },
];

export const timeZoneOptions = [
  {
    id: 1,
    name: "(UTC-12:00) International Date Line West",
    value: "UTC-12:00",
  },
  {
    id: 2,
    name: "(UTC-11:00) Coordinated Universal Time-11",
    value: "UTC-11:00",
  },
  {
    id: 3,
    name: "(UTC-10:00) Hawaii",
    value: "UTC-10:00",
  },
  {
    id: 4,
    name: "(UTC-09:00) Alaska",
    value: "UTC-09:00",
  },
  {
    id: 5,
    name: "(UTC-08:00) Baja California",
    value: "UTC-08:00",
  },
  {
    id: 6,
    name: "(UTC-07:00) Pacific Daylight Time (US & Canada)",
    value: "UTC-07:00",
  },
  {
    id: 7,
    name: "(UTC-08:00) Pacific Standard Time (US & Canada)",
    value: "UTC-08:00",
  },
  {
    id: 8,
    name: "(UTC-07:00) Arizona",
    value: "UTC-07:00",
  },
  {
    id: 9,
    name: "(UTC-07:00) Chihuahua, La Paz, Mazatlan",
    value: "UTC-07:00",
  },
  {
    id: 10,
    name: "(UTC-07:00) Mountain Time (US & Canada)",
    value: "UTC-07:00",
  },
  {
    id: 11,
    name: "(UTC-06:00) Central America",
    value: "UTC-06:00",
  },
  {
    id: 12,
    name: "(UTC-06:00) Central Time (US & Canada)",
    value: "UTC-06:00",
  },
  {
    id: 13,
    name: "(UTC-06:00) Guadalajara, Mexico City, Monterrey",
    value: "UTC-06:00",
  },
  {
    id: 14,
    name: "(UTC-06:00) Saskatchewan",
    value: "UTC-06:00",
  },
  {
    id: 15,
    name: "(UTC-05:00) Bogota, Lima, Quito",
    value: "UTC-05:00",
  },
  {
    id: 16,
    name: "(UTC-05:00) Eastern Time (US & Canada)",
    value: "UTC-05:00",
  },
  {
    id: 17,
    name: "(UTC-04:00) Eastern Daylight Time (US & Canada)",
    value: "UTC-04:00",
  },
  {
    id: 18,
    name: "(UTC-05:00) Indiana (East)",
    value: "UTC-05:00",
  },
  {
    id: 19,
    name: "(UTC-04:30) Caracas",
    value: "UTC-04:30",
  },
  {
    id: 20,
    name: "(UTC-04:00) Asuncion",
    value: "UTC-04:00",
  },
  {
    id: 21,
    name: "(UTC-04:00) Atlantic Time (Canada)",
    value: "UTC-04:00",
  },
  {
    id: 22,
    name: "(UTC-04:00) Cuiaba",
    value: "UTC-04:00",
  },
  {
    id: 23,
    name: "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan",
    value: "UTC-04:00",
  },
  {
    id: 24,
    name: "(UTC-04:00) Santiago",
    value: "UTC-04:00",
  },
  {
    id: 25,
    name: "(UTC-03:30) Newfoundland",
    value: "UTC-03:30",
  },
  {
    id: 26,
    name: "(UTC-03:00) Brasilia",
    value: "UTC-03:00",
  },
  {
    id: 27,
    name: "(UTC-03:00) Buenos Aires",
    value: "UTC-03:00",
  },
  {
    id: 28,
    name: "(UTC-03:00) Cayenne, Fortaleza",
    value: "UTC-03:00",
  },
  {
    id: 29,
    name: "(UTC-03:00) Greenland",
    value: "UTC-03:00",
  },
  {
    id: 30,
    name: "(UTC-03:00) Montevideo",
    value: "UTC-03:00",
  },
  {
    id: 31,
    name: "(UTC-03:00) Salvador",
    value: "UTC-03:00",
  },
  {
    id: 32,
    name: "(UTC-02:00) Coordinated Universal Time-02",
    value: "UTC-02:00",
  },
  {
    id: 33,
    name: "(UTC-02:00) Mid-Atlantic - Old",
    value: "UTC-02:00",
  },
  {
    id: 34,
    name: "(UTC-01:00) Azores",
    value: "UTC-01:00",
  },
  {
    id: 35,
    name: "(UTC-01:00) Cape Verde Is.",
    value: "UTC-01:00",
  },
  {
    id: 36,
    name: "(UTC) Casablanca",
    value: "UTC",
  },
  {
    id: 37,
    name: "(UTC) Coordinated Universal Time",
    value: "UTC",
  },
  {
    id: 38,
    name: "(UTC) Edinburgh, London",
    value: "UTC",
  },
  {
    id: 39,
    name: "(UTC+01:00) Edinburgh, London",
    value: "UTC+01:00",
  },
  {
    id: 40,
    name: "(UTC) Dublin, Lisbon",
    value: "UTC",
  },
  {
    id: 41,
    name: "(UTC) Monrovia, Reykjavik",
    value: "UTC",
  },
  {
    id: 42,
    name: "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
    value: "UTC+01:00",
  },
  {
    id: 43,
    name: "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
    value: "UTC+01:00",
  },
  {
    id: 44,
    name: "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris",
    value: "UTC+01:00",
  },
  {
    id: 45,
    name: "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
    value: "UTC+01:00",
  },
  {
    id: 46,
    name: "(UTC+01:00) West Central Africa",
    value: "UTC+01:00",
  },
  {
    id: 47,
    name: "(UTC+01:00) Windhoek",
    value: "UTC+01:00",
  },
  {
    id: 48,
    name: "(UTC+02:00) Athens, Bucharest",
    value: "UTC+02:00",
  },
  {
    id: 49,
    name: "(UTC+02:00) Beirut",
    value: "UTC+02:00",
  },
  {
    id: 50,
    name: "(UTC+02:00) Cairo",
    value: "UTC+02:00",
  },
  {
    id: 51,
    name: "(UTC+02:00) Damascus",
    value: "UTC+02:00",
  },
  {
    id: 52,
    name: "(UTC+02:00) E. Europe",
    value: "UTC+02:00",
  },
  {
    id: 53,
    name: "(UTC+02:00) Harare, Pretoria",
    value: "UTC+02:00",
  },
  {
    id: 54,
    name: "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
    value: "UTC+02:00",
  },
  {
    id: 55,
    name: "(UTC+03:00) Istanbul",
    value: "UTC+03:00",
  },
  {
    id: 56,
    name: "(UTC+02:00) Jerusalem",
    value: "UTC+02:00",
  },
  {
    id: 57,
    name: "(UTC+02:00) Tripoli",
    value: "UTC+02:00",
  },
  {
    id: 58,
    name: "(UTC+03:00) Amman",
    value: "UTC+03:00",
  },
  {
    id: 59,
    name: "(UTC+03:00) Baghdad",
    value: "UTC+03:00",
  },
  {
    id: 60,
    name: "(UTC+02:00) Kaliningrad",
    value: "UTC+02:00",
  },
  {
    id: 61,
    name: "(UTC+03:00) Kuwait, Riyadh",
    value: "UTC+03:00",
  },
  {
    id: 62,
    name: "(UTC+03:00) Nairobi",
    value: "UTC+03:00",
  },
  {
    id: 63,
    name: "(UTC+03:00) Moscow, St. Petersburg, Volgograd, Minsk",
    value: "UTC+03:00",
  },
  {
    id: 64,
    name: "(UTC+04:00) Samara, Ulyanovsk, Saratov",
    value: "UTC+04:00",
  },
  {
    id: 65,
    name: "(UTC+03:30) Tehran",
    value: "UTC+03:30",
  },
  {
    id: 66,
    name: "(UTC+04:00) Abu Dhabi, Muscat",
    value: "UTC+04:00",
  },
  {
    id: 67,
    name: "(UTC+04:00) Baku",
    value: "UTC+04:00",
  },
  {
    id: 68,
    name: "(UTC+04:00) Port Louis",
    value: "UTC+04:00",
  },
  {
    id: 69,
    name: "(UTC+04:00) Tbilisi",
    value: "UTC+04:00",
  },
  {
    id: 70,
    name: "(UTC+04:00) Yerevan",
    value: "UTC+04:00",
  },
  {
    id: 71,
    name: "(UTC+04:30) Kabul",
    value: "UTC+04:30",
  },
  {
    id: 72,
    name: "(UTC+05:00) Ashgabat, Tashkent",
    value: "UTC+05:00",
  },
  {
    id: 73,
    name: "(UTC+05:00) Yekaterinburg",
    value: "UTC+05:00",
  },
  {
    id: 74,
    name: "(UTC+05:00) Islamabad, Karachi",
    value: "UTC+05:00",
  },
  {
    id: 75,
    name: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
    value: "UTC+05:30",
  },
  {
    id: 76,
    name: "(UTC+05:30) Sri Jayawardenepura",
    value: "UTC+05:30",
  },
  {
    id: 77,
    name: "(UTC+05:45) Kathmandu",
    value: "UTC+05:45",
  },
  {
    id: 78,
    name: "(UTC+06:00) Nur-Sultan (Astana)",
    value: "UTC+06:00",
  },
  {
    id: 79,
    name: "(UTC+06:00) Dhaka",
    value: "UTC+06:00",
  },
  {
    id: 80,
    name: "(UTC+06:30) Yangon (Rangoon)",
    value: "UTC+06:30",
  },
  {
    id: 81,
    name: "(UTC+07:00) Bangkok, Hanoi, Jakarta",
    value: "UTC+07:00",
  },
  {
    id: 82,
    name: "(UTC+07:00) Novosibirsk",
    value: "UTC+07:00",
  },
  {
    id: 83,
    name: "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
    value: "UTC+08:00",
  },
  {
    id: 84,
    name: "(UTC+08:00) Krasnoyarsk",
    value: "UTC+08:00",
  },
  {
    id: 85,
    name: "(UTC+08:00) Kuala Lumpur, Singapore",
    value: "UTC+08:00",
  },
  {
    id: 86,
    name: "(UTC+08:00) Perth",
    value: "UTC+08:00",
  },
  {
    id: 87,
    name: "(UTC+08:00) Taipei",
    value: "UTC+08:00",
  },
  {
    id: 88,
    name: "(UTC+08:00) Ulaanbaatar",
    value: "UTC+08:00",
  },
  {
    id: 89,
    name: "(UTC+08:00) Irkutsk",
    value: "UTC+08:00",
  },
  {
    id: 90,
    name: "(UTC+09:00) Osaka, Sapporo, Tokyo",
    value: "UTC+09:00",
  },
  {
    id: 91,
    name: "(UTC+09:00) Seoul",
    value: "UTC+09:00",
  },
  {
    id: 92,
    name: "(UTC+09:30) Adelaide",
    value: "UTC+09:30",
  },
  {
    id: 93,
    name: "(UTC+09:30) Darwin",
    value: "UTC+09:30",
  },
  {
    id: 94,
    name: "(UTC+10:00) Brisbane",
    value: "UTC+10:00",
  },
  {
    id: 95,
    name: "(UTC+10:00) Canberra, Melbourne, Sydney",
    value: "UTC+10:00",
  },
  {
    id: 96,
    name: "(UTC+10:00) Guam, Port Moresby",
    value: "UTC+10:00",
  },
  {
    id: 97,
    name: "(UTC+10:00) Hobart",
    value: "UTC+10:00",
  },
  {
    id: 98,
    name: "(UTC+09:00) Yakutsk",
    value: "UTC+09:00",
  },
  {
    id: 99,
    name: "(UTC+11:00) Solomon Is., New Caledonia",
    value: "UTC+11:00",
  },
  {
    id: 100,
    name: "(UTC+11:00) Vladivostok",
    value: "UTC+11:00",
  },
  {
    id: 101,
    name: "(UTC+12:00) Auckland, Wellington",
    value: "UTC+12:00",
  },
  {
    id: 102,
    name: "(UTC+12:00) Coordinated Universal Time+12",
    value: "UTC+12:00",
  },
  {
    id: 103,
    name: "(UTC+12:00) Fiji",
    value: "UTC+12:00",
  },
  {
    id: 104,
    name: "(UTC+12:00) Magadan",
    value: "UTC+12:00",
  },
  {
    id: 105,
    name: "(UTC+12:00) Petropavlovsk-Kamchatsky - Old",
    value: "UTC+12:00",
  },
  {
    id: 106,
    name: "(UTC+13:00) Nuku'alofa",
    value: "UTC+13:00",
  },
  {
    id: 107,
    name: "(UTC+13:00) Samoa",
    value: "UTC+13:00",
  },
];

export const timeStampOptions = [
  {
    id: 1,
    name: "ISO 8601 - 2023-02-17T05:58:58+05:30",
    value: "YYYY-MM-DDTHH:mm:ssZ",
  },
  {
    id: 2,
    name: "Unix time - 1676593738 (seconds since epoch)",
    value: "seconds since 1970-01-01 00:00:00 UTC",
  },
  {
    id: 3,
    name: "RFC 2822 - Fri, 17 Feb 2023 00:28:58 GMT",
    value: "ddd, DD MMM YYYY HH:mm:ss Z",
  },
  {
    id: 5,
    name: "JavaScript - 1676593738000 (milliseconds since epoch)",
    value: "YYYY-MM-DDTHH:mm:ssZ",
  },
];

export const designationOptions = [
  {
    id: 1,
    name: "CXO",
    value: "CXO",
  },
  {
    id: 2,
    name: "Charter Accountant - CA",
    value: "Charter Accountant - CA",
  },
  {
    id: 3,
    name: "Company Secretary - CS",
    value: "Company Secretary - CS",
  },
  {
    id: 4,
    name: "Accountant",
    value: "Accountant",
  },
  {
    id: 5,
    name: "Director",
    value: "Director",
  },
  {
    id: 6,
    name: "Investment Banker",
    value: "Investment Banker",
  },
  {
    id: 7,
    name: "Lawyer",
    value: "Lawyer",
  },
  {
    id: 8,
    name: "Admin",
    value: "Admin",
  },
  {
    id: 9,
    name: "Founder",
    value: "Founder",
  },
  {
    id: 10,
    name: "Co-Founder",
    value: "Co-Founder",
  },
  {
    id: 11,
    name: "CEO",
    value: "CEO",
  },
  {
    id: 12,
    name: "Others",
    value: "Others",
  },
];

export const operatingStatusOptions = [
  {
    id: 1,
    name: "Pre-launch",
    value: "Pre-launch",
  },
  {
    id: 2,
    name: "Active",
    value: "Active",
  },
  {
    id: 3,
    name: "Inactive",
    value: "Inactive",
  },
  {
    id: 4,
    name: "Shutdown",
    value: "Shutdown",
  },
  {
    id: 5,
    name: "Liquidated",
    value: "Liquidated",
  },
];

export const teamSizeOptions = [
  { id: 1, name: "1-2", value: "1-2" },
  { id: 2, name: "2-10", value: "2-10" },
  { id: 3, name: "10-30", value: "10-30" },
  { id: 4, name: "30-50", value: "30-50" },
  { id: 5, name: "50-100", value: "50-100" },
  { id: 6, name: "100-500", value: "100-500" },
  { id: 7, name: "500-1000", value: "500-1000" },
  { id: 8, name: "1000+", value: "1000+" },
];

export const userInitialValues = {
  firstName: "",
  lastName: "",
  designation: "",
  email: "",
  contact: "",
  country: "",
  communication: {
    email: false,
    phone: false,
  },
  photo: "",
  banner: "",
  website: "",
};

export const companyInitialValues = {
  companyName: "",
  tagline: "",
  teamSize: "",
  legalName: "",
  operatingStatus: "",
  description: "",
  foundedDate: "",
  industry: "",
  country: "",
  state: "",
  founders: "",
  logoId: null,
  socialMedia: {
    website: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  },
};

export const localeInitialValues: LocaleValueType | any = {
  locale: "",
  timezone: "",
  dateFormat: "",
  timeFormat: "",
  timestampFormat: "",
};

export const customSmtpOptions = [
  { id: 1, name: "SSL", value: "SSL" },
  { id: 2, name: "STARTTLS", value: "STARTTLS" },
  { id: 3, name: "TLS", value: "TLS" },
];

export enum Roles {
  ADMIN = "admin",
  BILLING = "billing",
  IRM = "irm",
  FRM = "frm",
  CURATOR = "curator",
  OWNER = "owner",
}

export const RolesName: any = {
  admin: "Admin",
  billing: "Billing Manager",
  irm: "Investor Relationship Manager",
  frm: "Fund Raise Manager",
  curator: "Investor Curator",
  owner: "Super Admin (Owner)",
};
export const postmarkInitialValues = {
  serverToken: "",
};

export const initialValues = {
  apiKey: "",
};

export const customSmtpInitialValues = {
  server: "",
  username: "",
  password: "",
  encryption: "",
  port: "",
};

export const senderInitialValues = {
  fromName: "",
  fromEmail: "",
  replyToName: "",
  replyToEmail: "",
};
