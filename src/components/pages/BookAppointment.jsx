import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { usePatient } from "../../context/PatientContext";

export const BookAppointment = () => {
  const {patient}= usePatient();
  // const patient = {
  //   name: "John Doe",
  //   dob: "1990-01-01",
  //   address: "123 Main St, City",
  //   contact: "123-456-7890",
  //   profile: "https://via.placeholder.com/100",
  // };

  const bookingTimes = ["10:30", "11:30", "12:30", "13:30", "14:30"];
  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialization: "Cardiologist",
      department: "Cardiology",
      contactNumber: "1234567890",
      email: "johnsmith@example.com",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Dr. Jane Doe",
      specialization: "Dermatologist",
      department: "Dermatology",
      contactNumber: "9876543210",
      email: "janedoe@example.com",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Dr. Mark Johnson",
      specialization: "Neurologist",
      department: "Neurology",
      contactNumber: "0987654321",
      email: "markjohnson@example.com",
      image: "https://via.placeholder.com/100",
    },
  ];

  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
  });

  const [selectedDoctor, setSelectedDoctor] = useState({});

  const selectDoc = (index) => {
    const selectedDoc = doctors[index];
    setSelectedDoctor(selectedDoc);
    setFormData({ ...formData, doctor: selectedDoc.name });
    console.log("Selected doctor:", selectedDoc);
  };

  const setTime = (value) => {
    setFormData({ ...formData, time: value });
    console.log("Selected time:", value);
  };

  const [bookingDate, setBookingDate] = useState(dayjs());
  const maxDate = dayjs().add(6, "month");

  const BookAppoint = () => {
    console.log(  formData)
    Swal.fire({
      title: "Confirm Appointment",
      html: `Your appointment is booked with ${
        formData.doctor
      } on ${bookingDate.format("YYYY-MM-DD")} at ${formData.time}.<br/>
         Booking ID: 1234556151`,
      icon: "success",
      
    });
  };


  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-7">
          {
            patient && !patient.id==""&&(
              <div className="patient-card rounded p-2 row bg-light">
              <h5 className="text-center">Patient Details</h5>
              <div className="col-md-3 d-flex align-items-center">
                <img
                  className="img-fluid"
                  style={{ borderRadius: "50%", width: "100px", height:"100px" }}
                  src={`${process.env.REACT_APP_IMAGEURL}/${patient.profile}` || "https://via.placeholder.com/100"}
                  alt="Profile"
                />
              </div>
              <div className="patient-details col-md-5">
                <p className="m-0">
                  Patient Name: <b>{patient.patientName}</b>
                </p>
                <p className="m-0">
                  DOB: <b>{patient.age}</b>
                </p>
                <p className="m-0">
                  Address: <b>{patient.address}</b>
                </p>
                <p className="m-0">
                  Contact: <b>{patient.mobile}</b>
                </p>
              </div>
              <div className="col-md-4">
                <p className="m-0">Booking Details</p>
                <p className="m-0">
                  Booked On: <b>{bookingDate.format("YYYY-MM-DD") || "N/A"}</b>
                </p>
                <p className="m-0">
                  Booking Time: <b>{formData.time || "N/A"}</b>
                </p>
              </div>
            </div>
            )
          }
        
          {selectedDoctor && selectedDoctor.name && (
            <div className="mt-1 row">
              <h3 className="text-start">Selected Doctor</h3>
              <div className="profile d-flex flex-wrap m-1 bg-light justify-content-start rounded align-items-center p-1">
                <div>
                  <img
                    className="img-fluid rounded-circle"
                    style={{ borderRadius: "50%", width: "80px" }}
                    src={
                      selectedDoctor.image || "https://via.placeholder.com/100"
                    }
                    alt="Profile"
                  />
                </div>
                <div className="text-center ms-4">
                  <p><strong>{selectedDoctor.name}</strong></p>
                  <p><strong>{selectedDoctor.specialization}</strong></p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-1 row">
            <h3 className="text-start">Available Doctors</h3>
            <div className="gap-2 justify-content-center">
              {doctors.map((doctor, index) => (
                <div
                  key={doctor.id}
                  className="profile d-flex flex-wrap m-1 bg-light justify-content-between rounded align-items-center p-1"
                >
                  <div>
                    <img
                      className="img-fluid rounded-circle"
                      style={{ borderRadius: "50%", width: "80px" }}
                      src={doctor.image || "https://via.placeholder.com/100"}
                      alt="Profile"
                    />
                  </div>
                  <div className="text-center">
                    <p>{doctor.name}</p>
                    <p>{doctor.specialization}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className={`btn m-1 ${
                        formData.doctor === doctor.name
                          ? "btn-success"
                          : "btn-outline-success"
                      }`}
                      onClick={() => selectDoc(index)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="p-2 bg-light">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                orientation="portrait"
                value={bookingDate}
                onChange={(selectedDate) => {
                  setBookingDate(selectedDate);
                  setFormData({...formData, date: dayjs(selectedDate).format('YYYY-MM-DD')});
                }}
                minDate={dayjs()}
                maxDate={maxDate}
                showToolbar={false}
              />
            </LocalizationProvider>
          </div>
          <div className="time mt-3 bg-light p-2 rounded">
            <p className="text-start">Available Times</p>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {bookingTimes.map((time, index) => (
                <button
                  key={index}
                  type="button"
                  className={`btn m-1 ${
                    formData.time === time
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => setTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <button className="btn" id="background" onClick={BookAppoint}>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
