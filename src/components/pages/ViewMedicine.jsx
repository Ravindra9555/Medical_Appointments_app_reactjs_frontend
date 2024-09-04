import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { ajax } from "jquery";
import { toast, ToastContainer } from "react-toastify";

const ViewMedicine = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: "",
    age: "",
    sex: "",
    date: "",
    time: "",
    mobile: "",
    email: "",
    patientId: "",
    medicines: [],
    doctorName: "",
  });

  useEffect(() => {
    haandleSearch();
  }, [id]);

  const haandleSearch = async () => {
    if (id === "") {
      alert("Please enter prescription ID");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/v1/doctor/getPrescription`,
        { prescriptionid: atob(id) }
      );
      if (res.status === 200) {
        const result = res.data.prescriptionresult[0];
        setPrescriptionData({
          patientName: `${result.firstname} ${result.lastname}`,
          age: result.dob,
          sex: result.gender,
          date: result.followupdate,
          time: result.followupdate,
          mobile: result.mobilenumber,
          email: result.emailid,
          patientId: result.patientid,
          medicines: res.data.medicineresult,
          doctorName: result.doctorname,
        });
        setShow(true);
      }
    } catch (error) {
      console.log(error);
      alert("Error while fetching prescription details");
    }
  };
  const isssued = async () => {
    try {
      const res = await axios.put(`/api/`);
      if (res.status === 200) {
        alert("Prescription Issued Successfully");
      }
    } catch (error) {
      toast.error("Prescription Issued Error");
    }
  };
  return (
    <div>
      <ToastContainer />
      {show && (
        <div className="container mt-4  border rounded pb-4">
          <h5 className="text-center mt-2">Prescription Details</h5>
          <div className="row p-3">
            <div className="col-md-4">
              <p className="m-0">
                Patient Name: <b>{prescriptionData.patientName}</b>
              </p>
              <p className="m-0">
                DOB: <b>{dayjs(prescriptionData.age).format("D-MMM-YYYY")}</b>
              </p>
              <p className="m-0">
                Gender: <b>{prescriptionData.sex}</b>
              </p>
            </div>
            <div className="col-md-4">
              <p className="m-0">
                Mobile: <b>{prescriptionData.mobile}</b>
              </p>
              <p className="m-0">
                Email: <b>{prescriptionData.email}</b>
              </p>
              <p className="m-0">
                Patient ID: <b>{prescriptionData.patientId}</b>
              </p>
            </div>
            <div className="col-md-4">
              <p className="m-0">
                Date: <b>{dayjs(prescriptionData.date).format("D-MMM-YYYY")}</b>
              </p>
              <p className="m-0">
                Time: <b>{prescriptionData.time}</b>
              </p>
            </div>
          </div>
          <hr />
          <div className="rounded ">
            <h6 className="text-center mt-3">Prescribed Medicines</h6>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Dose</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {prescriptionData.medicines.length > 0 ? (
                  prescriptionData.medicines.map((medicine, index) => (
                    <tr key={index}>
                      <td>{medicine.medicine_name}</td>
                      <td>{medicine.frequencyname}</td>
                      <td>{medicine.duration} days</td>
                      <td>{medicine.dose}</td>
                      <td>{medicine.notes}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No medicines prescribed
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="row">
            <div className="text-start">
              <p className="m-0">
                Prescribed by: <b>{prescriptionData.doctorName}</b>
              </p>
              <p className="m-0">
                Prescribed for: <b>{prescriptionData.patientName}</b>
              </p>
            </div>
            <div className="text-end">
              <p className="m-0">
                Prescribed on: <b>{dayjs().format("D-MMM-YYYY")}</b>
              </p>
            </div>

            <div className="text-end mt-4">
              <button className="btn btn-outline-primary me-4" onClick={()=> window.history.back()}>
                Back
              </button>
              <button className="btn btn-primary" onClick={isssued}>
                Issue Medicine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMedicine;
