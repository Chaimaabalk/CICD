import React, { useState } from "react";
import {
  isValidName,
  isValidEmail,
  isValidPostalCode,
  isOver18,
} from "../utils/validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Form.css";
const Form = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const isFormValid = () => {
    return (!formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.dateOfBirth ||
    !formData.postalCode)
};
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validation
    if (!isValidName(formData.firstName)) {
      newErrors.firstName = "First name is invalid";
    }
    if (!isValidName(formData.lastName)) {
      newErrors.lastName = "Last name is invalid";
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!isValidPostalCode(formData.postalCode)) {
      newErrors.postalCode = "Postal code is invalid";
    }
    if (isOver18(formData.dateOfBirth) < 18) {
      newErrors.dateOfBirth = "You must be over 18 years old";
    }

    if (Object.keys(newErrors).length > 0) {
      Object.keys(newErrors).forEach((key) => {
        toast.error(newErrors[key]);
      });
    } else {
      localStorage.setItem("formData", JSON.stringify(formData));
      toast.success("Form saved successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        city: "",
        postalCode: "",
      });
    }
  };

  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    >
    </ToastContainer>
    <form onSubmit={handleSubmit} className="form-container">
        <h3>User Registration</h3>
        <div className="Name">
      <div className="label-input">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label >
          Last Name:
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        </div>
      </div>
      <div className="label-input">
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="label-input">
        <label>
          City:
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </label>
      </div>
      <button
        type="submit"
        style={ isFormValid () ? {backgroundColor: "grey"} : {backgroundColor: "#ae3c33"}}
        disabled={isFormValid()}
        className="submit-btn"
      >
        Save
      </button>
    </form>
    </>
    );
}

export default Form;
