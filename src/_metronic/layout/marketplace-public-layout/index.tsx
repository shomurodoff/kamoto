import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const Index = () => {
  return (
    <div className={"bg-[#11121C] h-full   min-h-screen"}>
      <div className={"container mx-auto"}>
        <Header />
        <div className={"px-[20px] md:px-20"}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
