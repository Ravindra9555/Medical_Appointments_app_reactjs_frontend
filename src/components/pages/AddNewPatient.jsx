import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const AddNewPatient = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log("Selected file:", file);
    setSelectedFile(file);

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 2 * 1024 * 1024; // 2 MB

      if (!validTypes.includes(file.type)) {
       toast.error("Only image files (JPEG, PNG, GIF) are allowed.") ;
      } else if (file.size > maxSize) {
        toast.error("File size must be less than 2 MB.");
      } else {
        setSelectedFile(file);
      }
    }
  };
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const formHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(selectedFile);
  };
  return (
    <>
    <ToastContainer/>
      <div className=" p-3 bg-body-tertiary mt-3 rounded ">
        <h4 className=" text-start"> Patient Registration </h4>
        <form className=" p-4" onSubmit={formHandler}>
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control "
                name="firstName"
                value={formData.firstName}
                placeholder=" First Name"
                onChange={onChangeHandler}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="" className="form-label">
                Last Name
              </label>

              <input
                type="text"
                className="form-control "
                name="lastName"
                value={formData.lastName}
                onChange={onChangeHandler}
                placeholder=" Last Name"
              />
            </div>
          </div>

          <div className="row">
            <div className="pt-3 col-md-6">
              <label htmlFor="" className="form-label">
                Gender
              </label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={onChangeHandler}
                />

                <label className="form-check-label" htmlFor="Male">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="female"
                  name="gender"
                  onChange={onChangeHandler}
                  value="Female"
                />

                <label className="form-check-label" htmlFor="Female">
                  Female
                </label>
              </div>
            </div>

            <div className="pt-3 col-6">
              <label htmlFor="" className="form-label">
               Age /Year
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={onChangeHandler}
                name="age"
                className="form-control col-6"
                placeholder="Age / yaer "
              />
            </div>
          </div>
          <div className="row">
          <div className="col-md-6 mt-2">
              <label htmlFor="" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={onChangeHandler}
                value={formData.email}
                className="form-control "
                placeholder="Email"
              />
            </div>
            <div className="mt-2 col-md-6">
              <label htmlFor="" className="form-label">
                Phone Number
              </label>

              <input
                type="number"
                name="phoneNumber"
                onChange={onChangeHandler}
                value={formData.phoneNumber}
                className="form-control "
                placeholder="Phone Number "
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-4 mt-2">
              <label htmlFor="" className="form-label">
                Please Upload Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                className="form-control "
                onChange={handleFileChange}
                placeholder="profile photo"
              />
            </div>
            <div className="col-sm-4 d-flex justify-content-end mb-2">
              <img
                src={
                  selectedFile ? URL.createObjectURL(selectedFile) :<></>
                }
                alt=""
                className="rounded-circle"
                style={{ height: "100px", width: "100px" }}
              />
            </div>
          </div>
          <div className="pt-3 row">
          
          </div>

          <div className="pt-3 col-3 d-flex">
            <button className="btn col-8" id="background">
              Submit
            </button>
            <div className="ms-4 ">
              {loading && (
                <div className="d-flex justify-content-center pt-2">
                  <div class="spinner-border text-primary " role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewPatient;
