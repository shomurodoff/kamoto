import React from "react";

const Index: React.FC<any> = ({ children }) => {
  return (
    <div className="bg-[#171825] shadow-[0px_1px_4px_0px_#0000001A] px-[16px] pb-10 md:p-[32px] md:pb-[100px] mt-4">
      {children}
    </div>
  );
};

export default Index;
