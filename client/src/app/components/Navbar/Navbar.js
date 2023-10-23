"use client";

import { useRouter } from "next/navigation";

export default function Navbar(props) {
  const { activePage } = props;
  const { push } = useRouter();

  const loginStyles = `cursor-pointer ${
    activePage == "Login" ? " bg-green-600  p-2 text-white rounded-md" : ""
  }`;

  const registerStyles = `cursor-pointer ${
    activePage == "Register" ? "bg-green-600  p-2 text-white rounded-md" : ""
  }`;

  return (
    <nav
      style={{ backgroundColor: "#caf0f8" }}
      className=" top-0 left-0 bg-white p-4 flex items-center justify-between fixed w-screen shadow-md"
    >
      <div className=" ml-4 text-green-600 text-2xl font-medium">
        Medication App
      </div>
      <div>
        <div className="mr-4 font-medium text-xl">
          <span className={loginStyles} onClick={() => push("/")}>
            Login
          </span>
          /
          <span className={registerStyles} onClick={() => push("/Register")}>
            Register
          </span>
        </div>
      </div>
    </nav>
  );
}
