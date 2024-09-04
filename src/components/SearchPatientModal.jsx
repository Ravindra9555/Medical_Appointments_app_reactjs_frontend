// SearchPatientModal.js
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePatient } from "../context/PatientContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
const SearchPatientModal = ({ show, onClose }) => {
  const { patient, setPatient } = usePatient();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState(true);
  const [patientList, setPatientList] = useState([]);
  const [patientData, setPatientData] = useState({
    patientName: "",
    profile: "",
    age: "",
    id: "",
    sex: "",
    patientId: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [formdata, setFormData] = useState("");

  const selectpatient = (value) => {
    console.log(value);

    const findone = patientList.find((patient) => patient.id === value);
    console.log(findone);
    setPatient({
      patientName: findone.firstname + " " + findone.lastname,
      profile: findone.profilepic,
      age: findone.dob,
      id: findone.id,
      sex: findone.gender,
      patientId: findone.patientid,
      mobile: findone.mobilenumber,
      email: findone.emailid,
      address: findone.address,
    });

    navigate("/bookappointment");
  };

  const searchpatient = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/v1/patient/searchPatient`,
        {
          searchKey: formdata,
        }
      );
      if (res.status === 200) {
        // setPatient(res.data);
        if (res.data.patientserachresults == null) {
          toast.error("No patient found with the given ID");
          // return;
        }
        // console.log(res.data.patientserachresults);
        const data = res.data.patientserachresults;
        setPatientList(data);
        console.log(data);

        setSearchData(!searchData);
      }
    } catch (error) {
      console.log(error);
      alert("Error: " + error?.response?.data?.message);
    }
  };

  return (
    <>
    <ToastContainer />
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        aria-labelledby="searchPatientLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          style={{ minWidth: "800px" }}
        >
          {searchData ? (
            <>
              <div className="modal-content">
                <div className="modal-header">
                  <h6
                    className="modal-title text-center"
                    id="searchPatientLabel"
                  >
                    Search Patient
                  </h6>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form action="" onSubmit={searchpatient}>
                    <div className="p-4">
                      <label htmlFor="" className="form-label">
                        Enter Patients Phone / Patient Id/ Patient Name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setFormData(e.target.value)}
                        className="form-control"
                        placeholder="Search by  Mobile Number or Patient Id / Patient Name "
                      />
                      <button
                        className="btn btn-outline- light w-100 mt-2"
                        id="background"
                        // onClick={searchpatient}
                        type="submit"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                {/* <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div> */}
              </div>
            </>
          ) : (
            <>
              <div className="modal-content">
                <div className="modal-header">
                  <h6
                    className="modal-title text-center"
                    id="searchPatientLabel"
                  >
                    Search Result
                  </h6>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                    aria-label="Close"
                  ></button>
                </div>
                {!patientList.length <= 0 ? (
                  <table className="table table-striped p-4">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">DOB </th>
                        <th scope="col">Gender</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Patient ID</th>
                        <th scope="col">Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientList?.map((patient, index) => (
                        <tr>
                          <td>{patient.firstname + " " + patient.lastname}</td>
                          <td>{dayjs(patient.dob).format("D-MMM-YYYY")}</td>
                          <td>{patient.gender}</td>
                          <td>{patient.mobilenumber}</td>
                          <td>{patient.patientid}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-dark"
                              id="background"
                              onClick={() => selectpatient(patient.id)}
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <>
                    <p className="text-center">
                      No Patient is found on given Information
                    </p>
                  </>
                )}

                <div className="modal-footer1 mb-2 d-flex justify-content-end">
                  {/* <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button> */}
                  <Link
                    to="/addnewpatient"
                    type="button"
                    className="btn btn-outline-dark me-2"
                    id="background"
                  >
                    <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> Add New
                    Patient
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default SearchPatientModal;
