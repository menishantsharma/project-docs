import React, { useState, useEffect } from "react";
import { loginUser } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    if (
      formData.email.includes("@") &&
      formData.email !== "" &&
      formData.password.length > 6
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formData.email, formData.password]);

  const inputChangeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (user.email === email && user.password === password) {
      setLoading(true);
      setTimeout(() => {
        dispatch(loginUser());
        setLoading(false);
        history.push("/dashboard");
      }, 5000);
    } else {
      prompt("Invalid credentials");
    }
  };

  return (
    <React.Fragment>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <form onSubmit={formSubmitHandler}>
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
            Login
          </button>
        </form>
      )}
    </React.Fragment>
  );
};

export default Login;
