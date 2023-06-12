import React from "react";
import Breadcrumb from "./components/breadcrumb";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <Breadcrumb />
      <table className="table-auto border-collapse border w-full rounded">
        <thead>
          <tr>
            <th className={"border px-2 py-2"}>Page Name</th>
            <th className={"border px-2 py-2"}>Page Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={"border px-2 py-2"}>Login</td>
            <td className={"border px-2 py-2"}>
              <Link to={"/auth/login"} className={"text-blue-500"}>
                {" "}
                Login
              </Link>
            </td>
          </tr>
          <tr>
            <td className={"border px-2 py-2"}>Login</td>
            <td className={"border px-2 py-2"}>
              <Link to={"/auth/registration"} className={"text-blue-500"}>
                {" "}
                Registration
              </Link>
            </td>
          </tr>
          <tr>
            <td className={"border px-2 py-2"}>Login</td>
            <td className={"border px-2 py-2"}>
              <Link to={"/auth/forgot-password"} className={"text-blue-500"}>
                {" "}
                Forgot Password
              </Link>
            </td>
          </tr>
          <tr>
            <td className={"border px-2 py-2"}>Onboarding</td>
            <td className={"border px-2 py-2"}>
              <Link to={"/onboarding"} className={"text-blue-500"}>
                {" "}
                Onboarding
              </Link>
            </td>
          </tr>
          <tr>
            <td className={"border px-2 py-2"}>Onboarding Member</td>
            <td className={"border px-2 py-2"}>
              <Link to={"/onboarding/team-members"} className={"text-blue-500"}>
                {" "}
                Onboarding Member
              </Link>
            </td>
          </tr>
          <tr>
            <td className={"border px-2 py-2"}>Onboarding Detail</td>
            <td className={"border px-2 py-2"}>
              <Link
                to={"/onboarding/initialize-round"}
                className={"text-blue-500"}
              >
                {" "}
                Onboarding Detail
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Index;
