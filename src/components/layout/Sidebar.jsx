import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { usePatient } from "../../context/PatientContext";
import { useDoctor } from "../../context/DoctorContext";
import dayjs from "dayjs";
const SidebarNav = () => {
  const navigate = useNavigate();
  const Sidebar = [
    {
      label: "Patient Management",
      icon: "bi-person-lines-fill ",
      url: "/dashboard",
      children: [],
    },
    {
      label: "Doctor Management",
      icon: "bi-people-fill",
      url: "/doctormanagement",
      children: [],
    },
    {
      label: "Issue Medicine",
      icon: "bi-capsule-pill",
      url: "/issuemedicine",
      children: [],
    },
    {
      label: "Lab Tests",
      icon: "bi-eyedropper",
      url: "/labtest",
      children: [],
    },
    // {
    //   label: "Last two LAB Test",
    //   icon: "bi-grid",
    //   url: "#",
    //   children: [
    //     { label: "Lab test1  20/07/2024", url: "/products/1" },
    //     { label: "Lab test 2  25/07/2024", url: "/products/2" },
    //   ],
    // },
    // {
    //   label: "Last two Prescription",
    //   icon: "bi-grid",
    //   url: "#",
    //   children: [
    //     { label: "Prescription 20/07/2024", url: "/products/1" },
    //     { label: "Prescription 25/07/2024", url: "/products/2" },
    //   ],
    // },
  ];

  const doc = {
    id: "1223",
    Name: "dr.dheeraj",
    patientId: "123234",
    role: "administrator",
    profile: "https://via.placeholder.com/100",
  };
 const {patient}= usePatient();
 const {doctor} = useDoctor();
  const logOut = () => navigate("/");

  return (
    <>
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100">
        <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto  text-decoration-none  ">
          {/* <span className="fs-5 d-none d-sm-inline text-black">Menu</span> */}
          {doctor && doctor.id == "" ? (
            <></>
          ) : (
            <>
              <div className="patients-card  d-none d-md-inline  container-fluid text-center  bg-light  border rounded p-2  ">
                <img
                  className="img-fluid"
                  src={doctor.profile || 'https://via.placeholder.com/100'}
                  // src={`${process.env.REACT_APP_IMAGEURL}/${patient.profile}`}
                  alt="Profile Image"
                  loading="lazy"
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "100%",
                  }}
                />
                <p className="fs-6 fw-bold text-uppercase mb-0 text-black">
                  {doctor.doctorname}
                </p>
                <small className="m-0 ">
                  ID : <b>{doctor.id}</b>
                </small>
                <br />

                <small className="m-0">
                  Role:<b> {doctor.role}</b>
                </small>
              </div>
            </>
          )}
        </div>

        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          {Sidebar.map((item, index) => (
            <li key={index} className="nav-item">
              {item.children.length > 0 ? (
                <>
                  <button
                    className="nav-link align-middle px-0 btn btn-link text-black"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${index}`}
                  >
                    <i className={`fs-5 ${item.icon} text-dark`}></i>
                    <span className="ms-2 d-none d-md-inline fw-semibold">
                      {item.label}
                    </span>
                  </button>
                  <ul
                    className="collapse nav flex-column ms-1"
                    id={`collapse-${index}`}
                  >
                    {item.children.map((child, idx) => (
                      <li key={idx} className="w-100">
                        <Link to={child.url} className="nav-link px-0">
                          <span className="d-none d-md-inline text-black fw-semibold">
                            {child.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={item.url} className="nav-link align-middle px-0">
                  <i className={`fs-5 ${item.icon} text-dark`}></i>
                  <span className="ms-2 d-none d-md-inline text-black fw-semibold fs-6">
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-dark d-none d-sm-inline py-1 m-1"
          onClick={logOut}
        >
          Logout <i className="bi bi-box-arrow-right me-1 ms-1 fs-5"></i>
        </button>
        <hr />
      </div>
    </>
  );
};

export default SidebarNav;
