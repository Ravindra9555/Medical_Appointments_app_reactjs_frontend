import React, { useState, useEffect, useMemo } from "react";
import { usePatient } from "../../context/PatientContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Loader from "../loader/Loader";
import DataTable from "react-data-table-component";
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className=" col-md-6 d-flex">
    <input
      id="search"
      type="text"
      className="form-control"
      placeholder="Search by Date/DoctorName/phone Number"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button
      type="button"
      className="btn btn-outline-danger ms-2"
      onClick={onClear}
    >
      Clear
    </button>
  </div>
);

const columns = [
  {
    name: "Treatment Date",
    selector: (row) => dayjs(row.treatmentdate).format("D-MMM-YYYY"),
    sortable: true,
  },
  {
    name: "Patient Name ",
    selector: (row) => (
      <> {row.patient_firstname + " " + row.patient_lastname}</>
    ),
    sortable: true,
  },

  {
    name: "Phone Number",
    selector: (row) => row.patient_contact,
    sortable: true,
  },
 
  {
    name: "Doctor Name",
    selector: (row) => row.doctorname, // row.patient_contact
    sortable: true,
  },
  {
    name: "See Medicine Details",
    selector: (row) => (
      <Link to={`/viewtest/${btoa(row.prescriptionid)}`}>view Labtest</Link>
    ),
  },
  {
    name: "Is Done ",
    sortable: true,
    selector: (row) => (
      <>
        {false ? (
          <span className="badge bg-success">Done</span>
        ) : (
          <span className="badge bg-danger">Not Done</span>
        )}
      </>
    ),
  },
];

const Labtest = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState("");
  const { patient, setPatient } = usePatient();
  const [searchData, setSearchData] = useState(false);
  const [patientList, setPatientList] = useState([]);
  const [data, setdata] = useState([]);

  const selectpatient = (value) => {
    const findone = patientList.find((patient) => patient.id === value);
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
    setSearchData(!searchData);
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
        if (res.data.patientserachresults == null) {
          toast.error("No patient found with the given ID");
        } else {
          const data = res.data.patientserachresults;
          setPatientList(data);
          setSearchData(true); // Show the modal
        }
      }
    } catch (error) {
      console.log(error);
      alert("Error: " + error?.response?.data?.message);
    }
  };

  const onClose = () => {
    setSearchData(false); // Hide the modal
  };

  useEffect(() => {
    getPrescription();
  }, [patient.id]);

  const getPrescription = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/doctor/getPrescriptionByPatientId`,
        {
          params: {
            patientid: patient.id,
          },
        }
      );
      if (response.status == 200) {
        //  console.log(response.data.PatientsDetails);
        setdata(response.data.patientsprescriptions);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data.filter(
    (item) =>
      (item.patient_contact &&
        item.patient_contact
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.treatmentdate &&
        item.treatmentdate.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.doctorname &&
        item.doctorname.toLowerCase().includes(filterText.toLowerCase()))
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <div>
        <form onSubmit={searchpatient} className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter patient ID/ Name / Phone Number"
              value={formdata}
              onChange={(e) => setFormData(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="tabel">
        <div
          className={`modal fade ${searchData ? "show d-block" : ""}`}
          tabIndex="-1"
          aria-labelledby="searchPatientLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            style={{ minWidth: "800px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title text-center" id="searchPatientLabel">
                  Search Result
                </h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose} // Attach the onClose handler
                  aria-label="Close"
                ></button>
              </div>
              {patientList.length > 0 ? (
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
                    {patientList.map((patient, index) => (
                      <tr key={index}>
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
                <p className="text-center">
                  No Patient is found on given Information
                </p>
              )}

              <div className="modal-footer1 mb-2 d-flex justify-content-end">
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
          </div>
        </div>

        {/* Backdrop */}
        {searchData && (
          <div className="modal-backdrop fade show" onClick={onClose}></div>
        )}
      </div>

      <DataTable
        // title="e-Prescription List"
        columns={columns}
        data={filteredItems}
        pagination
        // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        //   selectableRows
        persistTableHead
      />
    </div>
  );
};

export default Labtest;
