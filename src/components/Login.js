import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { validate } from "./validate";
import { notify } from "./toast";
import "./style.css";
import AgencyImage from "../assets/images/agency.png";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "login"));
  }, [data, touched]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
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
        email: true,
        password: true,
      });
    }
  };

  return (
    <div className="content">
      <div className="formBox">
        <div className="title">
          <h2>Login</h2>
          <span>
            Not a Member yet? <Link to="/singup">Sign up</Link>
          </span>
        </div>

        <form onSubmit={submitHandler}>
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

          <button type="submit" className="btn_submit">
            Login
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

export default Login;
