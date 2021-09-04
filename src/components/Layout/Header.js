import React from "react";
import { logoutUser } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.user.email);
  const logoutUserHandler = () => {
    dispatch(logoutUser());
    history.push("/signup");
  };
  return (
    <header>
      <p>{email}</p>
      <button onClick={logoutUserHandler}>Logout</button>
    </header>
  );
};

export default Header;
