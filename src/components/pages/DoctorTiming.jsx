import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import Swal from "sweetalert2";

const DoctorTiming = () => {

  const doctor = {
    name: "John Doe",
    specialization: "Cardiologist",
    contact: "9876543210",
    experience: "10 Years",
    image: "https://via.placeholder.com/100", // Placeholder image
  };

  const [bookingDate, setBookingDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs().hour(9).minute(0));
  const [endTime, setEndTime] = useState(dayjs().hour(18).minute(0));
  const [timePerSlot, setTimePerSlot] = useState(15); // Default to 15 minutes per slot
  const maxDate = dayjs().add(6, "month");

  const handleDateChange = (date) => setBookingDate(date);
  const handleStartTimeChange = (time) => setStartTime(time);
  const handleEndTimeChange = (time) => setEndTime(time);
  const handleTimePerSlotChange = (e) => setTimePerSlot(e.target.value);

  const handleSaveSchedule = () => {
    // Function to save schedule (can be extended to save data to backend)
    console.log("Booking Date:", bookingDate.format("YYYY-MM-DD"));
    console.log("Start Time:", startTime.format("HH:mm"));
    console.log("End Time:", endTime.format("HH:mm"));
    console.log("Time per Slot (minutes):", timePerSlot);

    Swal.fire({
      title: "Schedule Updated Successfully!",
      icon: "success",
      confirmButtonText: "Close",
    })
    // You can add a success message or further processing here
  };

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-7">
          <h4 className="text-start">Doctor Profile</h4>
          <div className="profile d-flex flex-wrap m-1 bg-light justify-content-center rounded align-items-center p-1">
            <img
              className="img-fluid rounded-circle"
              style={{ width: "80px" }}
              src={doctor.image}
              alt="Profile"
            />
            <div className="text-start ms-4">
              <p className="m-0">Name: <strong>Dr. {doctor.name}</strong></p>
              <p className="m-0">Specialization: <strong>{doctor.specialization}</strong></p>
              <p className="m-0">Contact: <strong>{doctor.contact}</strong></p>
              <p className="m-0">Years of Experience: <strong>{doctor.experience}</strong></p>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <h4 className="text-start">Time / Calender Management</h4>
          <div className="p-2 mt-1 rounded bg-light shadow">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                orientation="portrait"
                value={bookingDate}
                onChange={handleDateChange}
                minDate={dayjs()}
                maxDate={maxDate}
                showToolbar={false}
              />
              <div className="d-flex gap-2 mt-3">
                <TimeField
                  label="Start Time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
                <TimeField
                  label="End Time"
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </div>
            </LocalizationProvider>
            <div className="mt-3">
              <label>Time per Slot (minutes)</label>
              <input
                className="form-control"
                type="number"
                value={timePerSlot}
                onChange={handleTimePerSlotChange}
              />
            </div>
            <div className="mt-2">
              <button className="btn btn-primary1" id="background" onClick={handleSaveSchedule}>
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorTiming;
