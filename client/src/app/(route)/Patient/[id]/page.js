"use client";
import { createContext, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import axios from "axios";
import UserDetails from "../../../components/UserDetails/UserDetails";
import { useRouter } from "next/navigation";

export default function Patient(props) {
  const { push } = useRouter();
  const { id } = props.params;
  const [patientData, setPatientData] = useState({});
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await axios.get(
          `http://localhost:8080/api/user/${id}`
        );
        setPatientData(patientResponse.data);

        const medicationsResponse = await axios.get(
          `http://localhost:8080/api/medication/${id}`
        );
        setMedications(medicationsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const deleteMedication = (medId) => {
  
    axios
      .delete(`http://localhost:8080/api/medication`, {
        data: {
          patientId: patientData._id,
          medicationId: medId,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    

    const updatedMedications = medications.filter((med) => med._id !== medId);
    setMedications(updatedMedications);
  };

  return (
    <>
      <Navbar activePage="patient" />
      <UserDetails
        name={patientData.name}
        email={patientData.email}
        mobile={patientData.mobile}
        id={patientData._id}
        type={patientData.type}
      />
      {medications && (
        <p className="mt-10 font-bold text-2xl text-green-700">
          {medications.length === 0 ? " No Medications Found" : "Medications"}
          <span
            onClick={() => push(`/CreateMedication/${patientData._id}`)}
            className=" mr-16 text-white ring-2 rounded-md hover:text-green-600 hover:bg-white ring-green-700 bg-green-600 p-2 text-4xl cursor-pointer float-right"
          >
            +
          </span>
        </p>
      )}
      <div className="  justify-between mt-7 w-11/12 mx-auto  break-all  text-slate-600 font-semibold  p-5">
        {medications &&
          medications.map((med) => (
            <div key={med._id} className="m-3  w-3/4 p-3 rounded-md shadow-md">
              <div
                onClick={() => deleteMedication(med._id)}
                className=" float-right  rounded-md shadow-md p-2 cursor-pointer"
              >
                <img className="  h-5" src="/bin.svg" alt="" />
              </div>
              <p className="mb-1">
                <span className="text-green-600">Id: </span>
                {med._id}
              </p>
              <p className="mb-1">
                <span className="text-green-600">Name: </span>
                {med.name}
              </p>
              <p className="mb-1">
                <span className="text-green-600">Dosage: </span>
                {med.dosage}
              </p>
              <p className="mb-1">
                <span className="text-green-600">Time: </span>
                {med.schedule.time}
              </p>
              <p className="mb-1">
                <span className="text-green-600">Frequency: </span>
                {med.schedule.frequency}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
