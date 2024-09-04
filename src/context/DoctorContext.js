// import React, { createContext, useContext, useState } from "react";
// // Create Doctor Context
// const DoctorContext = createContext();

// export const DoctorProvider = ({ children }) => {
//   const [doctor, setDoctor] = useState({
//     id: "",
//     doctorname: "",
//     mobilenumber: "",
//     emailid: "",
//   });
//   //  console.log(doctor);
//   return (
//     <DoctorContext.Provider value={{ doctor, setDoctor }}>
//       {children}
//     </DoctorContext.Provider>
//   );
// };

// export const useDoctor = () => useContext(DoctorContext);


import React, { createContext, useContext, useState, useEffect } from "react";
// Create Doctor Context
const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  // Initialize state from localStorage or with default values
  const [doctor, setDoctor] = useState(() => {
    const savedDoctor = localStorage.getItem("doctor");
    return savedDoctor ? JSON.parse(savedDoctor) : {
      id: "",
      doctorname: "",
      mobilenumber: "",
      emailid: "",
    };
  });

  // Save doctor state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("doctor", JSON.stringify(doctor));
  }, [doctor]);

  return (
    <DoctorContext.Provider value={{ doctor, setDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
