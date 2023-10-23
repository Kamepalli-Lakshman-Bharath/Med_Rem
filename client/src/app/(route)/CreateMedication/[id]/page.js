"use client";

import axios from "axios";
import Navbar from "../../../components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MedicationForm(props) {
  const { id } = props.params;
  const { push } = useRouter();

  const [careTakers, setCareTakers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    notificationType: "",
    schedule: {
      time: "",
      frequency: "daily",
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/careTakers")
      .then((res) => {
        setCareTakers(res.data);
        const index = res.data.findIndex((item) => item.id === id);
        index !== -1 ? setisCareTaker(true) : setisCareTaker(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      ...(name === "frequency" || name === "time"
        ? { schedule: { ...formData.schedule, [name]: value } }
        : { [name]: value }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/medication", {
        medication: formData,
        id: id,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    push(`/Patient/${id}`);
    alert("Created Successfully");
  };

  return (
    <div>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className=" mb-10 max-w-md mx-auto p-5 shadow-xl"
      >
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="dosage">
            Dosage:
          </label>
          <input
            required
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="dosage"
            name="dosage"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="notificationType"
          >
            Notification Type:
          </label>
          <select
            required
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="notificationType"
            name="notificationType"
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="sms">SMS</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
            <option value="push">Push Notification</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="time">
            Time:
          </label>
          <input
            min={"00:01"}
            max={"23:59"}
            required
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="time"
            id="time"
            name="time"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="frequency"
            className="block text-sm font-semibold mb-2"
          >
            Frequency:
          </label>
          <select
            required
            id="frequency"
            name="frequency"
            onChange={handleChange}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="caretakers"
          >
            caretaker
          </label>
          <select
            required
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="caretaker"
            id="caretakers"
            onChange={handleChange}
          >
            <option value="">Select...</option>
            {careTakers &&
              careTakers.map((caretaker, idx) => (
                <option key={idx} value={caretaker.id}>
                  {caretaker.id}
                </option>
              ))}
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
  );
}
