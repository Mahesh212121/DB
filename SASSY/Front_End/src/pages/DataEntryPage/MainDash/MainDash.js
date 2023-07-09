import React from "react";
import { BrowserRouter as Router, Routes, Route, Switches, Link, Redirect } from 'react-router-dom';

import ProfileCard from "../ProfilePage/Profile";
import PatientMedReport from "../Patient/PatientMedReport";
import Medicine from "../Medicine/Medicine";
import TestReport from "../TestReport/TestReport";
import Treatment from "../Treatment/Treatment";
import "./MainDash.css";
const MainDash = ({ page }) => {
  return (
    <div className="MainDash">

      {page === "Profile" && <ProfileCard />}
      {page === "Patients" && <PatientMedReport />}
      {page === "Medicine" && <Medicine />}
      {page === "Test" && <TestReport />}
      {page === "Treatment" && <Treatment />}

    </div>
  );
};

export default MainDash;