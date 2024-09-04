import React, { createContext, useContext, useState } from "react";

// Create Patient Context
const PatientContext = createContext();

const PatientData = {
  patientName: "",
  profile:"https://via.placeholder.com/100",
  age: "",
  id:"",
  sex: "",
  patientId: "",
  mobile: "",
  email: "",
  address:""
};

export const PatientProvider = ({ children }) => {
  const [patient, setPatient] = useState(PatientData);

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => useContext(PatientContext);
