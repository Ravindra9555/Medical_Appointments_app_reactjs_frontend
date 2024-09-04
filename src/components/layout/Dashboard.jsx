// import React from "react";
// import { Outlet, Link } from "react-router-dom";

// const Dashboard = () => {
//   return (
//     <div className="container-fluid">
//       <div className="row flex-nowrap">
//         <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
//           <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
//             <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
//               <span className="fs-5 d-none d-sm-inline">Menu</span>
//             </div>
//             <ul
//               className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
//               id="menu"
//             >
//               {/* <li className="nav-item">
//                 <Link to="/" className="nav-link align-middle px-0">
//                   <i className="fs-4 bi-house"></i>
//                   <span className="ms-1 d-none d-sm-inline">Home</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="writeprescription"
//                   className="nav-link align-middle px-0"
//                 >
//                   <i className="fs-4 bi-pencil"></i>
//                   <span className="ms-1 d-none d-sm-inline">
//                     Write Prescription
//                   </span>
//                 </Link>
//               </li>
//               <li>
//                 <a
//                   href="#submenu1"
//                   data-bs-toggle="collapse"
//                   className="nav-link px-0 align-middle"
//                 >
//                   <i className="fs-4 bi-speedometer2"></i>
//                   <span className="ms-1 d-none d-sm-inline">Dashboard</span>
//                 </a>
//                 <ul
//                   className="collapse show nav flex-column ms-1"
//                   id="submenu1"
//                   data-bs-parent="#menu"
//                 >
//                   <li className="w-100">
//                     <a href="#" className="nav-link px-0">
//                       <span className="d-none d-sm-inline">Item</span> 1
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="nav-link px-0">
//                       <span className="d-none d-sm-inline">Item</span> 2
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <a href="#" className="nav-link px-0 align-middle">
//                   <i className="fs-4 bi-table"></i>
//                   <span className="ms-1 d-none d-sm-inline">Orders</span>
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#submenu2"
//                   data-bs-toggle="collapse"
//                   className="nav-link px-0 align-middle"
//                 >
//                   <i className="fs-4 bi-bootstrap"></i>
//                   <span className="ms-1 d-none d-sm-inline">Bootstrap</span>
//                 </a>
//                 <ul
//                   className="collapse nav flex-column ms-1"
//                   id="submenu2"
//                   data-bs-parent="#menu"
//                 >
//                   <li className="w-100">
//                     <a href="#" className="nav-link px-0">
//                       <span className="d-none d-sm-inline">Item</span> 1
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="nav-link px-0">
//                       <span className="d-none d-sm-inline">Item</span> 2
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <a
//                   href="#submenu3"
//                   data-bs-toggle="collapse"
//                   className="nav-link px-0 align-middle"
//                 >
//                   <i className="fs-4 bi-grid"></i>
//                   <span className="ms-1 d-none d-sm-inline">Products</span>
//                 </a>
//                 <ul
//                   className="collapse nav flex-column ms-1"
//                   id="submenu3"
//                   data-bs-parent="#menu"
//                 >
//                   <li className="w-100">
//                     <a href="#" className="nav-link px-0">
//                       <span className="d-none d-sm-inline">Product</span> 1
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="nav-link px-0">
//                       <span className="d-none d-sm-inline">Product</span> 2
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="nav-link px-0">
//                       <span className="d-none d-sm-inline">Product</span> 3
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#" className="nav-link px-0">
//                       <span className="d-none d-sm-inline">Product</span> 4
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <a href="#" className="nav-link px-0 align-middle">
//                   <i className="fs-4 bi-people"></i>
//                   <span className="ms-1 d-none d-sm-inline">Customers</span>
//                 </a>
//               </li> */}
//
//             </ul>
//             <hr />
//           </div>
//         </div>
//         <div className="col py-3">
//           <nav className="navbar navbar-expand-lg bg-body-tertiary">
//             <div className="container-fluid">
//               <span className="navbar-brand">Navbar</span>
//               <button
//                 className="navbar-toggler"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#navbarSupportedContent"
//                 aria-controls="navbarSupportedContent"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//               >
//                 <span className="navbar-toggler-icon"></span>
//               </button>
//               <div
//                 className="collapse navbar-collapse"
//                 id="navbarSupportedContent"
//               >
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                   <li className="nav-item">
//                     <span className="nav-link active" aria-current="page">
//                       Home
//                     </span>
//                   </li>
//                   <li className="nav-item">
//                     <span className="nav-link">Link</span>
//                   </li>
//                 </ul>
//                 <div className="dropdown">
//                   <span
//                     className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
//                     id="dropdownUser1"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     <img
//                       src="https://github.com/mdo.png"
//                       alt="hugenerd"
//                       width="30"
//                       height="30"
//                       className="rounded-circle"
//                     />
//                     <span className="d-none d-sm-inline mx-1 text-black">
//                       Profile
//                     </span>
//                   </span>
//                   <ul
//                     className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small shadow"
//                     aria-labelledby="dropdownUser1"
//                   >
//                     <li>
//                       <span className="dropdown-item">New project...</span>
//                     </li>
//                     <li>
//                       <span className="dropdown-item">Settings</span>
//                     </li>
//                     <li>
//                       <span className="dropdown-item">Profile</span>
//                     </li>
//                     <li>
//                       <hr className="dropdown-divider" />
//                     </li>
//                     <li>
//                       <span className="dropdown-item">Sign out</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </nav>

//           <div className="container-fluid">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SidebarNav from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
const Dashboard = () => {
  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
 
      <div className="row flex-nowrap">
        <div
          className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
          style={{
            position: "fixed",
            height: "100vh",
            overflowY: "auto",
            backgroundColor:  "#8aefb5",
          }}
        >
          <SidebarNav />
        </div>
        <div
          className="col py-1 px-0 min-vh-100"
          style={{ marginLeft: "18%", width: "82%", height: "100vh" }}
        >
          <Navbar />
          <div
            className="container-fluid "
            style={{
              marginTop: "60px",
              height: "calc(100vh - 70px)",
              overflowY: "auto ",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
