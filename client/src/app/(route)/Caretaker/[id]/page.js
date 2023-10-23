"use client";
import Navbar from "../../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import UserDetails from "../../../components/UserDetails/UserDetails";
import axios from "axios";

export default function CareTaker(props) {
  const { id } = props.params;
  const [caretaker, setCaretaker] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        const caretaker = await axios.get(
          `http://localhost:8080/api/user/${id}`
        );
        setCaretaker(caretaker.data);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  return (
    <>
      <Navbar />
      <UserDetails
        name={caretaker.name}
        email={caretaker.email}
        mobile={caretaker.mobile}
        type={caretaker.type}
        id={caretaker._id}
      />
      {true && (
        <p className="mt-10 font-bold text-2xl text-green-700">
          {0 === 0 ? " No Patients Found" : "Patients"}
        </p>
      )}
      <div className="  justify-between mt-7 w-11/12 mx-auto  break-all  text-slate-600 font-semibold  p-5">
        <div className="m-3  w-3/4 p-3 rounded-md shadow-md">
          <p className="mb-1">
            <span className="text-green-600">Id: </span>
          </p>
          <p className="mb-1">
            <span className="text-green-600">Name: </span>
          </p>
          <p className="mb-1">
            <span className="text-green-600">Dosage: </span>
          </p>
          <p className="mb-1">
            <span className="text-green-600">Time: </span>
          </p>
          <p className="mb-1">
            <span className="text-green-600">Frequency: </span>
          </p>
        </div>
      </div>
    </>
  );
}
