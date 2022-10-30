import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { validate } from "./validate";
import { notify } from "./toast";
import "./style.css";
import AgencyImage from "../assets/images/agency.png";

function SingUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "singup"));
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      notify("You singed up successfully", "success");
    } else {
      notify("Invalid data!", "error");
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
    }
  };

  return (
    <div className="content">
      <div className="formBox">
        <div className="title">
          <h2>Sign up</h2>
          <span>
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
        </div>

        <form onSubmit={submitHandler}>
          <div className="item">
            <label className="form_label">Full name</label>
            <input
              type="text"
              className={
                errors.name && touched.name
                  ? `was-validated form_control`
                  : ` form_control`
              }
              value={data.name}
              name="name"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {errors.name && touched.name && <span>{errors.name}</span>}
          </div>

          <div className="item">
            <label className="form_label">Email address</label>
            <input
              type="text"
              className={
                errors.email && touched.email
                  ? `was-validated form_control`
                  : ` form_control`
              }
              value={data.email}
              name="email"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {errors.email && touched.email && <span>{errors.email}</span>}
          </div>

          <div className="item">
            <label className="form_label">Password</label>
            <input
              type="password"
              className={
                errors.password && touched.password
                  ? `was-validated form_control`
                  : ` form_control`
              }
              value={data.password}
              name="password"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {errors.password && touched.password && (
              <span>{errors.password}</span>
            )}
          </div>

          <div className="item">
            <label className="form_label">Confirm Password</label>
            <input
              type="password"
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? `was-validated form_control`
                  : ` form_control`
              }
              value={data.confirmPassword}
              name="confirmPassword"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span>{errors.confirmPassword}</span>
            )}
          </div>

          <div className="item">
            <div className="form_check">
              <input
                type="checkbox"
                name="isAccepted"
                value={data.isAccepted}
                className="form_check_input"
                onChange={changeHandler}
                onFocus={focusHandler}
              />
              <label>I accept terms of privacy policy</label>
            </div>
            {errors.isAccepted && touched.isAccepted && (
              <span>{errors.isAccepted}</span>
            )}
          </div>
          <button type="submit" className="btn_submit">
            Create your free account
          </button>
        </form>
      </div>
      <div className="desc">
        <img src={AgencyImage} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default SingUp;
