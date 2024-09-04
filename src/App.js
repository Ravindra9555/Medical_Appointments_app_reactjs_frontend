import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./components/layout/Dashboard";
import Error404 from "./components/ErrorPasges/Error404";


import LoginWithOtp from "./auth/LoginWithOtp";
import LoginWithPassword from "./auth/LoginWithPassword"

import DashboardMain from "./components/pages/DashboardMain";
import { BookAppointment } from "./components/pages/BookAppointment";
import DoctorManagement from "./components/pages/DoctorManagement";
import AddNewPatient from "./components/pages/AddNewPatient";

import ScrollToTop from "./components/ScrollToTop";

import DoctorTiming from "./components/pages/DoctorTiming";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<LoginWithOtp />} />
        <Route path="/login/password" element={<LoginWithPassword />} />
        <Route path="/" element={<PrivateRoute/>}>
        <Route path="/" element={<Dashboard />}>
          <Route path="dashboard" element={<DashboardMain />} />
          <Route path="bookappointment" element={<BookAppointment/>}/>
          <Route path="doctormanagement" element={<DoctorManagement/>}/>
          <Route path="addnewpatient" element={<AddNewPatient/>}/>
       
          <Route path="doctor" element={<DoctorTiming/>}/>
        
        </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
