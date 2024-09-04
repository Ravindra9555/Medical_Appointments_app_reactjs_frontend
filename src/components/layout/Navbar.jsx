
import React, { useState } from "react";
import logo from "../../assets/logo/logo.png";
import { useDoctor } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const { doctor } = useDoctor()
  const navigate = useNavigate();
  const logOut = () => navigate("/");
  return (
    <>
     
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ position: "fixed", width: "82%" }}>
        <div className="container-fluid">
          <span className="navbar-brand">
            <img src={logo} alt="Website Logo" style={{ height: "40px" }} />
          </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-6">
              {/* <li className="nav-item" style={{ width: "500px" }}>
                <form className="d-flex" onSubmit={searchPatient}>
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search Patients by Phone Number / ID / Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-outline-dark" id="background" type="submit">
                    Search
                  </button>
                </form>
              </li> */}
            </ul>
            {/* <div className="dropdown">
              <span className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                <img
                  src="https://img.freepik.com/premium-photo/medical-concept-indian-doctor-uniform-standing-hospital_1164587-4682.jpg?w=740"
                  alt="Doctor Profile"
                  width="50"
                  height="50"
                  className="rounded-circle"
                />
              </span>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-light text-small shadow">
                <li>
                  <span className="dropdown-item">Dr. <b>{doctor.doctorname}</b></span>
                </li>
                <li><span className="dropdown-item">Settings</span></li>
                <li><span className="dropdown-item">Profile</span></li>
              </ul>
            </div>
            <button className="btn btn-outline-danger d-none d-sm-inline py-1 m-1" onClick={logOut}>
              Logout <i className="bi bi-box-arrow-right me-1 ms-1 fs-5"></i>
            </button> */}
          </div>
        </div>
      </nav>

      {/* {showModal && tabelData.id && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog" style={{ minWidth: "600px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title text-center">Search Result</h6>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Age/Sex</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Patient ID</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{`${tabelData.firstname} ${tabelData.lastname}`}</td>
                    <td>{`${dayjs(patientData.dob).format('DD/MM/YYYY')} ${tabelData.gender}`}</td>
                    <td>{tabelData.mobilenumber}</td>
                    <td>{tabelData.patientid}</td>
                    <td>
                      <button className="btn btn-outline-dark" id="background" onClick={selectPatient}>
                        Select
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="modal-footer mb-2 d-flex justify-content-end">
                <Link to="/addnewpatient" className="btn btn-outline-dark me-2" id="background" onClick={() => setShowModal(false)}>
                  <FontAwesomeIcon icon={faAdd} /> Add New Patient
                </Link>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Navbar;
