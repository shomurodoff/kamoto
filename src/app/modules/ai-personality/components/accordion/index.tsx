import { motion, AnimatePresence } from "framer-motion";
import React from "react";
const Index: React.FC<any> = ({
  i,
  expanded,
  setExpanded,
  title,
  paragraph,
}) => {
  const isOpen = i === expanded;
  return (
    <>
      <motion.header initial={false}>
        <h3
          className={"text-[14px] leading-5 flex justify-between items-center"}
        >
          {title}
          <button
            className={
              "w-6 h-6 rounded-full flex items-center justify-center bg-[#2E2F45]"
            }
            onClick={() => setExpanded(isOpen ? false : i)}
          >
            {!isOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_541_11526)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.25 9C2.25 8.58579 2.58579 8.25 3 8.25H15C15.4142 8.25 15.75 8.58579 15.75 9C15.75 9.41421 15.4142 9.75 15 9.75H3C2.58579 9.75 2.25 9.41421 2.25 9Z"
                    fill="white"
                    fillOpacity="0.65"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_541_11526">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_344_24366)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.25 15C8.25 15.4142 8.58579 15.75 9 15.75C9.41421 15.75 9.75 15.4142 9.75 15V9.75H15C15.4142 9.75 15.75 9.41421 15.75 9C15.75 8.58579 15.4142 8.25 15 8.25H9.75V3C9.75 2.58579 9.41421 2.25 9 2.25C8.58579 2.25 8.25 2.58579 8.25 3V8.25H3C2.58579 8.25 2.25 8.58579 2.25 9C2.25 9.41421 2.58579 9.75 3 9.75H8.25V15Z"
                    fill="white"
                    fillOpacity="0.65"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_344_24366">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>
        </h3>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <p className={"text-[12px] leading-5 text-[#FFFFFFA6] pt-[12px]"}>
              {paragraph}
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
