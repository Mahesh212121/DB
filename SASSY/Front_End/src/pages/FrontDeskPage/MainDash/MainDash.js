import React from "react";
import { BrowserRouter as Router, Routes, Route, Switches, Link, Redirect } from 'react-router-dom';

import FDRegForm from "../FDRegForm/FDRegForm";
import FDAdmitForm from "../FDAdmitForm/FDAdmitForm";
import FDAppointmentForm from "../FDAppointmentForm/FDAppointmentForm";
import FDDischarge from "../FDDischarge/FDDischarge";
import ProfileCard from "../ProfilePage/Profile";
import DocInfo from "../DocInfo/DocInfo";
import "./MainDash.css";
const MainDash = ({ page }) => {
  return (
    <div className="MainDash">
      {page === "Register" && <FDRegForm />}
      {page === "Admit" && <FDAdmitForm />}
      {page === "Profile" && <ProfileCard />}
      {page === "Appointment" && <FDAppointmentForm />}
      {page === "Discharge" && <FDDischarge />}
      {page === "Doctorslot" && <DocInfo />}
    </div>
  );
};

export default MainDash;