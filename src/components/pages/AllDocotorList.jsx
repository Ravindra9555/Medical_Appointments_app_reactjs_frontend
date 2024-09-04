import React, { useState, useMemo, useEffect } from "react";
import { usePatient } from "../../context/PatientContext";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Loader from "../loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const TodayDoctor = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    department: "Cardiology",
    contactNumber: "1234567890",
    email: "johndoe@example.com",
    image: "https://via.placeholder.com/100",
    time: "10:30 - 12:30",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialization: "Dermatologist",
    department: "Dermatology",
    contactNumber: "9876543210",
    email: "janesmith@example.com",
    image: "https://via.placeholder.com/100",
    time: "12:30 - 14:30",
  },
  {
    id: 3,
    name: "Dr. Mark Johnson",
    specialization: "Endocrinologist",
    department: "Endocrinology",
    contactNumber: "0987654321",
    email: "markjohnson@example.com",
    image: "https://via.placeholder.com/100",
    time: "14:30 - 16:30",
  },
  {
    id: 4,
    name: "Dr. Sarah Wilson",
    specialization: "Gastroenterologist",
    department: "Gastroenterology",
    contactNumber: "2345678901",
    email: "sarahwilson@example.com",
    image: "https://via.placeholder.com/100",
    time: "16:30 - 18:30",
  },
];

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="col-md-6 d-flex">
    <input
      id="search"
      type="text"
      className="form-control"
      placeholder="Search by Doctor Name, Specialization, or Contact Number"
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
    name: "Profile",
    selector: (row) => (
      <img
        src={row.image}
        alt={row.name}
        style={{ width: "60px", borderRadius: "50%",margin:"5px" }}
      />
    ),
    sortable: false,
  },
  {
    name: "Doctor Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Specialization",
    selector: (row) => row.specialization,
    sortable: true,
  },
  {
    name: "Contact Number",
    selector: (row) => row.contactNumber,
    sortable: true,
  },
//   {
//     name: "Time of Availability",
//     selector: (row) => row.time,
//     sortable: true,
//   },
  // {
  //   name: "Update Time",
  //   selector: (row) => <><Link>Update</Link></>,
  //   sortable: true,
  // },
];

const AllDocotorList = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const { patient } = usePatient();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   
   const[allDoctorList, SetAllDcotorList]= useState([]);
    useEffect(()=>{
        // SetAllDcotorList(TodayDoctor);
        // fetchAllDcors();
    }, []);

    const fetchAllDcors = async()=>{
      try {
        setLoading(true);
       const res = await axios.get(`/api/`);
        if(res.status===200){
            SetAllDcotorList(res.data.data);
            setLoading(false);
        }
      } catch (error) {
         setLoading(false);
        toast.error("Error: " + error.message);
      }
      finally{
        setLoading(false);
      }
       
    }
  const filteredItems = TodayDoctor.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.specialization.toLowerCase().includes(filterText.toLowerCase()) ||
      item.contactNumber.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
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
    <div className="mt-4">
      <h3 className="text-start">Doctor's List</h3>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
      />
    </div>
  );
};

export default AllDocotorList;
