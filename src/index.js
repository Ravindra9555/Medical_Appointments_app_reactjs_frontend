import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify CSS
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS JS
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css"

import { PatientProvider } from './context/PatientContext';
import { DoctorProvider } from './context/DoctorContext';
AOS.init();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PatientProvider>
      <DoctorProvider>
        <App />
      </DoctorProvider>
    </PatientProvider>
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
