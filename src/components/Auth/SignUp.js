import React, { useState, useEffect } from "react";
import { signupUser } from "../../store";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const SignUp = () => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isFormValid, setFormValid] = useState(false);
  useEffect(() => {
    if (
      formData.name !== "" &&
      /^[a-zA-Z]/.test(formData.name) &&
      formData.email.includes("@") &&
      formData.email !== "" &&
      formData.password.length > 6
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formData.name, formData.email, formData.password]);

  const inputChangeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    setLoading(true);
    dispatch(signupUser(name, email, password));

    setTimeout(() => {
      setLoading(false);
      history.push("/login");
    }, 5000);
  };

  return (
    <React.Fragment>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <form onSubmit={formSubmitHandler}>
          <label htmlFor="name">Name</label>
          <input
            value={formData.name}
            onChange={inputChangeHandler}
            type="text"
            id="name"
            name="name"
          />
          <label htmlFor="email">Email</label>
          <input
            value={formData.email}
            onChange={inputChangeHandler}
            type="email"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={formData.password}
            onChange={inputChangeHandler}
            type="password"
            name="password"
          />
          <button type="submit" disabled={!isFormValid}>
            Sign Up
          </button>
        </form>
      )}
    </React.Fragment>
  );
};

export default SignUp;
