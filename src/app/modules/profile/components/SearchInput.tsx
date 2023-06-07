import React from "react";

const SearchInput = () => {
  return (
    <div className="xl:absolute mb-[24px] right-0 top-0 ">
      <div className="relative">
        <svg
          className="absolute top-1/2 left-2 -translate-y-1/2"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_344_20872)">
            <path
              opacity="0.3"
              d="M14.2929 17.6993C13.9024 17.3088 13.9024 16.6756 14.2929 16.2851C14.6834 15.8946 15.3166 15.8946 15.7071 16.2851L19.7071 20.2851C20.0976 20.6756 20.0976 21.3088 19.7071 21.6993C19.3166 22.0898 18.6834 22.0898 18.2929 21.6993L14.2929 17.6993Z"
              fill="white"
              fill-opacity="0.65"
            />
            <path
              d="M11 16.9922C13.7614 16.9922 16 14.7536 16 11.9922C16 9.23076 13.7614 6.99219 11 6.99219C8.23858 6.99219 6 9.23076 6 11.9922C6 14.7536 8.23858 16.9922 11 16.9922ZM11 18.9922C7.13401 18.9922 4 15.8582 4 11.9922C4 8.12619 7.13401 4.99219 11 4.99219C14.866 4.99219 18 8.12619 18 11.9922C18 15.8582 14.866 18.9922 11 18.9922Z"
              fill="white"
              fill-opacity="0.65"
            />
          </g>
          <defs>
            <clipPath id="clip0_344_20872">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0 0.992188)"
              />
            </clipPath>
          </defs>
        </svg>
        <input
          className="form-control h-[36px] font-size-12 text-[#FFFFFFCC] !bg-[#2E2F45] !border-[#FFFFFF1A] hover:border-blue-500 min-w-[220px] pl-10"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchInput;
