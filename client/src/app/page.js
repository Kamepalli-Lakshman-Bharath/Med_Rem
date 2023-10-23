"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { push } = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/login", formData)
      .then((res) => {
        const { _id, type } = res.data;
        if (type === "patient") {
          push(`/Patient/${_id}`);
        } else {
          push(`/Caretaker/${_id}`);
        }
      })
      .catch((error) => {
       alert("Error: Invalid userName and password" );
      });
  };

  return (
    <>
      <Navbar activePage="Login" />
      <div className="p-4 ">
        <form
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12  h-fit border  p-9 shadow-xl rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              required
              id="email"
              type="email"
              name="email"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              required
              id="password"
              type="password"
              name="password"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
