import React from "react"
import { CreateUser, ListUsers } from "../pages/Admin"
import { Appointments, Patients } from "../pages/Doctor"
import { FrontDeskOperator, DataEntryOperator } from "../pages"

export const usermap = {
  1: "front-desk-operator",
  2: "data-entry-operator",
  3: "doctor",
  4: "adminstrator",
}

const adminTasks = [
  {
    breadcrumb: "FDOs",
    path: "fdos",
    element: <ListUsers title="Front Desk Operators" userType={1} />
  },
  {
    breadcrumb: "DEOs",
    path: "deos",
    element: <ListUsers title="Data Entry Operators" userType={2} />
  },
  {
    breadcrumb: "Doctors",
    path: "doctors",
    element: <ListUsers title="Doctors" userType={3} />
  },
  {
    breadcrumb: "Admins",
    path: "admins",
    element: <ListUsers title="Adminstrators" userType={4} />
  },
  { breadcrumb: "Create user", path: "create-user", element: <CreateUser /> }
]

const doctorTasks = [
  { breadcrumb: "Appointments", path: "pending-appointments", element: <Appointments /> },
  { breadcrumb: "Patients", path: "patients", element: <Patients />, },
]

export const routeChildren = {
  1: [],
  2: [],
  3: doctorTasks,
  4: adminTasks,
}

export const pages = [
  { breadcrumb: "FDO Dashboard", usertype: 1, element: FrontDeskOperator },
  { breadcrumb: "DE Dashboard", usertype: 2, element: DataEntryOperator },
  { breadcrumb: "Doctor dashboard", usertype: 3 },
  { breadcrumb: "Admin dashboard", usertype: 4 }
]
