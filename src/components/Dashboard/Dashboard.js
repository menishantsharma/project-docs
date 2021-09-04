import React from "react";
import { Link } from "react-router-dom";
import Documents from "../Documents/Documents";
import Header from "../Layout/Header";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Link to="/add">Add Document</Link>
      <Documents />
    </div>
  );
};

export default Dashboard;
