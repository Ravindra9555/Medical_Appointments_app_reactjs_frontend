import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import SearchPatientModal from "../SearchPatientModal";

import dayjs from "dayjs";
import { useDoctor } from "../../context/DoctorContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

const DashboardMain = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { doctor } = useDoctor();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [loaction, setLocation] = useState("Vaishali Ghaziabad UP 201010");
  const appointments1 = [
    {
      id: 1,
      name: "John Doe",
      photo: "https://via.placeholder.com/100",
      time: "10:00 AM",
      patientId: "123",
      Age: "15",
      sex: "Male",
      issue: "Gastric issue",
      status: "completed",
    },
    {
      id: 2,
      name: "Jane Smith",
      patientId: "123",
      Age: "15",
      sex: "Male",
      photo: "https://via.placeholder.com/100",
      time: "11:00 AM",
      issue: "Migraine",
      status: "pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      patientId: "123",
      Age: "15",
      sex: "Male",
      photo: "https://via.placeholder.com/100",
      time: "11:00 AM",
      issue: "Migraine",
      status: "arrived",
    },
    {
      id: 3,
      name: "Robert Brown",
      patientId: "123",
      Age: "15",
      sex: "Male",
      photo: "https://via.placeholder.com/100",
      time: "12:00 PM",
      issue: "Abdominal Pain",
      status: "completed",
    },
  ];

  const [activeButton, setActiveButton] = useState("Today");
  const [filteredAppointments, setFilteredAppointments] = useState(appointments1);
  const [appointmentList, setAppointmentList] = useState([]);
  const [date, setDate] = useState(new Date());
//   fetch the all appointments 
  useEffect(() => {
    // fetchAppointments();
  }, [date]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/doctor/getDoctorAppointments`,
        {
          params: {
            doctorId: doctor.id,
            date: dayjs(date).format("YYYY-MM-DD"),
          },
        }
      );
      setAppointmentList(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

// Filter the appointment  With status 

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    if (buttonType === "Today") {
      setFilteredAppointments(appointments1); // Show today's appointments
    } else if (buttonType === "Arrived") {
      setFilteredAppointments(
        appointments1.filter((appt) => appt.status === "arrived")
      ); // Example filter for arrived
    } else if (buttonType === "Completed") {
      setFilteredAppointments(
        appointments1.filter((appt) => appt.status === "completed")
      ); // Example filter for completed
    }
  };

  //  function  to search  appointments from List  

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filteredAppointments = appointments1.filter(
        (appointment) =>
          appointment.name.toLowerCase().includes(query.toLowerCase()) ||
          appointment.issue.toLowerCase().includes(query.toLowerCase()) ||
          appointment.patientId.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAppointments(filteredAppointments);
    } else {
      setFilteredAppointments(appointments1);
    }
  };

  //  function to chhange date  and  fetch appointment  according to date 
  const changeDate = (date) => {
    if (date) {
      setDate(date);
      console.log("Date selected:", dayjs(date).format("YYYY-MM-DD"));
    } else {
      console.log("No date selected");
    }
  };

  return (
    <div className="container mt-2">
      <SearchPatientModal
        show={showModal}
        onClose={closeModal}
        className="modal fade"
      />

      <div className="row p-2 bg-light mt-2 mb-2 rounded">
        <div className="col-md-6">
          <h5>OPD Appointment List</h5>
          <p className="m-0 mb-2">
            {loaction}
            <FontAwesomeIcon
              icon={faLocationDot}
              className="fs-4 text-primary ms-2"
            />
          </p>

          <LocalizationProvider
            className="text-primary mt-2"
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              label={"Date"}
              // views={["day", "month", "year"]}
              value={dayjs()}
              onChange={changeDate}
            />
          </LocalizationProvider>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="text-center">
            <img
              src={doctor.photo || "https://via.placeholder.com/100"}
              alt={doctor.name}
              className="img-fluid rounded-circle"
            />

            <p className="m-0">Dr.{doctor.doctorname}</p>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-4">
          <button
            className={`btn w-100 ${
              activeButton === "Today"
                ? "btn btn-outline-primary"
                : "bg-secondary-subtle"
            }`}
            onClick={() => handleButtonClick("Today")}
          >
            Today
          </button>
        </div>
        <div className="col-md-4">
          <button
            className={`btn w-100 ${
              activeButton === "Arrived"
                ? "btn btn-outline-primary"
                : "bg-secondary-subtle"
            }`}
            onClick={() => handleButtonClick("Arrived")}
          >
            Arrived
          </button>
        </div>
        <div className="col-md-4">
          <button
            className={`btn w-100 ${
              activeButton === "Completed"
                ? "btn btn-outline-primary"
                : "bg-secondary-subtle"
            }`}
            onClick={() => handleButtonClick("Completed")}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="mb-4 row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search in today's Appointment"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-3">
          <button
            className="btn w-100 mb-2"
            id="background"
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faPlus} /> Add New / Search Existing Patient
          </button>
        </div>
      </div>

      <div className="appointments">
        <h4>{activeButton}'s Appointments</h4>
        <div className="list-group">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="m-2 bg-body-tertiary rounded">
              <div className="row">
                <div className="col-sm-2">
                  <img
                    src={appointment.photo}
                    alt={appointment.name}
                    className="me-3"
                  />
                </div>

                <div className="col-sm-3 d-flex align-items-center">
                  <div>
                    <p className="m-0">
                      <strong>Name :</strong>
                      {appointment.name}
                    </p>
                    <p className="m-0">
                      <strong>Patient Id:</strong> {appointment.patientId}
                    </p>
                    <p className="m-0">
                      <strong>Age / Gender:</strong>
                      {appointment.Age}/{appointment.sex}
                    </p>
                  </div>
                </div>

                <div className="col-sm-4 d-flex align-items-center">
                  <div className="">
                    <p className="mb-0">
                      <strong>{appointment.issue}</strong>
                    </p>
                  </div>
                </div>
                <div className="col-sm-3">
                  <p className="fw-semibold text-start">Time</p>
                  <div className="d-flex align-items-center">
                    <p className="mb-0">
                      <strong>{appointment.time}</strong>
                    </p>
                    {/* <button
                      className="btn btn-outline-dark ms-2 border-none"
                      id="background"
                      // onClick={selectPatient}
                    >
                      Prescribe
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
