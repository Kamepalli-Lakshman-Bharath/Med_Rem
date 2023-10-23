"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register(props) {
  const [formData, setFormData] = useState({
    name: "",
    type: "caretaker",
    email: "",
    password: "",
    mobile: "",
    notificationType: "whatsapp",
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
      .post("http://localhost:8080/api/register", formData)
      .then((res) => {
        alert("Registered Successfully");
        push("/")
      })
      .catch((err) => {
        alert(err.response.data.mess);
      });
  };

  return (
    <>
      <Navbar activePage="Register" />
      <div className="p-4 ">
        <form
          className="max-w-md mx-auto p-5 shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              required
              id="name"
              type="text"
              name="name"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-semibold mb-2">
              Type
            </label>
            <select
            required
              id="type"
              name="type"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            >
               <option value="">Select...</option>
              <option value="caretaker">Caretaker</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
            
              id="requiredemail"
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
              id="requiredpassword"
              type="password"
              name="password"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-sm font-semibold mb-2"
            >
              Mobile
            </label>
            <input
              required
              id="requiredmobile"
              type="tel"
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  !["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(
                    e.key
                  )
                ) {
                  e.preventDefault();
                }
              }}
              maxLength={10}
              name="mobile"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="notificationType"
              className="block text-sm font-semibold mb-2"
            >
              Notification Type
            </label>
            <select
            required
              id="notificationType"
              name="notificationType"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            >
               <option value="">Select...</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="push">Push Notification</option>
              <option value="sms">SMS</option>
              <option value="mail">Email</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
